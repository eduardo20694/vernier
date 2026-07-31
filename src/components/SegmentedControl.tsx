import { cn } from '../lib/cn'

export interface SegmentedOption<T extends string = string> {
  value: T
  label: string
  disabled?: boolean
}

export interface SegmentedControlProps<T extends string = string> {
  value: T
  onChange: (value: T) => void
  options: SegmentedOption<T>[]
  className?: string
  size?: 'sm' | 'md'
}

// Interruptor multiposição — trilho escavado + segmento ativo em latão
// fundido. Sente-se como seletor mecânico, não como tabs web.
export function SegmentedControl<T extends string = string>({
  value,
  onChange,
  options,
  className,
  size = 'md',
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      className={cn(
        'inline-flex rounded-lg border border-line p-1',
        'bg-gradient-to-b from-ink to-panel',
        'shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)]',
        className
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={opt.disabled}
            onClick={() => onChange(opt.value)}
            className={cn(
              'relative rounded-md font-medium transition-all duration-200 ease-out focus-ring',
              size === 'sm' ? 'h-7 px-3 text-xs' : 'h-8 px-3.5 text-sm',
              active
                ? [
                    'text-ink',
                    'bg-gradient-to-b from-brass-bright via-brass to-brass-dim',
                    'shadow-[inset_0_1px_0_rgba(255,240,210,0.4),0_1px_3px_rgba(0,0,0,0.4)]',
                  ].join(' ')
                : 'text-vellum-muted hover:text-vellum hover:bg-panel2/50',
              'disabled:cursor-not-allowed disabled:opacity-40'
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
