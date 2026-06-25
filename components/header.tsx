"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

// トップ(overdrive)ナビに合わせた共通ヘッダー。スタイルは globals.css の .site-* を参照。
const navItems = [
  { n: "01", label: "Services", href: "/#services" },
  { n: "02", label: "Work", href: "/works" },
  { n: "03", label: "Pricing", href: "/#pricing" },
  { n: "04", label: "News", href: "/news" },
  { n: "05", label: "FAQ", href: "/#faq" },
  { n: "06", label: "Contact", href: "/contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`site-header${scrolled ? " scr" : ""}`}>
      <Link href="/" className="brand" onClick={close}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Play+" />
        PLAY+
      </Link>

      <nav className={`site-nav-wrap${open ? " open" : ""}`} aria-label="メインナビゲーション">
        <ul className="site-nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={close}>
                <span>{item.n}</span>{item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className={`site-burger${open ? " x" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
      >
        <span /><span /><span />
      </button>
    </header>
  )
}
