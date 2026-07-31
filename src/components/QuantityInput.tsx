import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '../lib/cn'

export interface QuantityInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange' | 'size'> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  size?: 'sm' | 'md'
}

export const QuantityInput = forwardRef<HTMLInputElement, QuantityInputProps>(
  (
    {
      className,
      value,
      onChange,
      min = 0,
      max,
      step = 1,
      label,
      size = 'md',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const inputId = id ?? autoId

    const clamp = (n: number) => {
      let next = n
      if (min != null) next = Math.max(min, next)
      if (max != null) next = Math.min(max, next)
      return next
    }

    const h = size === 'sm' ? 'h-8' : 'h-10'
    const btn = size === 'sm' ? 'w-8' : 'w-10'

    return (
      <div className={cn('inline-flex flex-col gap-1.5', className)}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-vellum-muted">
            {label}
          </label>
        )}
        <div
          className={cn(
            'inline-flex overflow-hidden rounded border border-line bg-panel',
            h
          )}
        >
          <button
            type="button"
            disabled={disabled || value <= min}
            onClick={() => onChange(clamp(value - step))}
            className={cn(
              'inline-flex items-center justify-center border-r border-line',
              'text-vellum-muted hover:bg-panel2 hover:text-brass-bright',
              'disabled:opacity-40 focus-ring',
              btn
            )}
            aria-label="Diminuir quantidade"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <input
            ref={ref}
            id={inputId}
            type="number"
            inputMode="numeric"
            value={value}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(clamp(Number(e.target.value) || 0))}
            className={cn(
              'w-14 bg-transparent text-center font-mono text-sm tabular-nums text-vellum outline-none',
              '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
            )}
            {...props}
          />
          <button
            type="button"
            disabled={disabled || (max != null && value >= max)}
            onClick={() => onChange(clamp(value + step))}
            className={cn(
              'inline-flex items-center justify-center border-l border-line',
              'text-vellum-muted hover:bg-panel2 hover:text-brass-bright',
              'disabled:opacity-40 focus-ring',
              btn
            )}
            aria-label="Aumentar quantidade"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    )
  }
)
QuantityInput.displayName = 'QuantityInput'
