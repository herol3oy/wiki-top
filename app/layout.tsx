import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import GithubIcon from '@/components/icons/GithubIcon'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wiki Top',
  description: 'Check wiki top articles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`container mx-auto px-5 ${inter.className}`}>
        <nav className="mx-auto my-10 flex w-fit items-center justify-center gap-10 rounded-full bg-white/70 px-3 text-center align-middle text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
          <Link
            className="font-extrabold transition hover:text-gray-400"
            href="/"
          >
            Wiki Tops
          </Link>
          <Link
            className="z-50 cursor-pointer fill-black p-2 transition hover:-translate-y-1"
            href="https://github.com/herol3oy/wiki-top"
            target="_blank"
          >
            <GithubIcon />
          </Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
