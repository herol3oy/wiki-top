export function getYesterdayDate(wikisource: boolean) {
  const today = new Date()

  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const year = yesterday.getFullYear()
  const month = String(yesterday.getMonth() + 1).padStart(2, '0')
  const day = String(yesterday.getDate()).padStart(2, '0')

  if (wikisource) {
    const wikisourceDate = new Date(year, yesterday.getMonth(), 1)
    wikisourceDate.setMonth(yesterday.getMonth() - 1)

    const wikisourceYear = wikisourceDate.getFullYear()
    const wikisourceMonth = String(wikisourceDate.getMonth() + 1).padStart(
      2,
      '0',
    )

    return `${wikisourceYear}-${wikisourceMonth}`
  } else {
    return `${year}-${month}-${day}`
  }
}
