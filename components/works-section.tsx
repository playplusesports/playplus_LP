"use client"

import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"
import { Trophy, Monitor, Palette, Users } from "lucide-react"

const works = [
  {
    title: "128名規模オフライン大会",
    category: "大会運営",
    description: "企画から当日の運営・配信まで一貫してサポート。128名のトーナメント管理、会場設営を担当。",
    icon: Trophy,
    placeholder: "bg-gradient-to-br from-purple-900 to-blue-900",
    label: "TOURNAMENT VENUE",
  },
  {
    title: "施設主催eスポーツイベント",
    category: "イベント運営",
    description: "商業施設でのeスポーツ体験イベント。親子向け体験ブース設計から当日進行まで対応。",
    icon: Users,
    placeholder: "bg-gradient-to-br from-amber-900 to-yellow-900",
    label: "FACILITY EVENT",
  },
  {
    title: "大会専用Webサイト",
    category: "Web制作",
    description: "大会告知・エントリー受付用のLP制作。レスポンシブ対応、エントリーフォーム実装。",
    icon: Monitor,
    placeholder: "bg-gradient-to-br from-emerald-900 to-teal-900",
    label: "OFFICIAL WEBSITE",
  },
  {
    title: "大会ブランディングデザイン",
    category: "デザイン",
    description: "大会ロゴ、ポスター、SNSバナー、配信オーバーレイを統一デザインで制作。",
    icon: Palette,
    placeholder: "bg-gradient-to-br from-orange-900 to-red-900",
    label: "BRANDING DESIGN",
  },
  {
    title: "企業対抗eスポーツ大会",
    category: "大会運営",
    description: "企業間交流eスポーツ大会をプロデュース。8社参加のチーム戦を企画・運営・配信。",
    icon: Trophy,
    placeholder: "bg-gradient-to-br from-blue-900 to-cyan-900",
    label: "CORPORATE TOURNAMENT",
  },
  {
    title: "配信オーバーレイパッケージ",
    category: "デザイン",
    description: "待機画面、ゲーム画面、エンディング画面のセットを統一デザインで提供。",
    icon: Palette,
    placeholder: "bg-gradient-to-br from-violet-900 to-fuchsia-900",
    label: "STREAM OVERLAY",
  },
]

export function WorksSection() {
  return (
    <section id="works" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimate>
          <div className="text-center mb-16">
            <p className="text-sm text-accent font-medium mb-2">Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              実績例
            </h2>
          </div>
        </ScrollAnimate>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work, index) => {
            const Icon = work.icon
            return (
              <StaggerItem key={index}>
                <a href="/works" className="block group">
                  <div className="relative overflow-hidden rounded-xl border border-border bg-card hover:border-accent/50 transition-colors">
                    {/* Image Area */}
                    <div className="aspect-[16/10] overflow-hidden">
                      <div
                        className={`w-full h-full ${work.placeholder} flex items-center justify-center transition-transform group-hover:scale-105 duration-500`}
                      >
                        <span className="text-white/30 text-sm font-bold tracking-widest">
                          {work.label}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-accent" />
                        </div>
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-secondary text-accent rounded-full">
                          {work.category}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-accent transition-colors">
                        {work.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{work.description}</p>
                    </div>
                  </div>
                </a>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <ScrollAnimate delay={0.2}>
          <div className="text-center mt-12">
            <a
              href="/works"
              className="inline-flex items-center text-sm text-accent hover:underline font-medium"
            >
              すべての実績を見る →
            </a>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  )
}
