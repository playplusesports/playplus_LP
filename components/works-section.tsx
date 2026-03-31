"use client"

import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"

const works = [
  {
    title: "128名規模オフライン大会",
    category: "大会運営",
    description: "企画・運営サポート",
  },
  {
    title: "施設主催eスポーツイベント",
    category: "イベント運営",
    description: "運営サポート",
  },
  {
    title: "大会専用Webサイト",
    category: "Web制作",
    description: "LP・申込フォーム制作",
  },
  {
    title: "イベントポスター・ロゴ",
    category: "デザイン",
    description: "ビジュアルデザイン",
  },
  {
    title: "配信オーバーレイ",
    category: "デザイン",
    description: "配信画面デザイン",
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
          {works.map((work, index) => (
            <StaggerItem key={index}>
              <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-accent/50 transition-colors">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-accent rounded-full">
                    {work.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {work.title}
                </h3>
                <p className="text-sm text-muted-foreground">{work.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollAnimate delay={0.2}>
          <div className="text-center mt-12">
            <a
              href="/portfolio"
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
