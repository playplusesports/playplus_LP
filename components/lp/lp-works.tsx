"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"
import { LpHeader, LpFooter, LpStickyCta, LP_BLUE as BLUE, LP_CTA as CTA } from "@/components/lp/lp-chrome"
import { Calendar, MapPin, Users, X, ArrowRight, ShieldCheck } from "lucide-react"

// LP（/lp/works）：通常 /works と同じ /api/works を流用したクリーンな実績ギャラリー（フィルタ＋モーダル）。
type WorkItem = {
  id: string; title: string; category: string; description: string
  period?: string; location?: string; scale?: string; tags?: string[]; imageUrl?: string
}

const FILTERS = ["すべて", "大会運営", "イベント運営", "Web制作", "デザイン"] as const

export function LpWorks() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LpWorksInner />
    </Suspense>
  )
}

function LpWorksInner() {
  const searchParams = useSearchParams()
  const [items, setItems] = useState<WorkItem[]>([])
  const [active, setActive] = useState<(typeof FILTERS)[number]>("すべて")
  const [selected, setSelected] = useState<WorkItem | null>(null)

  useEffect(() => {
    fetch("/api/works", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: WorkItem[]) => {
        setItems(data)
        const id = searchParams.get("id")
        if (id) {
          const found = data.find((w) => w.id === id)
          if (found) setSelected(found)
        }
      })
      .catch(() => {})
  }, [searchParams])

  const filtered = active === "すべて" ? items : items.filter((w) => w.category === active)

  return (
    <div className="min-h-screen bg-white pb-20 text-slate-800 antialiased lg:pb-0">
      <LpHeader />

      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-14 text-center">
        <ScrollAnimate className="mx-auto max-w-3xl px-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-700">
            <ShieldCheck className="h-3.5 w-3.5" /> WORKS / Play+
          </span>
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">制作・運営実績</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
            これまでに手がけたイベント・大会・Web・デザインの実績の一部をご紹介します。
          </p>
        </ScrollAnimate>
      </section>

      {/* FILTER + GRID */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setActive(f)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${active === f ? "text-white shadow" : "border border-slate-300 text-slate-600 hover:bg-slate-50"}`} style={active === f ? { background: BLUE } : undefined}>
                {f}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((w) => (
                <StaggerItem key={w.id}>
                  <button onClick={() => setSelected(w)} className="group block w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition-shadow hover:shadow-lg">
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                      {w.imageUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={w.imageUrl} alt={`${w.title} のサムネイル`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-400">{w.category}</div>
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold" style={{ color: BLUE }}>{w.category}</span>
                      <h3 className="mt-1.5 font-bold text-slate-900">{w.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{w.description}</p>
                    </div>
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <p className="text-center text-sm text-slate-400">{items.length === 0 ? "実績を読み込んでいます…" : "該当する実績がありません。"}</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: CTA }}>
        <ScrollAnimate className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-extrabold text-white">あなたのプロジェクトも、ここに。</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-orange-50">まずはお気軽にご相談ください。初回相談・お見積りは無料です。</p>
          <Link href="/lp/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition-transform hover:-translate-y-0.5">無料で相談する <ArrowRight className="h-4 w-4" /></Link>
        </ScrollAnimate>
      </section>

      <LpFooter />
      <LpStickyCta />

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white"
              initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                {selected.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={selected.imageUrl} alt={selected.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-400">{selected.category}</div>
                )}
                <button onClick={() => setSelected(null)} aria-label="閉じる" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow hover:bg-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 sm:p-8">
                <span className="text-xs font-bold" style={{ color: BLUE }}>{selected.category}</span>
                <h3 className="mt-1.5 text-xl font-extrabold text-slate-900">{selected.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{selected.description}</p>

                {(selected.period || selected.location || selected.scale) && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {selected.period && <Meta icon={Calendar} label="時期" value={selected.period} />}
                    {selected.location && <Meta icon={MapPin} label="場所" value={selected.location} />}
                    {selected.scale && <Meta icon={Users} label="規模" value={selected.scale} />}
                  </div>
                )}

                {selected.tags && selected.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {selected.tags.map((t) => <span key={t} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{t}</span>)}
                  </div>
                )}

                <Link href="/lp/contact" className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5" style={{ background: CTA }}>
                  同じような企画を相談する <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Meta({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-400"><Icon className="h-3.5 w-3.5" />{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-700">{value}</p>
    </div>
  )
}
