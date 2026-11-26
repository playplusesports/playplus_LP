import Image from "next/image"
import Link from "next/link"

const MARK_SIZE_PX = 34

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="プレイプラスのトップへ">
      <Image src="/brand/mark.png" alt="" width={MARK_SIZE_PX} height={MARK_SIZE_PX} priority className="rounded-full" />
      <span className="text-[1.3rem] font-black leading-none tracking-[-0.04em]">
        プレイ<span className="text-signal">プラス</span>
      </span>
    </Link>
  )
}
