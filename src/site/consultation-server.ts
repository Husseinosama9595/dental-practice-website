import { createServerFn } from "@tanstack/react-start"

const CONTACT_METHODS = ["phone", "whatsapp", "email"] as const
const CONTACT_TIMES = ["morning", "afternoon", "anytime"] as const

const CONFIRMATION =
  "Your consultation request was submitted. This does not confirm an appointment; the practice will contact you."

type ConsultationInput = {
  name: string
  phone: string
  email?: string
  treatmentOfInterest?: string
  preferredContactMethod: string
  preferredContactTime?: string
  website?: string
  idempotencyKey: string
}

type FieldErrors = Record<string, string>

function normalizeText(value: string): string {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function validateEnquiry(input: ConsultationInput): FieldErrors {
  const errors: FieldErrors = {}
  const name = normalizeText(input.name)
  const phone = normalizeText(input.phone)
  const email = input.email ? normalizeText(input.email) : undefined

  if (name.length < 2 || name.length > 80 || !/\p{L}/u.test(name)) {
    errors.name = "Enter your name."
  }

  if (
    phone.length < 7 ||
    phone.length > 30 ||
    !/^[+()\d .-]+$/.test(phone) ||
    (phone.match(/\d/g) ?? []).length < 7
  ) {
    errors.phone = "Enter a valid phone number."
  }

  if (email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      errors.email = "Enter a valid email address."
    }
  }

  if (
    input.treatmentOfInterest &&
    normalizeText(input.treatmentOfInterest).length > 120
  ) {
    errors.treatmentOfInterest = "This value is too long."
  }

  if (
    !CONTACT_METHODS.includes(
      input.preferredContactMethod as (typeof CONTACT_METHODS)[number],
    )
  ) {
    errors.preferredContactMethod =
      "Choose how the practice should contact you."
  }

  if (
    input.preferredContactTime &&
    !CONTACT_TIMES.includes(
      input.preferredContactTime as (typeof CONTACT_TIMES)[number],
    )
  ) {
    errors.preferredContactTime = "Choose a valid contact time."
  }

  if (input.preferredContactMethod === "email" && !email) {
    errors.email =
      "Add an email address if you would like us to contact you by email."
  }

  return errors
}

export const submitConsultation = createServerFn({ method: "POST" })
  .validator((input: unknown): ConsultationInput => {
    if (!input || typeof input !== "object") {
      throw new Error("INVALID_REQUEST|{}|The request could not be validated.")
    }

    const data = input as Record<string, unknown>

    const requiredStrings = [
      "name",
      "phone",
      "preferredContactMethod",
      "idempotencyKey",
    ]

    if (
      requiredStrings.some(
        (key) => typeof data[key] !== "string",
      ) ||
      ["email", "treatmentOfInterest", "preferredContactTime", "website"].some(
        (key) => data[key] !== undefined && typeof data[key] !== "string",
      )
    ) {
      throw new Error("INVALID_REQUEST|{}|The request could not be validated.")
    }

    const idempotencyKey = data.idempotencyKey as string

    if (!idempotencyKey || idempotencyKey.length > 256) {
      throw new Error("INVALID_REQUEST|{}|The request could not be validated.")
    }

    return data as unknown as ConsultationInput
  })
  .handler(async ({ data }) => {
    const fieldErrors = validateEnquiry(data)

    if (Object.keys(fieldErrors).length > 0) {
      throw new Error(
        `VALIDATION_ERROR|${JSON.stringify(fieldErrors)}|Check the highlighted fields and try again.`,
      )
    }

    if (data.website && normalizeText(data.website)) {
      throw new Error("INVALID_REQUEST|{}|The request could not be validated.")
    }

    const apiKey = process.env.RESEND_API_KEY
    const recipient = process.env.CONSULTATION_TO_EMAIL
    const sender = process.env.CONSULTATION_FROM_EMAIL

    if (!apiKey || !recipient || !sender) {
      console.error("consultation_delivery_failed", {
        reason: "resend_not_configured",
      })

      throw new Error(
        "DELIVERY_UNAVAILABLE|{}|The enquiry service is temporarily unavailable. Please contact the practice directly.",
      )
    }

    const message = [
      "A consultation enquiry was submitted through the practice website.",
      "",
      `Name: ${normalizeText(data.name)}`,
      `Phone: ${normalizeText(data.phone)}`,
      `Email: ${data.email ? normalizeText(data.email) : "Not provided"}`,
      `Treatment of interest: ${data.treatmentOfInterest ? normalizeText(data.treatmentOfInterest) : "Not provided"}`,
      `Preferred contact method: ${data.preferredContactMethod}`,
      `Preferred contact time: ${data.preferredContactTime ?? "Not provided"}`,
      "",
      "This is a request for follow-up only. It does not confirm or reserve an appointment.",
    ].join("\n")

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": data.idempotencyKey,
        },
        body: JSON.stringify({
          from: sender,
          to: [recipient],
          ...(data.email ? { reply_to: normalizeText(data.email) } : {}),
          subject: "New consultation enquiry",
          text: message,
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        console.error("consultation_delivery_failed", {
          reason: `resend_failed_${response.status}`,
        })

        throw new Error("resend_request_failed")
      }

      console.info("consultation_delivery_accepted", {
        providerReference:
          typeof result.id === "string" ? result.id : undefined,
      })

      return { status: "accepted", confirmation: CONFIRMATION }
    } catch (error) {
      if (error instanceof Error && error.message === "resend_request_failed") {
        throw new Error(
          "DELIVERY_OUTCOME_UNKNOWN|{}|We could not confirm whether the request reached the practice. Retry this same request shortly or use the direct contact options below.",
        )
      }

      console.error("consultation_delivery_failed", {
        reason: "network_error",
      })

      throw new Error(
        "DELIVERY_OUTCOME_UNKNOWN|{}|We could not confirm whether the request reached the practice. Retry this same request shortly or use the direct contact options below.",
      )
    }
  })
