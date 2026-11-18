import { createFileRoute } from '@tanstack/react-router'
import { GalleryPage } from '@/site/gallery'
import { buildPageHead } from '@/site/seo'
import { visibleGalleryCases } from '@/site/content'
import siteMetadata from '@/metadata.json'

const fallback = siteMetadata['/smile-gallery/$slug']

export const Route = createFileRoute('/smile-gallery/$slug')({
  head: ({ params }) => {
    const item = visibleGalleryCases.find((entry) => entry.slug === params.slug)
    return buildPageHead({
      title: item ? `${item.title} | [PRACTICE NAME]` : fallback.title,
      description: item ? item.summary : fallback.description,
      path: `/smile-gallery/${params.slug}`,
    })
  },
  component: GalleryCasePage,
})

function GalleryCasePage() {
  const { slug } = Route.useParams()
  return <GalleryPage slug={slug} />
}
