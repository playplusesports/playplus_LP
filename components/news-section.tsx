"use client"

import { useState, useEffect } from "react"
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"
import { Calendar } from "lucide-react"

type NewsItem = {
  id: string
  date: string
  category: string
  title: string
}

const categoryColors: Record<string, string> = {
  "お知らせ": "bg-accent/10 text-accent",
  "イベント": "bg-green-500/10 text-green-400",
  "メディア": "bg-amber-500/10 text-amber-400",
  "実績": "bg-blue-500/10 text-blue-400",
}

export function NewsSection() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([])

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setLatestNews(data.slice(0, 3)))
  }, [])

  return (
    <section id="news" className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimate>
          <div className="text-center mb-12">
            <p className="text-sm text-accent font-medium mb-2">News</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              お知らせ
            </h2>
          </div>
        </ScrollAnimate>

        <StaggerContainer className="space-y-4">
          {latestNews.map((item) => (
            <StaggerItem key={item.id}>
              <a
                href="/news"
                className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-xl border border-border bg-card hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 shrink-0">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${categoryColors[item.category] ?? "bg-secondary text-muted-foreground"}`}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </p>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollAnimate delay={0.2}>
          <div className="text-center mt-8">
            <a
              href="/news"
              className="inline-flex items-center text-sm text-accent hover:underline font-medium"
            >
              すべてのお知らせを見る →
            </a>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  )
}
