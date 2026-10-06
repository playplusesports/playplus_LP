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
      <br />
      プラスを。
    </>
  ),
  lead = "何も決まっていない段階でも大丈夫です。目的やご予算を伺って、いちばん近道になる形をご提案します。",
}: ContactBandProps) {
  return (
    <section className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="theme-brand plus-pattern relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -bottom-24 font-display text-[22rem] leading-none font-extrabold text-signal/90 md:-right-6 md:text-[30rem]"
        >
          +
        </span>
        <div className="site-container relative py-24 md:py-32">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-6 max-w-3xl text-4xl font-black leading-[1.1] tracking-tight sm:text-6xl md:text-7xl">{title}</h2>
          <p className="mt-8 max-w-xl leading-relaxed text-fg-dim md:text-lg">{lead}</p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href={CONTACT_CHANNELS.form} className="btn-primary">
              お問い合わせフォーム
            </Link>
            <a href={CONTACT_CHANNELS.line} target="_blank" rel="noopener noreferrer" className="btn-secondary border-white/30">
              LINEで気軽に相談
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
