import { forwardRef, type InputHTMLAttributes } from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '../lib/cn'

export interface NumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string
  value: number
  onChange: (value: number) => void
  step?: number
  min?: number
  max?: number
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ className, label, value, onChange, step = 1, min, max, id, disabled, ...props }, ref) => {
    const inputId = id || props.name

    const clamp = (n: number) => {
      let next = n
      if (min != null) next = Math.max(min, next)
      if (max != null) next = Math.min(max, next)
      return next
    }

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-vellum-muted">
            {label}
          </label>
        )}
        <div className="inline-flex h-10 overflow-hidden rounded border border-line bg-panel">
          <button
            type="button"
            disabled={disabled || (min != null && value <= min)}
            onClick={() => onChange(clamp(value - step))}
            className="flex w-10 items-center justify-center border-r border-line text-vellum-muted hover:bg-panel2 hover:text-vellum disabled:opacity-40 focus-ring"
            aria-label="Diminuir"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <input
            ref={ref}
            id={inputId}
            type="number"
            value={value}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(clamp(Number(e.target.value) || 0))}
            className="w-16 bg-transparent text-center font-mono text-sm tabular-nums text-vellum outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            {...props}
          />
          <button
            type="button"
            disabled={disabled || (max != null && value >= max)}
            onClick={() => onChange(clamp(value + step))}
            className="flex w-10 items-center justify-center border-l border-line text-vellum-muted hover:bg-panel2 hover:text-vellum disabled:opacity-40 focus-ring"
            aria-label="Aumentar"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    )
  }
)
NumberField.displayName = 'NumberField'
