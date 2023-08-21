import { ResourceType } from '@/components/SelectForm'
import { formatDate } from '@/utils/format-dates'

interface BaseUrlProps {
  selectedLanguageCode: string
  selectedDate: string
  resourceType?: ResourceType
  wikisource?: boolean
}

function createUrl({
  selectedDate,
  selectedLanguageCode,
  resourceType,
  wikisource,
}: BaseUrlProps) {
  const { day, month, year } = formatDate(selectedDate)
  let url = ''

  if (wikisource) {
    url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/${selectedLanguageCode}.wikisource/all-access/${year}/${month}/all-days`
  }

  if (resourceType) {
    url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/${selectedLanguageCode}.wikipedia.org/${resourceType}/${year}/${month}/${day}`
  }

  return url
}

export default createUrl
