import Link from 'next/link'

import { Article } from '@/types/data'

interface ArticleCardProps {
  article: Article
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      className="rounded bg-blue-300 p-5 transition hover:-translate-y-1 hover:shadow-lg"
      href={`/${article.article}`}
      key={article.article}
    >
      <h1 className="truncate text-lg">{article.article}</h1>
      <section className="flex gap-5">
        <small>🔥 {article.rank}</small>
        <small>👁️ {article.views}</small>
      </section>
    </Link>
  )
}

export default ArticleCard
