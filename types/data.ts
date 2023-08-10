interface Data {
  items: Item[]
}

interface Item {
  project: string
  access: string
  year: string
  month: string
  day: string
  articles: Article[]
}

interface Article {
  article: string
  views: number
  rank: number
}

export type { Article, Data }
