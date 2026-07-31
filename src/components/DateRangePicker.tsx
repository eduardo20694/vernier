import { useId, useState } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '../lib/cn'
import { Calendar } from './Calendar'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

function formatDate(d: Date) {
  return d.toLocaleDateString('pt-BR')
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export interface DateRange {
  from?: Date
  to?: Date
}

export interface DateRangePickerProps {
  value?: DateRange
  defaultValue?: DateRange
  onChange?: (range: DateRange) => void
  label?: string
  hint?: string
  error?: string
  placeholder?: string
  disabled?: boolean
  id?: string
  name?: string
  className?: string
}

export function DateRangePicker({
  value: valueProp,
  defaultValue,
  onChange,
  label,
  hint,
  error,
  placeholder = 'Selecionar período…',
  disabled,
  id,
  name,
  className,
}: DateRangePickerProps) {
  const autoId = useId()
  const inputId = id || name || autoId
  const [open, setOpen] = useState(false)
  const [internal, setInternal] = useState<DateRange>(defaultValue ?? {})
  const value = valueProp ?? internal
  const [picking, setPicking] = useState<'from' | 'to'>('from')

  function setRange(next: DateRange) {
    if (valueProp === undefined) setInternal(next)
    onChange?.(next)
  }

  function select(date: Date) {
    const day = startOfDay(date)
    if (picking === 'from' || !value.from) {
      setRange({ from: day, to: undefined })
      setPicking('to')
      return
    }
    if (day < startOfDay(value.from)) {
      setRange({ from: day, to: value.from })
      setPicking('from')
      setOpen(false)
      return
    }
    setRange({ from: value.from, to: day })
    setPicking('from')
    setOpen(false)
  }

  const display =
    value.from && value.to
      ? `${formatDate(value.from)} — ${formatDate(value.to)}`
      : value.from
        ? `${formatDate(value.from)} — …`
        : null

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-vellum-muted">
          {label}
        </label>
      )}
      <Popover
        open={open}
        onOpenChange={(o) => {
          setOpen(o)
          if (o) setPicking(value.from && !value.to ? 'to' : 'from')
        }}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            id={inputId}
            name={name}
            disabled={disabled}
            aria-invalid={!!error}
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              'flex h-10 w-full items-center gap-2 rounded border bg-panel px-3 text-left text-sm',
              'transition-colors duration-150 focus-ring focus:border-brass-dim',
              error ? 'border-rust' : 'border-line',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            <CalendarIcon className="h-4 w-4 shrink-0 text-vellum-faint" aria-hidden />
            <span className={cn('flex-1 truncate', display ? 'text-vellum' : 'text-vellum-faint')}>
              {display ?? placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto border-0 bg-transparent p-0 shadow-none" align="start">
          <div className="space-y-2">
            <div className="flex gap-2 px-1">
              <button
                type="button"
                onClick={() => setPicking('from')}
                className={cn(
                  'flex-1 rounded border px-2 py-1.5 text-xs',
                  picking === 'from'
                    ? 'border-brass-dim bg-brass/15 text-brass-bright'
                    : 'border-line bg-panel text-vellum-muted'
                )}
              >
                Início{value.from ? `: ${formatDate(value.from)}` : ''}
              </button>
              <button
                type="button"
                onClick={() => setPicking('to')}
                className={cn(
                  'flex-1 rounded border px-2 py-1.5 text-xs',
                  picking === 'to'
                    ? 'border-brass-dim bg-brass/15 text-brass-bright'
                    : 'border-line bg-panel text-vellum-muted'
                )}
              >
                Fim{value.to ? `: ${formatDate(value.to)}` : ''}
              </button>
            </div>
            <Calendar value={picking === 'to' ? value.to : value.from} onChange={select} />
          </div>
        </PopoverContent>
      </Popover>
      {error && (
        <span id={`${inputId}-error`} className="text-xs text-rust">
          {error}
        </span>
      )}
      {!error && hint && (
        <span id={`${inputId}-hint`} className="text-xs text-vellum-faint">
          {hint}
        </span>
      )}
    </div>
  )
}
