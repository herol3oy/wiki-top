export function getYesterdayDate() {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const year = yesterday.getFullYear()
  const month = String(yesterday.getMonth() + 1).padStart(2, '0')
  const day = String(yesterday.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const formatDate = (selectedDate: string) => {
  const date = new Date(selectedDate)

  const selectedDay = date.getDate().toString().padStart(2, '0')
  const month = date.getMonth() + 1
  const selectedMonth = month.toString().padStart(2, '0')
  const selectedYear = date.getFullYear()

  return { selectedDay, selectedMonth, selectedYear }
}
