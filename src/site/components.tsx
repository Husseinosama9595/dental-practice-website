import { useEffect, useId, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { PRACTICE_CONFIG, type PracticeContact } from './content'
import { IMAGES, type ImageKey } from './images'

type IconProps = { size?: number }

function iconProps(size: number) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  }
}

export function ArrowRight({ size = 16 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export function ArrowUpRight({ size = 17 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}

export function ArrowLeft({ size = 16 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

export function CloseIcon({ size = 22 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function MenuIcon({ size = 22 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  )
}

function PhoneIcon({ size = 15 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MailIcon({ size = 15 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  )
}

function WhatsAppIcon({ size = 15 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function PinIcon({ size = 15 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

function SettingsIcon({ size = 14 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M20 7h-9" />
      <path d="M14 17H5" />
      <circle cx="17" cy="17" r="3" />
      <circle cx="7" cy="7" r="3" />
    </svg>
  )
}

export function SparkIcon({ size = 20 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M12 3c1.6 3.4 3.6 5.4 7 7-3.4 1.6-5.4 3.6-7 7-1.6-3.4-3.6-5.4-7-7 3.4-1.6 5.4-3.6 7-7z" />
    </svg>
  )
}

export function HeartIcon({ size = 20 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M12 20s-7-4.4-7-9.2A4.1 4.1 0 0 1 12 7.8 4.1 4.1 0 0 1 19 10.8C19 15.6 12 20 12 20z" />
    </svg>
  )
}

export function ShieldIcon({ size = 20 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function ClockIcon({ size = 20 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function ToothIcon({ size = 22 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M12 4c2.6 0 4 1.5 4 4 0 2-.7 3.8-1.2 5.6-.4 1.5-.7 2.9-1.1 3.9-.3.9-1.2 1-1.6.2L11 15.6h-.4L9.4 17.7c-.4.8-1.3.7-1.6-.2-.4-1-.7-2.4-1.1-3.9C6.2 11.8 5.5 10 5.5 8c0-2.5 1.4-4 4-4h2.5z" />
    </svg>
  )
}

export function Media({
  image,
  alt,
  ratio = 'landscape',
  tag,
  className = '',
  priority = false,
}: {
  image: ImageKey
  alt: string
  ratio?: 'portrait' | 'landscape' | 'wide' | 'square' | 'tall'
  tag?: string
  className?: string
  priority?: boolean
}) {
  return (
    <div className={`media media--${ratio} ${className}`.trim()}>
      <img
        src={IMAGES[image]}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
      {tag && <span className="media__tag">{tag}</span>}
    </div>
  )
}

export function Placeholder({
  label,
  note = 'Practice asset to be supplied',
  className = '',
}: {
  label: string
  note?: string
  className?: string
}) {
  return (
    <div className={`placeholder ${className}`.trim()}>
      <span className="placeholder__mark">
        <ToothIcon size={22} />
      </span>
      <span className="placeholder__label">{label}</span>
      <span className="placeholder__note">{note}</span>
    </div>
  )
}

export function Comparison({
  comparisonId = 'comparison',
  beforeLabel = 'Before photograph placeholder',
  afterLabel = 'After photograph placeholder',
}: {
  comparisonId?: string
  beforeLabel?: string
  afterLabel?: string
}) {
  const [position, setPosition] = useState(50)
  const helpId = `${comparisonId}-help`

  return (
    <>
      <div
        className="comparison"
        role="group"
        aria-label="Before-and-after image comparison"
        style={{ ['--split' as string]: `${position}%` }}
      >
        <div className="comparison__pane comparison__pane--after" aria-hidden="true">
          <span className="comparison__label">AFTER · IMAGE TO BE SUPPLIED</span>
        </div>
        <div className="comparison__pane comparison__pane--before" aria-hidden="true">
          <span className="comparison__label">BEFORE · IMAGE TO BE SUPPLIED</span>
        </div>
        <span className="comparison__chip comparison__chip--before">Before</span>
        <span className="comparison__chip comparison__chip--after">After</span>
        <span className="comparison__divider" aria-hidden="true">
          <i />
        </span>
        <input
          type="range"
          min={5}
          max={95}
          value={position}
          aria-label={`Reveal the ${beforeLabel} with the ${afterLabel}`}
          aria-valuetext={`${position}% of the before image revealed`}
          aria-describedby={helpId}
          onChange={(event) => setPosition(Number(event.target.value))}
        />
      </div>
      <p className="comparison-help" id={helpId}>
        Interactive image comparison · practice photography not yet supplied
      </p>
    </>
  )
}

export function ContactLinks({
  contact,
  variant = 'inline',
}: {
  contact: PracticeContact
  variant?: 'inline' | 'stacked'
}) {
  const whatsapp = contact.whatsapp.replace(/\D/g, '')
  return (
    <div
      className={variant === 'stacked' ? 'contact-links contact-links--stacked' : 'contact-links'}
      aria-label="Contact options"
    >
      {contact.phone ? (
        <a className="contact-link" href={`tel:${contact.phone}`}>
          <PhoneIcon />
          <span>Call the practice</span>
        </a>
      ) : (
        <span className="contact-placeholder">
          <PhoneIcon />
          <span>Telephone details to be supplied</span>
        </span>
      )}

      {whatsapp ? (
        <a
          className="contact-link"
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          <span>WhatsApp the practice</span>
        </a>
      ) : (
        <span className="contact-placeholder">
          <WhatsAppIcon />
          <span>WhatsApp details to be supplied</span>
        </span>
      )}

      {contact.email ? (
        <a className="contact-link" href={`mailto:${contact.email}`}>
          <MailIcon />
          <span>Email the practice</span>
        </a>
      ) : (
        <span className="contact-placeholder">
          <MailIcon />
          <span>Email details to be supplied</span>
        </span>
      )}
    </div>
  )
}

const PRIMARY_NAV = [
  { to: '/about', label: 'The practice' },
  { to: '/treatments', label: 'Treatments' },
  { to: '/smile-gallery', label: 'Smile gallery' },
  { to: '/patient-information', label: 'Patient information' },
  { to: '/journal', label: 'Journal' },
] as const

const MOBILE_NAV = [
  ...PRIMARY_NAV,
  { to: '/reviews', label: 'Reviews' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`)

  return (
    <>
      <div className="topbar">
        <div className="topbar__inner page-container">
          <span className="topbar__note">
            <i className="topbar__dot" aria-hidden="true" />
            Practice details to be supplied · demo content
          </span>
          <span className="topbar__meta">
            <span>
              <PinIcon />
              [CLINIC ADDRESS]
            </span>
            <a href="/contact">
              <PhoneIcon />
              Contact the practice
            </a>
          </span>
        </div>
      </div>

      <header className="site-header">
        <div className="header-inner page-container">
          <Link className="brand" to="/" aria-label={`${PRACTICE_CONFIG.name}, home`}>
            <span className="brand__mark" aria-hidden="true">
              <ToothIcon size={20} />
            </span>
            <span className="brand__copy">
              <span className="brand__name">{PRACTICE_CONFIG.name}</span>
              <span className="brand__descriptor">{PRACTICE_CONFIG.descriptor}</span>
            </span>
          </Link>

          <nav className="nav-primary" aria-label="Main navigation">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={isActive(item.to) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link className="btn btn--primary" to="/consultation">
              Book a consultation
              <ArrowUpRight size={15} />
            </Link>
            <button
              className="menu-toggle"
              type="button"
              data-testid="menu-toggle"
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          className="mobile-nav"
          data-testid="mobile-nav"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {MOBILE_NAV.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="btn btn--primary" to="/consultation" onClick={() => setMenuOpen(false)}>
            Book a consultation
            <ArrowUpRight size={15} />
          </Link>
        </nav>
      </header>
    </>
  )
}

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer" id="footer">
      <div className="page-container">
        <div className="footer-cta">
          <div>
            <span className="eyebrow">A place to begin</span>
            <h2>Let’s make room for a conversation.</h2>
          </div>
          <Link className="btn btn--light" to="/consultation">
            Request a consultation
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <strong>{PRACTICE_CONFIG.name}</strong>
            <p>
              A calm, considered dental practice. Practice details, team biographies and treatment
              information will be supplied and approved before launch.
            </p>
            <ContactLinks contact={PRACTICE_CONFIG.contact} variant="stacked" />
          </div>

          <div>
            <h3>Explore</h3>
            <nav className="footer-links" aria-label="Footer navigation">
              <Link to="/about">The practice</Link>
              <Link to="/about/team">Our team</Link>
              <Link to="/treatments">Treatments</Link>
              <Link to="/smile-gallery">Smile gallery</Link>
              <Link to="/journal">Journal</Link>
            </nav>
          </div>

          <div>
            <h3>Patients</h3>
            <nav className="footer-links" aria-label="Patient navigation">
              <Link to="/patient-information">Patient information</Link>
              <Link to="/faqs">FAQs</Link>
              <Link to="/reviews">Reviews</Link>
              <Link to="/consultation">Consultation</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          <div>
            <h3>Visit</h3>
            <div className="footer-links">
              <span>[CLINIC ADDRESS]</span>
              <span>Opening hours to be supplied</span>
              <Link to="/contact">Directions and parking</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {PRACTICE_CONFIG.name} · Demo content, practice details to be supplied
          </span>
          <nav aria-label="Legal information">
            <Link to="/privacy">Privacy</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

const CONSENT_STORAGE_KEY = 'practice-cookie-preferences-v1'

export function CookieConsent() {
  const [ready, setReady] = useState(false)
  const [decided, setDecided] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [pendingAnalytics, setPendingAnalytics] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const titleId = useId()

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY)
      if (saved) {
        const choices = JSON.parse(saved) as { essential?: boolean; analytics?: boolean }
        if (choices.essential === true && typeof choices.analytics === 'boolean') {
          setAnalytics(choices.analytics)
          setDecided(true)
        }
      }
    } catch {
      // Storage can be unavailable; the choice stays valid for this page session.
    }
    setReady(true)
  }, [])

  const save = (value: boolean) => {
    setAnalytics(value)
    setDecided(true)
    try {
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ essential: true, analytics: value }),
      )
    } catch {
      // Keep the current choice in memory when the browser blocks local storage.
    }
    setDialogOpen(false)
  }

  const openPreferences = () => {
    setPendingAnalytics(analytics)
    setDialogOpen(true)
  }

  if (!ready) return null

  return (
    <>
      {!decided ? (
        <section className="consent-banner" aria-label="Cookie preferences" role="region">
          <div>
            <span className="eyebrow">Your privacy · your choice</span>
            <p>
              Only essential storage is used unless you choose otherwise. Optional analytics stay off
              until you consent.
            </p>
          </div>
          <div className="consent-actions">
            <button className="consent-button" type="button" onClick={() => save(false)}>
              Reject optional
            </button>
            <button className="consent-button" type="button" onClick={openPreferences}>
              Preferences
            </button>
            <button
              className="consent-button consent-button--primary"
              type="button"
              onClick={() => save(true)}
            >
              Accept all
            </button>
          </div>
        </section>
      ) : (
        <button className="consent-settings" type="button" onClick={openPreferences}>
          <SettingsIcon />
          Cookie settings
        </button>
      )}

      {dialogOpen ? (
        <dialog
          className="consent-dialog"
          open
          aria-labelledby={titleId}
          style={{ position: 'fixed', inset: '0', margin: 'auto' }}
        >
          <div className="lightbox-head">
            <div>
              <span className="eyebrow">Your privacy · your choice</span>
              <h2 id={titleId}>Cookie preferences.</h2>
            </div>
            <button
              className="lightbox-close"
              type="button"
              autoFocus
              aria-label="Close cookie preferences"
              onClick={() => setDialogOpen(false)}
            >
              <CloseIcon size={19} />
            </button>
          </div>
          <p>
            Choose whether this browser may store optional analytics preferences. No analytics
            provider or tracking script is configured in this demo.
          </p>
          <div className="consent-category">
            <div>
              <strong>Essential storage</strong>
              <p>Required to remember your cookie choice. Always active.</p>
            </div>
            <span className="consent-required">Always on</span>
          </div>
          <label className="consent-category">
            <span>
              <strong>Optional analytics</strong>
              <small>
                Analytics stay disabled until the practice configures a provider and you give
                consent.
              </small>
            </span>
            <input
              type="checkbox"
              checked={pendingAnalytics}
              onChange={(event) => setPendingAnalytics(event.target.checked)}
            />
          </label>
          <div className="consent-actions consent-actions--dialog">
            <button className="consent-button" type="button" onClick={() => save(false)}>
              Reject optional
            </button>
            <button className="consent-button" type="button" onClick={() => save(pendingAnalytics)}>
              Save preferences
            </button>
            <button
              className="consent-button consent-button--primary"
              type="button"
              onClick={() => save(true)}
            >
              Accept all
            </button>
          </div>
          <Link className="consent-policy" to="/cookies" onClick={() => setDialogOpen(false)}>
            Read the cookie policy <ArrowUpRight size={13} />
          </Link>
        </dialog>
      ) : null}
    </>
  )
}
