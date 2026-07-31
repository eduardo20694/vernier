import { forwardRef, useCallback, useId, useState, type InputHTMLAttributes } from 'react'
import { cn } from '../lib/cn'
import {
  documentComplete,
  formatDocument,
  isValidDocument,
  resolveDocumentKind,
  stripDigits,
  type DocumentKind,
} from '../lib/br'

export interface CpfCnpjInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  mode?: DocumentKind | 'auto'
  value?: string
  defaultValue?: string
  onChange?: (formatted: string, raw: string, valid: boolean) => void
  label?: string
  hint?: string
  error?: string
}

const placeholders: Record<DocumentKind, string> = {
  cpf: '000.000.000-00',
  cnpj: '00.000.000/0000-00',
}

function validationError(raw: string, mode: DocumentKind | 'auto'): string | undefined {
  if (!documentComplete(raw, mode)) return undefined
  const kind = resolveDocumentKind(raw, mode)
  if (!isValidDocument(raw, mode)) {
    return kind === 'cpf' ? 'CPF inválido' : 'CNPJ inválido'
  }
  return undefined
}

export const CpfCnpjInput = forwardRef<HTMLInputElement, CpfCnpjInputProps>(
  (
    {
      className,
      mode = 'auto',
      value,
      defaultValue,
      onChange,
      label,
      hint,
      error: errorOverride,
      id,
      name,
      placeholder,
      disabled,
      onBlur,
      ...props
    },
    ref
  ) => {
    const autoId = useId()
    const inputId = id || name || autoId
    const [internalRaw, setInternalRaw] = useState(() =>
      stripDigits(defaultValue ?? '')
    )
    const [touched, setTouched] = useState(false)

    const raw = value !== undefined ? stripDigits(value) : internalRaw
    const kind = resolveDocumentKind(raw, mode)
    const formatted = formatDocument(raw, mode)
    const intrinsicError =
      touched || documentComplete(raw, mode) ? validationError(raw, mode) : undefined
    const error = errorOverride ?? intrinsicError

    const emitChange = useCallback(
      (nextRaw: string) => {
        const nextFormatted = formatDocument(nextRaw, mode)
        const valid =
          documentComplete(nextRaw, mode) && isValidDocument(nextRaw, mode)
        onChange?.(nextFormatted, stripDigits(nextRaw), valid)
      },
      [mode, onChange]
    )

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
          disabled={disabled}
          placeholder={placeholder ?? (mode === 'auto' ? `${placeholders.cpf} ou ${placeholders.cnpj}` : placeholders[kind])}
          value={formatted}
          onChange={(e) => {
            const nextRaw = stripDigits(e.target.value)
            if (value === undefined) setInternalRaw(nextRaw)
            emitChange(nextRaw)
          }}
          onBlur={(e) => {
            setTouched(true)
            onBlur?.(e)
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
CpfCnpjInput.displayName = 'CpfCnpjInput'
