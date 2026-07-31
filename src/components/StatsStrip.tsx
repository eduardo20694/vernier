import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface StatsStripItem {
  value: ReactNode
  label: string
  hint?: string
}

export interface StatsStripProps {
  stats: StatsStripItem[]
  className?: string
}

export function StatsStrip({ stats, className }: StatsStripProps) {
  return (
    <div
      className={cn(
        'grid gap-8 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {stats.map((s) => (
        <div key={s.label} className="text-center sm:text-left">
          <p className="font-display text-4xl font-medium tracking-tight text-vellum sm:text-5xl">
            {s.value}
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brass-dim">
            {s.label}
          </p>
          {s.hint && <p className="mt-1 text-sm text-vellum-muted">{s.hint}</p>}
        </div>
      ))}
    </div>
  )
}
