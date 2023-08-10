'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Language } from '@/types/language'

function SelectForm() {
  const [language, languageSet] = useState('')
  const [disabledSearch, setDisabledSearch] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!language.length) {
      setDisabledSearch(true)
    } else {
      setDisabledSearch(false)
    }
  }, [language])

  const getUrl = (lang: string) => {
    return `/language?lang=${lang}`
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (language.length) {
      router.push(getUrl(language))
    }
  }

  return (
    <form onSubmit={handleSubmit} method="GET">
      <label htmlFor="language">Language</label>
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

      <div className="flex w-auto flex-col">
        <button
          className={`h-fit max-h-fit w-64 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
            disabledSearch
              ? 'cursor-not-allowed bg-gray-500'
              : 'bg-slate-900 hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600'
          }`}
          type="submit"
          disabled={disabledSearch}
        >
          Search
        </button>
      </div>
    </form>
  )
}
export default SelectForm
