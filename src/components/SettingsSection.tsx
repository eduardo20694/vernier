import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface SettingsSectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  /** Optional action aligned with the title (e.g. Edit) */
  action?: ReactNode
}

export function SettingsSection({
  title,
  description,
  children,
  className,
  action,
}: SettingsSectionProps) {
  return (
    <section className={cn('border-b border-line pb-8 last:border-b-0 last:pb-0', className)}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 max-w-xl">
          <h2 className="font-display text-lg font-medium text-vellum">{title}</h2>
          {description && (
            <p className="mt-1 text-sm leading-relaxed text-vellum-muted">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  )
}
