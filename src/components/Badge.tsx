import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

type Tone = 'neutral' | 'brass' | 'verdigris' | 'rust'

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-panel2 text-vellum-muted border-line',
  brass: 'bg-brass/10 text-brass-bright border-brass-dim',
  verdigris: 'bg-verdigris/10 text-verdigris border-verdigris-dim',
  rust: 'bg-rust/10 text-rust border-rust-dim',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium uppercase tracking-wide',
        toneClasses[tone],
        className
      )}
      {...props}
    />
  )
}
