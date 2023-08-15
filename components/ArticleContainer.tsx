import { PropsWithChildren } from 'react'

export default function ArticleContainer({ children }: PropsWithChildren) {
  return (
    <section className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {children}
    </section>
  )
}
