import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '../lib/cn'
import { Link } from './Link'

export interface DataCardProps {
  label: string
  value: ReactNode
  delta?: string
  deltaTone?: 'up' | 'down' | 'flat'
  description?: string
  footerHref?: string
  footerLabel?: string
  icon?: ReactNode
  className?: string
}

const deltaToneClasses = {
  up: 'text-verdigris',
  down: 'text-rust',
  flat: 'text-vellum-faint',
}

export function DataCard({
  label,
  value,
  delta,
  deltaTone = 'flat',
  description,
  footerHref,
  footerLabel = 'Ver detalhes',
  icon,
  className,
}: DataCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-xl border border-line',
        'bg-gradient-to-b from-panel2 via-panel to-ink',
        'shadow-[inset_0_1px_0_rgb(var(--brass)/0.1),0_1px_0_rgb(var(--shade)/0.25)]',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent"
      />
      <div className="flex flex-1 flex-col px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
            {label}
          </p>
          {icon && <div className="text-brass-dim">{icon}</div>}
        </div>
        <p className="mt-2 font-display text-3xl font-medium leading-none tracking-tight text-vellum">
          {value}
        </p>
        {delta && (
          <p className={cn('mt-2 font-mono text-xs tabular-nums', deltaToneClasses[deltaTone])}>
            {delta}
          </p>
        )}
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-vellum-muted">{description}</p>
        )}
      </div>
      {footerHref && (
        <div className="border-t border-line px-5 py-3">
          <Link
            href={footerHref}
            tone="brass"
            underline={false}
            className="inline-flex items-center gap-1.5 text-sm font-medium"
          >
            {footerLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  )
}
