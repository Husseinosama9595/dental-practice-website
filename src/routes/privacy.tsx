import { createFileRoute } from '@tanstack/react-router'
import { PublicPage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/privacy']

export const Route = createFileRoute('/privacy')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: 'privacy',
    }),
  component: AboutPage,
})

function AboutPage() {
  return <PublicPage pageId="privacy" />
}
