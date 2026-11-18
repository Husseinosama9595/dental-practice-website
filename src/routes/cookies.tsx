import { createFileRoute } from '@tanstack/react-router'
import { PublicPage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/cookies']

export const Route = createFileRoute('/cookies')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: 'cookies',
    }),
  component: AboutPage,
})

function AboutPage() {
  return <PublicPage pageId="cookies" />
}
