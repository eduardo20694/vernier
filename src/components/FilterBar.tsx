import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Chip } from './Chip'

export interface ActiveFilter {
  id: string
  label: string
  tone?: 'neutral' | 'brass' | 'verdigris' | 'rust'
}

export interface FilterBarProps {
  /** Trigger controls (Select, Popover buttons, etc.) */
  children?: ReactNode
  active?: ActiveFilter[]
  onRemove?: (id: string) => void
  onClearAll?: () => void
  clearLabel?: string
  className?: string
}

export function FilterBar({
  children,
  active = [],
  onRemove,
  onClearAll,
  clearLabel = 'Limpar filtros',
  className,
}: FilterBarProps) {
  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
      {active.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {active.map((f) => (
            <Chip
              key={f.id}
              tone={f.tone ?? 'brass'}
              selected
              onRemove={onRemove ? () => onRemove(f.id) : undefined}
            >
              {f.label}
            </Chip>
          ))}
          {onClearAll && (
            <button
              type="button"
              onClick={onClearAll}
              className="ml-1 text-xs text-vellum-faint underline-offset-2 transition-colors hover:text-brass-bright hover:underline focus-ring rounded-sm"
            >
              {clearLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
