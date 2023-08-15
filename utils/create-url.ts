import { formatDate } from '@/utils/format-dates'

interface BaseUrlProps {
  selectedLanguageCode: string
  selectedDate: string
}

function createUrl({ selectedDate, selectedLanguageCode }: BaseUrlProps) {
  const { day, month, year } = formatDate(selectedDate)

  const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/${selectedLanguageCode}.wikipedia.org/all-access/${year}/${month}/${day}`

  return url
}

export default createUrl
