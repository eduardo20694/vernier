import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'
import { CopyButton } from './CopyButton'

export interface CopyFieldProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  label?: string
  mono?: boolean
}

export function CopyField({
  className,
  value,
  label,
  mono = true,
  ...props
}: CopyFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)} {...props}>
      {label && <span className="text-sm font-medium text-vellum-muted">{label}</span>}
      <div
        className={cn(
          'flex h-10 items-center gap-2 rounded border border-line bg-panel px-2',
          'shadow-[inset_0_1px_0_rgb(var(--mist)/0.04)]'
        )}
      >
        <input
          type="text"
          readOnly
          value={value}
          aria-label={label ?? 'Valor'}
          className={cn(
            'min-w-0 flex-1 bg-transparent px-1 text-sm text-vellum outline-none',
            mono && 'font-mono text-brass-bright'
          )}
        />
        <CopyButton value={value} />
      </div>
    </div>
  )
}
