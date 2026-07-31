import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface CurrencyInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type'> {
  /** Numeric value in BRL (e.g. 1234.56) */
  value?: number | null
  defaultValue?: number | null
  onChange?: (value: number | null, formatted: string) => void
  label?: string
  hint?: string
  error?: string
  currency?: string
  locale?: string
}

function digitsToCents(raw: string): number {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return 0
  return Number(digits)
}

export function formatBRL(cents: number, locale = 'pt-BR', currency = 'BRL'): string {
  return (cents / 100).toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function parseBRLToNumber(formattedOrDigits: string): number | null {
  const cents = digitsToCents(formattedOrDigits)
  if (!formattedOrDigits || !/\d/.test(formattedOrDigits)) return null
  return cents / 100
}

function numberToCents(n: number | null | undefined): number {
  if (n == null || Number.isNaN(n)) return 0
  return Math.round(n * 100)
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      label,
      hint,
      error,
      id,
      name,
      currency = 'BRL',
      locale = 'pt-BR',
      disabled,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const inputId = id || name || autoId
    const controlled = value !== undefined
    const cents = controlled
      ? numberToCents(value)
      : numberToCents(defaultValue ?? null)
    const display =
      controlled && value == null
        ? ''
        : formatBRL(controlled ? numberToCents(value) : cents, locale, currency)

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-vellum-muted">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="text"
            inputMode="numeric"
            disabled={disabled}
            value={controlled ? (value == null ? '' : formatBRL(numberToCents(value), locale, currency)) : undefined}
            defaultValue={!controlled ? display : undefined}
            onChange={(e) => {
              const nextCents = digitsToCents(e.target.value)
              const formatted = nextCents === 0 && !/\d/.test(e.target.value)
                ? ''
                : formatBRL(nextCents, locale, currency)
              e.target.value = formatted
              onChange?.(
                formatted === '' ? null : nextCents / 100,
                formatted
              )
            }}
            className={cn(
              'h-10 w-full rounded border bg-panel px-3 font-mono text-sm text-vellum placeholder:text-vellum-faint',
              'transition-colors duration-150 focus-ring focus:border-brass-dim',
              error ? 'border-rust' : 'border-line',
              'disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
        </div>
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
CurrencyInput.displayName = 'CurrencyInput'
