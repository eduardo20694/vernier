import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode
  description?: ReactNode
  breadcrumbs?: ReactNode
  actions?: ReactNode
}

export function PageHeader({
  className,
  title,
  description,
  breadcrumbs,
  actions,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 border-b border-line pb-6',
        className
      )}
      {...props}
    >
      {breadcrumbs && <div className="min-w-0">{breadcrumbs}</div>}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1.5">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-vellum md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-measure text-sm text-vellum-muted">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
        )}
      </div>
    </header>
  )
}
