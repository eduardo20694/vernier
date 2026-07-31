import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface InstrumentCardProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  title?: string
  action?: ReactNode
  glow?: boolean
}

// Cartão premium com borda em gradiente azure (máscara CSS) e vinheta
// interna. É o Card "de vitrine" — pra hero metrics e painéis especiais.
export function InstrumentCard({
  className,
  eyebrow,
  title,
  action,
  glow = false,
  children,
  ...props
}: InstrumentCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-lg p-[1px]',
        'bg-gradient-to-br from-brass-bright/65 via-line/80 to-brass-dim/35',
        glow && 'shadow-[0_0_40px_-10px_rgb(var(--brass)/0.42),0_8px_24px_-8px_rgb(var(--shade)/0.35)]',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-[calc(theme(borderRadius.lg)-1px)]',
          'bg-gradient-to-b from-panel2 via-panel to-ink'
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brass/[0.12] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-8 h-32 w-32 rounded-full bg-verdigris/[0.06] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-bright/55 to-transparent"
        />
        {(eyebrow || title || action) && (
          <div className="relative flex items-start justify-between gap-3 px-5 pt-5">
            <div>
              {eyebrow && (
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-dim">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h3 className="mt-1 font-display text-xl font-medium tracking-tight text-vellum">{title}</h3>
              )}
            </div>
            {action}
          </div>
        )}
        <div className="relative p-5">{children}</div>
      </div>
    </div>
  )
}
