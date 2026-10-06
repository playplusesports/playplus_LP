import Link from "next/link"
import { CONTACT_CHANNELS } from "@/lib/site/company-profile"

type ContactBandProps = {
  title?: React.ReactNode
  lead?: React.ReactNode
}

// ページ末尾の相談導線。どのページでも同じ形で終える
export function ContactBand({
  title = "まずは、気軽にご相談ください。",
  lead = "「こんなことはできる？」くらいの段階で大丈夫です。初回のご相談は無料です。",
}: ContactBandProps) {
  return (
    <section className="theme-brand plus-pattern">
      <div className="site-container grid gap-10 py-20 md:py-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-fg-dim md:text-lg">{lead}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Link href={CONTACT_CHANNELS.form} className="btn-primary">
            お問い合わせフォーム
          </Link>
          <a href={CONTACT_CHANNELS.line} target="_blank" rel="noopener noreferrer" className="btn-secondary border-white/40">
            LINEで相談する
          </a>
        </div>
      </div>
    </section>
  )
}
