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

  const isSolid = isScrolled || isMenuOpen

  // メニューの全面パネルはヘッダーの外に置く（ヘッダーの backdrop-filter が fixed の基準を奪うため）
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          isSolid ? "border-b border-line bg-ink-0/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="site-container flex h-16 items-center justify-between md:h-20">
          <BrandMark />

          <nav aria-label="メインメニュー" className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAVIGATION.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-md px-3 py-2 text-sm font-medium text-text-dim transition-colors hover:text-white"
              >
                <span className="mr-1.5 font-pixel text-[10px] text-play/70 transition-colors group-hover:text-signal-bright">+</span>
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-signal ml-4 px-5 py-2.5">
              相談する
            </Link>
          </nav>

          <button
            type="button"
            className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className={`absolute h-0.5 w-6 bg-text transition-transform ${isMenuOpen ? "rotate-45" : "-translate-y-2"}`} />
            <span className={`absolute h-0.5 w-6 bg-text transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`absolute h-0.5 w-6 bg-text transition-transform ${isMenuOpen ? "-rotate-45" : "translate-y-2"}`} />
          </button>
        </div>
      </header>

      <div
        inert={!isMenuOpen}
        className={`fixed inset-0 top-16 z-40 bg-ink-0 plus-pattern transition-opacity duration-300 md:top-20 lg:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="メインメニュー（スマートフォン）" className="site-container flex flex-col gap-1 pt-8">
          {PRIMARY_NAVIGATION.map((link) => (
            <Link key={link.href} href={link.href} className="flex items-baseline gap-4 border-b border-line py-5">
              <span className="w-20 shrink-0 font-pixel text-xs text-play">{link.code}</span>
              <span className="text-2xl font-bold">{link.label}</span>
            </Link>
          ))}
          <Link href="/contact" className="btn-signal mt-8 py-4 text-base">
            相談する
          </Link>
        </nav>
      </div>
    </>
  )
}
