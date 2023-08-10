interface BaseUrlProps {
  currentYear: number
  formattedMonth: string
  formattedPreviousDay: string
  language: string
}

function createUrl({
  currentYear,
  formattedMonth,
  formattedPreviousDay,
  language,
}: BaseUrlProps) {
  return `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/${language}.wikipedia.org/all-access/${currentYear}/${formattedMonth}/${formattedPreviousDay}`
}

export default createUrl
