'use client'

import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'

import ArticlesInfo from '@/components/ArticlesInfo'
import { DisplayMessage, DisplayMessageType } from '@/components/DisplayMessage'
import { ResourceType } from '@/components/HeroText'
import DuckDuckGoIcon from '@/components/icons/DuckDuckGo'
import GoogleIcon from '@/components/icons/Google'
import WikiPediaIcon from '@/components/icons/Wikipedia'
import Pagination from '@/components/Pagination'
import SelectForm from '@/components/SelectForm'
import { Article } from '@/types/article'
import requestArticles from '@/utils/request-articles'

const ITEMS_PER_PAGE = 50

const SEARCH_ENGINES_LINKS = [
  {
    label: 'Wikipedia',
    href: (selectedLanguageCode: string, article: string) =>
      `https://${selectedLanguageCode}.wikipedia.org/wiki/${article}`,
    icon: <WikiPediaIcon />,
  },
  {
    label: 'DuckDuckGo',
    href: (_: string, article: string) =>
      `https://duckduckgo.com/?q=${article}`,
    icon: <DuckDuckGoIcon />,
  },
  {
    label: 'Google',
    href: (_: string, article: string) =>
      `https://google.com/search?q=${article}`,
    icon: <GoogleIcon />,
  },
]

interface LanguagePageProps {
  searchParams: {
    language: string
    date: string
    resourceType?: ResourceType
    wikisource?: boolean
  }
}

function WikiPage({ searchParams }: LanguagePageProps) {
  const [currentPage, currentPageSet] = useState(1)
  const [articles, articlesSet] = useState<Article[] | null>([])

  const {
    language: selectedLanguageCode,
    date: selectedDate,
    resourceType,
    wikisource,
  } = searchParams

  const startPageIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endPageIndex = startPageIndex + ITEMS_PER_PAGE

  useEffect(() => {
    async function innerEffect() {
      if (resourceType) {
        const { data: articles } = await requestArticles({
          selectedDate,
          selectedLanguageCode,
          resourceType,
        })
        articlesSet(articles)
        currentPageSet(1)
      }

      if (wikisource) {
        const { data: articles } = await requestArticles({
          selectedDate,
          selectedLanguageCode,
          wikisource,
        })
        articlesSet(articles)
        currentPageSet(1)
      }
    }

    innerEffect()
  }, [selectedDate, selectedLanguageCode, resourceType, wikisource])

  return (
    <Fragment>
      <SelectForm />
      <ArticlesInfo
        articles={articles}
        currentPage={currentPage}
        selectedDate={selectedDate}
        selectedLanguageCode={selectedLanguageCode}
        resourceType={resourceType || ResourceType.ALL_ACCESS}
      />

      <div className="mx-auto table w-full rounded-xl md:w-2/3">
        <div className="table-header-group">
          <div className="table-row bg-slate-900 text-white">
            <div className="table-cell py-1">Rank</div>
            <div className="table-cell py-1">Views</div>
            <div className="table-cell py-1">Title</div>
            <div className="table-cell py-1">Discover</div>
          </div>
        </div>
        <div className="table-row-group">
          {articles?.length ? (
            articles
              .slice(startPageIndex, endPageIndex)
              .map((article: Article) => (
                <div
                  className="table-row divide-y divide-dashed divide-sky-500 p-10 transition hover:bg-slate-200 hover:text-slate-950"
                  key={article.article}
                >
                  <span className="table-cell py-1">{article.rank}</span>
                  <span className="table-cell py-1">{article.views}</span>
                  <span className="table-cell py-1">
                    <span> {article.article}</span>
                  </span>
                  <div className="table-cell py-1">
                    <span className="flex gap-3">
                      {SEARCH_ENGINES_LINKS.map((link) => (
                        <Link
                          key={link.label}
                          className="cursor-pointer transition hover:-translate-y-1"
                          href={link.href(
                            selectedLanguageCode,
                            article.article,
                          )}
                          target="_blank"
                        >
                          {link.icon}
                        </Link>
                      ))}
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <div className="table-row w-full">
              <DisplayMessage
                message="No article found!"
                type={DisplayMessageType.DANGER}
              />
            </div>
          )}
        </div>
      </div>
      <Pagination
        articles={articles}
        currentPage={currentPage}
        currentPageSet={currentPageSet}
        itemsPerPage={ITEMS_PER_PAGE}
        endPageIndex={endPageIndex}
      />
    </Fragment>
  )
}

export default WikiPage
