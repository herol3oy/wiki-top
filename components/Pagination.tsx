import { Dispatch, SetStateAction } from 'react'

import { Article } from '@/types/article'

export default function Pagination({
  articles,
  currentPage,
  currentPageSet,
  itemsPerPage,
  endPageIndex: endIndex,
}: {
  articles: Article[] | null
  currentPage: number
  currentPageSet: Dispatch<SetStateAction<number>>
  itemsPerPage: number
  endPageIndex: number
}) {
  if (!articles?.length || articles.length <= itemsPerPage) {
    return null
  }

  const totalPages = Math.ceil(articles.length / itemsPerPage)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="my-10">
      <div className="flex items-center justify-center gap-6">
        <button
          className="rounded-md bg-zinc-300 p-2 text-zinc-900 transition hover:bg-zinc-900 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-zinc-300 disabled:hover:text-zinc-900"
          disabled={currentPage === 1}
          onClick={() => {
            currentPageSet(currentPage - 1)
            scrollToTop()
          }}
        >
          👈 Previous
        </button>

        <div className="hidden gap-2 md:flex">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`${
                currentPage === index + 1
                  ? 'bg-zinc-900 text-zinc-200'
                  : 'bg-zinc-300 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-200'
              } rounded-md p-2 transition`}
              onClick={() => {
                currentPageSet(index + 1)
                scrollToTop()
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className="rounded-md bg-zinc-300 p-2 text-zinc-900 transition hover:bg-zinc-900 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-zinc-300 disabled:hover:text-zinc-900"
          disabled={endIndex >= articles.length}
          onClick={() => {
            currentPageSet(currentPage + 1)
            scrollToTop()
          }}
        >
          Next 👉
        </button>
      </div>
    </section>
  )
}
