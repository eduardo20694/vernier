import { useCallback, useId, type HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface RangeSliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value: [number, number]
  onChange: (value: [number, number]) => void
  min?: number
  max?: number
  step?: number
  label?: string
  showValue?: boolean
  unit?: string
  disabled?: boolean
}

export function RangeSlider({
  className,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  unit,
  disabled,
  ...props
}: RangeSliderProps) {
  const id = useId()
  const [lo, hi] = value
  const span = max - min || 1
  const leftPct = ((lo - min) / span) * 100
  const rightPct = ((hi - min) / span) * 100

  const setLo = useCallback(
    (n: number) => {
      const next = Math.min(n, hi)
      onChange([next, hi])
    },
    [hi, onChange]
  )

  const setHi = useCallback(
    (n: number) => {
      const next = Math.max(n, lo)
      onChange([lo, next])
    },
    [lo, onChange]
  )

  return (
    <div className={cn('w-full min-w-[200px]', className)} {...props}>
      {(label || showValue) && (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          {label && (
            <span className="text-xs font-medium text-vellum-muted" id={`${id}-label`}>
              {label}
            </span>
          )}
          {showValue && (
            <span className="font-mono text-xs tabular-nums text-brass-bright">
              {lo}
              {unit ?? ''} – {hi}
              {unit ?? ''}
            </span>
          )}
        </div>
      )}
      <div className="relative h-8 touch-none">
        <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-panel2 border border-line" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brass"
          style={{ left: `${leftPct}%`, width: `${Math.max(0, rightPct - leftPct)}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          disabled={disabled}
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-label={label ? `${label} mínimo` : 'Mínimo'}
          onChange={(e) => setLo(Number(e.target.value))}
          className={cn(
            'vernier-slider absolute inset-0 z-[1] h-full w-full cursor-pointer appearance-none bg-transparent',
            'outline-none focus-visible:ring-2 focus-visible:ring-brass/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
            'disabled:cursor-not-allowed disabled:opacity-40',
            '[&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-[2]',
            '[&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-[2]'
          )}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          disabled={disabled}
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-label={label ? `${label} máximo` : 'Máximo'}
          onChange={(e) => setHi(Number(e.target.value))}
          className={cn(
            'vernier-slider absolute inset-0 z-[2] h-full w-full cursor-pointer appearance-none bg-transparent',
            'outline-none focus-visible:ring-2 focus-visible:ring-brass/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
            'disabled:cursor-not-allowed disabled:opacity-40',
            'pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto'
          )}
        />
      </div>
    </div>
  )
}
