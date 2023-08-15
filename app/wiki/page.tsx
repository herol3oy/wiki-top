import { notFound } from 'next/navigation'
import { Fragment } from 'react'

import ArticleCard from '@/components/ArticleCard'
import ArticleContainer from '@/components/ArticleContainer'
import { DisplayMessage, DisplayMessageType } from '@/components/DisplayMessage'
import SelectForm from '@/components/SelectForm'
import { Article } from '@/types/article'
import requestArticles from '@/utils/request-articles'

interface LanguagePageProps {
  searchParams: { language: string; date: string }
}

async function WikiPage({ searchParams }: LanguagePageProps) {
  const selectedLanguageCode = searchParams.language
  const selectedDate = searchParams.date

  const { data: articles } = await requestArticles({
    selectedDate,
    selectedLanguageCode,
  })

  if (!articles) notFound()

  return (
    <Fragment>
      <SelectForm />
      <ArticleContainer>
        {articles.length ? (
          articles.map((article: Article) => (
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
    </Fragment>
  )
}

export default WikiPage
