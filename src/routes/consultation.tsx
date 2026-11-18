import { createFileRoute } from '@tanstack/react-router'
import { ConsultationPage } from '@/site/consultation'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/consultation']

export const Route = createFileRoute('/consultation')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: '/consultation',
    }),
  component: ConsultationPage,
})
