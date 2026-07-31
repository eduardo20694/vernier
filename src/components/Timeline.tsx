import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface TimelineItem {
  title: string
  description?: string
  meta?: string
  tone?: 'brass' | 'verdigris' | 'rust' | 'neutral'
  icon?: ReactNode
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const toneDot: Record<NonNullable<TimelineItem['tone']>, string> = {
  brass: 'bg-brass shadow-[0_0_10px_rgb(var(--brass)/0.5)]',
  verdigris: 'bg-verdigris shadow-[0_0_10px_rgba(94,140,122,0.5)]',
  rust: 'bg-rust shadow-[0_0_10px_rgba(166,67,43,0.5)]',
  neutral: 'bg-line',
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn('relative space-y-0', className)}>
      {items.map((item, i) => {
        const last = i === items.length - 1
        const tone = item.tone ?? 'brass'
        return (
          <li key={`${item.title}-${i}`} className="relative flex gap-4 pb-6 last:pb-0">
            {!last && (
              <span
                aria-hidden
                className="absolute left-[7px] top-4 h-[calc(100%-8px)] w-px bg-gradient-to-b from-brass-dim/60 via-line to-transparent"
              />
            )}
            <div className="relative z-[1] mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center">
              {item.icon ? (
                <span className="text-brass-bright">{item.icon}</span>
              ) : (
                <span className={cn('h-2.5 w-2.5 rounded-full ring-4 ring-ink', toneDot[tone])} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <p className="font-medium text-vellum">{item.title}</p>
                {item.meta && (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
                    {item.meta}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-vellum-muted">{item.description}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
