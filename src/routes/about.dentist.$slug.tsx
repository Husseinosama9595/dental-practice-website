import { createFileRoute } from '@tanstack/react-router'
import { PublicPage, resolvePage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const fallback = siteMetadata['/about/dentist/$slug']

export const Route = createFileRoute('/about/dentist/$slug')({
  head: ({ params }) => {
    const page = resolvePage('dentist', params.slug)
    return buildPageHead({
      title: page.id === 'notFound' ? fallback.title : page.title,
      description: page.metaDescription ?? fallback.description,
      path: `/about/dentist/${params.slug}`,
      type: 'website',
    })
  },
  component: DetailPage,
})

function DetailPage() {
  const { slug } = Route.useParams()
  return <PublicPage pageId="dentist" slug={slug} />
}
