import type { Metadata } from "next"
import { ContactBand } from "@/components/site/contact-band"
import { PageIntro } from "@/components/site/page-intro"
import { SectionHeading } from "@/components/site/section-heading"
import { COMPANY_PROFILE, CONTACT_CHANNELS } from "@/lib/site/company-profile"
import { SERVICE_PILLARS } from "@/lib/site/service-pillars"

export const metadata: Metadata = {
  title: "Play+について",
  description: "Play+（プレイプラス）のコンセプト「遊びに、プラスを。」と、これまでの歩み、事業者情報をご紹介します。",
  alternates: { canonical: "/about" },
}

const MILESTONES: readonly { period: string; title: string; description: string }[] = [
  {
    period: "2023",
    title: "eスポーツ大会「INNOSUMA!!」を開始",
    description: "代表が趣味で始めた月1回の大会。普段は20名ほど、大型回には100名近くが集まるイベントに育ちました。Play+ の原点です。",
  },
  {
    period: "2023",
    title: "デザイン制作を本格的に",
    description: "大会や企業・団体のロゴ、ポスター、SNS用デザインを手がけるようになりました。",
  },
  {
    period: "2026",
    title: "Web制作・集客支援を開始",
    description: "店舗や中小企業のWebサイトを月額で制作・運用するサービスと、MEO / LLMO 対策を始めました。",
  },
  {
    period: "2026",
    title: "アプリ・AI・動画へ広げる",
    description:
      "マッチングや投稿プラットフォームなどの自社サービスを次々に公開。動画の自動制作やニュースの自動更新など、毎日動く仕組みを運用しています。",
  },
]

export default function AboutPage() {
  const companyFacts = [
    { label: "名称", value: `${COMPANY_PROFILE.name}（${COMPANY_PROFILE.alternateName}）` },
    { label: "代表", value: COMPANY_PROFILE.representative },
    { label: "拠点", value: `${COMPANY_PROFILE.area}（全国オンライン対応）` },
    { label: "活動開始", value: COMPANY_PROFILE.activitySince },
    { label: "事業内容", value: SERVICE_PILLARS.map((pillar) => pillar.title).join(" / ") },
    { label: "メール", value: COMPANY_PROFILE.email },
    { label: "電話", value: COMPANY_PROFILE.telephone },
  ]

  return (
    <>
      <PageIntro code="ABOUT" title={COMPANY_PROFILE.concept} crumbs={[{ label: "about", href: "/about" }]} />

      <section className="py-20 md:py-28">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <p className="font-display text-[clamp(8rem,22vw,16rem)] font-extrabold leading-none text-signal" aria-hidden="true">
            +
          </p>
          <div className="space-y-6 text-lg leading-loose text-fg/90">
            <p>
              Play+ の名前は、<strong className="text-fg">Play（遊び）</strong>に<strong className="text-fg">＋（プラス）</strong>
              を足すことから来ています。ロゴの「＋」は、ゲームのコントローラーの十字キーです。
            </p>
            <p>
              ゲーム大会の会場で、人が夢中になる瞬間を何度も見てきました。うまく設計された体験には、人を動かす力があります。その力を、Webサイトにも、アプリにも、AIの仕組みにも持ち込みたい。それが
              Play+ の仕事です。
            </p>
            <p>
              「便利」に「楽しい」をひとつ足す。くり返しの作業は仕組みに任せて、人は考えることと楽しむことに時間を使う。そんな“プラス”を、関わるすべての人に届けます。
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface-1/40 py-20 md:py-28">
        <div className="site-container">
          <SectionHeading index="01" code="HISTORY" title="これまでの歩み" />
          <ol className="relative border-l border-line-strong pl-8">
            {MILESTONES.map((milestone) => (
              <li key={milestone.title} className="relative pb-12 last:pb-0">
                <span
                  className="absolute -left-[41px] top-0 font-display text-2xl font-extrabold leading-none text-signal"
                  aria-hidden="true"
                >
                  +
                </span>
                <p className="font-mono text-sm text-play">{milestone.period}</p>
                <h3 className="mt-2 text-xl font-bold">{milestone.title}</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-fg-dim">{milestone.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="site-container">
          <SectionHeading index="02" code="PROFILE" title="事業者情報" />
          <dl className="border-t border-line">
            {companyFacts.map((fact) => (
              <div key={fact.label} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-sm text-fg-dim">{fact.label}</dt>
                <dd className="leading-relaxed">{fact.value}</dd>
              </div>
            ))}
            <div className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-sm text-fg-dim">SNS</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1">
                <a href={CONTACT_CHANNELS.x} target="_blank" rel="noopener noreferrer" className="text-link">
                  X
                </a>
                <a href={CONTACT_CHANNELS.instagram} target="_blank" rel="noopener noreferrer" className="text-link">
                  Instagram
                </a>
                <a href={CONTACT_CHANNELS.note} target="_blank" rel="noopener noreferrer" className="text-link">
                  note
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <ContactBand />
    </>
  )
}
