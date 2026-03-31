"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"
import { Calendar } from "lucide-react"

const newsItems = [
  {
    date: "2026.03.28",
    category: "お知らせ",
    title: "Webサイトをリニューアルしました",
    content:
      "Play+のWebサイトをリニューアルしました。サービス内容や実績をより分かりやすくお伝えできるよう、デザインと構成を一新しています。",
  },
  {
    date: "2026.03.15",
    category: "実績",
    title: "企業対抗eスポーツ大会を開催しました",
    content:
      "名古屋市内にて8社参加の企業対抗eスポーツ大会をプロデュースしました。企画から当日の運営・配信まで一貫して対応いたしました。",
  },
  {
    date: "2026.02.20",
    category: "サービス",
    title: "デザイン制作の料金プランを更新しました",
    content:
      "ロゴ制作、ポスター制作、配信オーバーレイ制作の料金プランを見直しました。より手軽にご利用いただけるプランを追加しています。",
  },
  {
    date: "2026.02.01",
    category: "お知らせ",
    title: "学校対抗eスポーツリーグの参加校を募集中",
    content:
      "2026年度の学校対抗eスポーツリーグの参加校を募集しています。高校生を対象としたリーグ戦で、予選から決勝まで3ヶ月にわたって開催予定です。",
  },
  {
    date: "2026.01.10",
    category: "実績",
    title: "128名規模のオフライン大会を運営しました",
    content:
      "東京都内のイベントホールにて、128名規模の大型オフライン大会を運営しました。会場設営から配信環境の構築まで、トータルでサポートいたしました。",
  },
  {
    date: "2025.12.15",
    category: "お知らせ",
    title: "年末年始の営業のお知らせ",
    content:
      "年末年始の営業日についてお知らせします。12月28日〜1月5日までお休みをいただきます。お問い合わせへのご返信は1月6日以降となります。",
  },
]

const categoryColors: Record<string, string> = {
  "お知らせ": "bg-accent/10 text-accent",
  "実績": "bg-green-500/10 text-green-400",
  "サービス": "bg-amber-500/10 text-amber-400",
}

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <p className="text-sm text-accent font-medium mb-2">News</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                お知らせ
              </h1>
              <p className="text-lg text-muted-foreground">
                Play+の最新情報をお届けします。
              </p>
            </div>
          </ScrollAnimate>

          <StaggerContainer className="space-y-6">
            {newsItems.map((item, index) => (
              <StaggerItem key={index}>
                <article className="group rounded-xl border border-border bg-card p-6 hover:border-accent/50 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.date}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[item.category] ?? "bg-secondary text-muted-foreground"}`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Footer />
    </main>
  )
}
