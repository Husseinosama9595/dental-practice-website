import { useRouterState } from '@tanstack/react-router'
import { CookieConsent, SiteFooter, SiteHeader } from './components'
import { useScrollReveal } from './motion'

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  useScrollReveal(pathname)

  return (
    <div className="site-theme">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" key={pathname} className="route-fade" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <CookieConsent />
    </div>
  )
}
