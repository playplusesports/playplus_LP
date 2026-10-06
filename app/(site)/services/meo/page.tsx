import type { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/site/breadcrumb-schema"
import { ContactBand } from "@/components/site/contact-band"
import { FaqList, FaqSchema } from "@/components/site/faq-list"
import { PageIntro } from "@/components/site/page-intro"
import { PlanCard } from "@/components/site/plan-card"
import { SectionHeading } from "@/components/site/section-heading"
import { CONTACT_CHANNELS } from "@/lib/site/company-profile"
import { MEO_FAQS } from "@/lib/site/faqs"
import { MEO_MONTHLY_PLANS } from "@/lib/site/pricing"

export const metadata: Metadata = {
  title: "SEO / MEO / LLMO対策 月額15,000円〜",
  description:
    "Play+ のSEO・MEO・LLMO対策。Googleマップの上位表示（MEO）と、ChatGPTやGeminiなどのAI検索での推薦（LLMO）で、地域の集客を強化します。初期費用0円・契約期間の縛りなし。",
  alternates: { canonical: "/services/meo" },
}

const MEO_MEASURES: readonly { title: string; items: readonly string[] }[] = [
  {
    title: "GBP最適化",
    items: [
      "ビジネス情報の完全な最適化",
      "カテゴリ・属性の戦略的設定",
      "メニュー情報の構造化登録",
      "写真のジオタグ・EXIF最適化",
      "商品セクションの充実",
    ],
  },
  {
    title: "口コミ管理",
    items: ["全口コミへの迅速な返信体制", "ネガティブレビューへの対応", "口コミ獲得の仕組み（QRコード等）", "口コミ分析レポート（月次）"],
  },
  {
    title: "定期投稿",
    items: ["週2回以上のGBP投稿", "イベント投稿の活用", "季節メニュー・限定情報の発信", "写真付き投稿で視覚的に訴求"],
  },
  {
    title: "写真戦略",
    items: ["写真撮影のディレクション", "カテゴリ別写真の最適配置", "写真のメタデータ最適化", "定期的な写真更新"],
  },
]

const LLMO_MEASURES: readonly { title: string; description: string }[] = [
  { title: "構造化データ実装", description: "LocalBusiness・Menu・FAQ などのスキーマを実装し、検索結果でのリッチ表示を狙います。" },
  { title: "AI検索最適化", description: "ChatGPT・Gemini・Perplexity などのAI検索でお店が推薦されるよう、情報の構造を整えます。" },
  { title: "画像SEO", description: "全画像の代替テキスト、ジオタグ・EXIFを最適化し、画像検索からの流入を強化します。" },
  { title: "FAQコンテンツ作成", description: "よくある質問を構造化データ付きで作成。検索結果やAI検索で参照されやすくします。" },
]

const MEO_FLOW: readonly { title: string; description: string }[] = [
  { title: "ご契約", description: "プランを確定し、契約を締結します。" },
  { title: "初期分析", description: "GBPの詳細分析・競合調査・キーワード選定。" },
  { title: "技術実装", description: "構造化データ・GBP最適化・代替テキスト修正。" },
  { title: "運用開始", description: "定期投稿と口コミ管理を始め、月次でレポート。" },
  { title: "効果測定", description: "検索順位や流入を分析し、改善を提案します。" },
]

export default function MeoServicePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "事業内容", path: "/services" },
          { name: "SEO / MEO / LLMO対策", path: "/services/meo" },
        ]}
      />
      <FaqSchema faqs={MEO_FAQS} />

      <PageIntro
        title={
          <>
            検索 × マップ × AI検索で、
            <br className="hidden md:block" />
            お店を見つけてもらう。
          </>
        }
        lead="SEOで検索エンジンの上位に、MEOでGoogleマップの上位に、LLMOでChatGPTやGeminiに推薦されるお店に。データを見ながら改善を続けます。"
        crumbs={[
          { label: "事業内容", href: "/services" },
          { label: "SEO / MEO / LLMO 対策", href: "/services/meo" },
        ]}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={CONTACT_CHANNELS.line} target="_blank" rel="noopener noreferrer" className="btn-primary">
            無料でGBP診断を相談する
          </a>
          <a href="#plans" className="btn-secondary">
            料金プランを見る
          </a>
        </div>
      </PageIntro>

      <section className="py-20 md:py-28">
        <div className="site-container">
          <SectionHeading title="Googleマップで上位に表示する" lead="4つの施策で Googleビジネスプロフィール（GBP）を最適化します。" />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {MEO_MEASURES.map((measure) => (
              <div key={measure.title} className="bg-surface-1 p-6">
                <h3 className="font-bold">{measure.title}</h3>
                <ul className="mt-4 space-y-2">
                  {measure.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-snug text-fg-dim">
                      <span className="font-display font-bold text-signal" aria-hidden="true">
                        +
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="site-container">
          <SectionHeading title="AI検索で推薦されるお店へ" lead="ChatGPT・Gemini・Perplexity などのAI検索に対応する、これからのSEOです。" />
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {LLMO_MEASURES.map((measure) => (
              <li key={measure.title} className="bg-surface-1 p-6 md:p-8">
                <h3 className="font-bold">{measure.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-dim">{measure.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="plans" className="border-t border-line bg-surface-1/40 py-20 md:py-28">
        <div className="site-container">
          <SectionHeading title="料金プラン" lead="初期費用0円・契約期間の縛りなし。効果を見ながらいつでもプランを変更できます。" />
          <div className="grid gap-5 md:grid-cols-3">
            {MEO_MONTHLY_PLANS.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
          <p className="mt-8 text-xs text-fg-dim">※ 表示価格は税別です。</p>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="site-container">
          <SectionHeading title="導入の流れ" lead="最短2週間で技術的な実装が完了します。" />
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {MEO_FLOW.map((step, position) => (
              <li key={step.title} className="bg-surface-1 p-6">
                <p className="text-sm font-bold text-signal">{position + 1}</p>
                <h3 className="mt-3 font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-dim">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading title="よくある質問" />
          <FaqList faqs={MEO_FAQS} />
        </div>
      </section>

      <ContactBand
        title="現在のGBPを無料で診断します"
        lead="Googleビジネスプロフィールのいまの状態を見て、伸びしろをお伝えします。お気軽にご相談ください。"
      />
    </>
  )
}
