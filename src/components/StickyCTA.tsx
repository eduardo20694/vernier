import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'

export interface StickyCTAProps extends HTMLAttributes<HTMLElement> {
  message: ReactNode
  actionLabel?: string
  onAction?: () => void
  position?: 'top' | 'bottom'
  dismissible?: boolean
  onDismiss?: () => void
  defaultVisible?: boolean
}

export function StickyCTA({
  message,
  actionLabel = 'Começar',
  onAction,
  position = 'bottom',
  dismissible = true,
  onDismiss,
  defaultVisible = true,
  className,
  ...props
}: StickyCTAProps) {
  const [visible, setVisible] = useState(defaultVisible)
  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Chamada à ação"
      className={cn(
        'fixed inset-x-0 z-50 border-line bg-panel2/95 px-4 py-3 shadow-plate backdrop-blur-sm',
        position === 'top' ? 'top-0 border-b' : 'bottom-0 border-t',
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
        <p className="min-w-0 flex-1 text-sm text-vellum-muted">{message}</p>
        <div className="flex shrink-0 items-center gap-2">
          {actionLabel && (
            <Button size="sm" variant="gradient" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {dismissible && (
            <button
              type="button"
              onClick={() => {
                onDismiss?.()
                setVisible(false)
              }}
              className="rounded p-1.5 text-vellum-faint transition-colors hover:bg-panel hover:text-vellum focus-ring"
              aria-label="Dispensar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
