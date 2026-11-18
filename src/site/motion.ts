import { useEffect } from 'react'

const REVEAL_SELECTOR = '[data-reveal]:not(.is-revealed)'

export function useScrollReveal(pathname: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let observer: IntersectionObserver | undefined
    let mutations: MutationObserver | undefined
    let timers: number[] = []
    let cancelled = false

    const start = () => {
      if (cancelled) return

      const pending = () =>
        document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)

      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (prefersReduced || !('IntersectionObserver' in window)) {
        pending().forEach((node) => node.classList.add('is-revealed'))
        return
      }

      document.documentElement.dataset.anim = 'on'

      const observed = new WeakSet<Element>()

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-revealed')
            observer?.unobserve(entry.target)
          })
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )

      const observePending = () => {
        pending().forEach((node) => {
          if (observed.has(node)) return
          observed.add(node)
          observer?.observe(node)
        })
      }

      observePending()

      mutations = new MutationObserver(observePending)
      mutations.observe(document.body, {
        childList: true,
        subtree: true,
      })

      timers = [160, 400].map((delay) =>
        window.setTimeout(observePending, delay),
      )
    }

    // Allow the initial document and React hydration to finish first.
    const startAfterLoad = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(start)
      })
    }

    if (document.readyState === 'complete') {
      startAfterLoad()
    } else {
      window.addEventListener('load', startAfterLoad, { once: true })
    }

    return () => {
      cancelled = true
      window.removeEventListener('load', startAfterLoad)
      timers.forEach((timer) => window.clearTimeout(timer))
      mutations?.disconnect()
      observer?.disconnect()
    }
  }, [pathname])
}
