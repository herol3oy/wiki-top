export const formatDate = (selectedDate: string) => {
  const date = new Date(selectedDate)
  const day = date.getDate().toString().padStart(2, '0')
  const currentMonth = date.getMonth() + 1
  const month = currentMonth.toString().padStart(2, '0')
  const year = date.getFullYear()

  return { day, month, year }
}
