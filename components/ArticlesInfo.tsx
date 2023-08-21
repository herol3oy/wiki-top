import { Article } from '@/types/article'
import { formatDateWithMonthInWords } from '@/utils/format-date-with-month-in-words'

import { ResourceType } from './SelectForm'

interface ArticlesInfo {
  articles: Article[] | null
  selectedLanguageCode: string
  selectedDate: string
  currentPage: number
  resourceType: ResourceType
}

export default function ArticlesInfo({
  articles,
  selectedLanguageCode,
  selectedDate,
  currentPage,
  resourceType,
}: ArticlesInfo) {
  return (
    <div className="my-4 flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <small className="text-sm text-gray-600">
          Number of top articles: {` `}
          <span className="font-bold">{articles?.length}</span>
        </small>
        <small className="text-sm text-gray-600">
          Selected Language:{` `}
          <span className="font-semibold">{selectedLanguageCode}</span>
        </small>
        <small className="text-sm text-gray-600">
          Selected Date:{' '}
          <span className="font-semibold">
            {formatDateWithMonthInWords(selectedDate)}
          </span>
          {` `}
        </small>
        <small className="text-sm text-gray-600">
          Resource type: <span className="font-semibold">{resourceType}</span>
          {` `}
        </small>
        <div className="flex gap-2">
          <small className="text-xs text-gray-600">🔥 Rank</small>
          <small className="text-xs text-gray-600">👁️ Views</small>
        </div>
      </div>
      <span className="whitespace-nowrap rounded-full bg-zinc-100 px-2.5 py-0.5 text-sm text-zinc-700">
        Page {currentPage}
      </span>
    </div>
  )
}
