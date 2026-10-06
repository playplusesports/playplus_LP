import type { Metadata } from "next"
import Image from "next/image"
import { ContactBand } from "@/components/site/contact-band"
import { PageIntro } from "@/components/site/page-intro"
import { SectionHeading } from "@/components/site/section-heading"
import { COMPANY_PROFILE, CONTACT_CHANNELS } from "@/lib/site/company-profile"
import { SERVICE_PILLARS } from "@/lib/site/service-pillars"

export const metadata: Metadata = {
  title: "Play+について",
  description: "Play+（プレイプラス）の名前の由来と、これまでの活動、事業者情報です。",
  alternates: { canonical: "/about" },
}

const LOGO_SIZE_PX = 160

const MILESTONES: readonly { period: string; title: string; description: string }[] = [
  {
    period: "2023年",
    title: "毎月のeスポーツ大会を始める",
    description: "代表が趣味で始めた月1回の大会です。普段は20名ほど、大きな回では100名近くが参加しています。",
  },
  {
    period: "2023年",
    title: "ロゴやポスターのデザインを始める",
    description: "大会や企業・団体のロゴ、告知用のポスター、SNS用の画像を制作するようになりました。",
  },
  {
    period: "2026年",
    title: "Webサイトの制作と集客支援を始める",
    description: "お店や会社のWebサイトを月額で制作・更新するサービスと、Googleマップの表示対策を始めました。",
  },
  {
    period: "2026年",
    title: "アプリと動画の制作を始める",
    description: "マッチングサービスや投稿サイトなどの自社サービスを公開し、YouTubeチャンネルの運営も始めました。",
  },
]

export default function AboutPage() {
  const companyFacts = [
    { label: "名称", value: `${COMPANY_PROFILE.name}（${COMPANY_PROFILE.alternateName}）` },
    { label: "代表", value: COMPANY_PROFILE.representative },
    { label: "拠点", value: `${COMPANY_PROFILE.area}（打ち合わせはオンラインで全国対応）` },
    { label: "活動開始", value: COMPANY_PROFILE.activitySince },
    { label: "事業内容", value: SERVICE_PILLARS.map((pillar) => pillar.title).join("、") },
    { label: "メール", value: COMPANY_PROFILE.email },
    { label: "電話", value: COMPANY_PROFILE.telephone },
  ]

  return (
    <>
      <PageIntro title="Play+について" crumbs={[{ label: "Play+について", href: "/about" }]} />

      <section className="py-20 md:py-28">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">{COMPANY_PROFILE.concept}</h2>
            <Image
              src="/brand/mark.png"
              alt="Play+ のロゴ。Pの文字と、ゲームの十字キーの形をした「＋」"
              width={LOGO_SIZE_PX}
              height={LOGO_SIZE_PX}
              className="mt-10 rounded-full"
            />
          </div>
          <div className="space-y-6 leading-[1.9] text-fg/90 md:text-lg md:leading-[1.9]">
            <p>
              Play+
              という名前は、Play（遊び）に＋（プラス）を足したものです。ロゴの「＋」は、ゲームのコントローラーの十字キーをかたどっています。
            </p>
            <p>
              はじまりは、2023年に始めた毎月のeスポーツ大会でした。いまも大会の運営を続けながら、お店や会社のWebサイト、Webアプリ、YouTube向けの動画をつくっています。
            </p>
            <p>使う人が楽しめるか、続けやすいか。どの仕事でも、そこを一緒に考えながら進めています。</p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="site-container">
          <SectionHeading title="これまでの活動" />
          <ol className="border-t border-line">
            {MILESTONES.map((milestone) => (
              <li key={milestone.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-[8rem_16rem_1fr] md:gap-8">
                <p className="text-sm font-bold text-signal">{milestone.period}</p>
                <h3 className="font-bold">{milestone.title}</h3>
                <p className="leading-relaxed text-fg-dim">{milestone.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="site-container">
          <SectionHeading title="事業者情報" />
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
