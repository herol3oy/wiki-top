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
        <div className="relative">
          <header className="absolute inset-x-0 top-0 z-50 flex justify-between">
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
          </header>
        </div>
        <div className="relative isolate pt-36">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff66b2] to-[#ffc0cb] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          {children}
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#8aeab6] to-[#56d170] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
      </body>
    </html>
  )
}
