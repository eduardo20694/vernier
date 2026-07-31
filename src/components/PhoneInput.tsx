import { useId, type HTMLAttributes } from 'react'
import { cn } from '../lib/cn'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select'

export interface PhoneCountry {
  code: string
  dial: string
  label: string
}

const DEFAULT_COUNTRIES: PhoneCountry[] = [
  { code: 'BR', dial: '+55', label: 'Brasil' },
  { code: 'US', dial: '+1', label: 'EUA' },
  { code: 'PT', dial: '+351', label: 'Portugal' },
  { code: 'AR', dial: '+54', label: 'Argentina' },
  { code: 'MX', dial: '+52', label: 'México' },
]

export interface PhoneInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  country?: string
  onChange?: (phone: string, country: string) => void
  countries?: PhoneCountry[]
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  placeholder?: string
}

function digitsOnly(v: string) {
  return v.replace(/\D/g, '')
}

function formatPhone(raw: string, countryCode: string): string {
  const d = digitsOnly(raw)
  if (countryCode === 'BR') {
    const s = d.slice(0, 11)
    if (s.length === 0) return ''
    if (s.length <= 2) return `(${s}`
    if (s.length <= 6) return `(${s.slice(0, 2)}) ${s.slice(2)}`
    if (s.length <= 10) return `(${s.slice(0, 2)}) ${s.slice(2, 6)}-${s.slice(6)}`
    return `(${s.slice(0, 2)}) ${s.slice(2, 7)}-${s.slice(7)}`
  }
  // Generic international grouping
  const s = d.slice(0, 15)
  if (s.length <= 3) return s
  if (s.length <= 6) return `${s.slice(0, 3)} ${s.slice(3)}`
  if (s.length <= 10) return `${s.slice(0, 3)} ${s.slice(3, 6)} ${s.slice(6)}`
  return `${s.slice(0, 3)} ${s.slice(3, 6)} ${s.slice(6, 10)} ${s.slice(10)}`
}

export function PhoneInput({
  className,
  value = '',
  country = 'BR',
  onChange,
  countries = DEFAULT_COUNTRIES,
  label,
  hint,
  error,
  disabled,
  placeholder,
  ...props
}: PhoneInputProps) {
  const id = useId()
  const selected = countries.find((c) => c.code === country) ?? countries[0]

  return (
    <div className={cn('flex flex-col gap-1.5', className)} {...props}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-vellum-muted">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex h-10 overflow-hidden rounded border bg-panel',
          error ? 'border-rust' : 'border-line',
          disabled && 'opacity-50'
        )}
      >
        <Select
          value={country}
          onValueChange={(code) => onChange?.(value, code)}
          disabled={disabled}
        >
          <SelectTrigger
            className="h-full w-auto min-w-[4.5rem] shrink-0 rounded-none border-0 border-r border-line bg-panel2 px-2 text-xs font-mono text-brass-bright shadow-none focus:ring-0 [&>svg]:ml-1"
            aria-label="Código do país"
          >
            <SelectValue placeholder={selected?.dial ?? '+55'} />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c.code} value={c.code} textValue={`${c.dial} ${c.label}`}>
                {c.dial}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          disabled={disabled}
          value={value}
          placeholder={placeholder ?? (country === 'BR' ? '(11) 98765-4321' : '000 000 0000')}
          onChange={(e) => onChange?.(formatPhone(e.target.value, country), country)}
          className={cn(
            'min-w-0 flex-1 bg-transparent px-3 text-sm text-vellum outline-none',
            'placeholder:text-vellum-faint'
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        />
      </div>
      {error && (
        <span id={`${id}-error`} className="text-xs text-rust">
          {error}
        </span>
      )}
      {!error && hint && (
        <span id={`${id}-hint`} className="text-xs text-vellum-faint">
          {hint}
        </span>
      )}
    </div>
  )
}
