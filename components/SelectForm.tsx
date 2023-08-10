'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Language } from '@/types/language'
import { formatDate, getYesterdayDate } from '@/utils/format-dates'

function SelectForm() {
  const [language, languageSet] = useState('')
  const [selectedDate, selectedDateSet] = useState('')
  const [disabledSearch, disabledSearchSet] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!language.length || !selectedDate.length) {
      disabledSearchSet(true)
    } else {
      disabledSearchSet(false)
    }
  }, [language, selectedDate])

  const getUrl = (lang: string) => {
    const { selectedDay, selectedMonth, selectedYear } =
      formatDate(selectedDate)
    return `/wikiTopArticles?lang=${lang}&day=${selectedDay}&month=${selectedMonth}&year=${selectedYear}`
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (language.length) {
      router.push(getUrl(language))
    }
  }

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit} method="GET">
      <div className="">
        <label className="flex w-72 flex-col gap-2" htmlFor="language">
          <span className="text-gray-700">Language</span>
          <select
            value={language}
            onChange={(e) => languageSet(e.target.value)}
            name="language"
            id="language"
          >
            <option value="">Select a language</option>
            {Object.values(Language).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </label>

        <label className="flex w-72 flex-col gap-2" htmlFor="date">
          <span className="text-gray-700">Select date</span>
          <input
            type="date"
            value={selectedDate}
            max={getYesterdayDate()}
            onChange={(e) => selectedDateSet(e.target.value)}
          />
        </label>
      </div>

      <button
        className={`h-fit max-h-fit w-64 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm transition ${
          disabledSearch
            ? 'cursor-not-allowed bg-gray-500'
            : 'bg-slate-900 hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600'
        }`}
        type="submit"
        disabled={disabledSearch}
      >
        Search
      </button>
    </form>
  )
}
export default SelectForm
