import { createFileRoute } from '@tanstack/react-router'
import { PublicPage, resolvePage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const fallback = siteMetadata['/treatments/$slug']

export const Route = createFileRoute('/treatments/$slug')({
  head: ({ params }) => {
    const page = resolvePage('treatment', params.slug)
    return buildPageHead({
      title: page.id === 'notFound' ? fallback.title : page.title,
      description: page.metaDescription ?? fallback.description,
      path: `/treatments/${params.slug}`,
      type: 'website',
    })
  },
  component: DetailPage,
})

function DetailPage() {
  const { slug } = Route.useParams()
  return <PublicPage pageId="treatment" slug={slug} />
}
