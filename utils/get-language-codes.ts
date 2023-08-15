import { LanguageCode } from '@/app/api/getLanguageCodes/route'

export const getLanguageCodes = async () => {
  const data = await fetch('/api/getLanguageCodes')
  const { languageCodes }: { languageCodes: LanguageCode[] } = await data.json()

  return languageCodes
}
