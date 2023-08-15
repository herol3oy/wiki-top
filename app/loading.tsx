import Image from 'next/image'

export default function Loading() {
  return (
    <div className="relative bottom-0 left-0 right-0 top-0 flex h-screen items-center justify-center align-middle">
      <Image
        className="absolute animate-spin"
        src="/wikipedia_logo.png"
        width={100}
        height={100}
        alt="Wikipedia logo"
      />
    </div>
  )
}
