"use client"

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
  FileText,
  ArrowRight,
  Sparkles,
} from "lucide-react"

const features = [
  {
    icon: Monitor,
    title: "サイト制作",
    description: "AIを活用し、高品質なサイトを短期間・低コストで制作。ランディングページから複数ページサイトまで対応します。",
  },
  {
    icon: Smartphone,
    title: "スマホ対応（レスポンシブ）",
    description: "スマートフォン・タブレット・PCすべてで最適に表示されるレスポンシブデザインで制作します。",
  },
  {
    icon: MessageCircle,
    title: "お問い合わせフォーム＋LINE誘導",
    description: "お問い合わせフォームの設置に加え、LINEでの問い合わせ導線も構築。お客様からの連絡を逃しません。",
  },
  {
    icon: RefreshCw,
    title: "月次コンテンツ更新代行",
    description: "お知らせやブログの更新をお任せください。LINEで内容を送るだけで対応します。",
  },
  {
    icon: Sparkles,
    title: "AI投稿文作成",
    description: "AIを活用してSNS投稿文を毎月作成。Instagram・X等の運用もサポートします。",
  },
  {
    icon: BarChart3,
    title: "月次アクセスレポート",
    description: "サイトの訪問者数・検索流入・ページ閲覧数を毎月わかりやすくレポート。LINEでお届けします。",
  },
]

const plans = [
  {
    name: "エントリープラン",
    initial: "無料",
    price: "5,000",
    contract: "6ヶ月契約",
    recommended: false,
    items: [
      "独自ドメイン・サーバー費用込み",
      "5ページ以内の静的サイト",
      "お問い合わせフォーム",
      "Googleマップ埋め込み",
      "サイト死活監視",
    ],
  },
  {
    name: "ライトプラン",
    initial: "¥9,800",
    price: "8,000",
    contract: "6ヶ月契約",
    recommended: true,
    items: [
      "独自ドメイン・サーバー費用込み",
      "8ページ以内の静的サイト",
      "お問い合わせフォーム＋LINE誘導",
      "Instagram・Googleマップ埋め込み",
      "月1回コンテンツ更新代行",
      "AI投稿文 月3本プレゼント",
      "月次アクセスレポート（LINE送付）",
    ],
  },
  {
    name: "スタンダードプラン",
    initial: "¥19,800",
    price: "15,000",
    contract: "3ヶ月契約",
    recommended: false,
    items: [
      "独自ドメイン・サーバー費用込み",
      "ページ数無制限",
      "予約フォーム・カート連携",
      "月2回コンテンツ更新",
      "AI投稿文 月10本",
      "月次Googleアナリティクスレポート",
      "SEO基本対策",
    ],
  },
]

const steps = [
  {
    num: "1",
    title: "無料相談（30分）",
    description: "お店の雰囲気・載せたい情報をヒアリング。Zoom or 対面どちらでも対応します。",
  },
  {
    num: "2",
    title: "サイト制作（3〜5日）",
    description: "AIを活用して高速制作。デザイン案をLINEで確認していただきます。",
  },
  {
    num: "3",
    title: "公開・契約開始",
    description: "サイト公開後、月額プランがスタートします。初回修正は1回まで無料です。",
  },
  {
    num: "4",
    title: "毎月のサポート",
    description: "更新代行・投稿文・月次レポートをお届け。LINEでいつでも相談できます。",
  },
]

const faqs = [
  {
    q: "パソコンが苦手でも大丈夫ですか？",
    a: "はい、問題ありません。更新や連絡はLINEで完結します。難しい操作は一切不要です。",
  },
  {
    q: "今すでにホームページがある場合はどうなりますか？",
    a: "現在のサイトの内容を引き継いで作り直すことも可能です。まずはご相談ください。",
  },
  {
    q: "6ヶ月より前に解約したい場合は？",
    a: "6ヶ月未満での解約の場合、違約金として¥19,800をいただいております。詳しくは契約前にご説明します。",
  },
  {
    q: "写真や文章は自分で用意する必要がありますか？",
    a: "写真はスマホで撮影したものをLINEで送っていただければ対応します。文章はAIを使ってPlay+側で作成することも可能です。",
  },
]

export default function WebServicePage() {
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
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                サービス内容
              </h2>
            </div>
          </ScrollAnimate>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card className="bg-card border-border hover:border-accent/50 transition-colors h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                サービスの流れ
              </h2>
            </div>
          </ScrollAnimate>
          <div className="space-y-0">
            {steps.map((step, index) => (
              <ScrollAnimate key={index}>
                <div className={`relative pl-12 pb-10 ${index < steps.length - 1 ? "border-l-2 border-accent/20" : ""}`}>
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <p className="text-sm text-accent font-medium mb-2">Pricing</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                料金プラン
              </h2>
            </div>
          </ScrollAnimate>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {plans.map((plan, index) => (
              <ScrollAnimate key={index} delay={index * 0.1}>
                <Card className={`bg-card text-center relative overflow-hidden h-full ${plan.recommended ? "border-accent ring-2 ring-accent" : "border-border"}`}>
                  {plan.recommended && (
                    <div className="absolute top-0 left-0 right-0 bg-accent text-white text-xs font-bold py-1.5 text-center tracking-wider">
                      おすすめ
                    </div>
                  )}
                  <CardHeader className={plan.recommended ? "pt-10" : ""}>
                    <CardTitle className="text-lg text-foreground">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      初期費用 <span className="font-bold text-foreground">{plan.initial}</span>
                    </p>
                    <div className="flex items-baseline justify-center gap-1 mt-2">
                      <span className="text-4xl font-bold text-foreground">¥{plan.price}</span>
                      <span className="text-muted-foreground">／月</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{plan.contract}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-left">
                      {plan.items.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollAnimate>
            ))}
          </div>
          <div className="mt-8 text-center text-xs text-muted-foreground space-y-1">
            <p>※ 表示価格はすべて税込です。</p>
            <p>※ 独自ドメイン・サーバー費用はプラン料金に含まれています。</p>
            <p>※ 内容によってはお見積りいたします。</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <p className="text-sm text-accent font-medium mb-2">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                よくある質問
              </h2>
            </div>
          </ScrollAnimate>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollAnimate key={index}>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              まずは無料でご相談ください
            </h2>
            <p className="text-muted-foreground mb-10">
              お気軽にLINEかフォームでご連絡ください。
            </p>
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
