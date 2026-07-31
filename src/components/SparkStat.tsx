import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Sparkline, type ChartDatum, type SparklineProps } from './Charts'

export interface SparkStatProps {
  label: string
  value: ReactNode
  delta?: string
  deltaTone?: 'up' | 'down' | 'flat'
  hint?: string
  data: ChartDatum[]
  dataKey: string
  sparkColor?: string
  sparkHeight?: number
  area?: SparklineProps['area']
  className?: string
}

const deltaToneClasses = {
  up: 'text-verdigris',
  down: 'text-rust',
  flat: 'text-vellum-faint',
}

export function SparkStat({
  label,
  value,
  delta,
  deltaTone = 'flat',
  hint,
  data,
  dataKey,
  sparkColor,
  sparkHeight = 36,
  area = true,
  className,
}: SparkStatProps) {
  return (
    <div
      className={cn(
        'relative min-w-[180px] overflow-hidden rounded-lg border border-line',
        'bg-gradient-to-b from-panel2 via-panel to-ink',
        'shadow-[inset_0_1px_0_rgb(var(--brass)/0.1),0_1px_0_rgb(var(--shade)/0.25)]',
        'px-4 py-3.5',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent"
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-medium leading-none tracking-tight text-vellum">
            {value}
          </p>
          <div className="mt-2 flex items-center gap-2">
            {delta && (
              <span className={cn('font-mono text-xs tabular-nums', deltaToneClasses[deltaTone])}>
                {delta}
              </span>
            )}
            {hint && <span className="text-xs text-vellum-faint">{hint}</span>}
          </div>
        </div>
        <div className="w-[88px] shrink-0 self-end pt-1">
          <Sparkline
            data={data}
            dataKey={dataKey}
            color={sparkColor}
            height={sparkHeight}
            area={area}
          />
        </div>
      </div>
    </div>
  )
}
