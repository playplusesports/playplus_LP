"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { WorkItem } from "@/lib/works"
import { WORKS_FILTERS, categoryCodeOf, type WorksFilter } from "@/lib/works-categories"

type WorksGalleryProps = {
  works: readonly WorkItem[]
  initialOpenId?: string
  showFilters?: boolean
}

const ALL_FILTER: WorksFilter = "すべて"
const WORKS_PAGE_PATH = "/works"

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
        <div role="tablist" aria-label="カテゴリで絞り込む" className="mb-10 flex flex-wrap gap-2">
          {availableFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                activeFilter === filter
                  ? "border-play bg-play text-white"
                  : "border-line-strong text-text-dim hover:border-play hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleWorks.map((work) => (
          <li key={work.id}>
            <WorkCard work={work} onOpen={() => open(work.id)} />
          </li>
        ))}
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
    <div className="relative h-full w-full bg-ink-2">
      <svg
        viewBox={`0 0 ${COVER_COLUMNS * COVER_CELL} ${COVER_ROWS * COVER_CELL}`}
        className="h-full w-full"
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
      <span className="absolute bottom-3 left-4 font-pixel text-xs tracking-[0.2em] text-text-dim">{categoryCodeOf(work.category)}</span>
    </div>
  )
}

function WorkCover({ work }: { work: WorkItem }) {
  if (!work.imageUrl) return <GeneratedCover work={work} />
  // 管理画面からアップロードされた任意サイズの画像なので next/image の最適化は使わない
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={work.imageUrl}
      alt=""
      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
    />
  )
}

function WorkCard({ work, onOpen }: { work: WorkItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-line bg-ink-1 text-left transition-colors hover:border-play focus-visible:border-play focus-visible:outline-none"
    >
      <div className="aspect-[16/10] w-full overflow-hidden border-b border-line">
        <WorkCover work={work} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center justify-between gap-3 font-mono text-[11px] text-text-dim">
          <span className="text-play">{work.category}</span>
          <span>{work.period}</span>
        </p>
        <h3 className="mt-2 font-bold leading-snug">{work.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-dim">{work.description}</p>
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
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink-0/80 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-detail-title"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-xl border border-line bg-ink-1 sm:rounded-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="group aspect-[16/9] w-full overflow-hidden border-b border-line">
          <WorkCover work={work} />
        </div>
        <div className="p-6 sm:p-8">
          <p className="font-mono text-xs text-play">{work.category}</p>
          <h2 id="work-detail-title" className="mt-2 text-2xl font-black leading-snug">
            {work.title}
          </h2>
          <p className="mt-4 whitespace-pre-line leading-relaxed text-text-dim">{work.description}</p>
          {facts.length > 0 && (
            <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-ink-1 p-3">
                  <dt className="font-mono text-[11px] text-text-dim">{fact.label}</dt>
                  <dd className="mt-1 text-sm">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {work.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <li key={tag} className="rounded border border-line-strong px-2 py-0.5 font-mono text-[11px] text-text-dim">
                  #{tag}
                </li>
              ))}
            </ul>
          )}
          <button ref={closeButtonRef} type="button" onClick={onClose} className="btn-outline mt-8 w-full">
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}
