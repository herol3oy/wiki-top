import ArticleCard from '@/components/ArticleCard'
import { Article } from '@/types/data'
import requestArticles from '@/utils/request-articles'

interface LanguagePageProps {
  searchParams: { lang: string; day: string; month: string; year: number }
}

async function LanguagePage({ searchParams }: LanguagePageProps) {
  const language = searchParams.lang
  const day = searchParams.day
  const month = searchParams.month
  const year = searchParams.year

  const firstColumnarticles = await requestArticles({
    language,
    day,
    month,
    year,
  })

  return (
    <main className="flex gap-5">
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-4">
        {firstColumnarticles.map((article: Article) => (
          <ArticleCard
            key={article.article}
            article={article}
            lang={language}
          />
        ))}
      </div>
    </main>
  )
}

export default LanguagePage
