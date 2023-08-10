import Link from 'next/link'
import { chromium } from 'playwright'

export default async function ArticlePage({
  params,
}: {
  params: { article: string }
}) {
  const slug = params.article

  const browser = await chromium.launch({
    headless: true,
  })
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto(`https://pl.wikipedia.org/wiki/${slug}`)

  const firstParagraph = await page.$eval(
    '.mw-parser-output > p',
    (element) => element.textContent,
  )

  await context.close()
  await browser.close()

  return (
    <>
      <Link href={`https://pl.wikipedia.org/wiki/${slug}`}>
        {`https://pl.wikipedia.org/wiki/${slug}`}
      </Link>

      <hr />
      <p>{firstParagraph}</p>
    </>
  )
}
