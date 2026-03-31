"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"
import { X } from "lucide-react"

const galleryItems = [
  {
    title: "オフライン大会 会場全景",
    category: "大会運営",
    placeholder: "bg-gradient-to-br from-purple-900 to-blue-900",
    label: "TOURNAMENT VENUE",
  },
  {
    title: "大会ステージセットアップ",
    category: "大会運営",
    placeholder: "bg-gradient-to-br from-blue-900 to-cyan-900",
    label: "STAGE SETUP",
  },
  {
    title: "配信ブース",
    category: "大会運営",
    placeholder: "bg-gradient-to-br from-indigo-900 to-purple-900",
    label: "STREAMING BOOTH",
  },
  {
    title: "大会公式サイト",
    category: "Web制作",
    placeholder: "bg-gradient-to-br from-emerald-900 to-teal-900",
    label: "OFFICIAL WEBSITE",
  },
  {
    title: "エントリーページ",
    category: "Web制作",
    placeholder: "bg-gradient-to-br from-teal-900 to-cyan-900",
    label: "ENTRY PAGE",
  },
  {
    title: "大会ロゴデザイン",
    category: "デザイン",
    placeholder: "bg-gradient-to-br from-orange-900 to-red-900",
    label: "LOGO DESIGN",
  },
  {
    title: "イベントポスター",
    category: "デザイン",
    placeholder: "bg-gradient-to-br from-red-900 to-pink-900",
    label: "EVENT POSTER",
  },
  {
    title: "配信オーバーレイ",
    category: "デザイン",
    placeholder: "bg-gradient-to-br from-violet-900 to-fuchsia-900",
    label: "STREAM OVERLAY",
  },
  {
    title: "SNSバナー",
    category: "デザイン",
    placeholder: "bg-gradient-to-br from-pink-900 to-rose-900",
    label: "SNS BANNER",
  },
  {
    title: "施設イベント風景",
    category: "イベント運営",
    placeholder: "bg-gradient-to-br from-amber-900 to-yellow-900",
    label: "FACILITY EVENT",
  },
  {
    title: "体験ブース",
    category: "イベント運営",
    placeholder: "bg-gradient-to-br from-lime-900 to-green-900",
    label: "EXPERIENCE BOOTH",
  },
  {
    title: "表彰式",
    category: "大会運営",
    placeholder: "bg-gradient-to-br from-sky-900 to-blue-900",
    label: "AWARD CEREMONY",
  },
]

const categories = ["すべて", "大会運営", "イベント運営", "Web制作", "デザイン"]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("すべて")
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filtered =
    activeCategory === "すべて"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <p className="text-sm text-accent font-medium mb-2">Gallery</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                ギャラリー
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                これまでの大会・イベントの様子や制作物をご覧いただけます。
              </p>
            </div>
          </ScrollAnimate>

          {/* Category Filter */}
          <ScrollAnimate delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:border-accent/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollAnimate>

          {/* Gallery Grid */}
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, index) => (
              <StaggerItem key={`${item.title}-${activeCategory}`}>
                <button
                  onClick={() => setSelectedIndex(index)}
                  className="w-full group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                >
                  <div
                    className={`absolute inset-0 ${item.placeholder} flex items-center justify-center transition-transform group-hover:scale-105 duration-500`}
                  >
                    <span className="text-white/30 text-lg font-bold tracking-widest">
                      {item.label}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                    <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-xs text-accent font-medium">{item.category}</span>
                      <p className="text-white text-sm font-semibold">{item.title}</p>
                    </div>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollAnimate delay={0.2}>
            <p className="text-center text-sm text-muted-foreground mt-12">
              ※実際のプロジェクト画像は準備中です。お問い合わせいただければ実績資料をお送りします。
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="max-w-4xl w-full aspect-[16/9] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`w-full h-full ${filtered[selectedIndex].placeholder} flex flex-col items-center justify-center`}
            >
              <span className="text-white/30 text-2xl font-bold tracking-widest mb-4">
                {filtered[selectedIndex].label}
              </span>
              <p className="text-white text-xl font-semibold">
                {filtered[selectedIndex].title}
              </p>
              <span className="text-accent text-sm mt-2">
                {filtered[selectedIndex].category}
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
