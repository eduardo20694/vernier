import { useId, type HTMLAttributes } from 'react'
import { CreditCard } from 'lucide-react'
import { cn } from '../lib/cn'

export interface CreditCardValue {
  number: string
  expiry: string
  cvc: string
}

export interface CreditCardInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: CreditCardValue
  onChange: (value: CreditCardValue) => void
  label?: string
  error?: string
  disabled?: boolean
}

function digitsOnly(v: string) {
  return v.replace(/\D/g, '')
}

function formatCardNumber(raw: string) {
  const d = digitsOnly(raw).slice(0, 16)
  return d.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

function formatExpiry(raw: string) {
  const d = digitsOnly(raw).slice(0, 4)
  if (d.length <= 2) return d
  return `${d.slice(0, 2)}/${d.slice(2)}`
}

const fieldClass = cn(
  'h-10 w-full rounded border border-line bg-panel px-3 text-sm text-vellum',
  'placeholder:text-vellum-faint focus-ring focus:border-brass-dim',
  'disabled:cursor-not-allowed disabled:opacity-50 font-mono tabular-nums'
)

export function CreditCardInput({
  className,
  value,
  onChange,
  label = 'Cartão',
  error,
  disabled,
  ...props
}: CreditCardInputProps) {
  const id = useId()

  return (
    <div className={cn('flex flex-col gap-3', className)} {...props}>
      {label && (
        <span className="text-sm font-medium text-vellum-muted" id={`${id}-label`}>
          {label}
        </span>
      )}
      <div className="relative">
        <CreditCard
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brass"
          aria-hidden
        />
        <input
          id={`${id}-number`}
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          disabled={disabled}
          value={value.number}
          placeholder="ACCT-000003"
          aria-labelledby={`${id}-label`}
          onChange={(e) => onChange({ ...value, number: formatCardNumber(e.target.value) })}
          className={cn(fieldClass, 'pl-10', error && 'border-rust')}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-expiry`} className="text-xs text-vellum-faint">
            Validade
          </label>
          <input
            id={`${id}-expiry`}
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            disabled={disabled}
            value={value.expiry}
            placeholder="MM/AA"
            onChange={(e) => onChange({ ...value, expiry: formatExpiry(e.target.value) })}
            className={cn(fieldClass, error && 'border-rust')}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-cvc`} className="text-xs text-vellum-faint">
            CVC
          </label>
          <input
            id={`${id}-cvc`}
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            disabled={disabled}
            value={value.cvc}
            placeholder="123"
            maxLength={4}
            onChange={(e) =>
              onChange({ ...value, cvc: digitsOnly(e.target.value).slice(0, 4) })
            }
            className={cn(fieldClass, error && 'border-rust')}
          />
        </div>
      </div>
      {error && <span className="text-xs text-rust">{error}</span>}
    </div>
  )
}
