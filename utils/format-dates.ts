const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1
const formattedMonth = currentMonth.toString().padStart(2, '0')
const today = new Date()
today.setDate(today.getDate() - 1)
const previousDay = today.getDate()
const formattedPreviousDay = previousDay.toString().padStart(2, '0')

export { currentYear, formattedMonth, formattedPreviousDay }
