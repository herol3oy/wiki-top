'use client'

import { Fragment, useEffect, useState } from 'react'

import ArticleCard from '@/components/ArticleCard'
import ArticleContainer from '@/components/ArticleContainer'
import ArticlesInfo from '@/components/ArticlesInfo'
import { DisplayMessage, DisplayMessageType } from '@/components/DisplayMessage'
import Pagination from '@/components/Pagination'
import SelectForm from '@/components/SelectForm'
import { Article } from '@/types/article'
import requestArticles from '@/utils/request-articles'

const ITEMS_PER_PAGE = 60

interface LanguagePageProps {
  searchParams: { language: string; date: string }
}

function WikiPage({ searchParams }: LanguagePageProps) {
  const [currentPage, currentPageSet] = useState(1)
  const [articles, articlesSet] = useState<Article[] | null>([])

  const { language: selectedLanguageCode, date: selectedDate } = searchParams

  const startPageIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endPageIndex = startPageIndex + ITEMS_PER_PAGE

  useEffect(() => {
    async function innerEffect() {
      const { data: articles } = await requestArticles({
        selectedDate,
        selectedLanguageCode,
      })
      articlesSet(articles)
      currentPageSet(1)
    }

    innerEffect()
  }, [selectedDate, selectedLanguageCode])

  return (
    <Fragment>
      <SelectForm />
      <ArticlesInfo
        articles={articles}
        currentPage={currentPage}
        selectedDate={selectedDate}
        selectedLanguageCode={selectedLanguageCode}
      />
      <ArticleContainer>
        {articles?.length ? (
          articles
            .slice(startPageIndex, endPageIndex)
            .map((article: Article) => (
              <ArticleCard
                key={article.article}
                article={article}
                language={selectedLanguageCode}
              />
            ))
        ) : (
          <DisplayMessage
            message="No article found!"
            type={DisplayMessageType.DANGER}
          />
        )}
      </ArticleContainer>
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
