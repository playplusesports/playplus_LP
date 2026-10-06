"use client"

import { useEffect, useState } from "react"
import { DAILY_OPERATIONS_WITHOUT_FIXED_TIME, SCHEDULED_OPERATIONS, type ScheduledOperation } from "@/lib/site/daily-operations"

const MINUTES_PER_DAY = 24 * 60
const HOUR_TICKS = [0, 3, 6, 9, 12, 15, 18, 21, 24]
const CLOCK_REFRESH_MS = 1000

type TokyoClock = { minutesOfDay: number; label: string }

function readTokyoClock(): TokyoClock {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date())
  const valueOf = (type: string) => parts.find((part) => part.type === type)?.value ?? "00"
  const hour = Number(valueOf("hour"))
  const minute = Number(valueOf("minute"))
  return { minutesOfDay: hour * 60 + minute, label: `${valueOf("hour")}:${valueOf("minute")}:${valueOf("second")}` }
}

function minutesOf(operation: ScheduledOperation): number {
  return operation.hour * 60 + operation.minute
}

function timeLabel(operation: ScheduledOperation): string {
  return `${String(operation.hour).padStart(2, "0")}:${String(operation.minute).padStart(2, "0")}`
}

function percentOfDay(minutes: number): string {
  return `${(minutes / MINUTES_PER_DAY) * 100}%`
}

type OperationStatus = "done" | "next" | "later" | "unknown"

function statusOf(operation: ScheduledOperation, clock: TokyoClock | null, nextOperation: ScheduledOperation): OperationStatus {
  if (!clock) return "unknown"
  if (minutesOf(operation) <= clock.minutesOfDay) return "done"
  return operation === nextOperation ? "next" : "later"
}

const STATUS_LABEL: Record<OperationStatus, string> = {
  done: "本日実行済み",
  next: "次に実行",
  later: "予定",
  unknown: "毎日",
}

const STATUS_STYLE: Record<OperationStatus, string> = {
  done: "border-signal/50 text-signal",
  next: "border-play text-play",
  later: "border-line-strong text-fg-dim",
  unknown: "border-line-strong text-fg-dim",
}

export function LiveOperations() {
  const [clock, setClock] = useState<TokyoClock | null>(null)

  useEffect(() => {
    setClock(readTokyoClock())
    const timer = window.setInterval(() => setClock(readTokyoClock()), CLOCK_REFRESH_MS)
    return () => window.clearInterval(timer)
  }, [])

  const upcoming = SCHEDULED_OPERATIONS.find((operation) => clock && minutesOf(operation) > clock.minutesOfDay)
  const nextOperation = upcoming ?? SCHEDULED_OPERATIONS[0]

  return (
    <div className="rounded-lg border border-line bg-surface-1/80 p-5 backdrop-blur sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-mono text-xs text-fg-dim">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-bright opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-bright" />
          </span>
          daily-operations / Asia/Tokyo
        </p>
        <p className="font-mono text-sm tabular-nums text-fg" aria-live="off">
          JST {clock?.label ?? "--:--:--"}
        </p>
      </div>

      <div className="relative mt-10 mb-12 h-10" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
        {clock && (
          <div className="absolute inset-y-0 left-0 top-1/2 h-px bg-signal/70" style={{ width: percentOfDay(clock.minutesOfDay) }} />
        )}
        {HOUR_TICKS.map((hour) => (
          <div key={hour} className="absolute top-1/2 -translate-x-1/2" style={{ left: percentOfDay(hour * 60) }}>
            <div className="h-2 w-px -translate-y-1/2 bg-line-strong" />
            <p className="mt-3 -translate-x-[2px] font-mono text-[10px] text-fg-dim">{String(hour).padStart(2, "0")}</p>
          </div>
        ))}
        {SCHEDULED_OPERATIONS.map((operation) => {
          const isDone = statusOf(operation, clock, nextOperation) === "done"
          return (
            <div
              key={operation.title}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: percentOfDay(minutesOf(operation)) }}
            >
              <span className={`block font-display text-xl font-bold leading-none ${isDone ? "text-signal" : "text-play"}`}>+</span>
            </div>
          )
        })}
        {clock && (
          <div className="absolute -top-3 bottom-[-6px] w-px bg-white" style={{ left: percentOfDay(clock.minutesOfDay) }}>
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-fg">NOW</span>
          </div>
        )}
      </div>

      <ul className="divide-y divide-line border-y border-line">
        {SCHEDULED_OPERATIONS.map((operation) => {
          const status = statusOf(operation, clock, nextOperation)
          return (
            <OperationRow
              key={operation.title}
              time={timeLabel(operation)}
              title={operation.title}
              output={operation.output}
              statusLabel={STATUS_LABEL[status]}
              statusStyle={STATUS_STYLE[status]}
            />
          )
        })}
        {DAILY_OPERATIONS_WITHOUT_FIXED_TIME.map((operation) => (
          <OperationRow
            key={operation.title}
            time="毎日"
            title={operation.title}
            output={operation.output}
            statusLabel={STATUS_LABEL.unknown}
            statusStyle={STATUS_STYLE.unknown}
          />
        ))}
      </ul>
    </div>
  )
}

function OperationRow(props: { time: string; title: string; output: string; statusLabel: string; statusStyle: string }) {
  return (
    <li className="grid grid-cols-[3.5rem_1fr] items-center gap-x-4 gap-y-1 py-3.5 sm:grid-cols-[4rem_1fr_auto]">
      <span className="font-mono text-sm tabular-nums text-fg">{props.time}</span>
      <span className="min-w-0">
        <span className="block font-bold">{props.title}</span>
        <span className="block text-xs text-fg-dim">{props.output}</span>
      </span>
      <span className={`col-start-2 w-fit rounded border px-2 py-0.5 text-[11px] sm:col-start-auto ${props.statusStyle}`}>
        {props.statusLabel}
      </span>
    </li>
  )
}
