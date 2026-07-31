import { useMemo, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
import { Button } from './Button'
import { cn } from '../lib/cn'

export interface ComboboxOption {
  value: string
  label: string
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Selecionar…',
  searchPlaceholder = 'Buscar…',
  emptyText = 'Nada encontrado.',
  className,
}: {
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const selected = options.find((o) => o.value === value)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q))
  }, [options, query])

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o) setQuery('')
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className={cn('w-64 justify-between font-normal', className)}
        >
          <span className={cn(!selected && 'text-vellum-faint')}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <div className="border-b border-line p-2">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-8 w-full rounded border border-line bg-panel px-2 text-sm text-vellum outline-none placeholder:text-vellum-faint focus:border-brass-dim"
          />
        </div>
        <div className="max-h-56 overflow-y-auto p-1">
          {filtered.length === 0 && (
            <p className="px-2 py-6 text-center text-xs text-vellum-faint">{emptyText}</p>
          )}
          {filtered.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange?.(opt.value)
                setOpen(false)
              }}
              className={cn(
                'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm',
                'text-vellum-muted hover:bg-panel hover:text-vellum'
              )}
            >
              <Check
                className={cn(
                  'h-3.5 w-3.5 text-brass-bright',
                  value === opt.value ? 'opacity-100' : 'opacity-0'
                )}
              />
              {opt.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
