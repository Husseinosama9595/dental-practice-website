import { createFileRoute } from '@tanstack/react-router'
import { PublicPage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/about/team']

export const Route = createFileRoute('/about/team')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: 'about/team',
    }),
  component: AboutPage,
})

function AboutPage() {
  return <PublicPage pageId="team" />
}
