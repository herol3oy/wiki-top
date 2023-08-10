interface BaseUrlProps {
  currentYear: number
  formattedMonth: string
  formattedPreviousDay: string
}

function baseUrl({
  currentYear,
  formattedMonth,
  formattedPreviousDay,
}: BaseUrlProps) {
  return `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/pl.wikipedia.org/all-access/${currentYear}/${formattedMonth}/${formattedPreviousDay}`
}

export default baseUrl
