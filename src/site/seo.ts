import { canonicalUrl } from '@/lib/canonical-url'

export function buildPageHead({
  title,
  description,
  path,
  indexable = false,
  type = 'website',
}: {
  title: string
  description: string
  path: string
  indexable?: boolean
  type?: 'website' | 'article'
}) {
  const canonical = canonicalUrl(path)

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { name: 'robots', content: indexable ? 'index,follow' : 'noindex,follow' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    links: canonical ? [{ rel: 'canonical', href: canonical }] : [],
  }
}
