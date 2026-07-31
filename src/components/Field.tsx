import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

export function Field({
  className,
  label,
  hint,
  error,
  children,
  htmlFor,
}: {
  className?: string
  label?: string
  hint?: string
  error?: string
  children: ReactNode
  htmlFor?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-vellum-muted">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <span className="text-xs text-rust">{error}</span>
      ) : hint ? (
        <span className="text-xs text-vellum-faint">{hint}</span>
      ) : null}
    </div>
  )
}

export function Fieldset({
  className,
  legend,
  children,
  ...props
}: HTMLAttributes<HTMLFieldSetElement> & { legend?: string }) {
  return (
    <fieldset
      className={cn('rounded-lg border border-line bg-panel/40 p-4', className)}
      {...props}
    >
      {legend && (
        <legend className="px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brass-dim">
          {legend}
        </legend>
      )}
      <div className="mt-2 space-y-4">{children}</div>
    </fieldset>
  )
}
