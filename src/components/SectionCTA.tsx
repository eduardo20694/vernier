import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'

export interface SectionCTAProps {
  title: string
  description?: string
  primaryLabel?: string
  onPrimary?: () => void
  secondaryLabel?: string
  onSecondary?: () => void
  actions?: ReactNode
  className?: string
}

export function SectionCTA({
  title,
  description,
  primaryLabel = 'Começar',
  onPrimary,
  secondaryLabel,
  onSecondary,
  actions,
  className,
}: SectionCTAProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl border border-brass-dim/40',
        'bg-gradient-to-br from-panel2 via-panel to-ink px-6 py-12 text-center sm:px-10',
        'shadow-[inset_0_1px_0_rgb(var(--mist)/0.08),0_0_40px_-12px_rgb(var(--brass)/0.25)]',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--brass)/0.12),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-2xl">
        <h2 className="font-display text-3xl text-vellum sm:text-4xl">{title}</h2>
        {description && (
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-vellum-muted">
            {description}
          </p>
        )}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {actions ?? (
            <>
              {primaryLabel && (
                <Button variant="gradient" size="lg" onClick={onPrimary}>
                  {primaryLabel}
                </Button>
              )}
              {secondaryLabel && (
                <Button variant="secondary" size="lg" onClick={onSecondary}>
                  {secondaryLabel}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
