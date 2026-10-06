"use client"

import { useEffect, useRef, useState } from "react"

export type AudienceTab = { id: string; label: string; content: React.ReactNode }

// 料金表を「個人・個人事業主」と「法人」で切り替える。
// どちらの中身も HTML には出しておき（検索エンジン向け）、見せる方だけを切り替える。
// URL の #id で開くタブを指定できる（例: /services/web#corporate）。
export function AudienceTabs({ tabs }: { tabs: readonly AudienceTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const selectFromHash = () => {
      const hashId = window.location.hash.slice(1)
      if (!tabs.some((tab) => tab.id === hashId)) return
      setActiveId(hashId)
      containerRef.current?.scrollIntoView({ block: "start" })
    }
    selectFromHash()
    window.addEventListener("hashchange", selectFromHash)
    return () => window.removeEventListener("hashchange", selectFromHash)
  }, [tabs])

  return (
    <div ref={containerRef} className="scroll-mt-28">
      <div role="tablist" aria-label="ご利用者の区分" className="mb-10 inline-flex rounded-lg border border-line-strong bg-surface-1 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeId === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveId(tab.id)}
            className={`rounded-md px-5 py-2.5 text-sm font-bold transition-colors md:px-8 ${
              activeId === tab.id ? "bg-fg text-surface-0" : "text-fg-dim hover:text-fg"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.id} role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} hidden={activeId !== tab.id}>
          {tab.content}
        </div>
      ))}
    </div>
  )
}
