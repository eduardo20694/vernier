import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface BankAccountValues {
  agency: string
  account: string
  digit: string
}

export interface BankAccountErrors {
  agency?: string
  account?: string
  digit?: string
}

export interface BankAccountLabels {
  agency?: string
  account?: string
  digit?: string
  group?: string
}

export interface BankAccountFieldsProps {
  values: BankAccountValues
  onChange: (values: BankAccountValues) => void
  errors?: BankAccountErrors
  labels?: BankAccountLabels
  /** Nome do banco exibido acima dos campos (ex.: "Itaú Unibanco") */
  bankName?: string
  disabled?: boolean
  className?: string
}

function digitsOnly(v: string) {
  return v.replace(/\D/g, '')
}

/** Formata conta com pontos a cada 3 dígitos quando longa; aceita tamanho flexível. */
export function formatBankAccount(raw: string): string {
  const d = digitsOnly(raw)
  if (d.length <= 4) return d
  const parts: string[] = []
  for (let i = 0; i < d.length; i += 3) {
    parts.push(d.slice(i, i + 3))
  }
  return parts.join('.')
}

function FieldShell({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-vellum-muted">
        {label}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} className="text-xs text-rust">
          {error}
        </span>
      )}
    </div>
  )
}

function fieldInputClass(error?: string) {
  return cn(
    'h-10 w-full rounded border bg-panel px-3 font-mono text-sm text-vellum placeholder:text-vellum-faint',
    'transition-colors duration-150 focus-ring focus:border-brass-dim',
    error ? 'border-rust' : 'border-line',
    'disabled:cursor-not-allowed disabled:opacity-50'
  )
}

function BankField({
  id,
  label,
  error,
  inputClassName,
  ...props
}: {
  id: string
  label: string
  error?: string
  inputClassName?: string
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldInputClass(error), inputClassName)}
        {...props}
      />
    </FieldShell>
  )
}

export function BankAccountFields({
  values,
  onChange,
  errors,
  labels,
  bankName,
  disabled,
  className,
}: BankAccountFieldsProps) {
  const baseId = useId()
  const agencyId = `${baseId}-agency`
  const accountId = `${baseId}-account`
  const digitId = `${baseId}-digit`

  const lbl = {
    group: labels?.group ?? 'Dados bancários',
    agency: labels?.agency ?? 'Agência',
    account: labels?.account ?? 'Conta',
    digit: labels?.digit ?? 'Dígito',
  }

  const patch = (partial: Partial<BankAccountValues>) =>
    onChange({ ...values, ...partial })

  return (
    <fieldset disabled={disabled} className={cn('space-y-3', className)}>
      <legend className="sr-only">{lbl.group}</legend>

      {bankName && (
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass-bright">
          {bankName}
        </p>
      )}

      <div className="flex flex-wrap items-end gap-3">
        <BankField
          id={agencyId}
          label={lbl.agency}
          error={errors?.agency}
          inputMode="numeric"
          autoComplete="off"
          placeholder="0000"
          maxLength={4}
          value={values.agency}
          className="w-[88px] shrink-0"
          onChange={(e) => patch({ agency: digitsOnly(e.target.value).slice(0, 4) })}
        />

        <BankField
          id={accountId}
          label={lbl.account}
          error={errors?.account}
          inputMode="numeric"
          autoComplete="off"
          placeholder="00000.000"
          value={formatBankAccount(values.account)}
          className="min-w-[140px] flex-1"
          onChange={(e) => patch({ account: digitsOnly(e.target.value) })}
        />

        <BankField
          id={digitId}
          label={lbl.digit}
          error={errors?.digit}
          autoComplete="off"
          placeholder="0"
          maxLength={2}
          value={values.digit}
          className="w-[64px] shrink-0"
          onChange={(e) =>
            patch({ digit: e.target.value.replace(/[^0-9a-zA-Z]/g, '').slice(0, 2).toUpperCase() })
          }
        />
      </div>
    </fieldset>
  )
}
