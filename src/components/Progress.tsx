import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  /** Rótulo curto à esquerda (ex: "CPU") */
  label?: string
  /** Mostra o percentual em mono à direita */
  showValue?: boolean
  indeterminate?: boolean
}

// Barra de medição — o instrumento mais literal da Vernier. Valor numérico
// em Space Mono, trilha em painel aço, preenchimento em brass (azure).
export function Progress({
  className,
  value = 0,
  max = 100,
  label,
  showValue = true,
  indeterminate = false,
  ...props
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn('w-full', className)} {...props}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          {label && <span className="text-xs font-medium text-vellum-muted">{label}</span>}
          {showValue && !indeterminate && (
            <span className="font-mono text-xs tabular-nums text-brass-bright">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-label={label}
        className="h-1.5 overflow-hidden rounded-full bg-panel2 border border-line"
      >
        <div
          className={cn(
            'h-full rounded-full bg-brass transition-[width] duration-300 ease-out',
            indeterminate && 'w-1/3 animate-pulse'
          )}
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
