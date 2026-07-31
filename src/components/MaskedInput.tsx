import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export type MaskKind = 'telefone' | 'cpf' | 'cnpj' | 'cep'

export interface MaskedInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  mask: MaskKind
  value?: string
  defaultValue?: string
  onChange?: (value: string, raw: string) => void
  label?: string
  hint?: string
  error?: string
}

function digitsOnly(v: string) {
  return v.replace(/\D/g, '')
}

export function formatMask(mask: MaskKind, raw: string): string {
  const d = digitsOnly(raw)

  if (mask === 'cep') {
    const s = d.slice(0, 8)
    if (s.length <= 5) return s
    return `${s.slice(0, 5)}-${s.slice(5)}`
  }

  if (mask === 'cpf') {
    const s = d.slice(0, 11)
    if (s.length <= 3) return s
    if (s.length <= 6) return `${s.slice(0, 3)}.${s.slice(3)}`
    if (s.length <= 9) return `${s.slice(0, 3)}.${s.slice(3, 6)}.${s.slice(6)}`
    return `${s.slice(0, 3)}.${s.slice(3, 6)}.${s.slice(6, 9)}-${s.slice(9)}`
  }

  if (mask === 'cnpj') {
    const s = d.slice(0, 14)
    if (s.length <= 2) return s
    if (s.length <= 5) return `${s.slice(0, 2)}.${s.slice(2)}`
    if (s.length <= 8) return `${s.slice(0, 2)}.${s.slice(2, 5)}.${s.slice(5)}`
    if (s.length <= 12)
      return `${s.slice(0, 2)}.${s.slice(2, 5)}.${s.slice(5, 8)}/${s.slice(8)}`
    return `${s.slice(0, 2)}.${s.slice(2, 5)}.${s.slice(5, 8)}/${s.slice(8, 12)}-${s.slice(12)}`
  }

  // telefone BR: (11) 98765-4321 or (11) 3456-7890
  const s = d.slice(0, 11)
  if (s.length === 0) return ''
  if (s.length <= 2) return `(${s}`
  if (s.length <= 6) return `(${s.slice(0, 2)}) ${s.slice(2)}`
  if (s.length <= 10) {
    return `(${s.slice(0, 2)}) ${s.slice(2, 6)}-${s.slice(6)}`
  }
  return `(${s.slice(0, 2)}) ${s.slice(2, 7)}-${s.slice(7)}`
}

const placeholders: Record<MaskKind, string> = {
  telefone: '(11) 98765-4321',
  cpf: '000.000.000-00',
  cnpj: '00.000.000/0000-00',
  cep: '00000-000',
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    {
      className,
      mask,
      value,
      defaultValue,
      onChange,
      label,
      hint,
      error,
      id,
      name,
      placeholder,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const inputId = id || name || autoId
    const display =
      value !== undefined
        ? formatMask(mask, value)
        : defaultValue !== undefined
          ? formatMask(mask, String(defaultValue))
          : undefined

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-vellum-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          inputMode="numeric"
          autoComplete="off"
          placeholder={placeholder ?? placeholders[mask]}
          value={value !== undefined ? display : undefined}
          defaultValue={value === undefined ? display : undefined}
          onChange={(e) => {
            const formatted = formatMask(mask, e.target.value)
            e.target.value = formatted
            onChange?.(formatted, digitsOnly(formatted))
          }}
          className={cn(
            'h-10 rounded border bg-panel px-3 font-mono text-sm text-vellum placeholder:text-vellum-faint',
            'transition-colors duration-150 focus-ring focus:border-brass-dim',
            error ? 'border-rust' : 'border-line',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
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
)
MaskedInput.displayName = 'MaskedInput'
