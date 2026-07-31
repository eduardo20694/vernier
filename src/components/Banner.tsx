import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type Tone = 'brass' | 'verdigris' | 'rust' | 'neutral'

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone
  action?: ReactNode
}

const toneClasses: Record<Tone, string> = {
  brass: 'border-brass-dim/50 bg-gradient-to-r from-brass/15 via-brass/5 to-transparent text-brass-bright',
  verdigris:
    'border-verdigris-dim/50 bg-gradient-to-r from-verdigris/15 via-verdigris/5 to-transparent text-verdigris',
  rust: 'border-rust-dim/50 bg-gradient-to-r from-rust/15 via-rust/5 to-transparent text-rust',
  neutral: 'border-line bg-panel2 text-vellum-muted',
}

export function Banner({ className, tone = 'brass', action, children, ...props }: BannerProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex items-center justify-between gap-4 rounded-lg border px-4 py-3 text-sm',
        toneClasses[tone],
        className
      )}
      {...props}
    >
      <div className="min-w-0">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
