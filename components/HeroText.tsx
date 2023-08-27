import { formatDateWithMonthInWords } from '@/utils/format-date-with-month-in-words'

export enum ResourceType {
  ALL_ACCESS = 'all-access',
  MOBILE_APP = 'mobile-app',
}

interface HeroTextProps {
  resourceType: string
  wikisource: boolean
  language: string
  selectedDate: string
}

export function HeroText({
  resourceType,
  wikisource,
  language,
  selectedDate,
}: HeroTextProps) {
  return (
    <h1 className="w-full text-center text-xl font-extrabold leading-loose md:w-7/12 md:text-5xl">
      {!wikisource ? (
        resourceType === ResourceType.ALL_ACCESS ? (
          <>
            Get the top 1000 articles from{' '}
            {language ? (
              <small className="w-10 rounded bg-pink-300 p-2 text-pink-900">
                {language}
              </small>
            ) : (
              <small className="rounded bg-pink-300 p-2 text-white shadow-md">
                ?
              </small>
            )}
            .wikipedia visited via{' '}
            <span className="bg-gradient-to-br from-orange-400 to-red-600 bg-clip-text text-transparent">
              all devices
            </span>{' '}
            on{' '}
            {selectedDate ? (
              <small className="w-full rounded bg-pink-300 p-2 text-pink-900">
                {formatDateWithMonthInWords(selectedDate)}
              </small>
            ) : (
              <small className="rounded bg-pink-300 p-2 text-white shadow-md">
                ?
              </small>
            )}
          </>
        ) : (
          <>
            Get the top 1000 articles from{' '}
            {language ? (
              <small className="w-10 rounded bg-pink-300 p-2 text-pink-900">
                {language}
              </small>
            ) : (
              <small className="animate-puls shadow-mde rounded bg-pink-300 p-2 text-white">
                ?
              </small>
            )}
            .wikipedia visited via the{' '}
            <span className="bg-gradient-to-br from-orange-400 to-red-600 bg-clip-text text-transparent">
              mobile app
            </span>{' '}
            on{' '}
            {selectedDate ? (
              <small className="w-full rounded bg-pink-300 p-2 text-pink-900">
                {formatDateWithMonthInWords(selectedDate)}
              </small>
            ) : (
              <small className="rounded bg-pink-300 p-2 text-white shadow-md">
                ?
              </small>
            )}
          </>
        )
      ) : (
        <>
          Get the top 1000 most visited articles from{' '}
          {language ? (
            <small className="w-10 rounded bg-pink-300 p-2 text-pink-900">
              {language}
            </small>
          ) : (
            <small className="animate-puls shadow-mde rounded bg-pink-300 p-2 text-white">
              ?
            </small>
          )}
          .wikisource for all days in{' '}
          {selectedDate ? (
            <small className="w-full rounded bg-pink-300 p-2 text-pink-900">
              {formatDateWithMonthInWords(selectedDate)}
            </small>
          ) : (
            <small className="animate-puls shadow-mde rounded bg-pink-300 p-2 text-white">
              ?
            </small>
          )}
        </>
      )}
    </h1>
  )
}

export default HeroText
