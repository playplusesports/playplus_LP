"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ScrollAnimate } from "@/components/scroll-animate"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Users, ExternalLink, X } from "lucide-react"

type WorkItem = {
  id: string
  title: string
  category: string
  description: string
  period: string
  location: string
  scale: string
  tags: string[]
  imageUrl?: string
}

const categoryFilters = ["すべて", "大会運営", "イベント運営", "Web制作", "デザイン"] as const
type CategoryFilter = (typeof categoryFilters)[number]

const placeholders: Record<string, string> = {
  "大会運営": "bg-gradient-to-br from-purple-900 to-blue-900",
  "イベント運営": "bg-gradient-to-br from-amber-900 to-yellow-900",
  "Web制作": "bg-gradient-to-br from-emerald-900 to-teal-900",
  "デザイン": "bg-gradient-to-br from-orange-900 to-red-900",
}

export default function WorksPage() {
  return (
    <Suspense>
      <WorksContent />
    </Suspense>
  )
}

function WorksContent() {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("すべて")
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null)
  const [worksItems, setWorksItems] = useState<WorkItem[]>([])

  useEffect(() => {
    fetch("/api/works", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setWorksItems(data)
        // Open detail dialog if ?id= is in URL
        const id = searchParams.get("id")
        if (id) {
          const item = data.find((w: WorkItem) => w.id === id)
          if (item) setSelectedItem(item)
        }
      })
  }, [searchParams])

  const filtered =
    activeCategory === "すべて"
      ? worksItems
      : worksItems.filter((item) => item.category === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <p className="text-sm text-accent font-medium mb-2">Works</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                実績・ギャラリー
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                これまでに手がけたeスポーツ大会運営・Web制作・デザイン制作の実績をご紹介します。
              </p>
            </div>
          </ScrollAnimate>

          {/* Category Filter */}
          <ScrollAnimate delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categoryFilters.map((category) => (
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
          </ScrollAnimate>

          {/* Works Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-accent/50 transition-colors">
                    {/* Image Area */}
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="w-full aspect-[16/9] overflow-hidden cursor-pointer"
                    >
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                      ) : (
                        <div className={`w-full h-full ${placeholders[item.category] || "bg-gradient-to-br from-gray-800 to-gray-900"} flex items-center justify-center transition-transform group-hover:scale-105 duration-500`}>
                          <span className="text-white/30 text-lg font-bold tracking-widest">
                            {item.category.toUpperCase()}
                          </span>
                        </div>
                      )}
                    </button>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-accent rounded-full mb-1">
                            {item.category}
                          </span>
                          <h3 className="text-lg font-semibold text-foreground">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                        {item.period && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {item.period}
                          </span>
                        )}
                        {item.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {item.location}
                          </span>
                        )}
                        {item.scale && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {item.scale}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <ScrollAnimate delay={0.2}>
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
          </ScrollAnimate>
        </div>
      </section>

      {/* Detail Dialog */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white"
            onClick={() => setSelectedItem(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-xl bg-card border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.imageUrl ? (
              <img src={selectedItem.imageUrl} alt={selectedItem.title} className="w-full aspect-[16/9] object-cover" />
            ) : (
              <div className={`w-full aspect-[16/9] ${placeholders[selectedItem.category] || "bg-gradient-to-br from-gray-800 to-gray-900"} flex items-center justify-center`}>
                <span className="text-white/30 text-2xl font-bold tracking-widest">
                  {selectedItem.category.toUpperCase()}
                </span>
              </div>
            )}
            <div className="p-6 space-y-4">
              <span className="px-3 py-1 text-xs font-medium bg-secondary text-accent rounded-full">
                {selectedItem.category}
              </span>
              <h2 className="text-xl font-bold text-foreground">{selectedItem.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedItem.description}</p>
              <div className="grid grid-cols-3 gap-4 pt-2">
                {selectedItem.period && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">期間</p>
                    <p className="text-sm text-foreground flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      {selectedItem.period}
                    </p>
                  </div>
                )}
                {selectedItem.location && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">場所</p>
                    <p className="text-sm text-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      {selectedItem.location}
                    </p>
                  </div>
                )}
                {selectedItem.scale && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">規模</p>
                    <p className="text-sm text-foreground flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-accent" />
                      {selectedItem.scale}
                    </p>
                  </div>
                )}
              </div>
              {selectedItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedItem.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
