import { createFileRoute } from '@tanstack/react-router'
import { PublicPage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/patient-information']

export const Route = createFileRoute('/patient-information')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: 'patient-information',
    }),
  component: AboutPage,
})

function AboutPage() {
  return <PublicPage pageId="patientInformation" />
}
