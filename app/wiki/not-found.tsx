import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="primary-light-color">
      <h2>Not Found ❌</h2>
      <p>Could not find requested resource</p>
      <Link className="hover:underline" href="/">
        Return Home
      </Link>
    </div>
  )
}
