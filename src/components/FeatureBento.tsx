import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface FeatureBentoItem {
  id?: string
  title: string
  description: string
  icon?: ReactNode
  /** Grid span: 1 = normal, 2 = wide */
  span?: 1 | 2
}

export interface FeatureBentoProps {
  title?: string
  description?: string
  items: FeatureBentoItem[]
  className?: string
}

export function FeatureBento({ title, description, items, className }: FeatureBentoProps) {
  return (
    <section className={cn('w-full', className)}>
      {(title || description) && (
        <header className="mb-8 max-w-2xl">
          {title && <h2 className="font-display text-3xl text-vellum">{title}</h2>}
          {description && (
            <p className="mt-2 text-sm text-vellum-muted">{description}</p>
          )}
        </header>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <article
            key={item.id ?? i}
            className={cn(
              'relative overflow-hidden rounded-xl border border-line bg-panel p-5',
              'bg-gradient-to-br from-panel2/80 via-panel to-panel',
              'shadow-[inset_0_1px_0_rgb(var(--mist)/0.06)]',
              item.span === 2 && 'sm:col-span-2'
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brass/10 blur-2xl"
            />
            {item.icon && (
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brass-dim/40 bg-brass/10 text-brass-bright">
                {item.icon}
              </div>
            )}
            <h3 className="font-display text-lg text-vellum">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-vellum-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
