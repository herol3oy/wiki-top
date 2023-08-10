import createUrl from '@/constance/create-url'
import { Article, Data } from '@/types/data'
import {
  currentYear,
  formattedMonth,
  formattedPreviousDay,
} from '@/utils/format-dates'

async function requestArticles(language: string) {
  const url = createUrl({
    currentYear,
    formattedMonth,
    formattedPreviousDay,
    language,
  })
  const data = await fetch(url)
  const res: Data = await data.json()
  const articles: Article[] = res.items[0].articles

  return articles
}

export default requestArticles
