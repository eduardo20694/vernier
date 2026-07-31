import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface AuthSplitProps {
  children: ReactNode
  brand?: ReactNode
  brandTitle?: string
  brandDescription?: string
  /** Brand panel on the left (default) or right */
  brandSide?: 'left' | 'right'
  className?: string
}

export function AuthSplit({
  children,
  brand,
  brandTitle = 'Vernier',
  brandDescription = 'Componentes com precisão de instrumento.',
  brandSide = 'left',
  className,
}: AuthSplitProps) {
  const brandPanel = (
    <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-panel2 via-panel to-ink p-8 lg:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(var(--brass)/0.18),transparent_50%)]"
      />
      {brand ?? (
        <div className="relative">
          <p className="font-display text-3xl font-medium tracking-tight text-vellum">
            {brandTitle}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-vellum-muted">
            {brandDescription}
          </p>
        </div>
      )}
      <div
        aria-hidden
        className="relative mt-12 h-px w-24 bg-gradient-to-r from-brass/60 to-transparent"
      />
    </div>
  )

  const formPanel = (
    <div className="flex flex-col justify-center bg-panel p-8 lg:p-12">{children}</div>
  )

  return (
    <div
      className={cn(
        'grid min-h-[480px] overflow-hidden rounded-2xl border border-line shadow-plate lg:grid-cols-2',
        className
      )}
    >
      {brandSide === 'left' ? (
        <>
          {brandPanel}
          {formPanel}
        </>
      ) : (
        <>
          {formPanel}
          {brandPanel}
        </>
      )}
    </div>
  )
}
