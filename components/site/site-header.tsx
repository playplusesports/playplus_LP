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
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          isScrolled || isMenuOpen ? "border-line bg-surface-0/95 backdrop-blur" : "border-transparent"
        }`}
      >
        <div className="site-container flex h-16 items-center justify-between md:h-20">
          <BrandMark />

          <nav aria-label="メインメニュー" className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAVIGATION.map((link) => {
              const isCurrent = link.href !== "/#pricing" && pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`px-3 py-2 text-sm font-bold transition-colors hover:text-fg ${isCurrent ? "text-fg underline decoration-signal decoration-2 underline-offset-8" : "text-fg-dim"}`}
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
            className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
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
        className={`fixed inset-0 top-16 z-40 bg-surface-0 transition-opacity duration-200 md:top-20 lg:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="メインメニュー（スマートフォン）" className="site-container flex h-full flex-col pt-6 pb-10">
          {PRIMARY_NAVIGATION.map((link) => (
            <Link key={link.href} href={link.href} className="flex items-baseline justify-between border-b border-line py-5">
              <span className="text-2xl font-black">{link.label}</span>
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
