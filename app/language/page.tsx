import ArticleCard from '@/components/ArticleCard'
import { Article } from '@/types/data'
import requestArticles from '@/utils/request-articles'

interface LanguagePageProps {
  searchParams: { lang: string }
}

async function LanguagePage({ searchParams }: LanguagePageProps) {
  const language = searchParams.lang
  const articles = await requestArticles(language)

  return (
    <section className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {articles.map((article: Article) => (
        <ArticleCard key={article.article} article={article} />
      ))}
    </section>
  )
}

export default LanguagePage
