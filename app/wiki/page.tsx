'use client'

import { notFound } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

import ArticleCard from '@/components/ArticleCard'
import ArticleContainer from '@/components/ArticleContainer'
import SelectForm from '@/components/SelectForm'
import SpinningLogo from '@/components/SpinningLogo'
import { Article } from '@/types/article'
import requestArticles from '@/utils/request-articles'

interface LanguagePageProps {
  searchParams: { language: string; date: string }
}

function WikiPage({ searchParams }: LanguagePageProps) {
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])

  const language = searchParams.language
  const selectedDate = searchParams.date

  useEffect(() => {
    async function innerEffect() {
      setLoading(true)
      const { data: articles } = await requestArticles({
        language,
        selectedDate,
      })
      if (!articles) {
        notFound()
      } else {
        setArticles(articles)
      }

      setLoading(false)
    }

    innerEffect()
  }, [language, selectedDate])

  return (
    <Fragment>
      <SelectForm />
      {loading ? (
        <SpinningLogo />
      ) : (
        <ArticleContainer>
          {articles.length
            ? articles.map((article: Article) => (
                <ArticleCard
                  key={article.article}
                  article={article}
                  language={language}
                />
              ))
            : 'No article found!'}
        </ArticleContainer>
      )}
    </Fragment>
  )
}

export default WikiPage
