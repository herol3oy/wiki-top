import { Article } from '@/types/article'
import { Data } from '@/types/data'

import createUrl from './create-url'

interface RequestArticlesProps {
  language: string
  selectedDate: string
}

export default async function requestArticles({
  language,
  selectedDate,
}: RequestArticlesProps) {
  const url = createUrl({
    language,
    selectedDate,
  })
  const data = await fetch(url)
  const result: Data = await data.json()
  const articles: Article[] = result.items[0].articles

  return articles
}
