interface BaseUrlProps {
  language: string
  year: number
  month: string
  day: string
}

function createUrl({ year, month, day, language }: BaseUrlProps) {
  const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/${language}.wikipedia.org/all-access/${year}/${month}/${day}`

  return url
}

export default createUrl
