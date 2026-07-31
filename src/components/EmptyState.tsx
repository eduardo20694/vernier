import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  /** Slot pra CTA — o princípio é "tela vazia é convite pra agir" */
  action?: ReactNode
  className?: string
}

// Empty state não é um "nada aqui". É um convite: título em display,
// descrição curta, e uma ação clara. Sem ilustração decorativa genérica.
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-6 py-12 text-center',
        className
      )}
    >
      {icon && (
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-gradient-to-b from-panel2 to-panel text-brass-bright shadow-[inset_0_1px_0_rgb(var(--mist)/0.06)]">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl font-medium tracking-tight text-vellum">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-vellum-muted">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
