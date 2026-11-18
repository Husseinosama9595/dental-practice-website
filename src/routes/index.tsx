import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/site/home'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/']

export const Route = createFileRoute('/')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: '/',
    }),
  component: HomePage,
})
