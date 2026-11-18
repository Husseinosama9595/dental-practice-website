import { createFileRoute } from '@tanstack/react-router'
import { PublicPage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/journal']

export const Route = createFileRoute('/journal')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: 'journal',
    }),
  component: AboutPage,
})

function AboutPage() {
  return <PublicPage pageId="journal" />
}
