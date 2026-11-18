import { createFileRoute } from '@tanstack/react-router'
import { GalleryPage } from '@/site/gallery'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const meta = siteMetadata['/smile-gallery']

export const Route = createFileRoute('/smile-gallery')({
  head: () =>
    buildPageHead({
      title: meta.title,
      description: meta.description,
      path: '/smile-gallery',
    }),
  component: GalleryIndexPage,
})

function GalleryIndexPage() {
  return <GalleryPage />
}
