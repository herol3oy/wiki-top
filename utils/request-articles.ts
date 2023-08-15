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

  try {
    const response = await fetch(url)

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: `API error: ${response.statusText}`,
        },
      }
    }

    const data: Data = await response.json()
    const articles: Article[] = data.items[0].articles

    return {
      data: articles,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: {
        message: `API error: ${JSON.stringify(error) || error}`,
      },
    }
  }
}
