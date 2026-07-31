import { useId, useMemo, useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { cn } from '../lib/cn'
import { Checkbox } from './Checkbox'
import { Chip } from './Chip'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (values: string[]) => void
  label?: string
  hint?: string
  error?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  id?: string
  name?: string
  className?: string
}

export function MultiSelect({
  options,
  value: valueProp,
  defaultValue = [],
  onChange,
  label,
  hint,
  error,
  placeholder = 'Selecionar…',
  searchPlaceholder = 'Buscar…',
  emptyText = 'Nada encontrado.',
  disabled,
  id,
  name,
  className,
}: MultiSelectProps) {
  const autoId = useId()
  const inputId = id || name || autoId
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [internal, setInternal] = useState<string[]>(defaultValue)
  const value = valueProp ?? internal

  const selectedOptions = useMemo(
    () => options.filter((o) => value.includes(o.value)),
    [options, value]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    )
  }, [options, query])

  function setValue(next: string[]) {
    if (valueProp === undefined) setInternal(next)
    onChange?.(next)
  }

  function toggle(optValue: string) {
    if (value.includes(optValue)) {
      setValue(value.filter((v) => v !== optValue))
    } else {
      setValue([...value, optValue])
    }
  }

  function remove(optValue: string) {
    setValue(value.filter((v) => v !== optValue))
  }

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
          if (!o) setQuery('')
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
            aria-haspopup="listbox"
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              'flex min-h-10 w-full items-center gap-2 rounded border bg-panel px-3 py-1.5 text-left text-sm',
              'transition-colors duration-150 focus-ring focus:border-brass-dim',
              error ? 'border-rust' : 'border-line',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {selectedOptions.length === 0 ? (
                <span className="text-vellum-faint">{placeholder}</span>
              ) : (
                selectedOptions.map((opt) => (
                  <span key={opt.value} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                    <Chip
                      tone="brass"
                      selected
                      onRemove={disabled ? undefined : () => remove(opt.value)}
                    >
                      {opt.label}
                    </Chip>
                  </span>
                ))
              )}
            </div>
            <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-vellum-faint" aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <div className="border-b border-line p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-8 w-full rounded border border-line bg-panel px-2 text-sm text-vellum outline-none placeholder:text-vellum-faint focus:border-brass-dim"
            />
          </div>
          <div className="max-h-56 overflow-y-auto p-1" role="listbox" aria-multiselectable>
            {filtered.length === 0 && (
              <p className="px-2 py-6 text-center text-xs text-vellum-faint">{emptyText}</p>
            )}
            {filtered.map((opt) => {
              const checked = value.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={checked}
                  onClick={() => toggle(opt.value)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5 text-left text-sm',
                    'text-vellum-muted hover:bg-panel hover:text-vellum'
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggle(opt.value)}
                    onClick={(e) => e.stopPropagation()}
                    aria-hidden
                    tabIndex={-1}
                  />
                  {opt.label}
                </button>
              )
            })}
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
