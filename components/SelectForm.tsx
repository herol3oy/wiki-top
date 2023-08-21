'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { LanguageCode } from '@/app/api/getLanguageCodes/route'
import { formatDateWithMonthInWords } from '@/utils/format-date-with-month-in-words'
import { formatDate } from '@/utils/format-dates'
import { getLanguageCodes } from '@/utils/get-language-codes'
import { getYesterdayDate } from '@/utils/get-yesterday-date'

export enum ResourceType {
  ALL_ACCESS = 'all-access',
  MOBILE_APP = 'mobile-app',
}

export default function SelectForm() {
  const [language, languageSet] = useState('')
  const [resourceType, resourceTypeSet] = useState('')
  const [wikisource, wikisourceSet] = useState(false)
  const [selectedDate, selectedDateSet] = useState('')
  const [disabledSearch, disabledSearchSet] = useState(false)
  const [languageCode, languageCodeSet] = useState<LanguageCode[]>([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => selectedDateSet(''), [wikisource])

  useEffect(() => {
    if (
      !language.length ||
      !selectedDate.length ||
      (!wikisource && !resourceType.length)
    ) {
      disabledSearchSet(true)
    } else {
      disabledSearchSet(false)
    }
  }, [language, selectedDate, wikisource, resourceType])

  useEffect(() => {
    async function innerEffect() {
      setLoading(true)

      const languageCodes = await getLanguageCodes()
      languageCodeSet(languageCodes)

      const languageCodesJSON = JSON.stringify(languageCodes)
      localStorage.setItem('languageCodes', languageCodesJSON)

      setLoading(false)
    }

    const languageCodesJSON = localStorage.getItem('languageCodes')
    if (languageCodesJSON) {
      const parsedLanguageCodes: LanguageCode[] = JSON.parse(languageCodesJSON)
      languageCodeSet(parsedLanguageCodes)
    } else {
      innerEffect()
    }
  }, [])

  const getUrl = (language: string) => {
    const { day, month, year } = formatDate(selectedDate)

    if (wikisource) {
      return `/wiki?language=${language}&wikisource=${wikisource}&date=${month}-${day}-${year}`
    } else {
      return `/wiki?language=${language}&resourceType=${resourceType}&date=${month}-${day}-${year}`
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (language.length && selectedDate.length) {
      router.push(getUrl(language))
    }
  }

  return (
    <form
      className="my-10 flex w-full flex-col items-center justify-center gap-10"
      onSubmit={handleSubmit}
      method="GET"
    >
      <pre>
        {JSON.stringify(
          { resourceType, language, selectedDate, wikisource },
          null,
          2,
        )}
      </pre>
      {!wikisource
        ? resourceType === ResourceType.ALL_ACCESS
          ? `Get the top 1000 most visited articles from ${language}.wikipedia for ${formatDateWithMonthInWords(
              selectedDate,
            )}`
          : `Get the top 1000 articles from ${language}.wikipedia visited via the mobile app on ${formatDateWithMonthInWords(
              selectedDate,
            )}`
        : `Get the top 1000 most visited articles from ${language}.wikisource for all days in ${formatDateWithMonthInWords(
            selectedDate,
          )}`}

      <div className="flex flex-col justify-center gap-5 md:flex md:flex-row">
        <label className="flex w-72 flex-col gap-2" htmlFor="resourceType">
          <span className="text-gray-700">Select resource type</span>
          <select
            value={resourceType}
            onChange={(e) => resourceTypeSet(e.target.value)}
            name="resourceType"
            id="resourceType"
            disabled={wikisource}
          >
            <option value="">Resource type</option>
            <option value="all-access">all-access</option>
            <option value="mobile-app">mobile-app</option>
          </select>
        </label>

        <label className="flex w-72 flex-col gap-2" htmlFor="language">
          <span className="text-gray-700">Select a language</span>
          <select
            value={language}
            onChange={(e) => languageSet(e.target.value)}
            name="language"
            id="language"
            disabled={loading}
            className={loading ? 'cursor-not-allowed' : ''}
          >
            <option value="">
              {loading ? 'Getting language codes...' : 'Language'}
            </option>
            {languageCode.length &&
              languageCode.map((lang) => (
                <option key={lang.id} value={lang.code}>
                  {lang.language}
                </option>
              ))}
          </select>
        </label>

        <label className="flex w-72 flex-col gap-2" htmlFor="date">
          <span className="text-gray-700">Select a date</span>
          <input
            type={wikisource ? 'month' : 'date'}
            value={selectedDate}
            max={getYesterdayDate(wikisource)}
            onChange={(e) => selectedDateSet(e.target.value)}
          />
        </label>

        <label className="flex w-72 gap-2" htmlFor="wikisource">
          <input
            className="disabled:cursor-not-allowed"
            type="checkbox"
            checked={wikisource}
            onChange={() => wikisourceSet(!wikisource)}
            name="wikisource"
            id="wikisource"
            disabled={!!resourceType.length}
          />
          <span className="text-gray-700">Wikisource</span>
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
