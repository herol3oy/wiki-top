import createUrl from '@/constance/create-url'
import { Article, Data } from '@/types/data'

interface RequestArticlesProps {
  language: string
  day: string
  month: string
  year: number
}

export default async function requestArticles({
  language,
  day,
  month,
  year,
}: RequestArticlesProps) {
  const url = createUrl({
    language,
    year,
    month,
    day,
  })
  const data = await fetch(url)
  const res: Data = await data.json()
  const articles: Article[] = res.items[0].articles

  return articles
}
