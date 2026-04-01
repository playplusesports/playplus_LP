"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"
import {
  CheckCircle2,
  Monitor,
  Smartphone,
  RefreshCw,
  BarChart3,
  MessageCircle,
  Sparkles,
  ArrowRight,
  AlertTriangle,
} from "lucide-react"

// --- Features ---

const features = [
  { icon: Monitor, title: "サイト制作", description: "AIを活用し、高品質なサイトを短期間・低コストで制作。ランディングページから複数ページサイトまで対応します。" },
  { icon: Smartphone, title: "スマホ対応（レスポンシブ）", description: "スマートフォン・タブレット・PCすべてで最適に表示されるレスポンシブデザインで制作します。" },
  { icon: MessageCircle, title: "お問い合わせフォーム＋LINE誘導", description: "お問い合わせフォームの設置に加え、LINEでの問い合わせ導線も構築。お客様からの連絡を逃しません。" },
  { icon: RefreshCw, title: "月次コンテンツ更新代行", description: "お知らせやブログの更新をお任せください。LINEで内容を送るだけで対応します。" },
  { icon: Sparkles, title: "AI投稿文作成", description: "AIを活用してSNS投稿文を毎月作成。Instagram・X等の運用もサポートします。" },
  { icon: BarChart3, title: "月次アクセスレポート", description: "サイトの訪問者数・検索流入・ページ閲覧数を毎月わかりやすくレポート。LINEでお届けします。" },
]

// --- Steps ---

const steps = [
  { num: "1", title: "無料相談（30分）", description: "お店の雰囲気・載せたい情報をヒアリング。Zoom or 対面どちらでも対応します。" },
  { num: "2", title: "サイト制作（3〜5日）", description: "AIを活用して高速制作。デザイン案をLINEで確認していただきます。" },
  { num: "3", title: "公開・契約開始", description: "サイト公開後、月額プランがスタートします。初回修正は1回まで無料です。" },
  { num: "4", title: "毎月のサポート", description: "更新代行・投稿文・月次レポートをお届け。LINEでいつでも相談できます。" },
]

// --- Monthly Plans ---

const monthlyPlans = [
  {
    name: "エントリープラン", initial: "¥0", price: "5,000", contract: "縛りなし", recommended: false,
    items: ["5ページ以内の静的サイト", "お問い合わせフォーム", "Googleマップ埋め込み", "サイト死活監視"],
  },
  {
    name: "ライトプラン", initial: "¥9,800", price: "8,000", contract: "6ヶ月契約", recommended: true,
    items: ["8ページ以内の静的サイト", "お問い合わせ＋LINE誘導", "Instagram・Googleマップ埋め込み", "月1回コンテンツ更新代行", "AI投稿文 月3本プレゼント", "月次アクセスレポート（LINE送付）"],
  },
  {
    name: "スタンダードプラン", initial: "¥19,800", price: "15,000", contract: "3ヶ月契約", recommended: false,
    items: ["ページ数無制限", "予約フォーム・ECカート連携", "月2回コンテンツ更新", "AI投稿文 月10本", "月次Googleアナリティクスレポート", "SEO基本対策"],
  },
]

// --- Options ---

const options = [
  { name: "ロゴ作成 — シンプル", price: "¥10,000", desc: "テキスト＋アイコン。AI補助で制作。PNG・SVG納品。納期3〜5日", highlight: true },
  { name: "ロゴ作成 — フルオリジナル", price: "¥39,800", desc: "ヒアリング→複数案提案→修正2回込み。完全オリジナル。納期7〜10日", highlight: true },
  { name: "追加ページ制作（1ページ）", price: "¥8,000", desc: "スターターへの追加など。制作のみ・保守別途", highlight: false },
  { name: "Googleビジネスプロフィール設定", price: "¥9,800", desc: "マップ掲載・写真登録・初期SEO最適化を代行", highlight: false },
  { name: "Instagram初期設定＋投稿5本", price: "¥14,800", desc: "プロフィール整備＋開始投稿5本をAIで作成・代行投稿", highlight: false },
]

// --- FAQ ---

const faqs = [
  { q: "パソコンが苦手でも大丈夫ですか？", a: "はい、問題ありません。更新や連絡はLINEで完結します。難しい操作は一切不要です。" },
  { q: "今すでにホームページがある場合はどうなりますか？", a: "現在のサイトの内容を引き継いで作り直すことも可能です。まずはご相談ください。" },
  { q: "6ヶ月より前に解約したい場合は？", a: "6ヶ月未満での解約の場合、違約金として¥19,800をいただいております。詳しくは契約前にご説明します。" },
  { q: "写真や文章は自分で用意する必要がありますか？", a: "写真はスマホで撮影したものをLINEで送っていただければ対応します。文章はAIを使ってPlay+側で作成することも可能です。" },
  { q: "月額プランはいつでも解約できますか？", a: "エントリープランは縛りなしでいつでも解約いただけます。ライトプランは6ヶ月、スタンダードプランは3ヶ月の最低契約期間があります。期間内の解約には違約金（¥19,800）が発生します。" },
  { q: "買い切りプランとは何ですか？", a: "制作費用を一度だけお支払いいただき、完成したサイトのファイル一式をお渡しするプランです。その後の更新・保守はお客様ご自身で行っていただく形となります。" },
  { q: "ロゴ制作もお願いできますか？", a: "はい、オプションで承ります。テキスト＋アイコンのシンプルなものは¥10,000、ヒアリングから複数案提案・修正込みのフルオリジナルは¥39,800です。" },
  { q: "オプションはどのプランでも追加できますか？", a: "はい、月額プラン・買い切りプランいずれにも追加いただけます。ロゴ作成のシンプルとフルオリジナルはどちらか1つのみ選択可能です。" },
]

type PricingTab = "monthly" | "onetime" | "options"

export default function WebServicePage() {
  const [pricingTab, setPricingTab] = useState<PricingTab>("monthly")

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimate>
            <p className="text-sm text-accent font-medium mb-4">Web Service</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Webサイト制作・保守運用
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              サイトの制作から更新・管理まで、月額プランですべてお任せいただけます。
              LINEで気軽にやり取りできるので、パソコンが苦手な方でも安心です。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://lin.ee/pYn3rVU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05B34C] text-white font-bold text-base px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5" />
                LINEで無料相談
              </a>
              <Button size="lg" asChild className="text-base px-8 py-6">
                <a href="/contact">
                  お問い合わせフォーム
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <p className="text-sm text-accent font-medium mb-2">Features</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">サービス内容</h2>
            </div>
          </ScrollAnimate>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <StaggerItem key={i}>
                <Card className="bg-card border-border hover:border-accent/50 transition-colors h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                      <f.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{f.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Flow */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <p className="text-sm text-accent font-medium mb-2">Flow</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">サービスの流れ</h2>
            </div>
          </ScrollAnimate>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <ScrollAnimate key={i}>
                <div className={`relative pl-12 pb-10 ${i < steps.length - 1 ? "border-l-2 border-accent/20" : ""}`}>
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">{step.num}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing with Tabs */}
      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-12">
              <p className="text-sm text-accent font-medium mb-2">Pricing</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">料金プラン</h2>
              <p className="text-muted-foreground">お店の規模・ご要望に合わせてお選びいただけます</p>
            </div>
          </ScrollAnimate>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-12">
            {([
              { key: "monthly" as PricingTab, label: "月額プラン" },
              { key: "onetime" as PricingTab, label: "買い切り" },
              { key: "options" as PricingTab, label: "オプション" },
            ]).map((t) => (
              <Button key={t.key} variant={pricingTab === t.key ? "default" : "outline"} onClick={() => setPricingTab(t.key)} className="text-sm">
                {t.label}
              </Button>
            ))}
          </div>

          {/* Monthly Plans */}
          {pricingTab === "monthly" && (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
              {monthlyPlans.map((plan, i) => (
                <Card key={i} className={`bg-card text-center relative overflow-hidden ${plan.recommended ? "border-accent ring-2 ring-accent" : "border-border"}`}>
                  {plan.recommended && (
                    <div className="absolute top-0 left-0 right-0 bg-accent text-white text-xs font-bold py-1.5 text-center tracking-wider">おすすめ</div>
                  )}
                  <CardHeader className={plan.recommended ? "pt-10" : ""}>
                    <CardTitle className="text-lg text-foreground">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">初期費用 <span className="font-bold text-foreground">{plan.initial}</span></p>
                    <div className="flex items-baseline justify-center gap-1 mt-2">
                      <span className="text-4xl font-bold text-foreground">¥{plan.price}</span>
                      <span className="text-muted-foreground">／月</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{plan.contract}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-left">
                      {plan.items.map((item, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* One-time Plan */}
          {pricingTab === "onetime" && (
            <div className="max-w-xl mx-auto">
              <Card className="bg-card border-border overflow-hidden">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-foreground">スターターパック</CardTitle>
                  <div className="flex items-baseline justify-center gap-1 mt-3">
                    <span className="text-4xl font-bold text-foreground">¥29,800</span>
                    <span className="text-muted-foreground">（一括）</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">縛りなし・一括払い</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {["5ページ以内の静的サイト", "お問い合わせフォーム", "Googleマップ埋め込み", "修正1回無料", "納品：ファイル一式を圧縮してお渡し"].map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-400">保守・更新は含まれません。ファイルの管理はお客様側となります。</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Options */}
          {pricingTab === "options" && (
            <div className="max-w-3xl mx-auto space-y-4">
              {options.map((opt, i) => (
                <div key={i} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-xl border bg-card ${opt.highlight ? "border-accent/30 bg-accent/5" : "border-border"}`}>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">{opt.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
                  </div>
                  <p className="text-xl font-bold text-foreground shrink-0">{opt.price}</p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground text-center mt-6">※ ロゴ作成のシンプルとフルオリジナルはどちらか1つのみ選択可能です。</p>
            </div>
          )}

          <div className="mt-10 text-center text-xs text-muted-foreground space-y-1">
            <p>※ 表示価格はすべて税込です。</p>
            <p>※ 独自ドメイン・サーバー費用はプラン料金に含まれています。</p>
            <p>※ 内容によってはお見積りとなる場合があります。</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <p className="text-sm text-accent font-medium mb-2">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">よくある質問</h2>
            </div>
          </ScrollAnimate>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollAnimate key={i}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground mb-2">Q. {faq.q}</h3>
                  <p className="text-sm text-muted-foreground">A. {faq.a}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimate>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">まずは無料でご相談ください</h2>
            <p className="text-muted-foreground mb-10">お気軽にLINEかフォームでご連絡ください。</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://lin.ee/pYn3rVU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05B34C] text-white font-bold text-base px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5" />
                LINEで相談する
              </a>
              <Button size="lg" asChild className="text-base px-8 py-6">
                <a href="/contact">
                  お問い合わせフォーム
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      <Footer />
    </main>
  )
}
