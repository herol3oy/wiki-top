'use client'

import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'

import ArticlesInfo from '@/components/ArticlesInfo'
import { DisplayMessage, DisplayMessageType } from '@/components/DisplayMessage'
import { ResourceType } from '@/components/HeroText'
import Pagination from '@/components/Pagination'
import SelectForm from '@/components/SelectForm'
import { Article } from '@/types/article'
import requestArticles from '@/utils/request-articles'

const ITEMS_PER_PAGE = 50

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
      <div className="table w-full rounded-xl">
        <div className="table-header-group">
          <div className="table-row bg-slate-900 text-white">
            <div className="table-cell p-2">Rank</div>
            <div className="table-cell p-2">Views</div>
            <div className="table-cell p-2">Title</div>
          </div>
        </div>
        <div className="table-row-group">
          {articles?.length ? (
            articles
              .slice(startPageIndex, endPageIndex)
              .map((article: Article) => (
                <Link
                  className="table-row divide-y divide-dashed p-10 transition hover:bg-slate-900 hover:text-white"
                  key={article.views}
                  href={`https://${selectedLanguageCode}.wikipedia.org/wiki/${article.article}`}
                >
                  <span className="table-cell p-3">{article.rank}</span>
                  <span className="table-cell p-3">{article.views}</span>
                  <span className="table-cell p-3">{article.article}</span>
                </Link>
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
