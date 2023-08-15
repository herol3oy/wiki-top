import Image from 'next/image'

export default function SpinningLogo() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center align-middle">
      <Image
        className="animate-spin"
        src="/wikipedia_logo.png"
        width={100}
        height={100}
        alt="Wikipedia logo"
      />
    </div>
  )
}
