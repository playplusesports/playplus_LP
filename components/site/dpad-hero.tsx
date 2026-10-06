"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { WorkCover } from "@/components/site/works-gallery"
import { SERVICE_PILLARS, type ServicePillar } from "@/lib/site/service-pillars"
import type { WorkItem } from "@/lib/works"

/*
  トップの第一画面。ロゴの十字キーを持つ携帯ゲーム機を置き、
  十字キーを押すと見出しが「Webに、」「アプリに、」…と切り替わり、
  画面にはその事業の実績が映る。同じ矢印を押すたびに、その事業の次の実績へ切り替わる。
  触られるまでは自動で順番に切り替え、触ったらその人の操作に任せる。
  十字キーにフォーカスがある間は矢印キーでも操作できる（ページのスクロールは奪わない）。
*/

type Direction = "up" | "right" | "down" | "left" | "center"

const DIRECTION_TO_SLUG: Record<Direction, string> = {
  up: "web",
  right: "app",
  down: "automation",
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
const AUTOPLAY_INTERVAL_MS = 2600
const AUTOPLAY_SEQUENCE: readonly (Direction | null)[] = [null, "up", "right", "down", "left", "center"]
const PRESS_FEEDBACK_MS = 160
const SPEAKER_HOLE_COUNT = 18
// まだ一度も押していない矢印の位置。最初に押したときに 0 番目（先頭の実績）になる
const NOT_PRESSED = -1
const INITIAL_STEPS: Record<Direction, number> = {
  up: NOT_PRESSED,
  right: NOT_PRESSED,
  down: NOT_PRESSED,
  left: NOT_PRESSED,
  center: NOT_PRESSED,
}

function pillarOf(direction: Direction): ServicePillar {
  const pillar = SERVICE_PILLARS.find((candidate) => candidate.slug === DIRECTION_TO_SLUG[direction])
  if (!pillar) throw new Error(`十字キーの ${direction} に対応する事業が見つかりません`)
  return pillar
}

// 事業ごとに、矢印で順番に映す実績の並び。データにない id は飛ばす
function reelOf(pillar: ServicePillar, works: readonly WorkItem[]): WorkItem[] {
  return pillar.heroWorkIds.flatMap((id) => works.filter((work) => work.id === id))
}

export function DpadHero({ works }: { works: readonly WorkItem[] }) {
  const [active, setActive] = useState<Direction | null>(null)
  const [steps, setSteps] = useState<Record<Direction, number>>(INITIAL_STEPS)
  const [pressed, setPressed] = useState<Direction | null>(null)
  const [isAutoplay, setIsAutoplay] = useState(true)

  // その矢印の事業を表示し、映す実績を1つ先へ進める
  const advance = (direction: Direction) => {
    setActive(direction)
    setSteps((current) => ({ ...current, [direction]: current[direction] + 1 }))
  }

  useEffect(() => {
    if (!isAutoplay) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let step = 0
    const timer = window.setInterval(() => {
      step = (step + 1) % AUTOPLAY_SEQUENCE.length
      const direction = AUTOPLAY_SEQUENCE[step]
      if (direction) advance(direction)
      else setActive(null)
    }, AUTOPLAY_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [isAutoplay])

  const press = (direction: Direction) => {
    setIsAutoplay(false)
    advance(direction)
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
  const activeReel = activePillar ? reelOf(activePillar, works) : []
  const activeIndex = active && activeReel.length > 0 ? steps[active] % activeReel.length : 0
  const activeWork = activeReel[activeIndex]
  const screenWorks = Array.from(
    new Map(SERVICE_PILLARS.flatMap((pillar) => reelOf(pillar, works)).map((work) => [work.id, work])).values(),
  )

  return (
    <section className="plus-pattern relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="site-container grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <h1 className="font-black leading-[1.05] tracking-[-0.02em]">
            <span className="sr-only">遊びに、プラスを。</span>
            <span aria-hidden="true" className="block text-[clamp(2.9rem,7.6vw,6.6rem)]">
              {word}
            </span>
            <span aria-hidden="true" className="block text-[clamp(2.9rem,7.6vw,6.6rem)]">
              プラス<span className="text-signal">を。</span>
            </span>
          </h1>

          <div className="mt-8 min-h-[5.5rem] max-w-xl" aria-live="polite">
            {activePillar ? (
              <p className="text-pretty leading-relaxed text-fg-dim md:text-lg">
                <span className="font-bold text-fg">{activePillar.title}</span>：{activePillar.lead}
                <Link href={`/services#${activePillar.slug}`} className="text-link ml-2 whitespace-nowrap text-sm">
                  詳しく見る
                </Link>
              </p>
            ) : (
              <p className="leading-relaxed text-fg-dim md:text-lg">
                Play+ は大阪を拠点に、Webサイトやアプリ、動画の制作と、eスポーツ大会などのイベント運営をしています。
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

        <GameConsole
          screenWorks={screenWorks}
          activeWork={activeWork}
          position={activeWork ? `${activeIndex + 1}/${activeReel.length}` : ""}
          activePillar={activePillar}
          active={active}
          pressed={pressed}
          isAutoplay={isAutoplay}
          onPress={press}
          onKeyDown={handleKeyDown}
        />
      </div>
    </section>
  )
}

type GameConsoleProps = {
  screenWorks: readonly WorkItem[]
  activeWork: WorkItem | undefined
  position: string
  activePillar: ServicePillar | null
  active: Direction | null
  pressed: Direction | null
  isAutoplay: boolean
  onPress: (direction: Direction) => void
  onKeyDown: (event: React.KeyboardEvent) => void
}

// ロゴの紺を本体色にした携帯ゲーム機。画面＋十字キー＋A/Bボタン
function GameConsole({
  screenWorks,
  activeWork,
  position,
  activePillar,
  active,
  pressed,
  isAutoplay,
  onPress,
  onKeyDown,
}: GameConsoleProps) {
  return (
    <div className="mx-auto w-full max-w-[34rem]">
      <div className="rounded-[2.25rem] border-b-[10px] border-[#07074a] bg-brand p-5 pb-7 shadow-[0_2px_0_#2a2a99_inset] sm:p-7 sm:pb-9">
        <div className="rounded-2xl bg-[#05051f] p-3 sm:p-4">
          <div className="flex items-center justify-between px-1 pb-2 text-[10px] text-white/45">
            <span className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${activePillar ? "bg-signal-bright" : "bg-white/30"}`} />
              {activePillar ? activePillar.title : "Play+"}
            </span>
            <span className="font-pixel">Play+</span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-[#0d0d3a]">
            <StartScreen />
            {/* 切り替えで待たせないよう、映す候補の実績をすべて重ねて読み込んでおき、選ばれたものだけを見せる */}
            {screenWorks.map((work) => (
              <div
                key={work.id}
                aria-hidden={work !== activeWork}
                className={`absolute inset-0 transition-opacity duration-200 ${work === activeWork ? "opacity-100" : "opacity-0"}`}
              >
                <WorkCover work={work} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 px-1 pt-2 text-xs text-white/70">
            {activeWork ? (
              <Link href={`/works?id=${encodeURIComponent(activeWork.id)}`} className="truncate hover:text-white hover:underline">
                ▶ {activeWork.title}
              </Link>
            ) : (
              <span>{isAutoplay ? "十字キーを押してみてください" : ""}</span>
            )}
            <span className="shrink-0 font-pixel text-white/45">{position}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 px-1 sm:mt-8 sm:px-3">
          <div
            role="group"
            aria-label="十字キー。押すと事業が切り替わります（矢印キーでも操作できます）"
            onKeyDown={onKeyDown}
            className="relative grid aspect-square w-[min(38vw,9.5rem)] grid-cols-3 grid-rows-3 drop-shadow-[0_5px_0_#05053a]"
          >
            {/* 十字の地は1枚で描き、ボタンの継ぎ目を見せない */}
            <span aria-hidden="true" className="absolute inset-y-0 left-1/3 w-1/3 rounded-lg bg-[#e9e9f2]" />
            <span aria-hidden="true" className="absolute inset-x-0 top-1/3 h-1/3 rounded-lg bg-[#e9e9f2]" />
            <DpadArm
              direction="up"
              label="Web"
              area="col-start-2 row-start-1 rounded-t-lg"
              active={active}
              pressed={pressed}
              onPress={onPress}
            />
            <DpadArm
              direction="left"
              label="動画"
              area="col-start-1 row-start-2 rounded-l-lg"
              active={active}
              pressed={pressed}
              onPress={onPress}
            />
            <DpadArm
              direction="center"
              label="イベント"
              area="col-start-2 row-start-2"
              active={active}
              pressed={pressed}
              onPress={onPress}
            />
            <DpadArm
              direction="right"
              label="アプリ"
              area="col-start-3 row-start-2 rounded-r-lg"
              active={active}
              pressed={pressed}
              onPress={onPress}
            />
            <DpadArm
              direction="down"
              label="仕組み化"
              area="col-start-2 row-start-3 rounded-b-lg"
              active={active}
              pressed={pressed}
              onPress={onPress}
            />
          </div>

          <div className="flex flex-col items-end gap-5">
            <div className="flex -rotate-[18deg] items-end gap-4 sm:gap-5">
              <RoundButton href="/works" letter="B" caption="実績" tone="light" />
              <RoundButton href="/contact" letter="A" caption="相談" tone="signal" />
            </div>
            <div aria-hidden="true" className="mr-1 grid grid-cols-6 gap-1.5 opacity-40">
              {Array.from({ length: SPEAKER_HOLE_COUNT }, (_, index) => (
                <span key={index} className="h-1.5 w-1.5 rounded-full bg-black/60" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-fg-dim">矢印を押すたびに、その事業の別の実績に切り替わります。Aで相談、Bで実績へ。</p>
    </div>
  )
}

function StartScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-white">
      <p className="font-pixel text-5xl sm:text-6xl">
        Play<span className="text-signal-bright">+</span>
      </p>
      <p className="animate-pulse font-pixel text-xs text-white/70 sm:text-sm">PUSH ▲ ▼ ◀ ▶</p>
    </div>
  )
}

function RoundButton({ href, letter, caption, tone }: { href: string; letter: string; caption: string; tone: "signal" | "light" }) {
  return (
    <Link href={href} className="group flex flex-col items-center gap-1.5" aria-label={`${letter}ボタン：${caption}`}>
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full font-display text-lg font-extrabold shadow-[0_5px_0_#05053a] transition-transform group-active:translate-y-[3px] group-active:shadow-[0_2px_0_#05053a] sm:h-16 sm:w-16 ${
          tone === "signal" ? "bg-signal text-white group-hover:bg-signal-bright" : "bg-[#e9e9f2] text-brand group-hover:bg-white"
        }`}
      >
        {letter}
      </span>
      <span className="text-[11px] font-bold text-white/70">{caption}</span>
    </Link>
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
      aria-label={`${label}を表示する`}
      onClick={() => onPress(direction)}
      className={`group relative flex items-center justify-center transition-[transform,background-color] duration-150 outline-none focus-visible:z-10 focus-visible:ring-4 focus-visible:ring-signal/60 ${area} ${
        isPressed ? "translate-y-[2px] bg-black/15" : "hover:bg-black/[0.05]"
      }`}
    >
      {direction === "center" ? (
        <span
          className={`h-[38%] w-[38%] rounded-full transition-colors ${isActive ? "bg-signal" : "bg-brand/15 group-hover:bg-brand/30"}`}
        />
      ) : (
        <svg viewBox="0 0 20 20" className={`h-[46%] w-[46%] ${ARROW_ROTATION[direction]}`} aria-hidden="true">
          <path d="M10 3 18 16H2Z" className={`transition-colors ${isActive ? "fill-signal" : "fill-signal/70 group-hover:fill-signal"}`} />
        </svg>
      )}
    </button>
  )
}
