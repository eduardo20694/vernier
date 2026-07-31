import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface MetricItem {
  label: string
  value: ReactNode
  hint?: string
  delta?: string
  deltaTone?: 'up' | 'down' | 'flat'
}

export interface MetricRowProps {
  metrics: MetricItem[]
  className?: string
}

const deltaToneClasses = {
  up: 'text-verdigris',
  down: 'text-rust',
  flat: 'text-vellum-faint',
}

export function MetricRow({ metrics, className }: MetricRowProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap divide-x divide-line overflow-hidden rounded-lg border border-line',
        'bg-gradient-to-b from-panel2 via-panel to-ink',
        'shadow-[inset_0_1px_0_rgb(var(--brass)/0.08)]',
        className
      )}
    >
      {metrics.map((m) => (
        <div key={m.label} className="min-w-[120px] flex-1 px-4 py-3.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
            {m.label}
          </p>
          <p className="mt-1.5 font-display text-2xl font-medium leading-none tracking-tight text-vellum">
            {m.value}
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            {m.delta && (
              <span
                className={cn(
                  'font-mono text-xs tabular-nums',
                  deltaToneClasses[m.deltaTone ?? 'flat']
                )}
              >
                {m.delta}
              </span>
            )}
            {m.hint && <span className="text-xs text-vellum-faint">{m.hint}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
