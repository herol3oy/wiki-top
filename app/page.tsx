import Link from 'next/link'

import baseUrl from '@/constance/base-url'
import { Article, Data } from '@/types/data'
import {
  currentYear,
  formattedMonth,
  formattedPreviousDay,
} from '@/utils/format-dates'

export default async function Home() {
  const url = baseUrl({ currentYear, formattedMonth, formattedPreviousDay })
  const data = await fetch(url)
  const res: Data = await data.json()
  const articles: Article[] = res.items[0].articles

  return (
    <main className="grid grid-cols-8 gap-2">
      {articles.map(({ article, views, rank }: Article) => (
        <Link
          className="rounded bg-blue-300 p-5 transition hover:-translate-y-1 hover:shadow-lg"
          href={`/${article}`}
          key={article}
        >
          <h1 className="truncate text-lg">{article}</h1>
          <section className="flex gap-5">
            <small>🔥 {rank}</small>
            <small>👁️ {views}</small>
          </section>
        </Link>
      ))}
    </main>
  )
}
