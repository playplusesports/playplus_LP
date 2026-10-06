"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BrandMark } from "@/components/site/brand-mark"
import { PRIMARY_NAVIGATION } from "@/lib/site/navigation"

const SCROLLED_THRESHOLD_PX = 24

export function SiteHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > SCROLLED_THRESHOLD_PX)
    updateScrolled()
    window.addEventListener("scroll", updateScrolled, { passive: true })
    return () => window.removeEventListener("scroll", updateScrolled)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  // メニューの全面パネルはヘッダーの外に置く（ヘッダーの backdrop-filter が fixed の基準を奪うため）
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <div
          className={`mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border px-4 transition-all duration-300 md:h-16 md:px-6 ${
            isScrolled || isMenuOpen
              ? "border-line bg-surface-1/85 shadow-[0_8px_30px_-12px_rgba(13,13,51,0.25)] backdrop-blur-md"
              : "border-transparent"
          }`}
        >
          <BrandMark />

          <nav aria-label="メインメニュー" className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAVIGATION.map((link) => {
              const isCurrent = link.href !== "/#pricing" && pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-colors hover:bg-surface-2 ${isCurrent ? "text-fg" : "text-fg-dim"}`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link href="/contact" className="btn-primary ml-3 px-5 py-2.5">
              相談する
            </Link>
          </nav>

          <button
            type="button"
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className={`absolute h-0.5 w-5 bg-fg transition-transform ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-5 bg-fg transition-transform ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </header>

      <div
        inert={!isMenuOpen}
        className={`theme-brand fixed inset-0 z-40 transition-[opacity,clip-path] duration-500 lg:hidden ${
          isMenuOpen ? "opacity-100 [clip-path:circle(150%_at_100%_0)]" : "pointer-events-none opacity-0 [clip-path:circle(0%_at_100%_0)]"
        }`}
      >
        <nav aria-label="メインメニュー（スマートフォン）" className="site-container flex h-full flex-col pt-28 pb-10">
          {PRIMARY_NAVIGATION.map((link) => (
            <Link key={link.href} href={link.href} className="flex items-baseline justify-between border-b border-line py-5">
              <span className="text-3xl font-black">{link.label}</span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-fg-dim">{link.code}</span>
            </Link>
          ))}
          <Link href="/contact" className="btn-primary mt-auto py-5 text-base">
            無料で相談する
          </Link>
        </nav>
      </div>
    </>
  )
}
