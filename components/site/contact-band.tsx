import Link from "next/link"
import { CONTACT_CHANNELS } from "@/lib/site/company-profile"

type ContactBandProps = {
  title?: React.ReactNode
  lead?: React.ReactNode
}

// ページ末尾の相談導線。どのページでも同じ形で終える
export function ContactBand({
  title = (
    <>
      その「やりたい」に、
      <br className="sm:hidden" />
      プラスを。
    </>
  ),
  lead = "何も決まっていない段階でも大丈夫です。目的やご予算を伺って、いちばん近道になる形をご提案します。",
}: ContactBandProps) {
  return (
    <section className="relative overflow-hidden border-t border-line bg-brand">
      <div className="plus-pattern absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="site-container relative py-20 md:py-28">
        <p className="pixel-label text-white/70">CONTACT</p>
        <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">{title}</h2>
        <p className="mt-5 max-w-xl leading-relaxed text-white/75">{lead}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href={CONTACT_CHANNELS.form} className="btn-signal">
            お問い合わせフォーム
          </Link>
          <a
            href={CONTACT_CHANNELS.line}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline border-white/40 hover:border-white"
          >
            LINEで気軽に相談
          </a>
        </div>
      </div>
    </section>
  )
}
