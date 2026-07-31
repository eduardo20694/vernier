import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Overline } from './Typography'

export interface HeroSplitProps {
  eyebrow?: string
  title: ReactNode
  description?: string
  primaryAction?: { label: string; onClick?: () => void }
  secondaryAction?: { label: string; onClick?: () => void }
  media?: ReactNode
  /** Media on the left instead of right */
  mediaFirst?: boolean
  className?: string
}

export function HeroSplit({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  media,
  mediaFirst = false,
  className,
}: HeroSplitProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl border border-line bg-panel shadow-plate',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(var(--brass)/0.12),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgb(var(--verdigris)/0.07),transparent_45%)]"
      />
      <div
        className={cn(
          'relative grid items-center gap-10 lg:grid-cols-2',
          mediaFirst && 'lg:[&>*:first-child]:order-2'
        )}
      >
        <div className="px-8 py-12 lg:px-12 lg:py-16">
          {eyebrow && <Overline tone="brass">{eyebrow}</Overline>}
          <h1 className="mt-3 font-display text-display-sm leading-[0.98] text-vellum sm:text-display">
            {title}
          </h1>
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
        {media && (
          <div
            className={cn(
              'min-h-[220px] lg:min-h-full',
              mediaFirst ? 'lg:border-r' : 'lg:border-l',
              'border-line bg-ink/40'
            )}
          >
            {media}
          </div>
        )}
      </div>
    </section>
  )
}
