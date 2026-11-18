import { createFileRoute } from '@tanstack/react-router'
import { PublicPage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/reviews']

export const Route = createFileRoute('/reviews')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: 'reviews',
    }),
  component: AboutPage,
})

function AboutPage() {
  return <PublicPage pageId="reviews" />
}
