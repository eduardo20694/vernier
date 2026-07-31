import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface CircularProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: string
  showValue?: boolean
}

export function CircularProgress({
  className,
  value = 0,
  max = 100,
  size = 72,
  strokeWidth = 6,
  label,
  showValue = true,
  ...props
}: CircularProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const r = (size - strokeWidth) / 2
  const c = 2 * Math.PI * r
  const offset = c - (pct / 100) * c

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label={label}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgb(var(--panel2))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgb(var(--brass))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-300 ease-out"
        />
      </svg>
      {showValue && (
        <span className="absolute inset-0 flex flex-col items-center justify-center font-mono tabular-nums">
          <span className="text-sm font-medium text-brass-bright">{Math.round(pct)}%</span>
          {label && (
            <span className="max-w-[80%] truncate text-[10px] uppercase tracking-wider text-vellum-faint">
              {label}
            </span>
          )}
        </span>
      )}
    </div>
  )
}
