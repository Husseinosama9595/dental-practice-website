import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { visibleGalleryCases, type GalleryCaseContent } from './content'
import { ArrowLeft, ArrowRight, ArrowUpRight, CloseIcon, Comparison, Media, Placeholder } from './components'

export function GalleryPage({ slug }: { slug?: string }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const focusReturn = useRef<HTMLElement | null>(null)

  const galleryCases = visibleGalleryCases
  const categories = useMemo(
    () => [...new Set(galleryCases.map((item) => item.treatment))],
    [galleryCases],
  )
  const visibleCases = useMemo(
    () =>
      activeCategory === 'all'
        ? galleryCases
        : galleryCases.filter((item) => item.treatment === activeCategory),
    [activeCategory, galleryCases],
  )

  const isDetail = Boolean(slug && slug.length > 0)
  const detailCase = galleryCases.find((item) => item.slug === slug) ?? null
  const activeCase = galleryCases.find((item) => item.slug === activeSlug) ?? null
  const lightboxIndex = visibleCases.findIndex((item) => item.slug === activeSlug)
  const canMovePrevious = lightboxIndex > 0
  const canMoveNext = lightboxIndex >= 0 && lightboxIndex < visibleCases.length - 1

  useEffect(() => {
    document.body.classList.toggle('has-lightbox', Boolean(activeSlug))
    return () => document.body.classList.remove('has-lightbox')
  }, [activeSlug])

  const openLightbox = (item: GalleryCaseContent, event: React.MouseEvent<HTMLElement>) => {
    focusReturn.current = event.currentTarget
    setActiveSlug(item.slug)
    dialogRef.current?.showModal()
  }

  const closeLightbox = () => {
    if (dialogRef.current?.open) dialogRef.current.close()
  }

  const moveLightbox = (direction: -1 | 1) => {
    const next = visibleCases[lightboxIndex + direction]
    if (next) setActiveSlug(next.slug)
  }

  const onDialogClose = () => {
    setActiveSlug(null)
    if (focusReturn.current?.isConnected) focusReturn.current.focus()
    focusReturn.current = null
  }

  return (
    <>
      <nav className="crumbs page-container" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        {isDetail && (
          <>
            <Link to="/smile-gallery">Smile gallery</Link>
            <span aria-hidden="true">/</span>
          </>
        )}
        <span aria-current="page">
          {isDetail ? (detailCase?.title ?? 'Case study') : 'Smile gallery'}
        </span>
      </nav>

      {isDetail && detailCase ? (
        <>
          <header className="page-hero page-container">
            <div className="page-hero__copy" data-reveal>
              <span className="eyebrow">Case study · practice-supplied content</span>
              <h1>{detailCase.title}</h1>
              <p className="lede">{detailCase.summary}</p>
              <div className="page-hero__actions">
                <Link className="btn btn--ghost" to="/smile-gallery">
                  <ArrowLeft size={15} /> Back to the gallery
                </Link>
                <Link className="btn btn--primary" to="/consultation">
                  Request a consultation <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
            <div className="page-hero__visual" data-reveal="image" data-delay="1">
              <Placeholder label="Case photograph to be supplied" note="Consent required" />
            </div>
          </header>

          <section className="section page-container" aria-labelledby="case-comparison">
            <div className="gallery-teaser">
              <div className="gallery-teaser__copy">
                <span className="eyebrow">{detailCase.treatment}</span>
                <h2 id="case-comparison">A considered view, side by side.</h2>
                <p className="lede">{detailCase.caption}</p>
                <p>
                  Images and treatment context are placeholders until supplied, approved and supported
                  by documented consent. Individual outcomes vary; these materials are not a promise or
                  prediction of results.
                </p>
              </div>
              <Comparison
                comparisonId={`case-${detailCase.slug}`}
                beforeLabel={detailCase.beforeAlt}
                afterLabel={detailCase.afterAlt}
              />
            </div>
          </section>
        </>
      ) : isDetail ? (
        <section className="section page-container">
          <div className="gallery-empty">
            <span className="eyebrow">Case study</span>
            <h1>This case is not available.</h1>
            <p>Only practice-approved cases with documented consent can appear in the gallery.</p>
            <Link className="link-arrow" to="/smile-gallery">
              Return to the smile gallery <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      ) : (
        <>
          <header className="page-hero page-container">
            <div className="page-hero__copy" data-reveal>
              <span className="eyebrow">The smile gallery · practice-approved cases</span>
              <h1>
                A closer look at <em>individual stories.</em>
              </h1>
              <p className="lede">
                Explore how the practice presents its work. Case photography and clinical context
                appear only when supplied, approved and supported by documented patient consent.
              </p>
              <div className="page-hero__actions">
                <Link className="btn btn--primary" to="/consultation">
                  Request a consultation <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
            <div className="page-hero__visual" data-reveal="image" data-delay="1">
              <Media
                image="smile"
                alt="Editorial close-up of a natural smile in warm studio light"
                ratio="landscape"
                priority
              />
            </div>
          </header>

          <section className="section page-container" aria-labelledby="gallery-heading">
            <div className="section-head">
              <div>
                <span className="eyebrow">A visual index</span>
                <h2 id="gallery-heading">Cases, when they are ready.</h2>
              </div>
              <div className="section-head__aside">
                <p className="lede">
                  Images are never used to imply a guaranteed result. All case content requires
                  practice review.
                </p>
              </div>
            </div>

            <div className="gallery-filters" role="group" aria-label="Filter gallery by treatment">
              <button
                type="button"
                data-testid="gallery-filter"
                data-category="all"
                aria-pressed={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
              >
                All cases
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  data-testid="gallery-filter"
                  data-category={category}
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {visibleCases.length > 0 ? (
              <div className="gallery-grid" data-testid="gallery-grid">
                {visibleCases.map((item, index) => (
                  <article
                    className="gallery-card"
                    key={item.slug}
                    data-reveal
                    data-delay={String((index % 6) + 1)}
                  >
                    <Comparison
                      comparisonId={`preview-${item.slug}`}
                      beforeLabel={item.beforeAlt}
                      afterLabel={item.afterAlt}
                    />
                    <div className="gallery-card__body">
                      <span className="eyebrow">
                        {item.published
                          ? 'Practice-approved case'
                          : 'Layout preview · no patient results shown'}
                      </span>
                      <h3>
                        <Link to="/smile-gallery/$slug" params={{ slug: item.slug }}>
                          {item.title}
                        </Link>
                      </h3>
                      <p>{item.summary}</p>
                      <div className="gallery-card__actions">
                        <button
                          className="link-arrow"
                          type="button"
                          data-testid="gallery-open-lightbox"
                          data-case={item.slug}
                          onClick={(event) => openLightbox(item, event)}
                          aria-label={`Open image comparison for ${item.title}`}
                        >
                          View comparison <ArrowRight size={15} />
                        </button>
                        <Link className="link-arrow" to="/smile-gallery/$slug" params={{ slug: item.slug }}>
                          Read case study <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="gallery-empty" role="status">
                <span className="eyebrow">No cases in this category</span>
                <h3>More stories may be added later.</h3>
                <button className="link-arrow" type="button" onClick={() => setActiveCategory('all')}>
                  Show all cases <ArrowRight size={15} />
                </button>
              </div>
            )}
          </section>
        </>
      )}

      <dialog
        ref={dialogRef}
        className="gallery-lightbox"
        data-testid="gallery-lightbox"
        aria-labelledby="lightbox-title"
        onClose={onDialogClose}
      >
        {activeCase && (
          <>
            <div className="lightbox-head">
              <div>
                <span className="eyebrow">{activeCase.treatment}</span>
                <h2 id="lightbox-title" aria-live="polite">
                  {activeCase.title}
                </h2>
              </div>
              <button
                className="lightbox-close"
                type="button"
                aria-label="Close image comparison"
                onClick={closeLightbox}
              >
                <CloseIcon size={19} />
              </button>
            </div>
            <Comparison
              comparisonId={`lightbox-${activeCase.slug}`}
              beforeLabel={activeCase.beforeAlt}
              afterLabel={activeCase.afterAlt}
            />
            <p>{activeCase.caption}</p>
            <div className="lightbox-controls">
              {visibleCases.length > 1 && (
                <button
                  className="btn btn--ghost"
                  type="button"
                  disabled={!canMovePrevious}
                  onClick={() => moveLightbox(-1)}
                >
                  <ArrowLeft size={15} /> Previous
                </button>
              )}
              <span>Images are placeholders · consent and practice approval required</span>
              {visibleCases.length > 1 && (
                <button
                  className="btn btn--ghost"
                  type="button"
                  disabled={!canMoveNext}
                  onClick={() => moveLightbox(1)}
                >
                  Next <ArrowRight size={15} />
                </button>
              )}
            </div>
          </>
        )}
      </dialog>
    </>
  )
}
