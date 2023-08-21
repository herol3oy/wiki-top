import { ResourceType } from '@/components/SelectForm'
import { Article } from '@/types/article'
import { Data } from '@/types/data'

import createUrl from './create-url'

interface RequestArticlesProps {
  selectedLanguageCode: string
  selectedDate: string
  resourceType?: ResourceType
  wikisource?: boolean
}

export default async function requestArticles({
  selectedLanguageCode,
  selectedDate,
  resourceType,
  wikisource,
}: RequestArticlesProps) {
  let url = ''
  if (resourceType) {
    url = createUrl({
      selectedDate,
      selectedLanguageCode,
      resourceType,
    })
  }

  if (wikisource) {
    url = createUrl({
      selectedDate,
      selectedLanguageCode,
      wikisource,
    })
  }
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
