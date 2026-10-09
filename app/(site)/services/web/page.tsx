import type { Metadata } from "next"
import { AudienceTabs } from "@/components/site/audience-tabs"
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

// 業種別の見本サイトを並べた展示場（playplus/web-tenjijo）
const WEB_SHOWROOM_URL = "https://mihonichi.playplus.jp/"

const WEB_FEATURES: readonly { title: string; description: string }[] = [
  { title: "短い期間で制作", description: "1ページのサイトから複数ページのサイトまで、相談から最短1週間ほどで公開します。" },
  { title: "スマホ・タブレット対応", description: "どの端末でも見やすいレスポンシブデザインで仕上げます。" },
  { title: "問い合わせ＋LINE導線", description: "フォームに加えてLINEへの導線も用意し、連絡の取りこぼしを防ぎます。" },
  { title: "更新はLINEで依頼", description: "お知らせやブログの更新は、内容をLINEで送るだけで対応します。" },
  { title: "SNS投稿文の作成", description: "InstagramやXに載せる投稿文を、プランに応じて毎月お渡しします。" },
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
        title={
          <>
            Webサイト制作・
            <br className="sm:hidden" />
            保守運用
          </>
        }
        lead="制作から更新・集客まで、月額でまるごとお任せ。やり取りはLINEで完結するので、パソコンが苦手な方でも安心です。"
        crumbs={[
          { label: "事業内容", href: "/services" },
          { label: "Web制作・保守運用", href: "/services/web" },
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
          <SectionHeading title="サービス内容" />
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

      <section className="border-t border-line py-20 md:py-28">
        <div className="site-container">
          <SectionHeading
            align="split"
            title="見本サイトの展示場"
            lead="業種別に作った見本サイトを、実際に触って見られるページを用意しています。メニューを開いたり、スマホの幅で見たりできます。「この見本の感じで」と指さしてもらえると、打ち合わせが早く進みます。"
          />
          <a href={WEB_SHOWROOM_URL} target="_blank" rel="noopener" className="btn-secondary">
            展示場を見る（別サイトが開きます）
          </a>
        </div>
      </section>

      <section id="plans" className="border-t border-line bg-surface-1/40 py-20 md:py-28">
        <div className="site-container">
          <SectionHeading
            title="料金プラン"
            lead="個人・個人事業主の方は月額プランか買い切り、法人のお客様は内容に合わせたお見積りです。"
          />

          <AudienceTabs
            tabs={[
              {
                id: "personal",
                label: "個人・個人事業主の方",
                content: (
                  <>
                    <h3 className="mb-5 text-lg font-bold">月額プラン</h3>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      {WEB_MONTHLY_PLANS.map((plan) => (
                        <PlanCard key={plan.name} plan={plan} />
                      ))}
                    </div>

                    <div className="mt-16 max-w-xl">
                      <h3 className="mb-5 text-lg font-bold">買い切り</h3>
                      <PlanCard plan={WEB_ONE_TIME_PLAN} />
                    </div>

                    <div id="options" className="mt-16">
                      <h3 className="mb-2 text-lg font-bold">オプション</h3>
                      <p className="mb-5 text-sm text-fg-dim">月額プラン・買い切りのどちらにも追加できます。</p>
                      <ul className="border-t border-line">
                        {WEB_OPTIONS.map((option) => (
                          <li key={option.name} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                            <div>
                              <p className="font-bold">{option.name}</p>
                              <p className="mt-1 text-sm text-fg-dim">{option.description}</p>
                            </div>
                            <p className="text-lg font-bold sm:text-right">{option.price}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ),
              },
              {
                id: "corporate",
                label: "法人のお客様",
                content: (
                  <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
                    <div className="panel p-7 md:p-10">
                      <h3 className="text-2xl font-black">法人プラン</h3>
                      <p className="mt-2 text-2xl font-bold">お見積り</p>
                      <p className="mt-2 text-sm text-fg-dim">ご要望を伺ったうえで、内容に合わせて個別にお見積りします。</p>
                      <ul className="mt-6 list-disc space-y-2.5 border-t border-line pt-6 pl-5 text-sm leading-snug marker:text-signal">
                        {WEB_CORPORATE_PLAN_POINTS.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="self-end">
                      <p className="leading-relaxed text-fg-dim">
                        コーポレートサイト、採用サイト、予約やECの付いたサイトなど、ページ数や機能が決まっていない段階でもご相談いただけます。
                      </p>
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <a href="/contact" className="btn-primary">
                          お見積りを依頼する
                        </a>
                        <a href={CONTACT_CHANNELS.line} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                          LINEで相談する
                        </a>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />

          <div className="mt-8 space-y-1 text-xs leading-relaxed text-fg-dim">
            <p>※ 表示価格はすべて税込です（法人プランはお見積り）。</p>
            <p>※ 独自ドメイン・サーバー費用はプラン料金に含まれています。</p>
            <p>※ 内容によってはお見積りとなる場合があります。</p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="site-container">
          <SectionHeading title="ご利用の流れ" />
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {WEB_FLOW.map((step, position) => (
              <li key={step.title} className="bg-surface-1 p-6 md:p-8">
                <p className="text-sm font-bold text-signal">{position + 1}</p>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-dim">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading title="よくある質問" />
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
