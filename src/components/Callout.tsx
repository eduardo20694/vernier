import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type Tone = 'brass' | 'verdigris' | 'rust' | 'neutral'

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone
  title?: string
  icon?: ReactNode
}

const rail: Record<Tone, string> = {
  brass: 'from-brass-bright via-brass to-brass-dim',
  verdigris: 'from-verdigris to-verdigris-dim',
  rust: 'from-rust to-rust-dim',
  neutral: 'from-vellum-muted to-line',
}

const wash: Record<Tone, string> = {
  brass: 'from-brass/10 via-transparent to-transparent',
  verdigris: 'from-verdigris/10 via-transparent to-transparent',
  rust: 'from-rust/10 via-transparent to-transparent',
  neutral: 'from-panel2 via-transparent to-transparent',
}

// Recado com trilho metálico à esquerda — mais editorial que o Alert,
// menos efêmero que o Toast. Bom pra notas de contexto em dashboards.
export function Callout({
  className,
  tone = 'brass',
  title,
  icon,
  children,
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-line bg-panel',
        'shadow-[inset_0_1px_0_rgba(237,232,223,0.04)]',
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className={cn('absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b', rail[tone])}
      />
      <div
        aria-hidden
        className={cn('pointer-events-none absolute inset-0 bg-gradient-to-r', wash[tone])}
      />
      <div className="relative flex gap-3 px-4 py-3.5 pl-5">
        {icon && <div className="mt-0.5 shrink-0 text-brass-bright">{icon}</div>}
        <div className="min-w-0">
          {title && (
            <p className="font-display text-base font-medium text-vellum">{title}</p>
          )}
          {children && (
            <div className={cn('text-sm text-vellum-muted', title && 'mt-1')}>{children}</div>
          )}
        </div>
      </div>
    </div>
  )
}
