import { Article } from './article'

export interface Item {
  project: string
  access: string
  year: string
  month: string
  day: string
  articles: Article[]
}
