import Link from 'next/link'

import { Article } from '@/types/article'

interface ArticleCardProps {
  article: Article
  language: string
}

export default function ArticleCard({ article, language }: ArticleCardProps) {
  return (
    <Link
      className="border border-slate-900 p-5 text-slate-500 transition hover:-translate-y-1 hover:bg-slate-900 hover:text-purple-200 hover:shadow-lg"
      href={`https://${language}.wikipedia.org/wiki/${article.article}`}
      target="_blank"
      key={article.article}
    >
      <h1 className="truncate text-lg font-bold">{article.article}</h1>
      <section className="flex gap-5">
        <small>🔥 {article.rank}</small>
        <small>👁️ {article.views}</small>
      </section>
    </Link>
  )
}
