'use client'

import { useState } from 'react'

import ArticleCard from '@/components/ArticleCard'
import ArticlesContainer from '@/components/ArticlesContainer'
import SelectForm from '@/components/SelectForm'
import { Article } from '@/types/article'

export default function Home() {
  const [articles, articlesSet] = useState<Article[]>([])
  const [language, languageSet] = useState('')

  return (
    <>
      <SelectForm
        language={language}
        languageSet={languageSet}
        articlesSet={articlesSet}
      />
      <ArticlesContainer>
        {articles.map((article: Article) => (
          <ArticleCard
            key={article.article}
            article={article}
            language={language}
          />
        ))}
      </ArticlesContainer>
    </>
  )
}
