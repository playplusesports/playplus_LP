"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Trophy, Monitor, Palette, Users, Calendar, MapPin, ExternalLink } from "lucide-react"

const categories = ["すべて", "大会運営", "イベント運営", "Web制作", "デザイン"] as const
type Category = (typeof categories)[number]

const portfolioItems = [
  {
    title: "128名規模オフライン大会",
    category: "大会運営" as const,
    description:
      "大手ゲームタイトルの公式大会を企画から運営まで一貫してサポート。128名のトーナメント管理、会場設営、配信環境の構築を担当しました。",
    details: {
      period: "2025年8月",
      location: "東京都内イベントホール",
      scale: "参加者128名 / 来場者300名",
    },
    tags: ["企画", "運営", "配信", "会場設営"],
    icon: Trophy,
  },
  {
    title: "施設主催eスポーツイベント",
    category: "イベント運営" as const,
    description:
      "商業施設でのeスポーツ体験イベントの運営をサポート。親子向けの体験ブース設計から当日の進行管理まで対応しました。",
    details: {
      period: "2025年5月",
      location: "大阪市内商業施設",
      scale: "来場者500名以上",
    },
    tags: ["イベント企画", "体験ブース", "進行管理"],
    icon: Users,
  },
  {
    title: "eスポーツ大会公式Webサイト",
    category: "Web制作" as const,
    description:
      "大会の告知・エントリー受付用のランディングページを制作。レスポンシブ対応、エントリーフォーム、大会ルール掲載ページを含む構成です。",
    details: {
      period: "2025年7月",
      location: "オンライン",
      scale: "LP + 5ページ構成",
    },
    tags: ["LP制作", "フォーム", "レスポンシブ"],
    icon: Monitor,
  },
  {
    title: "大会専用ブランディングデザイン",
    category: "デザイン" as const,
    description:
      "大会ロゴ、ポスター、SNS用バナー、配信オーバーレイを統一デザインで制作。ブランドイメージの一貫性を重視しました。",
    details: {
      period: "2025年6月",
      location: "-",
      scale: "ロゴ + ポスター + バナー5点 + オーバーレイ",
    },
    tags: ["ロゴ", "ポスター", "バナー", "オーバーレイ"],
    icon: Palette,
  },
  {
    title: "企業対抗eスポーツ大会",
    category: "大会運営" as const,
    description:
      "企業間交流を目的としたeスポーツ大会をプロデュース。8社参加のチーム戦トーナメントの企画・運営・配信を一括で担当しました。",
    details: {
      period: "2025年10月",
      location: "名古屋市内貸切スペース",
      scale: "8チーム / 40名参加",
    },
    tags: ["企業向け", "チーム戦", "企画", "配信"],
    icon: Trophy,
  },
  {
    title: "コーポレートサイトリニューアル",
    category: "Web制作" as const,
    description:
      "eスポーツ関連企業のコーポレートサイトをフルリニューアル。モダンなデザインとSEO対策を施した5ページ構成のサイトを制作しました。",
    details: {
      period: "2025年9月",
      location: "オンライン",
      scale: "5ページ構成",
    },
    tags: ["コーポレート", "リニューアル", "SEO"],
    icon: Monitor,
  },
  {
    title: "配信オーバーレイパッケージ",
    category: "デザイン" as const,
    description:
      "ゲーム配信者向けのオーバーレイデザインをパッケージで制作。待機画面、ゲーム画面、エンディング画面のセットを統一デザインで提供しました。",
    details: {
      period: "2025年4月",
      location: "-",
      scale: "3画面セット",
    },
    tags: ["配信", "オーバーレイ", "パッケージ"],
    icon: Palette,
  },
  {
    title: "学校対抗eスポーツリーグ",
    category: "イベント運営" as const,
    description:
      "高校生を対象としたeスポーツリーグの運営支援。予選から決勝まで3ヶ月にわたるリーグ戦の進行管理とオンライン配信を担当しました。",
    details: {
      period: "2025年4月〜6月",
      location: "オンライン + 決勝オフライン",
      scale: "16校参加",
    },
    tags: ["学校", "リーグ戦", "長期運営", "配信"],
    icon: Users,
  },
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("すべて")

  const filtered =
    activeCategory === "すべて"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm text-accent font-medium mb-2">Portfolio</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              制作実績
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              これまでに手がけたeスポーツ大会運営・Web制作・デザイン制作の実績をご紹介します。
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-accent/50 transition-colors"
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4 flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-accent rounded-full mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-6 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="px-6 pb-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.details.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.details.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {item.details.scale}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="px-6 pb-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              上記以外の実績もございます。お気軽にお問い合わせください。
            </p>
            <Button size="lg" asChild>
              <a href="/contact">
                お問い合わせはこちら
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
