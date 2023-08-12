'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Article } from '@/types/article'
import { Language } from '@/types/language'
import { getYesterdayDate } from '@/utils/get-yesterday-date'
import requestArticles from '@/utils/request-articles'

interface SelectFormProps {
  language: string
  languageSet: Dispatch<SetStateAction<string>>
  articlesSet: Dispatch<SetStateAction<Article[]>>
}

export default function SelectForm({
  language,
  languageSet,
  articlesSet,
}: SelectFormProps) {
  const [selectedDate, selectedDateSet] = useState('')
  const [disabledSearch, disabledSearchSet] = useState(false)

  useEffect(() => {
    if (!language.length || !selectedDate.length) {
      disabledSearchSet(true)
    } else {
      disabledSearchSet(false)
    }
  }, [language, selectedDate])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const articles = await requestArticles({
      language,
      selectedDate,
    })

    articlesSet(articles)
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
        className="h-fit max-h-fit w-64 rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:cursor-not-allowed disabled:bg-gray-500"
        type="submit"
        disabled={disabledSearch}
      >
        Search
      </button>
    </form>
  )
}
