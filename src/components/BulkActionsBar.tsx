import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { IconButton } from './IconButton'

export interface BulkActionsBarProps extends HTMLAttributes<HTMLDivElement> {
  count: number
  onClear?: () => void
  actions?: ReactNode
  /** Texto customizado; padrão: "N selecionados" */
  label?: string
}

export function BulkActionsBar({
  className,
  count,
  onClear,
  actions,
  label,
  ...props
}: BulkActionsBarProps) {
  if (count <= 0) return null

  return (
    <div
      role="region"
      aria-label="Ações em lote"
      className={cn(
        'sticky bottom-4 z-30 mx-auto flex w-[min(100%,36rem)] items-center gap-3',
        'rounded-full border border-brass-dim/50 bg-panel2/95 px-4 py-2 shadow-brass backdrop-blur-md',
        className
      )}
      {...props}
    >
      <span className="font-mono text-xs tabular-nums text-brass-bright">
        {label ?? `${count} selecionado${count === 1 ? '' : 's'}`}
      </span>
      <div className="ml-auto flex items-center gap-2">{actions}</div>
      {onClear && (
        <IconButton label="Limpar seleção" size="sm" onClick={onClear}>
          <X />
        </IconButton>
      )}
    </div>
  )
}

/** Atalho tipado para botões de ação dentro da barra */
export function BulkActionButton({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Button>) {
  return (
    <Button size="sm" variant="secondary" {...props}>
      {children}
    </Button>
  )
}
