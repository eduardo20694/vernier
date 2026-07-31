import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '../lib/cn'

export interface RatingProps {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  max?: number
  readOnly?: boolean
  label?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
}

export function Rating({
  value: valueProp,
  defaultValue = 0,
  onChange,
  max = 5,
  readOnly = false,
  label,
  className,
  size = 'md',
}: RatingProps) {
  const [internal, setInternal] = useState(defaultValue)
  const [hover, setHover] = useState<number | null>(null)
  const value = valueProp ?? internal
  const display = hover ?? value

  function setValue(next: number) {
    if (readOnly) return
    if (valueProp === undefined) setInternal(next)
    onChange?.(next)
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <span className="text-sm font-medium text-vellum-muted">{label}</span>}
      <div
        role={readOnly ? 'img' : 'slider'}
        aria-label={label ?? 'Avaliação'}
        aria-valuemin={readOnly ? undefined : 0}
        aria-valuemax={readOnly ? undefined : max}
        aria-valuenow={readOnly ? undefined : value}
        aria-readonly={readOnly || undefined}
        className="inline-flex items-center gap-0.5"
        onMouseLeave={() => !readOnly && setHover(null)}
      >
        {Array.from({ length: max }, (_, i) => {
          const n = i + 1
          const filled = n <= display
          return (
            <button
              key={n}
              type="button"
              disabled={readOnly}
              onClick={() => setValue(n === value ? 0 : n)}
              onMouseEnter={() => !readOnly && setHover(n)}
              onFocus={() => !readOnly && setHover(n)}
              onBlur={() => !readOnly && setHover(null)}
              className={cn(
                'rounded-sm p-0.5 transition-colors focus-ring',
                readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
              )}
              aria-label={`${n} de ${max}`}
            >
              <Star
                className={cn(
                  sizeMap[size],
                  filled ? 'fill-brass text-brass-bright' : 'fill-transparent text-line'
                )}
                strokeWidth={1.75}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
