import type { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/site/breadcrumb-schema"
import { ContactBand } from "@/components/site/contact-band"
import { FaqList, FaqSchema } from "@/components/site/faq-list"
import { PageIntro } from "@/components/site/page-intro"
import { PlanCard } from "@/components/site/plan-card"
import { SectionHeading } from "@/components/site/section-heading"
import { CONTACT_CHANNELS } from "@/lib/site/company-profile"
import { WEB_FAQS } from "@/lib/site/faqs"
import { WEB_CORPORATE_PLAN_POINTS, WEB_MONTHLY_PLANS, WEB_ONE_TIME_PLAN, WEB_OPTIONS } from "@/lib/site/pricing"

export const metadata: Metadata = {
  title: "Webサイト制作・保守運用 月額5,000円〜",
  description:
    "Play+ のWebサイト制作・保守運用。初期費用0円・月額5,000円から、制作・更新・集客までLINEでまるごとお任せいただけます。買い切りプラン・法人向けオーダーメイドにも対応。",
  alternates: { canonical: "/services/web" },
}

const WEB_FEATURES: readonly { title: string; description: string }[] = [
  { title: "AIを活用した高速制作", description: "LPから複数ページのサイトまで、短期間・低コストで制作します。" },
  { title: "スマホ・タブレット対応", description: "どの端末でも見やすいレスポンシブデザインで仕上げます。" },
  { title: "問い合わせ＋LINE導線", description: "フォームに加えてLINEへの導線も用意し、連絡の取りこぼしを防ぎます。" },
  { title: "更新はLINEで依頼", description: "お知らせやブログの更新は、内容をLINEで送るだけで対応します。" },
  { title: "SNS投稿文の作成", description: "AIを活用してInstagramやXの投稿文を毎月作成します。" },
  { title: "毎月のアクセスレポート", description: "訪問者数や検索からの流入を、わかりやすくまとめてお届けします。" },
]

const WEB_FLOW: readonly { title: string; description: string }[] = [
  { title: "無料相談（30分）", description: "お店の雰囲気や載せたい情報を伺います。Zoom・対面どちらでも。" },
  { title: "サイト制作（3〜5日）", description: "デザイン案をLINEでご確認いただきながら制作します。" },
  { title: "公開・契約開始", description: "公開後に月額プランがスタート。初回修正は1回まで無料です。" },
  { title: "毎月のサポート", description: "更新代行・投稿文・月次レポートをお届けします。" },
]

export default function WebServicePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "事業内容", path: "/services" },
          { name: "Webサイト制作・保守運用", path: "/services/web" },
        ]}
      />
      <FaqSchema faqs={WEB_FAQS} />

      <PageIntro
        code="WEB / SITE & CARE"
        title={
          <>
            Webサイト制作・
            <br className="sm:hidden" />
            保守運用
          </>
        }
        lead="制作から更新・集客まで、月額でまるごとお任せ。やり取りはLINEで完結するので、パソコンが苦手な方でも安心です。"
        crumbs={[
          { label: "services", href: "/services" },
          { label: "web", href: "/services/web" },
        ]}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={CONTACT_CHANNELS.line} target="_blank" rel="noopener noreferrer" className="btn-primary">
            LINEで無料相談
          </a>
          <a href="#plans" className="btn-secondary">
            料金プランを見る
          </a>
        </div>
      </PageIntro>

      <section className="py-20 md:py-28">
        <div className="site-container">
          <SectionHeading index="01" code="FEATURES" title="サービス内容" />
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {WEB_FEATURES.map((feature) => (
              <li key={feature.title} className="bg-surface-1 p-6 md:p-8">
                <h3 className="font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-dim">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="plans" className="border-t border-line bg-surface-1/40 py-20 md:py-28">
        <div className="site-container">
          <SectionHeading
            index="02"
            code="PLANS"
            title="料金プラン"
            lead="個人・個人事業主の方は月額または買い切り、法人のお客様はフルオーダーメイドの法人プランをご用意しています。"
          />

          <h3 className="eyebrow mb-6">月額プラン</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WEB_MONTHLY_PLANS.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="eyebrow mb-6">買い切り</h3>
              <PlanCard plan={WEB_ONE_TIME_PLAN} />
            </div>
            <div>
              <h3 className="eyebrow mb-6">法人プラン（お見積り）</h3>
              <div className="panel p-7">
                <p className="font-bold">ご要件に合わせて個別にご提案します</p>
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {WEB_CORPORATE_PLAN_POINTS.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm leading-snug">
                      <span className="font-display font-bold text-signal" aria-hidden="true">
                        +
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div id="options" className="mt-16">
            <h3 className="eyebrow mb-6">オプション</h3>
            <ul className="border-t border-line">
              {WEB_OPTIONS.map((option) => (
                <li key={option.name} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <div>
                    <p className="font-bold">{option.name}</p>
                    <p className="mt-1 text-sm text-fg-dim">{option.description}</p>
                  </div>
                  <p className="font-mono text-lg font-bold sm:text-right">{option.price}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 space-y-1 text-xs leading-relaxed text-fg-dim">
            <p>※ 表示価格はすべて税込です。</p>
            <p>※ 独自ドメイン・サーバー費用はプラン料金に含まれています。</p>
            <p>※ 内容によってはお見積りとなる場合があります。</p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="site-container">
          <SectionHeading index="03" code="FLOW" title="ご利用の流れ" />
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {WEB_FLOW.map((step, position) => (
              <li key={step.title} className="bg-surface-1 p-6 md:p-8">
                <p className="font-mono text-xs font-bold tracking-widest text-signal">STEP {position + 1}</p>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-dim">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading index="04" code="FAQ" title="よくある質問" />
          <FaqList faqs={WEB_FAQS} />
        </div>
      </section>

      <ContactBand
        title="まずは無料でご相談ください"
        lead="お店の雰囲気や載せたい情報をざっくり伺うところから始めます。LINEでもフォームでもお気軽に。"
      />
    </>
  )
}
