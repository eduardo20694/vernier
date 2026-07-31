import { useId, useState } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '../lib/cn'
import { Calendar } from './Calendar'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

function formatDate(d: Date) {
  return d.toLocaleDateString('pt-BR')
}

export interface DatePickerProps {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void
  label?: string
  hint?: string
  error?: string
  placeholder?: string
  disabled?: boolean
  id?: string
  name?: string
  className?: string
}

export function DatePicker({
  value: valueProp,
  defaultValue,
  onChange,
  label,
  hint,
  error,
  placeholder = 'Selecionar data…',
  disabled,
  id,
  name,
  className,
}: DatePickerProps) {
  const autoId = useId()
  const inputId = id || name || autoId
  const [open, setOpen] = useState(false)
  const [internal, setInternal] = useState<Date | undefined>(defaultValue)
  const value = valueProp !== undefined ? valueProp : internal

  function select(date: Date) {
    if (valueProp === undefined) setInternal(date)
    onChange?.(date)
    setOpen(false)
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-vellum-muted">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
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
            <span className={cn('flex-1 truncate', value ? 'text-vellum' : 'text-vellum-faint')}>
              {value ? formatDate(value) : placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto border-0 bg-transparent p-0 shadow-none" align="start">
          <Calendar value={value} onChange={select} />
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
