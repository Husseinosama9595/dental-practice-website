import { createFileRoute } from '@tanstack/react-router'
import { PublicPage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/faqs']

export const Route = createFileRoute('/faqs')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: 'faqs',
    }),
  component: AboutPage,
})

function AboutPage() {
  return <PublicPage pageId="faqs" />
}
