"use client"

import { useEffect, useRef, useState } from "react"

/*
  トップの背景。ロゴの十字キー「＋」を格子状に並べ、触ると反応させる。
  - カーソルの近くの＋は大きく・青く・少し逃げる
  - クリック（タップ）すると波紋が広がり、通過した＋が赤く光る
  - しばらく操作がないと自動で波紋を出す（スマホでも動きが見えるように）
  動きを減らす設定の人には静止画として一度だけ描く。
*/

const CELL_DESKTOP_PX = 36
const CELL_MOBILE_PX = 30
const MOBILE_BREAKPOINT_PX = 640
const PLUS_ARM_PX = 4
const POINTER_RADIUS_PX = 170
const POINTER_REPEL_PX = 9
const POINTER_GROWTH = 1.7
const RIPPLE_SPEED_PX_PER_MS = 0.75
const RIPPLE_BAND_PX = 46
const RIPPLE_GROWTH = 1.5
const RIPPLE_LIFETIME_MS = 2600
const IDLE_BEFORE_AUTOPLAY_MS = 3500
const AUTOPLAY_INTERVAL_MS = 2800
const AMBIENT_WAVE_SPEED = 0.0011
const AMBIENT_WAVE_DENSITY = 0.011
const ALPHA_BUCKET_COUNT = 4
const BASE_ALPHA_MIN = 0.22
const BASE_ALPHA_RANGE = 0.3
const CALM_STROKE_PX = 1.4
const EXCITED_THICKNESS_RATIO = 0.62
const EXCITED_ALPHA_MIN = 0.45
const EXCITED_THRESHOLD = 0.02
const RIPPLE_COLOR_BOOST = 1.4
// 自動の波紋は画面の端を避けて、中央寄りの範囲に出す
const AUTOPLAY_MARGIN_X = 0.15
const AUTOPLAY_MARGIN_Y = 0.2
const MAX_DEVICE_PIXEL_RATIO = 2

const COLOR_BASE = [72, 80, 170] as const
const COLOR_POINTER = [109, 118, 255] as const
const COLOR_RIPPLE = [255, 74, 58] as const

type Ripple = { x: number; y: number; startedAt: number }
type Pointer = { x: number; y: number; isInside: boolean }
type Rgb = readonly [number, number, number]

function mixColor(from: Rgb, to: Rgb, amount: number): string {
  const channel = (index: number) => Math.round(from[index] + (to[index] - from[index]) * amount)
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`
}

function easeOut(value: number): number {
  return 1 - (1 - value) * (1 - value)
}

function rippleStrength(distance: number, ripple: Ripple, now: number): number {
  const age = now - ripple.startedAt
  const lifeLeft = 1 - age / RIPPLE_LIFETIME_MS
  if (lifeLeft <= 0) return 0
  const gap = Math.abs(distance - age * RIPPLE_SPEED_PX_PER_MS)
  if (gap > RIPPLE_BAND_PX) return 0
  return (1 - gap / RIPPLE_BAND_PX) * lifeLeft
}

export function PlusField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [playCount, setPlayCount] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const pointer: Pointer = { x: 0, y: 0, isInside: false }
    let ripples: Ripple[] = []
    let points: { x: number; y: number }[] = []
    let width = 0
    let height = 0
    let frameId = 0
    let isVisible = true
    let lastInteractionAt = performance.now()
    let lastAutoplayAt = 0

    const layout = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const cell = width < MOBILE_BREAKPOINT_PX ? CELL_MOBILE_PX : CELL_DESKTOP_PX
      const columns = Math.ceil(width / cell) + 1
      const rows = Math.ceil(height / cell) + 1
      const offsetX = (width - (columns - 1) * cell) / 2
      const offsetY = (height - (rows - 1) * cell) / 2
      points = Array.from({ length: columns * rows }, (_, index) => ({
        x: offsetX + (index % columns) * cell,
        y: offsetY + Math.floor(index / columns) * cell,
      }))
    }

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height)
      ripples = ripples.filter((ripple) => now - ripple.startedAt < RIPPLE_LIFETIME_MS)

      const calmPaths = Array.from({ length: ALPHA_BUCKET_COUNT }, () => new Path2D())
      const excited: { x: number; y: number; pointerPower: number; ripplePower: number }[] = []

      for (const point of points) {
        const pointerDistance = pointer.isInside ? Math.hypot(point.x - pointer.x, point.y - pointer.y) : Infinity
        const pointerPower = pointerDistance < POINTER_RADIUS_PX ? easeOut(1 - pointerDistance / POINTER_RADIUS_PX) : 0
        const ripplePower = ripples.reduce(
          (strongest, ripple) => Math.max(strongest, rippleStrength(Math.hypot(point.x - ripple.x, point.y - ripple.y), ripple, now)),
          0,
        )

        if (pointerPower > EXCITED_THRESHOLD || ripplePower > EXCITED_THRESHOLD) {
          excited.push({ x: point.x, y: point.y, pointerPower, ripplePower })
          continue
        }

        const wave = prefersReducedMotion
          ? 0.5
          : 0.5 + 0.5 * Math.sin(now * AMBIENT_WAVE_SPEED - (point.x + point.y) * AMBIENT_WAVE_DENSITY)
        const bucket = Math.min(ALPHA_BUCKET_COUNT - 1, Math.floor(wave * ALPHA_BUCKET_COUNT))
        const path = calmPaths[bucket]
        path.moveTo(point.x - PLUS_ARM_PX, point.y)
        path.lineTo(point.x + PLUS_ARM_PX, point.y)
        path.moveTo(point.x, point.y - PLUS_ARM_PX)
        path.lineTo(point.x, point.y + PLUS_ARM_PX)
      }

      context.lineWidth = CALM_STROKE_PX
      context.strokeStyle = `rgb(${COLOR_BASE.join(", ")})`
      calmPaths.forEach((path, bucket) => {
        context.globalAlpha = BASE_ALPHA_MIN + (BASE_ALPHA_RANGE * bucket) / (ALPHA_BUCKET_COUNT - 1)
        context.stroke(path)
      })
      context.globalAlpha = 1

      for (const point of excited) {
        const awayX = pointer.isInside ? point.x - pointer.x : 0
        const awayY = pointer.isInside ? point.y - pointer.y : 0
        const awayLength = Math.hypot(awayX, awayY) || 1
        const x = point.x + (awayX / awayLength) * POINTER_REPEL_PX * point.pointerPower
        const y = point.y + (awayY / awayLength) * POINTER_REPEL_PX * point.pointerPower
        const arm = PLUS_ARM_PX * (1 + POINTER_GROWTH * point.pointerPower + RIPPLE_GROWTH * point.ripplePower)
        const thickness = Math.max(CALM_STROKE_PX, arm * EXCITED_THICKNESS_RATIO)
        const color =
          point.ripplePower > point.pointerPower
            ? mixColor(COLOR_POINTER, COLOR_RIPPLE, Math.min(1, point.ripplePower * RIPPLE_COLOR_BOOST))
            : mixColor(COLOR_BASE, COLOR_POINTER, point.pointerPower)

        context.fillStyle = color
        context.globalAlpha = Math.min(1, EXCITED_ALPHA_MIN + Math.max(point.pointerPower, point.ripplePower))
        context.fillRect(x - arm, y - thickness / 2, arm * 2, thickness)
        context.fillRect(x - thickness / 2, y - arm, thickness, arm * 2)
      }
      context.globalAlpha = 1
    }

    const loop = (now: number) => {
      const isIdle = now - lastInteractionAt > IDLE_BEFORE_AUTOPLAY_MS
      if (isIdle && now - lastAutoplayAt > AUTOPLAY_INTERVAL_MS && width > 0) {
        ripples.push({
          x: width * (AUTOPLAY_MARGIN_X + Math.random() * (1 - AUTOPLAY_MARGIN_X * 2)),
          y: height * (AUTOPLAY_MARGIN_Y + Math.random() * (1 - AUTOPLAY_MARGIN_Y * 2)),
          startedAt: now,
        })
        lastAutoplayAt = now
      }
      draw(now)
      if (isVisible) frameId = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(frameId)
      if (prefersReducedMotion) {
        draw(performance.now())
        return
      }
      frameId = requestAnimationFrame(loop)
    }

    const toLocal = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const handleMove = (event: PointerEvent) => {
      const local = toLocal(event)
      pointer.x = local.x
      pointer.y = local.y
      pointer.isInside = event.pointerType === "mouse"
      lastInteractionAt = performance.now()
    }

    const handleLeave = () => {
      pointer.isInside = false
    }

    const handleDown = (event: PointerEvent) => {
      if (prefersReducedMotion) return
      const local = toLocal(event)
      ripples.push({ ...local, startedAt: performance.now() })
      lastInteractionAt = performance.now()
      setPlayCount((count) => count + 1)
    }

    const resizeObserver = new ResizeObserver(() => {
      layout()
      if (prefersReducedMotion) draw(performance.now())
    })
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) start()
    })
    const handleTabVisibility = () => {
      isVisible = document.visibilityState === "visible"
      if (isVisible) start()
    }

    layout()
    start()
    resizeObserver.observe(canvas)
    visibilityObserver.observe(canvas)
    canvas.addEventListener("pointermove", handleMove)
    canvas.addEventListener("pointerleave", handleLeave)
    canvas.addEventListener("pointerdown", handleDown)
    document.addEventListener("visibilitychange", handleTabVisibility)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      canvas.removeEventListener("pointermove", handleMove)
      canvas.removeEventListener("pointerleave", handleLeave)
      canvas.removeEventListener("pointerdown", handleDown)
      document.removeEventListener("visibilitychange", handleTabVisibility)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-manipulation" aria-hidden="true" />
      <p className="pointer-events-none absolute bottom-6 right-4 font-pixel text-[11px] tracking-[0.2em] text-fg-dim sm:right-8">
        {playCount === 0 ? "TAP / CLICK TO PLAY" : `PLAY +${playCount}`}
      </p>
    </>
  )
}
