import { createFileRoute } from '@tanstack/react-router'
import { PublicPage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/terms']

export const Route = createFileRoute('/terms')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: 'terms',
    }),
  component: AboutPage,
})

function AboutPage() {
  return <PublicPage pageId="terms" />
}
