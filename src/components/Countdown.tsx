import { useEffect, useState } from 'react'
import { cn } from '../lib/cn'

export interface CountdownProps {
  target: Date | string | number
  className?: string
  labels?: { days?: string; hours?: string; minutes?: string; seconds?: string }
  onComplete?: () => void
}

interface Parts {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function calc(targetMs: number): Parts {
  const diff = Math.max(0, targetMs - Date.now())
  const totalSec = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    done: diff <= 0,
  }
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-[64px] flex-col items-center rounded-lg border border-line bg-gradient-to-b from-panel2 to-panel px-3 py-2.5">
      <span className="font-display text-2xl font-medium tabular-nums tracking-tight text-vellum sm:text-3xl">
        {value}
      </span>
      <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-vellum-faint">
        {label}
      </span>
    </div>
  )
}

export function Countdown({
  target,
  className,
  labels,
  onComplete,
}: CountdownProps) {
  const targetMs = new Date(target).getTime()
  const [parts, setParts] = useState(() => calc(targetMs))

  useEffect(() => {
    setParts(calc(targetMs))
    const id = window.setInterval(() => {
      const next = calc(targetMs)
      setParts(next)
      if (next.done) {
        window.clearInterval(id)
        onComplete?.()
      }
    }, 1000)
    return () => window.clearInterval(id)
  }, [targetMs, onComplete])

  return (
    <div
      className={cn('inline-flex flex-wrap items-center justify-center gap-2', className)}
      role="timer"
      aria-live="polite"
    >
      <Unit value={pad(parts.days)} label={labels?.days ?? 'dias'} />
      <Unit value={pad(parts.hours)} label={labels?.hours ?? 'hrs'} />
      <Unit value={pad(parts.minutes)} label={labels?.minutes ?? 'min'} />
      <Unit value={pad(parts.seconds)} label={labels?.seconds ?? 'seg'} />
    </div>
  )
}
