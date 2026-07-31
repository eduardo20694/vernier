import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  hint?: string
}

// O erro nunca é só uma borda vermelha: sempre vem com texto explicando o
// que está errado, na voz da interface (direto, sem "oops!"). Isso segue o
// princípio de que falha é um momento de direção, não de decoração.
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, hint, id, ...props }, ref) => {
    const inputId = id || props.name

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
          className={cn(
            'h-10 rounded border bg-panel px-3 text-sm text-vellum placeholder:text-vellum-faint',
            'transition-colors duration-150',
            'focus-ring focus:border-brass-dim',
            error ? 'border-rust' : 'border-line',
            'disabled:opacity-50 disabled:cursor-not-allowed',
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
Input.displayName = 'Input'
