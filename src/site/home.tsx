import { Link } from '@tanstack/react-router'
import { HOME_CONTENT, PRACTICE_CONFIG, visibleTreatments } from './content'
import {
  ArrowRight,
  ArrowUpRight,
  ClockIcon,
  Comparison,
  ContactLinks,
  HeartIcon,
  Media,
  Placeholder,
  ShieldIcon,
  SparkIcon,
} from './components'

const TREATMENT_IMAGES = ['aligners', 'treatmentRoom', 'instruments'] as const

const VALUES = [
  {
    icon: <SparkIcon />,
    title: 'Considered care',
    body: '[The practice’s approved description of its care approach will appear here.]',
  },
  {
    icon: <HeartIcon />,
    title: 'Time to talk',
    body: '[How appointments are structured and what patients can expect, supplied by the practice.]',
  },
  {
    icon: <ShieldIcon />,
    title: 'Clear information',
    body: '[Treatment information, options and costs will be reviewed and approved by the practice.]',
  },
  {
    icon: <ClockIcon />,
    title: 'Easy to reach',
    body: '[Practice opening hours, contact details and appointment availability to be supplied.]',
  },
]

const STATS = [
  { value: '[YEARS]', label: 'Years serving the local community · practice detail to be supplied' },
  { value: '[TEAM]', label: 'Clinicians and support team · practice detail to be supplied' },
  { value: '[RATING]', label: 'Patient rating from a verified review source · to be supplied' },
]

export function HomePage() {
  const content = HOME_CONTENT

  return (
    <div className="home-page">
      <section className="hero page-container" aria-labelledby="hero-title">
        <div className="hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Independent dental practice</span>
            <h1 id="hero-title" data-reveal data-delay="1">
              Dentistry that feels <em>considered.</em>
            </h1>
            <p className="hero__intro" data-reveal data-delay="2">
              A calm, modern practice built around conversation, clear information and care shaped
              around the person in the chair. Practice details are placeholders until supplied.
            </p>
            <div className="hero__actions" data-reveal data-delay="3">
              <Link className="btn btn--primary" to="/consultation">
                Book a consultation
                <ArrowUpRight size={16} />
              </Link>
              <Link className="btn btn--ghost" to="/treatments">
                Explore treatments
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero__badges" data-reveal="fade" data-delay="4">
              <span className="hero__badge">
                <ShieldIcon size={16} /> Practice-approved information
              </span>
              <span className="hero__badge">
                <ClockIcon size={16} /> Direct contact options
              </span>
            </div>
          </div>

          <div className="hero__visual" data-reveal="image" data-delay="2">
            <Media
              image="reception"
              alt="Calm, light-filled dental practice reception with oak joinery and soft seating"
              ratio="portrait"
              priority
            />
            <div className="hero__card">
              <strong>New patients welcome</strong>
              <span>
                Consultation requests are answered directly by the practice. [Opening hours to be
                supplied.]
              </span>
              <Link className="link-arrow" to="/contact">
                Contact the practice <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="values-title">
        <div className="page-container">
          <h2 className="visually-hidden" id="values-title">
            How the practice works
          </h2>
          <div className="values">
            {VALUES.map((value, index) => (
              <article
                className="value-card"
                key={value.title}
                data-reveal
                data-delay={index < 6 ? String(index + 1) : undefined}
              >
                <span className="value-card__icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="treatments" aria-labelledby="treatments-title">
        <div className="page-container">
          <div className="section-head">
            <div data-reveal>
              <span className="eyebrow">Treatments</span>
              <h2 id="treatments-title">
                Care that starts with <em>your questions.</em>
              </h2>
            </div>
            <div className="section-head__aside" data-reveal data-delay="1">
              <p className="lede">
                Every treatment description, image and clinical detail is supplied and approved by
                the practice. Nothing is invented in this demo.
              </p>
              <Link className="link-arrow" to="/treatments">
                View all treatments <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="treatment-showcase">
            {visibleTreatments.slice(0, 1).map((treatment, index) => (
              <Link
                className="treatment-card"
                key={`${treatment.slug}-${index}`}
                to="/treatments/$slug"
                params={{ slug: treatment.slug }}
                data-reveal="image"
              >
                <Media
                  image={TREATMENT_IMAGES[index % TREATMENT_IMAGES.length]}
                  alt="Practice treatment imagery supplied by the practice"
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

            <aside
              className="showcase-panel"
              aria-labelledby="showcase-title"
              data-reveal
              data-delay="2"
            >
              <span className="eyebrow">What each page covers</span>
              <h3 id="showcase-title">Treatment pages built for questions.</h3>
              <ul className="showcase-list">
                <li>
                  <span>01</span> An overview of the treatment and who it may suit
                </li>
                <li>
                  <span>02</span> Appointments, aftercare and practice-approved costs
                </li>
                <li>
                  <span>03</span> Treatment-specific questions and a clear next step
                </li>
              </ul>
              <Link className="link-arrow" to="/treatments">
                Browse all treatments <ArrowRight size={15} />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="story-title">
        <div className="page-container story">
          <div className="story__copy" data-reveal>
            <span className="eyebrow">The practice</span>
            <h2 id="story-title">
              A familiar face, a thoughtful voice, a practice that <em>listens.</em>
            </h2>
            <p className="lede">
              [Practice story, philosophy and clinic details will be supplied by the practice.] This
              space is reserved for the practice’s own account of how it cares for patients.
            </p>
            <div className="story__list">
              {content.journey.map((step) => (
                <div className="story__item" key={step.number}>
                  <span className="story__num">{step.number}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <span>{step.detail}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link className="link-arrow" to="/about">
              About the practice <ArrowRight size={15} />
            </Link>
          </div>

          <div className="story__media" data-reveal="image" data-delay="2">
            <Media
              image="treatmentRoom"
              alt="Modern dental treatment room with warm oak cabinetry and soft daylight"
              ratio="tall"
            />
            <Media
              image="lounge"
              alt="Quiet practice lounge detail with cream upholstery and dried grasses"
              ratio="portrait"
            />
            <div className="story__quote">
              <span>Practice story</span>
              <p>
                [A short practice-approved sentence about the clinic, its team or its approach will
                appear here.]
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--values" aria-label="Practice at a glance">
        <div className="page-container">
          <div className="values">
            {STATS.map((stat, index) => (
              <article
                className="value-card"
                key={stat.value}
                data-reveal
                data-delay={index < 6 ? String(index + 1) : undefined}
              >
                <span className="value-card__icon">
                  <SparkIcon size={19} />
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem' }}>{stat.value}</h3>
                <p>{stat.label}</p>
              </article>
            ))}
            <article className="value-card" data-reveal data-delay="4">
              <span className="value-card__icon">
                <ShieldIcon size={19} />
              </span>
              <h3>Demo content</h3>
              <p>
                Nothing on this site is a clinical claim. Placeholders are replaced with verified
                practice information before launch.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="team" aria-labelledby="team-title">
        <div className="page-container">
          <div className="section-head">
            <div data-reveal>
              <span className="eyebrow">The team</span>
              <h2 id="team-title">
                Meet the people behind <em>your visit.</em>
              </h2>
            </div>
            <div className="section-head__aside" data-reveal data-delay="1">
              <p className="lede">
                Team profiles are added only when the practice supplies and approves names, roles and
                biographies.
              </p>
              <Link className="link-arrow" to="/about/team">
                Meet the team <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="team-grid">
            <article className="team-card" data-reveal data-delay="1">
              <Placeholder label="Practitioner portrait to be supplied" note="Verified profile required" />
              <div className="team-card__body">
                <span>Dentist</span>
                <h3>[DENTIST NAME]</h3>
                <p>[Verified role, credentials and biography will be supplied by the practice.]</p>
              </div>
            </article>
            <article className="team-card" data-reveal data-delay="2">
              <Placeholder label="Team photograph to be supplied" note="Practice-approved image" />
              <div className="team-card__body">
                <span>Team</span>
                <h3>The wider team</h3>
                <p>[Names, roles and biographies of the practice team will appear here.]</p>
              </div>
            </article>
            <article className="team-card" data-reveal data-delay="3">
              <Media
                image="instruments"
                alt="Dental instruments arranged on a cream stone tray in soft daylight"
                ratio="portrait"
              />
              <div className="team-card__body">
                <span>Inside the practice</span>
                <h3>A calm environment</h3>
                <p>[Verified information about the clinic, facilities and accessibility.]</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="reviews-title">
        <div className="page-container">
          <div className="section-head">
            <div data-reveal>
              <span className="eyebrow">Patient voices</span>
              <h2 id="reviews-title">
                Reviews, in their <em>own words.</em>
              </h2>
            </div>
            <div className="section-head__aside" data-reveal data-delay="1">
              <p className="lede">
                Only reviews supplied by the practice with permission and accurate attribution appear
                here. No testimonials are represented in this demo.
              </p>
              <Link className="link-arrow" to="/reviews">
                Read about reviews <ArrowRight size={15} />
              </Link>
            </div>
          </div>
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
        </div>
      </section>

      <section className="section" id="gallery" aria-labelledby="gallery-title">
        <div className="page-container gallery-teaser">
          <div className="gallery-teaser__copy" data-reveal>
            <span className="eyebrow">Smile gallery</span>
            <h2 id="gallery-title">
              A closer look at <em>individual stories.</em>
            </h2>
            <p className="lede">
              No patient photography or treatment outcomes are shown in this demo. Approved images and
              captions may be added only after consent and review.
            </p>
            <Link className="link-arrow" to="/smile-gallery">
              Explore the gallery <ArrowRight size={15} />
            </Link>
          </div>
          <div data-reveal="image" data-delay="1">
            <Comparison comparisonId="home-comparison" />
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="journal-title">
        <div className="page-container">
          <div className="section-head">
            <div data-reveal>
              <span className="eyebrow">The journal</span>
              <h2 id="journal-title">
                Thoughts worth <em>taking with you.</em>
              </h2>
            </div>
            <div className="section-head__aside" data-reveal data-delay="1">
              <p className="lede">
                Articles are locally maintained and reviewed by the practice before publication.
              </p>
              <Link className="link-arrow" to="/journal">
                Read the journal <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <div className="journal-grid">
            {content.journal.map((article, index) => (
              <article
                className="journal-card"
                key={index}
                data-reveal
                data-delay={String((index % 6) + 1)}
              >
                <Media
                  image={index === 0 ? 'smile' : 'aligners'}
                  alt="Editorial image supporting a practice journal article"
                  ratio="landscape"
                />
                <div className="journal-card__meta">{article.category}</div>
                <h3>
                  <Link to="/journal/$slug" params={{ slug: 'article-placeholder' }}>
                    {article.title}
                  </Link>
                </h3>
                <p>{article.summary}</p>
                <Link className="link-arrow" to="/journal/$slug" params={{ slug: 'article-placeholder' }}>
                  Read article <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact" aria-labelledby="contact-title">
        <div className="page-container">
          <div className="contact-band" data-reveal="fade">
            <div className="contact-band__grid">
              <div className="stack">
                <span className="eyebrow">The next step is yours</span>
                <h2 id="contact-title">
                  A conversation can start <em>anywhere.</em>
                </h2>
                <p>
                  Choose the way that feels comfortable. Telephone, WhatsApp and email work
                  independently of the consultation form.
                </p>
                <ContactLinks contact={PRACTICE_CONFIG.contact} variant="stacked" />
                <div className="hero__actions">
                  <Link className="btn btn--light" to="/consultation">
                    Request a consultation <ArrowUpRight size={16} />
                  </Link>
                  <Link className="btn btn--on-ink" to="/contact">
                    Contact details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="contact-band__details">
                <dl>
                  <div>
                    <dt>Address</dt>
                    <dd>{PRACTICE_CONFIG.contact.address || '[CLINIC ADDRESS · TO BE SUPPLIED]'}</dd>
                  </div>
                  <div>
                    <dt>Opening hours</dt>
                    <dd>
                      {PRACTICE_CONFIG.contact.openingHours || '[OPENING HOURS · TO BE SUPPLIED]'}
                    </dd>
                  </div>
                  <div>
                    <dt>Getting here</dt>
                    <dd>[Parking, transport and access information to be supplied by the practice.]</dd>
                  </div>
                </dl>
                <Link className="link-arrow" to="/contact">
                  Find the practice <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
