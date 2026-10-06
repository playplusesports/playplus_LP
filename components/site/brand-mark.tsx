import Image from "next/image"
import Link from "next/link"

const MARK_SIZE_PX = 36

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Play+ トップへ">
      <Image src="/brand/mark.png" alt="" width={MARK_SIZE_PX} height={MARK_SIZE_PX} priority className="rounded-full" />
      <span className="font-pixel text-xl leading-none tracking-wide text-white">Play+</span>
    </Link>
  )
}
