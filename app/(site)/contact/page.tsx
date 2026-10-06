import type { Metadata } from "next"
import { ContactForm } from "@/components/site/contact-form"
import { PageIntro } from "@/components/site/page-intro"
import { COMPANY_PROFILE, CONTACT_CHANNELS } from "@/lib/site/company-profile"

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "Play+ へのお問い合わせ。Webサイト制作、アプリ開発、AI・自動化、動画制作、イベントのご相談を無料で承ります。",
  alternates: { canonical: "/contact" },
}

const QUICK_ANSWERS: readonly { question: string; answer: string }[] = [
  { question: "返信にかかる時間は？", answer: "2営業日以内にご連絡します。" },
  { question: "何も決まっていなくても大丈夫？", answer: "もちろんです。ざっくりしたイメージで構いません。" },
  { question: "相談料はかかりますか？", answer: "初回のご相談は無料です。" },
]

export default function ContactPage() {
  return (
    <>
      <PageIntro
        code="CONTACT"
        title="ご相談はこちらから"
        lead="ご質問・お見積り・「こんなことできる？」まで、お気軽にどうぞ。初回のご相談は無料です。"
        crumbs={[{ label: "contact", href: "/contact" }]}
      />
      <section className="py-16 md:py-24">
        <div className="site-container grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <ContactForm />

          <aside className="space-y-10">
            <div>
              <p className="pixel-label mb-4">OTHER CHANNELS</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={CONTACT_CHANNELS.line}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-line bg-ink-1 p-5 transition-colors hover:border-play"
                  >
                    <span className="block font-bold">LINEで相談</span>
                    <span className="mt-1 block text-sm text-text-dim">写真や資料もそのまま送れます</span>
                  </a>
                </li>
                <li className="rounded-lg border border-line bg-ink-1 p-5">
                  <span className="block font-bold">メール</span>
                  <a href={`mailto:${COMPANY_PROFILE.email}`} className="text-link mt-1 block text-sm">
                    {COMPANY_PROFILE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT_CHANNELS.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-line bg-ink-1 p-5 transition-colors hover:border-play"
                  >
                    <span className="block font-bold">X（旧Twitter）</span>
                    <span className="mt-1 block text-sm text-text-dim">DMでもお気軽にどうぞ</span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="pixel-label mb-4">Q&amp;A</p>
              <dl className="space-y-5">
                {QUICK_ANSWERS.map((item) => (
                  <div key={item.question}>
                    <dt className="font-bold">{item.question}</dt>
                    <dd className="mt-1 text-sm text-text-dim">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
