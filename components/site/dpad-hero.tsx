"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SERVICE_PILLARS, type ServicePillar } from "@/lib/site/service-pillars"

/*
  トップの第一画面。ロゴの十字キーを大きく置き、押すと見出しが
  「遊びに、」→「Webに、」→「アプリに、」… と切り替わる。
  触られるまでは自動で順番に切り替え、触ったらその人の操作に任せる。
  十字キーにフォーカスがある間は矢印キーでも操作できる（ページのスクロールは奪わない）。
*/

type Direction = "up" | "right" | "down" | "left" | "center"

const DIRECTION_TO_SLUG: Record<Direction, string> = {
  up: "web",
  right: "app",
  down: "ai",
  left: "video",
  center: "event",
}

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowRight: "right",
  ArrowDown: "down",
  ArrowLeft: "left",
  Enter: "center",
  " ": "center",
}

const DEFAULT_WORD = "遊びに、"
const AUTOPLAY_INTERVAL_MS = 2400
const AUTOPLAY_SEQUENCE: readonly (Direction | null)[] = [null, "up", "right", "down", "left", "center"]
const PRESS_FEEDBACK_MS = 160

function pillarOf(direction: Direction): ServicePillar {
  const pillar = SERVICE_PILLARS.find((candidate) => candidate.slug === DIRECTION_TO_SLUG[direction])
  if (!pillar) throw new Error(`十字キーの ${direction} に対応する事業が見つかりません`)
  return pillar
}

export function DpadHero() {
  const [active, setActive] = useState<Direction | null>(null)
  const [pressed, setPressed] = useState<Direction | null>(null)
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    if (!isAutoplay) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let step = 0
    const timer = window.setInterval(() => {
      step = (step + 1) % AUTOPLAY_SEQUENCE.length
      setActive(AUTOPLAY_SEQUENCE[step])
    }, AUTOPLAY_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [isAutoplay])

  const press = (direction: Direction) => {
    setIsAutoplay(false)
    setActive(direction)
    setPressed(direction)
    window.setTimeout(() => setPressed(null), PRESS_FEEDBACK_MS)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const direction = KEY_TO_DIRECTION[event.key]
    if (!direction) return
    event.preventDefault()
    press(direction)
  }

  const activePillar = active ? pillarOf(active) : null
  const word = activePillar?.heroWord ?? DEFAULT_WORD

  return (
    <section className="plus-pattern relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="site-container grid items-center gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
        <div>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            Creative Tech Studio — Osaka, Japan
          </p>

          <h1 className="mt-8 font-black leading-[1.04] tracking-[-0.02em]">
            <span className="sr-only">遊びに、プラスを。</span>
            <span aria-hidden="true" className="block text-[clamp(2.9rem,8.4vw,7.2rem)]">
              <span key={word} className="inline-block animate-word-in">
                {word}
              </span>
            </span>
            <span aria-hidden="true" className="block text-[clamp(2.9rem,8.4vw,7.2rem)]">
              プラス<span className="text-signal">を。</span>
            </span>
          </h1>

          <div className="mt-8 min-h-[5.5rem] max-w-xl" aria-live="polite">
            {activePillar ? (
              <p key={activePillar.slug} className="animate-word-in leading-relaxed text-fg-dim md:text-lg">
                <span className="font-bold text-fg">{activePillar.title}</span> — {activePillar.lead}
                <Link href={`/services#${activePillar.slug}`} className="text-link ml-2 whitespace-nowrap text-sm">
                  詳しく →
                </Link>
              </p>
            ) : (
              <p className="leading-relaxed text-fg-dim md:text-lg">
                Webサイト、アプリ、AIの自動化、動画、イベント。つくる技術と、楽しませる発想で、あなたの「やりたい」にプラスを足すクリエイティブテックスタジオです。
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              無料で相談する
            </Link>
            <Link href="/works" className="btn-secondary">
              実績を見る
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div
            role="group"
            aria-label="十字キー。押すと事業が切り替わります（矢印キーでも操作できます）"
            onKeyDown={handleKeyDown}
            className="relative grid aspect-square w-[min(66vw,340px)] grid-cols-3 grid-rows-3 drop-shadow-[0_24px_40px_rgba(16,16,106,0.28)]"
          >
            {/* 十字の地は1枚で描き、ボタンの継ぎ目を見せない */}
            <span aria-hidden="true" className="absolute inset-y-0 left-1/3 w-1/3 rounded-2xl bg-brand" />
            <span aria-hidden="true" className="absolute inset-x-0 top-1/3 h-1/3 rounded-2xl bg-brand" />
            <DpadArm
              direction="up"
              label="WEB"
              area="col-start-2 row-start-1 rounded-t-2xl"
              active={active}
              pressed={pressed}
              onPress={press}
            />
            <DpadArm
              direction="left"
              label="VIDEO"
              area="col-start-1 row-start-2 rounded-l-2xl"
              active={active}
              pressed={pressed}
              onPress={press}
            />
            <DpadArm direction="center" label="EVENT" area="col-start-2 row-start-2" active={active} pressed={pressed} onPress={press} />
            <DpadArm
              direction="right"
              label="APP"
              area="col-start-3 row-start-2 rounded-r-2xl"
              active={active}
              pressed={pressed}
              onPress={press}
            />
            <DpadArm
              direction="down"
              label="AI"
              area="col-start-2 row-start-3 rounded-b-2xl"
              active={active}
              pressed={pressed}
              onPress={press}
            />
          </div>
          <p className="eyebrow mt-8">{isAutoplay ? "Press the + to play" : `Selected — ${activePillar?.code ?? "PLAY"}`}</p>
        </div>
      </div>
    </section>
  )
}

const ARROW_ROTATION: Record<Exclude<Direction, "center">, string> = {
  up: "rotate-0",
  right: "rotate-90",
  down: "rotate-180",
  left: "-rotate-90",
}

type DpadArmProps = {
  direction: Direction
  label: string
  area: string
  active: Direction | null
  pressed: Direction | null
  onPress: (direction: Direction) => void
}

function DpadArm({ direction, label, area, active, pressed, onPress }: DpadArmProps) {
  const isActive = active === direction
  const isPressed = pressed === direction
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={`${label} を選ぶ`}
      onClick={() => onPress(direction)}
      className={`group relative flex items-center justify-center transition-[transform,background-color] duration-150 outline-none focus-visible:z-10 focus-visible:ring-4 focus-visible:ring-play/50 ${area} ${
        isPressed ? "translate-y-[3px] bg-black/25" : "hover:bg-white/[0.06]"
      }`}
    >
      {direction === "center" ? (
        <span
          className={`h-[34%] w-[34%] rounded-full transition-colors ${isActive ? "bg-signal" : "bg-white/12 group-hover:bg-white/25"}`}
        />
      ) : (
        <svg viewBox="0 0 20 20" className={`h-[38%] w-[38%] ${ARROW_ROTATION[direction]}`} aria-hidden="true">
          <path
            d="M10 3 18 16H2Z"
            className={`transition-colors ${isActive ? "fill-signal-bright" : "fill-signal group-hover:fill-signal-bright"}`}
          />
        </svg>
      )}
      <span
        className={`pointer-events-none absolute font-mono text-[10px] tracking-[0.18em] transition-colors ${
          isActive ? "text-white" : "text-white/45"
        } ${direction === "center" ? "bottom-2" : direction === "down" ? "bottom-2" : "top-2"}`}
      >
        {label}
      </span>
    </button>
  )
}
