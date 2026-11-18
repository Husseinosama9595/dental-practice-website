export interface PracticeContact {
  phone: string
  email: string
  whatsapp: string
  address: string
  openingHours: string
  mapUrl: string
}

export interface PracticeConfig {
  name: string
  descriptor: string
  demoContent: boolean
  seo: { siteOrigin: string }
  contact: PracticeContact
}

export const PRACTICE_CONFIG: PracticeConfig = {
  name: '[PRACTICE NAME]',
  descriptor: 'INDEPENDENT DENTAL PRACTICE',
  demoContent: true,
  seo: { siteOrigin: '' },
  contact: {
    phone: '',
    email: '',
    whatsapp: '',
    address: '',
    openingHours: '',
    mapUrl: '',
  },
}

export interface ContentSection {
  heading: string
  body: string
}

export interface TreatmentContent {
  slug: string
  title: string
  summary: string
  sections: ContentSection[]
  published: boolean
}

export interface DentistContent {
  slug: string
  name: string
  role: string
  credentials: string[]
  biography: string
  approach: string
  published: boolean
}

export interface TeamMemberContent {
  id: string
  name: string
  role: string
  biography: string
  published: boolean
}

export interface FaqContent {
  question: string
  answer: string
  category: string
  approved?: boolean
}

export interface ArticleContent {
  slug: string
  title: string
  summary: string
  category: string
  body: ContentSection[]
  publishedAt?: string
  author?: string
  reviewer?: string
  published: boolean
}

export interface PatientInfoContent {
  slug: string
  title: string
  sections: ContentSection[]
}

export interface GalleryCaseContent {
  slug: string
  title: string
  treatment: string
  treatmentSlug: string
  summary: string
  caption: string
  beforeAlt: string
  afterAlt: string
  published: boolean
  consentVerified: boolean
  demoPlaceholder?: boolean
}

export interface PageMetadata {
  title: string
  description: string
}

const placeholderNotice =
  'Practice-approved content will be supplied and reviewed before this page is published.'

export const PUBLIC_CONTENT = {
  metadata: {
    about: {
      title: '[PRACTICE NAME] | About the practice',
      description:
        'Learn about [PRACTICE NAME]. Practice story, care approach, and team information will be supplied by the practice.',
    },
    treatments: {
      title: '[PRACTICE NAME] | Treatments',
      description:
        'Explore treatment information from [PRACTICE NAME]. Services and clinical details will be confirmed by the practice.',
    },
    treatment: {
      title: '[TREATMENT NAME] | [PRACTICE NAME]',
      description:
        'Practice-reviewed information about [TREATMENT NAME] will be supplied by [PRACTICE NAME].',
    },
    dentist: {
      title: '[DENTIST NAME] | [PRACTICE NAME]',
      description:
        'Meet the practitioner at [PRACTICE NAME]. Verified profile information will be supplied by the practice.',
    },
    team: {
      title: '[PRACTICE NAME] | Our team',
      description:
        'Meet the team at [PRACTICE NAME]. Team profiles will appear when approved by the practice.',
    },
    patientInformation: {
      title: '[PRACTICE NAME] | Patient information',
      description:
        'Practical patient information from [PRACTICE NAME]. Visit details and guidance will be supplied by the practice.',
    },
    faqs: {
      title: '[PRACTICE NAME] | Frequently asked questions',
      description:
        'Answers to common questions will be supplied and reviewed by [PRACTICE NAME].',
    },
    reviews: {
      title: '[PRACTICE NAME] | Patient reviews',
      description:
        'Patient reviews will appear here only after they are supplied, approved, and cleared for publication.',
    },
    journal: {
      title: '[PRACTICE NAME] | Journal',
      description:
        'Read articles from [PRACTICE NAME]. Journal content is locally maintained and reviewed by the practice.',
    },
    article: {
      title: '[ARTICLE TITLE] | [PRACTICE NAME]',
      description: 'A practice-reviewed journal article from [PRACTICE NAME].',
    },
    contact: {
      title: '[PRACTICE NAME] | Contact',
      description:
        'Contact [PRACTICE NAME] by telephone, WhatsApp, or email. Practice location and hours will be supplied.',
    },
    gallery: {
      title: '[PRACTICE NAME] | Smile gallery',
      description:
        'Explore approved treatment case photography from [PRACTICE NAME]. Images and captions are supplied by the practice with documented consent.',
    },
    caseStudy: {
      title: '[CASE TITLE] | [PRACTICE NAME]',
      description:
        'Practice-approved case photography and context from [PRACTICE NAME]. Individual outcomes vary.',
    },
    consultation: {
      title: '[PRACTICE NAME] | Request a consultation',
      description:
        'Send a consultation request to [PRACTICE NAME]. The request asks the practice to follow up and does not confirm an appointment.',
    },
    privacy: {
      title: '[PRACTICE NAME] | Privacy policy',
      description:
        'Privacy information for [PRACTICE NAME]. This customer-specific policy requires legal review before launch.',
    },
    cookies: {
      title: '[PRACTICE NAME] | Cookie policy',
      description:
        'Cookie information for [PRACTICE NAME]. This policy will reflect the configured site integrations.',
    },
    terms: {
      title: '[PRACTICE NAME] | Terms of use',
      description:
        'Terms information for [PRACTICE NAME]. Customer-specific terms require review before launch.',
    },
    notFound: {
      title: '[PRACTICE NAME] | Page not found',
      description:
        'The requested page could not be found. Browse the practice website or contact the practice.',
    },
  },
  about: [
    {
      heading: 'The practice story',
      body: '[Practice history and the people behind the practice — to be supplied.]',
    },
    {
      heading: 'How care is approached',
      body: '[The practice’s approved description of its care approach — to be supplied.]',
    },
    {
      heading: 'The clinic experience',
      body: '[Verified information about the clinic, facilities, and accessibility — to be supplied.]',
    },
  ] as ContentSection[],
  treatments: [
    {
      slug: 'treatment-placeholder',
      title: '[TREATMENT NAME]',
      summary: '[Practice-approved treatment summary to be supplied.]',
      sections: [
        { heading: 'Overview', body: placeholderNotice },
        {
          heading: 'What to expect',
          body: '[Treatment process and options will be described by the practice.]',
        },
        {
          heading: 'Aftercare',
          body: '[Aftercare guidance will be supplied and reviewed by the practice.]',
        },
      ],
      published: false,
    },
  ] as TreatmentContent[],
  dentist: [
    {
      slug: 'dentist-placeholder',
      name: '[DENTIST NAME]',
      role: '[VERIFIED ROLE TO BE SUPPLIED]',
      credentials: [],
      biography: '[Verified practitioner biography to be supplied by the practice.]',
      approach:
        '[The practitioner’s approved description of their approach to care — to be supplied.]',
      published: false,
    },
  ] as DentistContent[],
  team: [] as TeamMemberContent[],
  faqs: [
    {
      question: '[PRACTICE-APPROVED QUESTION]',
      answer: '[Practice-reviewed answer to be supplied.]',
      category: 'General',
      approved: false,
    },
    {
      question: '[PRACTICE-APPROVED QUESTION]',
      answer: '[Practice-reviewed answer to be supplied.]',
      category: 'General',
      approved: false,
    },
  ] as FaqContent[],
  testimonials: [] as { quote: string; attribution?: string; approved: boolean }[],
  articles: [
    {
      slug: 'article-placeholder',
      title: '[ARTICLE TITLE TO BE SUPPLIED]',
      summary: '[Practice-approved article summary to be supplied.]',
      category: '[CATEGORY]',
      body: [
        { heading: 'Article content', body: '[Article text to be supplied and reviewed by the practice.]' },
      ],
      published: false,
    },
  ] as ArticleContent[],
  patientInformation: [
    {
      slug: 'first-visit',
      title: 'Your first visit',
      sections: [
        { heading: 'What to expect', body: '[First-visit information will be supplied by the practice.]' },
      ],
    },
    {
      slug: 'accessibility',
      title: 'Accessibility',
      sections: [
        {
          heading: 'Access information',
          body: '[Verified clinic accessibility information will be supplied by the practice.]',
        },
      ],
    },
    {
      slug: 'payment-and-finance',
      title: 'Payment and finance',
      sections: [
        {
          heading: 'Payment information',
          body: '[Payment and finance information, if offered, will be confirmed by the practice.]',
        },
      ],
    },
    {
      slug: 'aftercare',
      title: 'Aftercare',
      sections: [
        {
          heading: 'Practice-reviewed guidance',
          body: '[Aftercare content will be supplied and reviewed by the practice. This page does not provide personalized clinical advice.]',
        },
      ],
    },
  ] as PatientInfoContent[],
  gallery: [
    {
      slug: 'case-placeholder',
      title: '[CASE TITLE TO BE SUPPLIED]',
      treatment: '[TREATMENT CATEGORY TO BE SUPPLIED]',
      treatmentSlug: 'treatment-placeholder',
      summary:
        'Practice-approved case context and image captions will be supplied here. No patient images or treatment outcomes are represented in this preview.',
      caption:
        'Layout preview only. Practice-supplied images require documented patient consent and approval before publication.',
      beforeAlt: 'Placeholder for a practice-approved before photograph; no patient image supplied.',
      afterAlt: 'Placeholder for a practice-approved after photograph; no patient image supplied.',
      published: false,
      consentVerified: false,
      demoPlaceholder: true,
    },
  ] as GalleryCaseContent[],
}

export const HOME_CONTENT = {
  hero: {
    eyebrow: 'A dental practice, with room for conversation',
    titleLead: 'A more considered',
    titleEmphasis: 'kind of care.',
    introduction:
      'Explore a practice built around thoughtful conversations, clear information and care shaped around the person in the chair.',
  },
  treatments: [
    { label: '[TREATMENT NAME]', summary: '[Short practice-approved description]' },
    { label: '[TREATMENT NAME]', summary: '[Short practice-approved description]' },
    { label: '[TREATMENT NAME]', summary: '[Short practice-approved description]' },
  ],
  journey: [
    {
      number: '01',
      title: 'A conversation',
      detail: '[What a first visit is like — practice content to be supplied.]',
    },
    {
      number: '02',
      title: 'Clear options',
      detail: '[How options are discussed — practice content to be supplied.]',
    },
    {
      number: '03',
      title: 'Your next step',
      detail: '[How follow-up works — practice content to be supplied.]',
    },
  ],
  questions: [
    {
      question: '[Practice-approved question]',
      answer: '[Practice-approved answer will appear here.]',
    },
    {
      question: '[Practice-approved question]',
      answer: '[Practice-approved answer will appear here.]',
    },
  ],
  journal: [
    {
      category: '[CATEGORY]',
      title: '[Article title supplied by the practice]',
      summary: '[Article summary placeholder]',
    },
    {
      category: '[CATEGORY]',
      title: '[Article title supplied by the practice]',
      summary: '[Article summary placeholder]',
    },
  ],
}

export const visibleTreatments = PUBLIC_CONTENT.treatments.filter(
  (item) => item.published || PRACTICE_CONFIG.demoContent,
)
export const visibleArticles = PUBLIC_CONTENT.articles.filter(
  (item) => item.published || PRACTICE_CONFIG.demoContent,
)
export const visibleTeam = PUBLIC_CONTENT.team.filter((member) => member.published)
export const visibleReviews = PUBLIC_CONTENT.testimonials.filter((review) => review.approved)
export const visibleFaqs = PUBLIC_CONTENT.faqs.filter(
  (faq) => PRACTICE_CONFIG.demoContent || faq.approved === true,
)
export const visibleGalleryCases = PUBLIC_CONTENT.gallery.filter(
  (item) => (item.published && item.consentVerified) || (PRACTICE_CONFIG.demoContent && item.demoPlaceholder),
)
