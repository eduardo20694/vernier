import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  showValue?: boolean
  unit?: string
}

// Trilho usinado + polegar azure. Range nativo estilizado — sem Radix,
// pra manter a lib leve e o controle 100% CSS.
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, showValue = true, unit, id, value, defaultValue, ...props }, ref) => {
    const sliderId = id || props.name
    const numeric = Number(value ?? defaultValue ?? 0)

    return (
      <div className={cn('w-full min-w-[180px]', className)}>
        {(label || showValue) && (
          <div className="mb-2 flex items-baseline justify-between gap-3">
            {label && (
              <label htmlFor={sliderId} className="text-xs font-medium text-vellum-muted">
                {label}
              </label>
            )}
            {showValue && (
              <span className="font-mono text-xs tabular-nums text-brass-bright">
                {Number.isFinite(numeric) ? numeric : 0}
                {unit ?? ''}
              </span>
            )}
          </div>
        )}
        <input
          ref={ref}
          id={sliderId}
          type="range"
          value={value}
          defaultValue={defaultValue}
          className={cn(
            'vernier-slider h-1.5 w-full cursor-pointer appearance-none rounded-full',
            'bg-gradient-to-r from-panel2 via-line to-panel2',
            'outline-none focus-visible:ring-2 focus-visible:ring-brass/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
            'disabled:cursor-not-allowed disabled:opacity-40'
          )}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = 'Slider'
