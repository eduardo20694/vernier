import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  ornate?: boolean
}

// Separador gravado. Com `ornate`, o label fica entre filetes azure —
// tipo placa de instrumento entre seções.
export function Divider({ className, label, ornate = false, ...props }: DividerProps) {
  if (!label) {
    return (
      <div
        role="separator"
        className={cn(
          'h-px w-full bg-gradient-to-r from-transparent via-line to-transparent',
          className
        )}
        {...props}
      />
    )
  }

  return (
    <div
      role="separator"
      className={cn('flex w-full items-center gap-3', className)}
      {...props}
    >
      <div
        className={cn(
          'h-px flex-1',
          ornate
            ? 'bg-gradient-to-r from-transparent via-brass-dim/70 to-brass/40'
            : 'bg-gradient-to-r from-transparent via-line to-line'
        )}
      />
      {ornate && <span aria-hidden className="h-1 w-1 rotate-45 bg-brass/70" />}
      <span
        className={cn(
          'shrink-0 font-mono text-[10px] uppercase tracking-[0.22em]',
          ornate ? 'text-brass-dim' : 'text-vellum-faint'
        )}
      >
        {label}
      </span>
      {ornate && <span aria-hidden className="h-1 w-1 rotate-45 bg-brass/70" />}
      <div
        className={cn(
          'h-px flex-1',
          ornate
            ? 'bg-gradient-to-l from-transparent via-brass-dim/70 to-brass/40'
            : 'bg-gradient-to-l from-transparent via-line to-line'
        )}
      />
    </div>
  )
}
