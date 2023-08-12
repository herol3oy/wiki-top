import { PropsWithChildren } from 'react'

export default function ArticlesContainer({ children }: PropsWithChildren) {
  return (
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-4">
      {children}
    </div>
  )
}
