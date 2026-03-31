"use client"

import { useState, useEffect } from "react"
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"

type WorkItem = {
  id: string
  title: string
  category: string
  description: string
  imageUrl?: string
}

const placeholders: Record<string, string> = {
  "大会運営": "bg-gradient-to-br from-purple-900 to-blue-900",
  "イベント運営": "bg-gradient-to-br from-amber-900 to-yellow-900",
  "Web制作": "bg-gradient-to-br from-emerald-900 to-teal-900",
  "デザイン": "bg-gradient-to-br from-orange-900 to-red-900",
}

export function WorksSection() {
  const [works, setWorks] = useState<WorkItem[]>([])

  useEffect(() => {
    fetch("/api/works")
      .then((res) => res.json())
      .then((data) => setWorks(data.slice(0, 6)))
  }, [])

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
          {works.map((work) => (
            <StaggerItem key={work.id}>
              <a href={`/works?id=${work.id}`} className="block group">
                <div className="relative overflow-hidden rounded-xl border border-border bg-card hover:border-accent/50 transition-colors">
                  <div className="aspect-[16/10] overflow-hidden">
                    {work.imageUrl ? (
                      <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                    ) : (
                      <div className={`w-full h-full ${placeholders[work.category] || "bg-gradient-to-br from-gray-800 to-gray-900"} flex items-center justify-center transition-transform group-hover:scale-105 duration-500`}>
                        <span className="text-white/30 text-sm font-bold tracking-widest">
                          {work.category.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
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
          ))}
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
