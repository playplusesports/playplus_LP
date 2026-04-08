"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"
import {
  MapPin,
  Star,
  TrendingUp,
  MessageCircle,
  Camera,
  FileText,
  Search,
  Bot,
  Globe,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Clock,
  Users,
  Zap,
} from "lucide-react"

const stats = [
  { value: "+35%", label: "クリック率向上", desc: "写真が充実したGBPはクリック率が35%向上", icon: TrendingUp },
  { value: "+42%", label: "ルート検索増加", desc: "最適化されたGBPは経路案内が42%増加", icon: MapPin },
  { value: "+28%", label: "検索順位改善", desc: "週1回以上の投稿で検索順位が28%改善", icon: Search },
]

const meoFeatures = [
  { icon: MapPin, title: "GBP最適化", items: ["ビジネス情報の完全な最適化", "カテゴリ・属性の戦略的設定", "メニュー情報の構造化登録", "写真のジオタグ・EXIF最適化", "商品セクションの充実"] },
  { icon: Star, title: "口コミ管理", items: ["全口コミへの迅速な返信体制", "ネガティブレビューへの戦略的対応", "口コミ獲得の仕組み（QRコード等）", "口コミ分析レポート（月次）", "競合の口コミ動向モニタリング"] },
  { icon: FileText, title: "定期投稿", items: ["週2回以上のGBP投稿作成・投稿", "イベント投稿の活用", "季節メニュー・限定情報の発信", "写真付き投稿で視覚的訴求"] },
  { icon: Camera, title: "写真戦略", items: ["プロ品質の写真撮影ディレクション", "カテゴリ別写真の最適配置", "写真のメタデータ最適化", "定期的な写真更新"] },
]

const llmoFeatures = [
  { icon: Globe, title: "構造化データ実装", desc: "LocalBusiness・Restaurant・Menu・FAQ・BreadcrumbListの5種類のスキーマを実装。Google検索でリッチスニペット表示を実現します。" },
  { icon: Bot, title: "AI検索最適化", desc: "ChatGPT・Gemini・Perplexity等のAI検索であなたのお店が推薦されるよう、情報構造を最適化します。" },
  { icon: Search, title: "画像SEO対策", desc: "全画像へのALT属性設定、ジオタグ・EXIFデータの最適化で、画像検索からの流入を強化します。" },
  { icon: FileText, title: "FAQコンテンツ作成", desc: "よくある質問をFAQスキーマ付きで作成。Google検索結果に直接表示され、AI検索でも参照されます。" },
]

const plans = [
  {
    name: "MEO + LLMO スターター",
    price: "15,000",
    recommended: false,
    items: [
      "GBP最適化（初期設定・運用）",
      "構造化データ実装（5種類）",
      "口コミ管理・返信代行",
      "月2回のGBP投稿",
      "ALT属性・メタデータ修正",
      "月次レポート",
    ],
  },
  {
    name: "MEO + LLMO スタンダード",
    price: "25,000",
    recommended: true,
    items: [
      "スターターの全機能",
      "週2回のGBP投稿",
      "NAP一貫性チェック・修正",
      "FAQコンテンツ作成",
      "サイテーション構築",
      "月次分析レポート（詳細版）",
    ],
  },
  {
    name: "MEO + LLMO プレミアム",
    price: "40,000",
    recommended: false,
    items: [
      "スタンダードの全機能",
      "写真撮影ディレクション（月1回）",
      "SNS連携コンサルティング",
      "競合分析レポート",
      "隔週のオンラインMTG",
      "優先サポート",
    ],
  },
]

const steps = [
  { num: "1", title: "ご契約", desc: "契約書の締結・プラン確定" },
  { num: "2", title: "初期分析", desc: "GBP詳細分析・競合調査・キーワード選定" },
  { num: "3", title: "技術実装", desc: "構造化データ実装・GBP最適化・ALT属性修正" },
  { num: "4", title: "運用開始", desc: "定期投稿スタート・口コミ管理開始・月次レポート" },
  { num: "5", title: "効果測定", desc: "検索順位レポート・流入分析・改善提案" },
]

const faqs = [
  { q: "MEO対策とは何ですか？", a: "MEO（Map Engine Optimization）は、Googleマップでの検索順位を向上させる施策です。「地域名+業種」で検索した際に上位表示されることで、来店数の増加につながります。" },
  { q: "LLMO対策とは何ですか？", a: "LLMO（Large Language Model Optimization）は、ChatGPTやGeminiなどのAI検索であなたのお店が推薦されるよう最適化する施策です。構造化データの実装やFAQコンテンツの整備が含まれます。" },
  { q: "効果はどのくらいで出ますか？", a: "最短2週間で技術実装が完了し、1ヶ月目から検索順位の変化を実感いただけます。MEO対策は3〜6ヶ月で安定した効果が出る傾向があります。" },
  { q: "Googleビジネスプロフィールを持っていなくても大丈夫ですか？", a: "はい、初期設定から対応いたします。アカウントの作成・オーナー確認・基本情報の登録まですべてサポートします。" },
  { q: "途中でプラン変更はできますか？", a: "はい、効果を見ながらいつでもプラン変更可能です。まずはスターターから始めて、ステップアップされるお客様が多いです。" },
]

export default function MeoServicePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimate>
            <p className="text-sm text-accent font-medium mb-4">MEO / LLMO Service</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Googleマップ × AI検索で<br />
              <span className="text-accent">集客力を強化</span>する
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              MEO対策でGoogleマップ上位表示、LLMO対策でChatGPT・GeminiなどのAI検索で推薦されるお店へ。
              データに基づいた改善で、確実に集客につなげます。
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

      {/* Stats */}
      <section className="py-16 bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                    <stat.icon className="h-7 w-7 text-accent" />
                  </div>
                  <p className="text-4xl font-bold text-accent mb-2">{stat.value}</p>
                  <p className="font-semibold text-foreground mb-1">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* MEO Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <p className="text-sm text-accent font-medium mb-2">MEO対策</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Googleマップで上位表示を実現</h2>
              <p className="text-muted-foreground">4つの施策でGBP（Googleビジネスプロフィール）を最適化します</p>
            </div>
          </ScrollAnimate>
          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {meoFeatures.map((feature, i) => (
              <StaggerItem key={i}>
                <Card className="bg-card border-border hover:border-accent/50 transition-colors h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.items.map((item, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* LLMO Features */}
      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <p className="text-sm text-accent font-medium mb-2">LLMO対策</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">AI検索で推薦されるお店へ</h2>
              <p className="text-muted-foreground">ChatGPT・Gemini・Perplexity等のAI検索に対応する次世代SEO</p>
            </div>
          </ScrollAnimate>
          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {llmoFeatures.map((feature, i) => (
              <StaggerItem key={i}>
                <Card className="bg-card border-border hover:border-accent/50 transition-colors h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">導入の流れ</h2>
              <p className="text-muted-foreground mt-2">最短2週間で技術実装が完了します</p>
            </div>
          </ScrollAnimate>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <ScrollAnimate key={i}>
                <div className={`relative pl-12 pb-10 ${i < steps.length - 1 ? "border-l-2 border-accent/20" : ""}`}>
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">{step.num}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
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
            <div className="text-center mb-12">
              <p className="text-sm text-accent font-medium mb-2">Pricing</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">料金プラン</h2>
              <p className="text-muted-foreground">初期費用¥0・最低契約期間なし</p>
            </div>
          </ScrollAnimate>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {plans.map((plan, i) => (
              <ScrollAnimate key={i} delay={i * 0.1}>
                <Card className={`bg-card text-center relative overflow-hidden h-full ${plan.recommended ? "border-accent ring-2 ring-accent" : "border-border"}`}>
                  {plan.recommended && (
                    <div className="absolute top-0 left-0 right-0 bg-accent text-white text-xs font-bold py-1.5 text-center tracking-wider">おすすめ</div>
                  )}
                  <CardHeader className={plan.recommended ? "pt-10" : ""}>
                    <CardTitle className="text-base text-foreground">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">初期費用 <span className="font-bold text-foreground">¥0</span></p>
                    <div className="flex items-baseline justify-center gap-1 mt-2">
                      <span className="text-4xl font-bold text-foreground">¥{plan.price}</span>
                      <span className="text-muted-foreground">／月（税別）</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">契約期間の縛りなし</p>
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
              </ScrollAnimate>
            ))}
          </div>
          <div className="mt-8 text-center text-xs text-muted-foreground space-y-1">
            <p>※ 表示価格は税別です。</p>
            <p>※ 効果を見ながらいつでもプラン変更可能です。</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              まずは無料でご相談ください
            </h2>
            <p className="text-muted-foreground mb-10">
              現在のGoogleビジネスプロフィールの診断も無料で承ります。
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
