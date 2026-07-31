import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

type Tone = 'neutral' | 'brass' | 'verdigris' | 'rust'

const toneClasses: Record<Tone, string> = {
  neutral:
    'bg-gradient-to-b from-panel2 to-panel text-vellum-muted border-line shadow-[inset_0_1px_0_rgb(var(--mist)/0.06)]',
  brass:
    'bg-brass/[0.12] text-brass-bright border-brass-dim/70 shadow-[inset_0_1px_0_rgb(var(--brass)/0.12)]',
  verdigris:
    'bg-verdigris/[0.12] text-verdigris border-verdigris-dim/70 shadow-[inset_0_1px_0_rgb(var(--verdigris)/0.1)]',
  rust:
    'bg-rust/[0.12] text-rust border-rust-dim/70 shadow-[inset_0_1px_0_rgb(var(--rust)/0.1)]',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.08em]',
        toneClasses[tone],
        className
      )}
      {...props}
    />
  )
}
