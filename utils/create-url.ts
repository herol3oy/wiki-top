import { formatDate } from '@/utils/format-dates'

interface BaseUrlProps {
  language: string
  selectedDate: string
}

function createUrl({ selectedDate, language }: BaseUrlProps) {
  const { day, month, year } = formatDate(selectedDate)

  const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/${language}.wikipedia.org/all-access/${year}/${month}/${day}`

  return url
}

export default createUrl
