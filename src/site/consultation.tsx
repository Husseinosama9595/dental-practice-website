import { useMemo, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { submitConsultation } from './consultation-server'
import { PracticeMap } from '../components/PracticeMap'

import { PRACTICE_CONFIG } from './content'
import { ArrowRight, ArrowUpRight, ContactLinks, Media, ShieldIcon } from './components'

type PreferredContactMethod = 'phone' | 'whatsapp' | 'email'
type PreferredContactTime = 'morning' | 'afternoon' | 'anytime'
type EnquiryField =
  | 'name'
  | 'phone'
  | 'email'
  | 'treatmentOfInterest'
  | 'preferredContactMethod'
  | 'preferredContactTime'
type SubmissionState = 'idle' | 'submitting' | 'success' | 'failure'

interface FormValues {
  name: string
  phone: string
  email: string
  treatmentOfInterest: string
  preferredContactMethod: PreferredContactMethod | ''
  preferredContactTime: PreferredContactTime | ''
  website: string
}

const EMPTY_FORM: FormValues = {
  name: '',
  phone: '',
  email: '',
  treatmentOfInterest: '',
  preferredContactMethod: '',
  preferredContactTime: '',
  website: '',
}

function parseActionError(error: unknown): { fieldErrors: Record<string, string>; message: string } {
  const fallback = 'Your request could not be sent. Please try again, or use the direct contact options.'
  if (!(error instanceof Error)) return { fieldErrors: {}, message: fallback }
  const raw = error.message.replace(/^\[.*?\]\s*/, '')
  const parts = raw.split('|')
  if (parts.length >= 3) {
    try {
      const fieldErrors = JSON.parse(parts[1]) as Record<string, string>
      return { fieldErrors: fieldErrors ?? {}, message: parts.slice(2).join('|') || fallback }
    } catch {
      return { fieldErrors: {}, message: fallback }
    }
  }
  return { fieldErrors: {}, message: fallback }
}

export function ConsultationPage() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({})
  const [serverFieldErrors, setServerFieldErrors] = useState<Record<string, string>>({})
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [feedback, setFeedback] = useState<{ kind: 'success' | 'error'; message: string } | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const idempotency = useRef<{ key: string; snapshot: string } | null>(null)

  const emailRequired = values.preferredContactMethod === 'email'
  const busy = submissionState === 'submitting'

  const localErrors = useMemo(() => {
    const errors: Partial<Record<EnquiryField, string>> = {}
    const name = values.name.trim()
    if (name.length < 2) errors.name = 'Enter at least two characters.'
    else if (name.length > 80) errors.name = 'This value is too long.'

    const phone = values.phone.trim()
    if (!phone) errors.phone = 'This field is required.'
    else if (!/^[+()\d .-]{7,30}$/.test(phone) || (phone.match(/\d/g) ?? []).length < 7) {
      errors.phone = 'Enter a valid phone number with at least seven digits.'
    }

    const email = values.email.trim()
    if (emailRequired && !email) {
      errors.email = 'Add an email address if you would like us to use email.'
    } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address.'
    } else if (email.length > 254) {
      errors.email = 'This value is too long.'
    }

    if (values.treatmentOfInterest.trim().length > 120) {
      errors.treatmentOfInterest = 'This value is too long.'
    }
    if (!values.preferredContactMethod) {
      errors.preferredContactMethod = 'This field is required.'
    }
    return errors
  }, [emailRequired, values])

  const fieldError = (field: EnquiryField): string | null => {
    if (serverFieldErrors[field]) return serverFieldErrors[field]
    if (!touched[field]) return null
    return localErrors[field] ?? null
  }

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    if (Object.keys(serverFieldErrors).length > 0) setServerFieldErrors({})
    if (feedback?.kind === 'error') setFeedback(null)
    idempotency.current = null
  }

  const markTouched = (field: EnquiryField) => {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  const describedBy = (field: EnquiryField, helpId: string) => {
    const error = fieldError(field)
    return error ? `${helpId} consultation-${field}-error` : helpId
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (busy) return
    setFeedback(null)
    setServerFieldErrors({})
    setTouched({
      name: true,
      phone: true,
      email: true,
      treatmentOfInterest: true,
      preferredContactMethod: true,
      preferredContactTime: true,
    })

    if (Object.keys(localErrors).length > 0) {
      setSubmissionState('failure')
      setFeedback({
        kind: 'error',
        message: 'Please check the highlighted fields before sending your request.',
      })
      requestAnimationFrame(() => {
        const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
        const target = invalid?.matches('fieldset')
          ? invalid.querySelector<HTMLElement>('input, select, button')
          : invalid
        target?.focus()
      })
      return
    }

    const payload = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim() || undefined,
      treatmentOfInterest: values.treatmentOfInterest.trim() || undefined,
      preferredContactMethod: values.preferredContactMethod,
      preferredContactTime: values.preferredContactTime || undefined,
      website: values.website.trim() || undefined,
    }
    const snapshot = JSON.stringify(payload)
    if (!idempotency.current || idempotency.current.snapshot !== snapshot) {
      idempotency.current = {
        key:
          typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `enquiry-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        snapshot,
      }
    }

    setSubmissionState('submitting')
    try {
      const result = await submitConsultation({
        data: {
          ...payload,
          preferredContactMethod: payload.preferredContactMethod as PreferredContactMethod,
          idempotencyKey: idempotency.current.key,
        },
      })
      setSubmissionState('success')
      setFeedback({ kind: 'success', message: result.confirmation })
      setValues(EMPTY_FORM)
      setTouched({})
      idempotency.current = null
      formRef.current?.reset()
    } catch (error) {
      const parsed = parseActionError(error)
      setSubmissionState('failure')
      setServerFieldErrors(parsed.fieldErrors)
      setFeedback({ kind: 'error', message: parsed.message })
      console.error('consultation_enquiry_failed', {
        fields: Object.keys(parsed.fieldErrors),
      })
    }
  }

  return (
    <>
      <nav className="crumbs page-container" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Consultation</span>
      </nav>

      <header className="page-hero page-container">
        <div className="page-hero__copy" data-reveal>
          <span className="eyebrow">A first conversation · no obligation</span>
          <h1>
            A simple way to <em>get in touch.</em>
          </h1>
          <p className="lede">
            Share a few details and the practice can follow up using your preferred contact method.
            This is a consultation request only; it does not book, reserve or confirm an appointment.
          </p>
          <div className="page-hero__badges hero__badges">
            <span className="hero__badge">
              <ShieldIcon size={16} /> Your details go only to the practice
            </span>
          </div>
        </div>
        <div className="page-hero__visual" data-reveal="image" data-delay="1">
          <Media
            image="reception"
            alt="Practice reception desk with oak joinery and soft daylight"
            ratio="landscape"
            priority
          />
        </div>
      </header>

      <section className="section page-container" aria-labelledby="consultation-form-heading">
        <div className="form-layout">
          <div className="form-card" data-reveal>
            <div className="stack stack--sm">
              <span className="eyebrow">Consultation enquiry</span>
              <h2 id="consultation-form-heading">How may the practice reach you?</h2>
            </div>

            {feedback && (
              <div
                className={
                  feedback.kind === 'success'
                    ? 'form-feedback form-feedback--success'
                    : 'form-feedback form-feedback--error'
                }
                role={feedback.kind === 'error' ? 'alert' : 'status'}
                aria-live="polite"
                data-testid="consultation-feedback"
              >
                <p>{feedback.message}</p>
                {feedback.kind === 'success' && (
                  <p className="form-feedback__note">
                    Your enquiry has been sent for follow-up. No appointment has been confirmed or
                    reserved.
                  </p>
                )}
              </div>
            )}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              aria-busy={busy}
              aria-describedby="consultation-form-note"
              noValidate
              data-testid="consultation-form"
              data-state={busy ? 'loading' : feedback?.kind === 'error' ? 'error' : 'ready'}
            >
              <p id="consultation-form-note" className="form-note">
                Fields marked required help the practice respond. Please do not include urgent or
                sensitive clinical information.
              </p>

              <fieldset className="form-fields" disabled={busy} style={{ marginTop: '1rem' }}>
                <legend className="visually-hidden">Your contact details</legend>

                <div className="form-field">
                  <label htmlFor="consultation-name">
                    Your name <span>Required</span>
                  </label>
                  <input
                    id="consultation-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    required
                    value={values.name}
                    aria-invalid={fieldError('name') ? 'true' : undefined}
                    aria-describedby={describedBy('name', 'consultation-name-help')}
                    onChange={(event) => update('name', event.target.value)}
                    onBlur={() => markTouched('name')}
                  />
                  <small id="consultation-name-help">
                    Use the name you would like the practice to use.
                  </small>
                  {fieldError('name') && (
                    <p className="field-error" id="consultation-name-error">
                      {fieldError('name')}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="consultation-phone">
                    Phone number <span>Required</span>
                  </label>
                  <input
                    id="consultation-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={30}
                    required
                    value={values.phone}
                    aria-invalid={fieldError('phone') ? 'true' : undefined}
                    aria-describedby={describedBy('phone', 'consultation-phone-help')}
                    onChange={(event) => update('phone', event.target.value)}
                    onBlur={() => markTouched('phone')}
                  />
                  <small id="consultation-phone-help">Include your country code if needed.</small>
                  {fieldError('phone') && (
                    <p className="field-error" id="consultation-phone-error">
                      {fieldError('phone')}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="consultation-email">
                    Email address{' '}
                    <span>{emailRequired ? 'Required for email contact' : 'Optional'}</span>
                  </label>
                  <input
                    id="consultation-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={254}
                    required={emailRequired}
                    value={values.email}
                    aria-invalid={fieldError('email') ? 'true' : undefined}
                    aria-describedby={describedBy('email', 'consultation-email-help')}
                    onChange={(event) => update('email', event.target.value)}
                    onBlur={() => markTouched('email')}
                  />
                  <small id="consultation-email-help">
                    Add this if you prefer the practice to email you.
                  </small>
                  {fieldError('email') && (
                    <p className="field-error" id="consultation-email-error">
                      {fieldError('email')}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="consultation-treatment">
                    Treatment of interest <span>Optional</span>
                  </label>
                  <input
                    id="consultation-treatment"
                    name="treatmentOfInterest"
                    type="text"
                    maxLength={120}
                    autoComplete="off"
                    value={values.treatmentOfInterest}
                    aria-invalid={fieldError('treatmentOfInterest') ? 'true' : undefined}
                    aria-describedby={describedBy('treatmentOfInterest', 'consultation-treatment-help')}
                    onChange={(event) => update('treatmentOfInterest', event.target.value)}
                    onBlur={() => markTouched('treatmentOfInterest')}
                  />
                  <small id="consultation-treatment-help">
                    A short topic is enough. Please do not share medical history or symptoms.
                  </small>
                  {fieldError('treatmentOfInterest') && (
                    <p className="field-error" id="consultation-treatmentOfInterest-error">
                      {fieldError('treatmentOfInterest')}
                    </p>
                  )}
                </div>

                <fieldset
                  className="form-field"
                  aria-invalid={fieldError('preferredContactMethod') ? 'true' : undefined}
                  aria-describedby={
                    fieldError('preferredContactMethod')
                      ? 'consultation-preferredContactMethod-error'
                      : undefined
                  }
                >
                  <legend>
                    Preferred contact method <span>Required</span>
                  </legend>
                  <div className="radio-row">
                    {(['phone', 'whatsapp', 'email'] as const).map((method) => (
                      <label key={method}>
                        <input
                          type="radio"
                          name="preferredContactMethod"
                          value={method}
                          checked={values.preferredContactMethod === method}
                          onChange={() => {
                            update('preferredContactMethod', method)
                            markTouched('preferredContactMethod')
                          }}
                        />
                        <span>{method === 'whatsapp' ? 'WhatsApp' : method === 'phone' ? 'Phone' : 'Email'}</span>
                      </label>
                    ))}
                  </div>
                  {fieldError('preferredContactMethod') && (
                    <p className="field-error" id="consultation-preferredContactMethod-error">
                      {fieldError('preferredContactMethod')}
                    </p>
                  )}
                </fieldset>

                <div className="form-field">
                  <label htmlFor="consultation-time">
                    Preferred contact time <span>Optional</span>
                  </label>
                  <select
                    id="consultation-time"
                    name="preferredContactTime"
                    value={values.preferredContactTime}
                    onChange={(event) => update('preferredContactTime', event.target.value)}
                  >
                    <option value="">Choose a time (optional)</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="anytime">Any time</option>
                  </select>
                </div>
              </fieldset>

              <div className="honeypot" aria-hidden="true">
                <label htmlFor="consultation-website">Leave this field empty</label>
                <input
                  id="consultation-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(event) => update('website', event.target.value)}
                />
              </div>

              <div className="form-submit">
                <button className="btn btn--primary" type="submit" disabled={busy}>
                  {busy ? 'Sending request…' : 'Send consultation request'}
                  <ArrowUpRight size={16} />
                </button>
                <p>
                  Sending this form asks the practice to contact you. It does not confirm or reserve an
                  appointment.
                </p>
                <p>
                  Your details are sent securely to the practice for follow-up. See the{' '}
                  <Link to="/privacy" style={{ textDecoration: 'underline' }}>
                    privacy notice
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>

          <aside
            className="form-aside"
            aria-labelledby="consultation-aside-heading"
            data-reveal
            data-delay="1"
          >
            <span className="eyebrow">Prefer to reach out directly?</span>
            <h2 id="consultation-aside-heading">Choose the way that feels comfortable.</h2>
            <p>
              These contact options work independently of this form and remain available if the
              enquiry service is unavailable.
            </p>
            <ContactLinks contact={PRACTICE_CONFIG.contact} variant="stacked" />
            <p>
              The practice will contact you using the method you choose. Timing and next steps will be
              confirmed directly with you.
            </p>
            <Link className="link-arrow" to="/contact">
              More practice contact details <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
      </section>
       {/* Practice location */}
      <section className="section page-container">
        <PracticeMap />
      </section>
    </>
  )
}
