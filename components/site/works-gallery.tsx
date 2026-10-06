"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { WorkItem } from "@/lib/works"
import { WORKS_FILTERS, type WorksFilter } from "@/lib/works-categories"

type WorksGalleryProps = {
  works: readonly WorkItem[]
  initialOpenId?: string
  showFilters?: boolean
}

const ALL_FILTER: WorksFilter = "すべて"
const WORKS_PAGE_PATH = "/works"

// 6列のグリッドに「大1・小2」「小3」の順で並べる（5件で1周）
const BENTO_PATTERN = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2"] as const
const FEATURED_SPAN = BENTO_PATTERN[0]

// 実績ページでは開いている実績を URL（?id=）に残し、共有できるようにする
function syncOpenIdToUrl(id: string) {
  if (window.location.pathname !== WORKS_PAGE_PATH) return
  const query = id ? `?id=${encodeURIComponent(id)}` : ""
  window.history.replaceState(null, "", `${WORKS_PAGE_PATH}${query}`)
}

export function WorksGallery({ works, initialOpenId = "", showFilters = true }: WorksGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<WorksFilter>(ALL_FILTER)
  const [openId, setOpenId] = useState(initialOpenId)

  const availableFilters = useMemo(
    () => WORKS_FILTERS.filter((filter) => filter === ALL_FILTER || works.some((work) => work.category === filter)),
    [works],
  )
  const visibleWorks = activeFilter === ALL_FILTER ? works : works.filter((work) => work.category === activeFilter)
  const openWork = works.find((work) => work.id === openId)

  const open = (id: string) => {
    setOpenId(id)
    syncOpenIdToUrl(id)
  }
  const close = useCallback(() => {
    setOpenId("")
    syncOpenIdToUrl("")
  }, [])

  return (
    <div>
      {showFilters && (
        <div role="tablist" aria-label="カテゴリで絞り込む" className="mb-12 flex flex-wrap gap-2">
          {availableFilters.map((filter) => {
            const count = filter === ALL_FILTER ? works.length : works.filter((work) => work.category === filter).length
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-md border px-4 py-2 text-sm font-bold transition-colors ${
                  activeFilter === filter
                    ? "border-fg bg-fg text-surface-0"
                    : "border-line-strong text-fg-dim hover:border-fg hover:text-fg"
                }`}
              >
                {filter}
                <span className="ml-2 text-xs opacity-60">{count}</span>
              </button>
            )
          })}
        </div>
      )}

      <ul className="grid gap-x-5 gap-y-12 md:grid-cols-6">
        {visibleWorks.map((work, position) => {
          const span = BENTO_PATTERN[position % BENTO_PATTERN.length]
          return (
            <li key={work.id} className={span}>
              <WorkCard work={work} isFeatured={span === FEATURED_SPAN} onOpen={() => open(work.id)} />
            </li>
          )
        })}
      </ul>

      {openWork && <WorkDetail work={openWork} onClose={close} />}
    </div>
  )
}

const COVER_COLUMNS = 8
const COVER_ROWS = 5
const COVER_CELL = 40
// 光らせる＋の割合（1/5）と、そのうち赤にする割合（1/3）
const LIT_ONE_IN = 5
const RED_ONE_IN = 3
const LIT_ARM = 9
const DIM_ARM = 4
const LIT_STROKE = 5
const DIM_STROKE = 1.5

// 実績ごとに決まった並びで＋を光らせる。画像がない実績でもカードの見分けがつくように
function litPattern(seed: string): boolean[] {
  let hash = 2166136261
  for (const char of seed) {
    hash = Math.imul(hash ^ char.charCodeAt(0), 16777619)
  }
  return Array.from({ length: COVER_COLUMNS * COVER_ROWS }, (_, index) => {
    hash = Math.imul(hash ^ (hash >>> 13), 1274126177) + index
    return (hash >>> 0) % LIT_ONE_IN === 0
  })
}

function GeneratedCover({ work }: { work: WorkItem }) {
  const lit = litPattern(work.id)
  return (
    <div className="theme-ink relative h-full w-full">
      <svg
        viewBox={`0 0 ${COVER_COLUMNS * COVER_CELL} ${COVER_ROWS * COVER_CELL}`}
        className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {lit.map((isLit, index) => {
          const x = (index % COVER_COLUMNS) * COVER_CELL + COVER_CELL / 2
          const y = Math.floor(index / COVER_COLUMNS) * COVER_CELL + COVER_CELL / 2
          const arm = isLit ? LIT_ARM : DIM_ARM
          const color = isLit ? (index % RED_ONE_IN === 0 ? "var(--signal-bright)" : "var(--play)") : "var(--line-strong)"
          return (
            <path
              key={index}
              d={`M${x - arm} ${y}h${arm * 2}M${x} ${y - arm}v${arm * 2}`}
              stroke={color}
              strokeWidth={isLit ? LIT_STROKE : DIM_STROKE}
            />
          )
        })}
      </svg>
    </div>
  )
}

function WorkCover({ work }: { work: WorkItem }) {
  if (!work.imageUrl) return <GeneratedCover work={work} />
  // 管理画面からアップロードされた任意サイズの画像なので next/image の最適化は使わない
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={work.imageUrl}
      alt=""
      loading="lazy"
      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
    />
  )
}

function WorkCard({ work, isFeatured, onOpen }: { work: WorkItem; isFeatured: boolean; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="group flex h-full w-full flex-col text-left focus-visible:outline-none">
      <div
        className={`w-full overflow-hidden rounded-lg border border-line bg-surface-2 group-focus-visible:ring-4 group-focus-visible:ring-play/40 ${
          isFeatured ? "aspect-[16/10] md:aspect-[16/9.4]" : "aspect-[16/10]"
        }`}
      >
        <WorkCover work={work} />
      </div>
      <div className="flex items-start justify-between gap-4 pt-5">
        <div className="min-w-0">
          <p className="text-xs text-fg-dim">
            <span className="font-bold text-signal">{work.category}</span>
            <span className="ml-3">{work.period}</span>
          </p>
          <h3 className={`mt-2 font-bold leading-snug group-hover:text-signal ${isFeatured ? "text-xl md:text-2xl" : "text-lg"}`}>
            {work.title}
          </h3>
          {isFeatured && <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-fg-dim">{work.description}</p>}
        </div>
      </div>
    </button>
  )
}

function WorkDetail({ work, onClose }: { work: WorkItem; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const facts = [
    { label: "時期", value: work.period },
    { label: "場所", value: work.location },
    { label: "規模", value: work.scale },
  ].filter((fact) => fact.value && fact.value !== "-")

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-fg/50 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-detail-title"
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-xl bg-surface-1 sm:rounded-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="group aspect-[16/9] w-full overflow-hidden">
          <WorkCover work={work} />
        </div>
        <div className="p-6 sm:p-10">
          <p className="text-xs font-bold text-signal">{work.category}</p>
          <h2 id="work-detail-title" className="mt-2 text-2xl font-black leading-snug md:text-3xl">
            {work.title}
          </h2>
          <p className="mt-5 whitespace-pre-line leading-relaxed text-fg-dim">{work.description}</p>
          {facts.length > 0 && (
            <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-surface-1 p-4">
                  <dt className="text-xs text-fg-dim">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-bold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {work.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <li key={tag} className="rounded bg-surface-2 px-2 py-1 text-xs text-fg-dim">
                  #{tag}
                </li>
              ))}
            </ul>
          )}
          <button ref={closeButtonRef} type="button" onClick={onClose} className="btn-secondary mt-10 w-full">
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}
