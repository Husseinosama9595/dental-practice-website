import { createFileRoute } from '@tanstack/react-router'
import { PublicPage, resolvePage } from '@/site/public-page'
import { buildPageHead } from '@/site/seo'
import siteMetadata from '@/metadata.json'

const fallback = siteMetadata['/journal/$slug']

export const Route = createFileRoute('/journal/$slug')({
  head: ({ params }) => {
    const page = resolvePage('article', params.slug)
    return buildPageHead({
      title: page.id === 'notFound' ? fallback.title : page.title,
      description: page.metaDescription ?? fallback.description,
      path: `/journal/${params.slug}`,
      type: 'article',
    })
  },
  component: DetailPage,
})

function DetailPage() {
  const { slug } = Route.useParams()
  return <PublicPage pageId="article" slug={slug} />
}
