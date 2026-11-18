import { createFileRoute } from '@tanstack/react-router'
import { PublicPage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/about']

export const Route = createFileRoute('/about')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: 'about',
    }),
  component: AboutPage,
})

function AboutPage() {
  return <PublicPage pageId="about" />
}
