import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
  hint?: string
}

// Espelha o Input: erro sempre com texto, nunca só borda. Altura mínima
// generosa pra parecer área de trabalho, não um campo espremido.
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, hint, id, ...props }, ref) => {
    const textareaId = id || props.name

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-vellum-muted">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'min-h-[96px] resize-y rounded border bg-panel px-3 py-2.5 text-sm text-vellum placeholder:text-vellum-faint',
            'transition-colors duration-150',
            'focus-ring focus:border-brass-dim',
            error ? 'border-rust' : 'border-line',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />
        {error && (
          <span id={`${textareaId}-error`} className="text-xs text-rust">
            {error}
          </span>
        )}
        {!error && hint && (
          <span id={`${textareaId}-hint`} className="text-xs text-vellum-faint">
            {hint}
          </span>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
