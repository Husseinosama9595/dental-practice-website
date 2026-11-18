import { createFileRoute } from '@tanstack/react-router'
import { PublicPage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/treatments']

export const Route = createFileRoute('/treatments')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: 'treatments',
    }),
  component: AboutPage,
})

function AboutPage() {
  return <PublicPage pageId="treatments" />
}
