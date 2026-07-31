import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Overline } from './Typography'

export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  media,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  primaryAction?: { label: string; onClick?: () => void }
  secondaryAction?: { label: string; onClick?: () => void }
  media?: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl border border-line bg-panel shadow-plate',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(var(--brass)/0.14),transparent_48%),radial-gradient(ellipse_at_bottom_left,rgb(var(--verdigris)/0.08),transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-dim/40 to-transparent"
      />
      <div className="relative grid gap-10 px-8 py-14 lg:grid-cols-2 lg:items-center lg:px-12 lg:py-20">
        <div>
          {eyebrow && <Overline tone="brass">{eyebrow}</Overline>}
          <h1 className="mt-3 font-display text-display-sm leading-[0.98] text-vellum sm:text-display">{title}</h1>
          {description && (
            <p className="mt-5 max-w-xl text-lead text-vellum-muted">{description}</p>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryAction && (
                <Button variant="gradient" size="lg" onClick={primaryAction.onClick}>
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button variant="forged" size="lg" onClick={secondaryAction.onClick}>
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
        {media && <div className="min-h-[200px]">{media}</div>}
      </div>
    </section>
  )
}
