import { createFileRoute } from '@tanstack/react-router'
import { PublicPage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/contact']

export const Route = createFileRoute('/contact')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: 'contact',
    }),
  component: AboutPage,
})

function AboutPage() {
  return <PublicPage pageId="contact" />
}
