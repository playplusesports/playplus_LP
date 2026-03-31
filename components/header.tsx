"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon } from "lucide-react"

const navItems = [
  { label: "サービス", href: "/#services" },
  { label: "選ばれる理由", href: "/#benefits" },
  { label: "実績", href: "/works" },
  { label: "ニュース", href: "/news" },
  { label: "料金", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Play+" width={36} height={36} className="rounded-full" />
            <span className="text-xl font-bold text-foreground">Play+</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              aria-label="テーマを切り替え"
            >
              <Sun className="h-5 w-5 hidden dark:block" />
              <Moon className="h-5 w-5 block dark:hidden" />
            </button>
            <Button asChild>
              <a href="/contact">無料相談</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              aria-label="テーマを切り替え"
            >
              <Sun className="h-5 w-5 hidden dark:block" />
              <Moon className="h-5 w-5 block dark:hidden" />
            </button>
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="メニューを開く"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <nav className="flex flex-col px-4 py-4 gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-2">
              <a href="/contact">無料相談</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
