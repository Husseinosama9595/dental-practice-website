import { Link } from '@tanstack/react-router'
import {
  PRACTICE_CONFIG,
  PUBLIC_CONTENT,
  visibleArticles,
  visibleFaqs,
  visibleReviews,
  visibleTeam,
  visibleTreatments,
  type ArticleContent,
  type ContentSection,
  type DentistContent,
  type PatientInfoContent,
  type TreatmentContent,
} from './content'
import { PracticeMap } from '../components/PracticeMap'
import {
  ArrowRight,
  ArrowUpRight,
  ClockIcon,
  ContactLinks,
  HeartIcon,
  Media,
  Placeholder,
  ShieldIcon,
  SparkIcon,
  ToothIcon,
} from './components'
import type { ImageKey } from './images'

export type PageId =
  | 'about'
  | 'dentist'
  | 'team'
  | 'treatments'
  | 'treatment'
  | 'patientInformation'
  | 'faqs'
  | 'reviews'
  | 'journal'
  | 'article'
  | 'contact'
  | 'privacy'
  | 'cookies'
  | 'terms'
  | 'notFound'

export interface PageView {
  id: PageId
  eyebrow: string
  title: string
  intro: string
  metaDescription?: string
  sections: ContentSection[]
  isPlaceholder?: boolean
  treatment?: TreatmentContent
  patientSections?: PatientInfoContent[]
  article?: ArticleContent
  dentist?: DentistContent
  relatedTreatments?: TreatmentContent[]
}

function containsPlaceholder(...values: string[]): boolean {
  return values.some((value) => /\[[^\]]+\]|to be supplied|will be supplied|placeholder/i.test(value))
}

function notFoundPage(): PageView {
  return {
    id: 'notFound',
    eyebrow: '404 · page not found',
    title: 'This page is not here.',
    intro: 'The address may have changed. Return to the homepage or contact the practice for help.',
    sections: [],
  }
}

export function resolvePage(id: PageId, slug = ''): PageView {
  const publishedDentists = PUBLIC_CONTENT.dentist.filter(
    (item) => item.published || PRACTICE_CONFIG.demoContent,
  )

  switch (id) {
    case 'about': {
      const aboutPlaceholder = PUBLIC_CONTENT.about.some((section) =>
        containsPlaceholder(section.heading, section.body),
      )
      return {
        id,
        eyebrow: 'The practice · introduction',
        title: 'A little about the practice.',
        intro:
          'The people, place and approach behind [PRACTICE NAME]. Practice-approved details will appear here when supplied.',
        metaDescription: PUBLIC_CONTENT.about.map((section) => section.body).join(' ').slice(0, 300),
        sections: PUBLIC_CONTENT.about,
        isPlaceholder: aboutPlaceholder,
      }
    }
    case 'dentist': {
      const dentist = publishedDentists.find((item) => item.slug === slug)
      return dentist
        ? {
            id,
            eyebrow: 'Meet the practitioner',
            title: dentist.name,
            intro: dentist.role,
            metaDescription: dentist.biography.slice(0, 300),
            sections: [
              { heading: 'About', body: dentist.biography },
              { heading: 'Approach to care', body: dentist.approach },
              ...(dentist.credentials.length
                ? [{ heading: 'Verified qualifications', body: dentist.credentials.join(' · ') }]
                : []),
            ],
            dentist,
            isPlaceholder: !dentist.published,
          }
        : notFoundPage()
    }
    case 'team':
      return {
        id,
        eyebrow: 'The people at the practice',
        title: 'The team behind your visit.',
        intro:
          'Team profiles are added only when the practice supplies and approves names, roles and biographies.',
        sections: [],
        isPlaceholder: PUBLIC_CONTENT.team.every((member) => !member.published),
      }
    case 'treatments':
      return {
        id,
        eyebrow: 'Treatment information',
        title: 'Explore the possibilities.',
        intro:
          'Treatment descriptions and clinical details are supplied and reviewed by the practice. No treatment is right for everyone.',
        sections: [],
        isPlaceholder: visibleTreatments.every((item) => !item.published),
      }
    case 'treatment': {
      const treatment = visibleTreatments.find((item) => item.slug === slug)
      return treatment
        ? {
            id,
            eyebrow: 'Treatment · practice information',
            title: treatment.title,
            intro: treatment.summary,
            sections: treatment.sections,
            treatment,
            relatedTreatments: visibleTreatments.filter((item) => item.slug !== treatment.slug),
            isPlaceholder: !treatment.published,
          }
        : notFoundPage()
    }
    case 'patientInformation':
      return {
        id,
        eyebrow: 'A clearer first step',
        title: 'Patient information.',
        intro:
          'Practical details about visits, access, payment and aftercare will be supplied by the practice.',
        sections: [],
        patientSections: PUBLIC_CONTENT.patientInformation,
        isPlaceholder: true,
      }
    case 'faqs':
      return {
        id,
        eyebrow: 'Good questions are welcome',
        title: 'A few things you may be wondering.',
        intro: 'Answers are added only after they have been reviewed and approved by the practice.',
        sections: [],
        isPlaceholder: visibleFaqs.length === 0,
      }
    case 'reviews':
      return {
        id,
        eyebrow: 'Patient voices',
        title: 'Reviews, in their own words.',
        intro:
          'Only reviews supplied by the practice with permission and accurate attribution will be shown here.',
        sections: [],
        isPlaceholder: !visibleReviews.length,
      }
    case 'journal':
      return {
        id,
        eyebrow: 'The journal · local content',
        title: 'Thoughts worth taking with you.',
        intro:
          'Articles are maintained as local typed content and reviewed by the practice before publication.',
        sections: [],
        isPlaceholder: visibleArticles.every((item) => !item.published),
      }
    case 'article': {
      const article = visibleArticles.find((item) => item.slug === slug)
      return article
        ? {
            id,
            eyebrow: article.category,
            title: article.title,
            intro: article.summary,
            metaDescription: article.summary,
            sections: article.body,
            article,
            isPlaceholder: !article.published,
          }
        : notFoundPage()
    }
    case 'contact':
      return {
        id,
        eyebrow: 'The next step is yours',
        title: 'A conversation can start anywhere.',
        intro:
          'Choose the way that feels comfortable. Telephone, WhatsApp and email work independently of any consultation form.',
        metaDescription: [
          PRACTICE_CONFIG.name,
          PRACTICE_CONFIG.contact.address,
          PRACTICE_CONFIG.contact.phone && `Telephone ${PRACTICE_CONFIG.contact.phone}`,
        ]
          .filter(Boolean)
          .join(' · '),
        sections: [],
        isPlaceholder: true,
      }
    case 'privacy':
    case 'cookies':
    case 'terms': {
      const content: Record<'privacy' | 'cookies' | 'terms', { eyebrow: string; title: string; intro: string }> = {
        privacy: {
          eyebrow: 'Legal information · placeholder',
          title: 'Privacy policy.',
          intro:
            'This is a customer-specific legal placeholder, not a final privacy policy. It must be completed and reviewed for the practice’s jurisdiction before launch.',
        },
        cookies: {
          eyebrow: 'Legal information · placeholder',
          title: 'Cookie policy.',
          intro:
            'This page must be updated to describe the cookies and integrations actually configured for the practice website.',
        },
        terms: {
          eyebrow: 'Legal information · placeholder',
          title: 'Terms of use.',
          intro:
            'This is a placeholder for terms prepared and reviewed for the practice. It is not intended to create final legal terms.',
        },
      }
      return { id, ...content[id], sections: [], isPlaceholder: true }
    }
    default:
      return notFoundPage()
  }
}

const HERO_IMAGES: Partial<Record<PageId, { image: ImageKey; alt: string }>> = {
  about: {
    image: 'lounge',
    alt: 'Quiet lounge area inside the dental practice with soft seating and daylight',
  },
  treatments: {
    image: 'treatmentRoom',
    alt: 'Modern dental treatment room with oak cabinetry and a sage upholstered chair',
  },
  treatment: {
    image: 'aligners',
    alt: 'Clear dental aligner trays and a mirror arranged on cream linen',
  },
  journal: {
    image: 'smile',
    alt: 'Editorial close-up of a natural smile in warm studio light',
  },
  article: {
    image: 'aligners',
    alt: 'Editorial still life supporting a practice journal article',
  },
  faqs: {
    image: 'reception',
    alt: 'Warm practice reception with oak joinery, planting and soft seating',
  },
  reviews: {
    image: 'smile',
    alt: 'Editorial close-up of a natural smile in warm studio light',
  },
  patientInformation: {
    image: 'lounge',
    alt: 'Calm practice waiting area detail with cream upholstery',
  },
}

function PageHero({ page }: { page: PageView }) {
  const media = HERO_IMAGES[page.id]

  return (
    <header className={media ? 'page-hero page-container' : 'page-hero page-hero--no-media page-container'}>
      <div className="page-hero__copy" data-reveal>
        <span className="eyebrow">{page.eyebrow}</span>
        <h1>{page.title}</h1>
        <p className="lede">{page.intro}</p>
        {page.id !== 'notFound' && (
          <div className="page-hero__actions">
            <Link className="btn btn--primary" to="/consultation">
              Request a consultation <ArrowUpRight size={16} />
            </Link>
            <Link className="btn btn--ghost" to="/contact">
              Contact the practice <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
      {media && (
        <div className="page-hero__visual" data-reveal="image" data-delay="1">
          <Media image={media.image} alt={media.alt} ratio="landscape" priority />
        </div>
      )}
    </header>
  )
}

function PageBody({ page }: { page: PageView }) {
  switch (page.id) {
    case 'about':
      return (
        <>
          <section className="section page-container" aria-label="About the practice">
            <div className="chapter-list">
              {page.sections.map((section, index) => (
                <article className="chapter" key={section.heading} data-reveal>
                  <span className="chapter__num">0{index + 1}</span>
                  <h3>{section.heading}</h3>
                  <p>{section.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section section--tight page-container" aria-labelledby="about-practitioner">
            <div className="split">
              <div className="split__copy" data-reveal>
                <span className="eyebrow">A familiar face</span>
                <h2 id="about-practitioner">Meet the practitioner.</h2>
                <p className="lede">
                  Verified profile information, qualifications and approach to care will be added when
                  supplied by the practice.
                </p>
                <Link className="link-arrow" to="/about/dentist/$slug" params={{ slug: 'dentist-placeholder' }}>
                  Read the practitioner profile <ArrowRight size={15} />
                </Link>
              </div>
              <div className="split__media" data-reveal="image" data-delay="1">
                <Placeholder label="Practitioner portrait to be supplied" note="Verified profile required" />
              </div>
            </div>
          </section>

          <section className="section section--tight page-container" aria-labelledby="about-team">
            <div className="split split--reverse">
              <div className="split__copy" data-reveal>
                <span className="eyebrow">The people behind your visit</span>
                <h2 id="about-team">The practice team.</h2>
                <p className="lede">
                  Team members appear here only when the practice supplies and approves names, roles
                  and biographies.
                </p>
                <Link className="link-arrow" to="/about/team">
                  Explore the team <ArrowRight size={15} />
                </Link>
              </div>
              <div className="split__media" data-reveal="image" data-delay="1">
                <Media
                  image="instruments"
                  alt="Dental instruments arranged on a cream stone tray in soft daylight"
                  ratio="landscape"
                />
              </div>
            </div>
          </section>
        </>
      )

    case 'dentist':
      return (
        <>
          <section className="section page-container" aria-label="Practitioner profile">
            <div className="chapter-list">
              {page.sections.map((section, index) => (
                <article className="chapter" key={section.heading} data-reveal>
                  <span className="chapter__num">0{index + 1}</span>
                  <h3>{section.heading}</h3>
                  <p>{section.body}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="section section--tight page-container">
            <div className="card" data-reveal>
              <span className="card__index">Direct contact</span>
              <h3>Speak with the practice</h3>
              <ContactLinks contact={PRACTICE_CONFIG.contact} />
            </div>
          </section>
        </>
      )

    case 'team':
      return (
        <section className="section page-container" aria-label="Practice team">
          {visibleTeam.length > 0 ? (
            <div className="team-grid">
              {visibleTeam.map((member) => (
                <article className="team-card" key={member.id}>
                  <Placeholder label={`${member.name} portrait to be supplied`} />
                  <div className="team-card__body">
                    <span>{member.role}</span>
                    <h3>{member.name}</h3>
                    <p>{member.biography}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="card-grid">
              {[
                { label: 'Dentist portrait to be supplied', role: 'Dentist', name: '[DENTIST NAME]' },
                { label: 'Team photograph to be supplied', role: 'Team', name: '[TEAM MEMBER]' },
                { label: 'Team photograph to be supplied', role: 'Team', name: '[TEAM MEMBER]' },
              ].map((item, index) => (
                <article className="team-card" key={index}>
                  <Placeholder label={item.label} note="Practice-approved image" />
                  <div className="team-card__body">
                    <span>{item.role}</span>
                    <h3>{item.name}</h3>
                    <p>[Verified role and biography will be supplied by the practice.]</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )

    case 'treatments':
      return (
        <>
          <section className="section page-container" aria-label="Practice treatments">
            <div className="treatment-grid">
              {visibleTreatments.map((treatment, index) => (
                <Link
                  className="treatment-card"
                  key={treatment.slug}
                  to="/treatments/$slug"
                  params={{ slug: treatment.slug }}
                  data-reveal="image"
                  data-delay={String((index % 6) + 1)}
                >
                  <Media
                    image="aligners"
                    alt="Treatment imagery supplied by the practice"
                    ratio="landscape"
                  />
                  <div className="treatment-card__body">
                    <h3>{treatment.title}</h3>
                    <p>{treatment.summary}</p>
                    <div className="treatment-card__foot">
                      <span>Practice information</span>
                      <span className="treatment-card__arrow">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <p className="lede" style={{ marginTop: '2rem' }}>
              General website information cannot determine whether a treatment is suitable for an
              individual. Please contact the practice to discuss your questions.
            </p>
          </section>
        </>
      )

    case 'treatment':
      return (
        <>
          <section className="section page-container" aria-label="Treatment information">
            <div className="split">
              <div className="split__copy" data-reveal>
                <span className="eyebrow">An overview</span>
                <h2>Clear information, before a decision.</h2>
                <p className="lede">{page.intro}</p>
                <div className="card">
                  <span className="card__index">What happens next</span>
                  <p>
                    Suitability, options and costs are discussed with the practice. No outcome is
                    promised on this page.
                  </p>
                  <Link className="link-arrow" to="/consultation">
                    Request a consultation <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
              <div className="split__media" data-reveal="image" data-delay="1">
                <Media
                  image="treatmentRoom"
                  alt="Treatment room prepared for a patient appointment"
                  ratio="portrait"
                />
              </div>
            </div>
          </section>

          <section className="section section--tight page-container" aria-labelledby="treatment-detail">
            <h2 className="visually-hidden" id="treatment-detail">
              Treatment detail
            </h2>
            <div className="chapter-list">
              {page.sections.map((section, index) => (
                <article className="chapter" key={section.heading} data-reveal>
                  <span className="chapter__num">0{index + 1}</span>
                  <h3>{section.heading}</h3>
                  <p>{section.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section section--tight page-container" aria-label="Benefits and questions">
            <div className="card-grid">
              <article className="card" data-reveal>
                <span className="card__index">Benefits</span>
                <h3>What patients value</h3>
                <p>[Practice-approved benefits for this treatment will be supplied.]</p>
              </article>
              <article className="card" data-reveal>
                <span className="card__index">Appointments</span>
                <h3>Time and visits</h3>
                <p>[Number of visits, appointment length and aftercare to be confirmed.]</p>
              </article>
              <article className="card" data-reveal>
                <span className="card__index">Questions</span>
                <h3>Common questions</h3>
                <p>[Treatment-specific questions and answers will be reviewed by the practice.]</p>
                <Link className="link-arrow" to="/faqs">
                  All FAQs <ArrowRight size={15} />
                </Link>
              </article>
            </div>
          </section>

          {page.relatedTreatments && page.relatedTreatments.length > 0 && (
            <section className="section section--tight page-container" aria-label="Related treatments">
              <span className="eyebrow">Continue exploring</span>
              <div className="row-list" style={{ marginTop: '1rem' }}>
                {page.relatedTreatments.map((treatment, index) => (
                  <Link
                    className="row"
                    key={treatment.slug}
                    to="/treatments/$slug"
                    params={{ slug: treatment.slug }}
                  >
                    <span className="row__num">0{index + 1}</span>
                    <span className="row__copy">
                      <strong>{treatment.title}</strong>
                      <small>{treatment.summary}</small>
                    </span>
                    <ArrowUpRight size={17} />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )

    case 'patientInformation':
      return (
        <section className="section page-container">
          <div className="info-layout">
            <nav className="info-nav" aria-label="On this page">
              <span className="eyebrow">On this page</span>
              {(page.patientSections ?? []).map((item, index) => (
                <a href={`#info-${item.slug}`} key={item.slug}>
                  <span>0{index + 1}</span>
                  {item.title}
                </a>
              ))}
            </nav>
            <div className="info-sections">
              {(page.patientSections ?? []).map((item, index) => (
                <section
                  className="info-section"
                  id={`info-${item.slug}`}
                  key={item.slug}
                  data-reveal
                >
                  <span className="chapter__num">0{index + 1}</span>
                  <h2>{item.title}</h2>
                  {item.sections.map((section) => (
                    <div key={section.heading}>
                      <h3>{section.heading}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                  {item.slug === 'aftercare' && (
                    <p>
                      This is not personalized clinical advice. Contact the practice for guidance about
                      your own care.
                    </p>
                  )}
                </section>
              ))}
              <Link className="link-arrow" to="/faqs">
                Read frequently asked questions <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      )

    case 'faqs':
      return (
        <section className="section page-container">
          <div className="info-layout">
            <div className="info-nav">
              <span className="eyebrow">Answers from the practice</span>
              <p>
                Questions and answers are placeholders until reviewed and approved by the practice.
              </p>
              <Link className="link-arrow" to="/contact">
                Ask the practice <ArrowRight size={15} />
              </Link>
            </div>
            <div className="faq-list">
              {visibleFaqs.map((faq, index) => (
                <details
                  className="faq"
                  key={`${faq.question}-${index}`}
                  data-reveal
                  data-delay={String((index % 6) + 1)}
                >
                  <summary>
                    <span className="faq__num">0{index + 1}</span>
                    <span>{faq.question}</span>
                    <span className="faq__plus" aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )

    case 'reviews':
      return (
        <section className="section page-container" aria-label="Patient reviews">
          <div className="review-grid">
            {[0, 1, 2].map((index) => (
              <figure className="review-card" key={index} data-reveal data-delay={String(index + 1)}>
                <span className="review-card__mark" aria-hidden="true">
                  “
                </span>
                <p>[APPROVED PATIENT TESTIMONIAL WILL APPEAR HERE]</p>
                <span>Awaiting practice approval</span>
              </figure>
            ))}
          </div>
          <p className="lede" style={{ marginTop: '2rem' }}>
            No ratings, reviews or patient experiences are represented in this demo. Approved reviews
            with accurate attribution will appear here when supplied.
          </p>
        </section>
      )

    case 'journal':
      return (
        <section className="section page-container" aria-label="Journal articles">
          <div className="journal-grid">
            {visibleArticles.map((article, index) => (
              <article
                className="journal-card"
                key={article.slug}
                data-reveal
                data-delay={String((index % 6) + 1)}
              >
                <Link to="/journal/$slug" params={{ slug: article.slug }}>
                  <Media
                    image={index % 2 === 0 ? 'smile' : 'aligners'}
                    alt="Editorial image supporting a practice journal article"
                    ratio="landscape"
                  />
                </Link>
                <div className="journal-card__meta">{article.category}</div>
                <h3>
                  <Link to="/journal/$slug" params={{ slug: article.slug }}>
                    {article.title}
                  </Link>
                </h3>
                <p>{article.summary}</p>
                <Link className="link-arrow" to="/journal/$slug" params={{ slug: article.slug }}>
                  Read article <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      )

    case 'article':
      return (
        <section className="section page-container">
          <div className="info-layout">
            <div className="info-nav">
              <span className="eyebrow">In this article</span>
              {page.sections.map((section, index) => (
                <span key={section.heading}>
                  <span>0{index + 1}</span> {section.heading}
                </span>
              ))}
              <Link className="link-arrow" to="/journal">
                Back to the journal <ArrowRight size={15} />
              </Link>
            </div>
            <div className="prose">
              {page.sections.map((section) => (
                <div key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 'contact':
      return (
        <>
          <section className="section page-container">
            <div className="form-layout">
              <div className="stack" data-reveal>
                <span className="eyebrow">Choose how to reach us</span>
                <h2>Three direct ways to get in touch.</h2>
                <p className="lede">
                  These links open your preferred phone, WhatsApp or email app. They remain available
                  independently of any consultation enquiry form.
                </p>
                <ContactLinks contact={PRACTICE_CONFIG.contact} variant="stacked" />
                <div className="hero__actions">
                  <Link className="btn btn--primary" to="/consultation">
                    Request a consultation <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="form-aside" data-reveal data-delay="1">
                <span className="eyebrow">Visit the practice</span>
                <h2>Location and hours.</h2>
                <dl className="stack stack--sm">
                  <div>
                    <dt className="eyebrow">Address</dt>
                    <dd>{PRACTICE_CONFIG.contact.address || '[CLINIC ADDRESS · TO BE SUPPLIED]'}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Opening hours</dt>
                    <dd>
                      {PRACTICE_CONFIG.contact.openingHours || '[OPENING HOURS · TO BE SUPPLIED]'}
                    </dd>
                  </div>
                </dl>
                <p>
                  For urgent dental concerns, contact the practice directly using the available
                  telephone details. Do not send sensitive clinical information through general website
                  forms.
                </p>
              </div>
            </div>
          </section>
            {/* GOOGLE MAP SECTION */}
      <section className="section page-container">
        <PracticeMap />
      </section>
      
          <section className="section section--tight page-container">
            <Media
              image="reception"
              alt="Practice reception with oak joinery, planting and soft seating"
              ratio="wide"
            />
          </section>
        </>
      )

    case 'privacy':
    case 'cookies':
    case 'terms': {
      const copy: Record<string, { warning: string; heading: string; body: string[] }> = {
        privacy: {
          warning: 'Customer and legal review required before launch',
          heading: 'Policy details to be completed',
          body: [
            'The final policy must identify the practice’s data controller, explain the information collected through the site and consultation enquiry, state the lawful basis and recipients, define retention, explain user rights, and provide the correct contact details for the relevant jurisdiction.',
            'No jurisdiction-specific legal terms are asserted in this placeholder.',
          ],
        },
        cookies: {
          warning: 'Customer review required before launch',
          heading: 'Configured cookies and choices',
          body: [
            'List only cookies and integrations actually used by the deployed website, with their purpose, provider, duration and the choices available to visitors.',
            'No analytics or marketing cookies are configured by this placeholder page.',
          ],
        },
        terms: {
          warning: 'Customer and legal review required before launch',
          heading: 'Terms to be prepared',
          body: [
            'Customer-specific terms must be reviewed for the practice’s jurisdiction. General website information is not a diagnosis or personalized treatment recommendation; individual care questions should be discussed with the practice.',
            'This placeholder does not constitute final terms of use.',
          ],
        },
      }
      const entry = copy[page.id]
      return (
        <section className="section page-container">
          <div className="legal" data-reveal>
            <span className="legal__warning">
              <ShieldIcon size={14} /> {entry.warning}
            </span>
            <h2>{entry.heading}</h2>
            {entry.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      )
    }

    default:
      return (
        <section className="section page-container">
          <div className="card-grid card-grid--2">
            <article className="card" data-reveal>
              <span className="card__index">Start again</span>
              <h3>Return to the homepage</h3>
              <p>The address may have changed, or the page may no longer be available.</p>
              <Link className="link-arrow" to="/">
                Homepage <ArrowRight size={15} />
              </Link>
            </article>
            <article className="card" data-reveal data-delay="1">
              <span className="card__index">Still stuck?</span>
              <h3>Contact the practice</h3>
              <p>Direct contact options remain available if you cannot find what you need.</p>
              <Link className="link-arrow" to="/contact">
                Contact the practice <ArrowRight size={15} />
              </Link>
            </article>
          </div>
        </section>
      )
  }
}

export function PublicPage({ pageId, slug = '' }: { pageId: PageId; slug?: string }) {
  const page = resolvePage(pageId, slug)
  const showClosing = !['contact', 'privacy', 'cookies', 'terms', 'notFound'].includes(page.id)

  return (
    <>
      <nav className="crumbs page-container" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ArrowRight size={12} />
        <span aria-current="page">{page.title}</span>
      </nav>

      <PageHero page={page} />
      <PageBody page={page} />

      {showClosing && (
        <section className="section page-container" aria-label="Contact invitation">
          <div className="cta-band">
            <div>
              <span className="eyebrow">A place to begin</span>
              <h2>Questions are a good place to start.</h2>
              <p>
                Share a few details and the practice can follow up using your preferred contact
                method.
              </p>
            </div>
            <Link className="btn btn--light" to="/consultation">
              Request a consultation <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {page.isPlaceholder && showClosing && (
        <p className="page-container" style={{ paddingBottom: '2rem' }}>
          <span className="eyebrow">
            <ToothIcon size={13} /> Placeholder content
          </span>
        </p>
      )}
    </>
  )
}

export { HeartIcon, ClockIcon, SparkIcon }
