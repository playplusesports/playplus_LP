"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { ScrollAnimate } from "@/components/scroll-animate"

// LP（/lp/*）共通のクリーンなテイストを1か所に集約。各LPページ・リンク先で共有する。
// 通常サイト（ダーク基調）の Header/Footer とは別物。色は明示指定で自己完結。

export const LP_BLUE = "#1d4ed8"
export const LP_CTA = "#f5601e"
export const LP_LINE = "https://lin.ee/pYn3rVU"

// 最小ヘッダー：ロゴ＋CTA（広告流入LPはナビを絞ってCVに集中）
export function LpHeader({ ctaHref = "/lp/contact", ctaLabel = "無料で相談する" }: { ctaHref?: string; ctaLabel?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/lp/web" className="flex items-center gap-2 font-bold text-slate-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Play+" className="h-7 w-7 object-contain" />
          <span>Play+</span>
        </Link>
        <Link href={ctaHref} className="rounded-full px-5 py-2 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5" style={{ background: LP_CTA }}>
          {ctaLabel}
        </Link>
      </div>
    </header>
  )
}

export function LpFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-xs text-slate-400 sm:flex-row">
        <span>&copy; {new Date().getFullYear()} Play+</span>
        <div className="flex flex-wrap justify-center gap-5">
          <Link href="/lp/web" className="hover:text-slate-700">サービスTOP</Link>
          <Link href="/" className="hover:text-slate-700">通常サイト</Link>
          <Link href="/legal" className="hover:text-slate-700">特定商取引法に基づく表記</Link>
          <Link href="/privacy" className="hover:text-slate-700">プライバシーポリシー</Link>
        </div>
      </div>
    </footer>
  )
}

// スマホ下部の追従CTA
export function LpStickyCta({ href = "/lp/contact", label = "無料で相談する" }: { href?: string; label?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <a href={LP_LINE} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-300 py-3 text-sm font-bold text-slate-700">
          <MessageCircle className="h-4 w-4" /> LINE
        </a>
        <Link href={href} className="flex flex-[2] items-center justify-center gap-1.5 rounded-full py-3 text-sm font-bold text-white shadow" style={{ background: LP_CTA }}>
          {label} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

// 参考LP風の装飾スラッシュ（＼ 見出し ／）付き見出し。スクロールでフェードイン。
export function SecHead({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <ScrollAnimate className="mb-10 text-center">
      {eyebrow ? <p className="text-xs font-bold tracking-[0.2em]" style={{ color: LP_CTA }}>{eyebrow}</p> : null}
      <h2 className="mt-2 flex items-center justify-center gap-4 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
        <span aria-hidden className="inline-block h-6 w-px rotate-[20deg] bg-slate-300" />
        <span>{title}</span>
        <span aria-hidden className="inline-block h-6 w-px -rotate-[20deg] bg-slate-300" />
      </h2>
      {sub ? <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{sub}</p> : null}
    </ScrollAnimate>
  )
}
