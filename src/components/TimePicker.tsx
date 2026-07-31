import { useId, useState } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '../lib/cn'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function parseTime(value?: string): { h: number; m: number } | null {
  if (!value) return null
  const m = /^(\d{1,2}):(\d{2})$/.exec(value.trim())
  if (!m) return null
  const h = Number(m[1])
  const min = Number(m[2])
  if (h < 0 || h > 23 || min < 0 || min > 59) return null
  return { h, m: min }
}

function formatTime(h: number, m: number) {
  return `${pad(h)}:${pad(m)}`
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5)

export interface TimePickerProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label?: string
  hint?: string
  error?: string
  placeholder?: string
  disabled?: boolean
  id?: string
  name?: string
  className?: string
  minuteStep?: 5 | 15 | 30
}

export function TimePicker({
  value: valueProp,
  defaultValue,
  onChange,
  label,
  hint,
  error,
  placeholder = 'Selecionar horário…',
  disabled,
  id,
  name,
  className,
  minuteStep = 5,
}: TimePickerProps) {
  const autoId = useId()
  const inputId = id || name || autoId
  const [open, setOpen] = useState(false)
  const [internal, setInternal] = useState(defaultValue ?? '')
  const value = valueProp !== undefined ? valueProp : internal
  const parsed = parseTime(value)

  const minutes =
    minuteStep === 5 ? MINUTES : Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep)

  function commit(h: number, m: number) {
    const next = formatTime(h, m)
    if (valueProp === undefined) setInternal(next)
    onChange?.(next)
  }

  function onManualChange(raw: string) {
    if (valueProp === undefined) setInternal(raw)
    const p = parseTime(raw)
    if (p) onChange?.(formatTime(p.h, p.m))
    else if (raw === '') onChange?.('')
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
            <Clock className="h-4 w-4 shrink-0 text-vellum-faint" aria-hidden />
            <span className={cn('flex-1 truncate', value ? 'text-vellum' : 'text-vellum-faint')}>
              {value || placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3" align="start">
          <div className="mb-2 flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              placeholder="HH:MM"
              value={value}
              onChange={(e) => onManualChange(e.target.value)}
              className="h-9 w-full rounded border border-line bg-panel px-2 text-center font-mono text-sm text-vellum outline-none focus:border-brass-dim"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
                Hora
              </p>
              <div className="max-h-40 overflow-y-auto rounded border border-line bg-panel p-1">
                {HOURS.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => commit(h, parsed?.m ?? 0)}
                    className={cn(
                      'flex w-full items-center justify-center rounded-sm py-1 font-mono text-sm',
                      parsed?.h === h
                        ? 'bg-brass/20 text-brass-bright'
                        : 'text-vellum-muted hover:bg-panel2 hover:text-vellum'
                    )}
                  >
                    {pad(h)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
                Min
              </p>
              <div className="max-h-40 overflow-y-auto rounded border border-line bg-panel p-1">
                {minutes.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => commit(parsed?.h ?? 0, m)}
                    className={cn(
                      'flex w-full items-center justify-center rounded-sm py-1 font-mono text-sm',
                      parsed?.m === m
                        ? 'bg-brass/20 text-brass-bright'
                        : 'text-vellum-muted hover:bg-panel2 hover:text-vellum'
                    )}
                  >
                    {pad(m)}
                  </button>
                ))}
              </div>
            </div>
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
