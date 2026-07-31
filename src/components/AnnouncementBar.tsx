import { useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/cn'

export interface AnnouncementBarProps {
  children: ReactNode
  href?: string
  linkLabel?: string
  dismissible?: boolean
  onDismiss?: () => void
  defaultVisible?: boolean
  className?: string
}

export function AnnouncementBar({
  children,
  href,
  linkLabel = 'Saiba mais',
  dismissible = true,
  onDismiss,
  defaultVisible = true,
  className,
}: AnnouncementBarProps) {
  const [visible, setVisible] = useState(defaultVisible)
  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Anúncio"
      className={cn(
        'relative flex items-center justify-center gap-3 border-b border-brass-dim/40',
        'bg-gradient-to-r from-brass/20 via-brass/10 to-brass/20 px-4 py-2 text-sm text-brass-bright',
        className
      )}
    >
      <p className="text-center">{children}</p>
      {href && (
        <a
          href={href}
          className="shrink-0 font-medium underline underline-offset-2 transition-colors hover:text-vellum focus-ring rounded-sm"
        >
          {linkLabel}
        </a>
      )}
      {dismissible && (
        <button
          type="button"
          onClick={() => {
            onDismiss?.()
            setVisible(false)
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-brass-bright/70 transition-colors hover:bg-brass/15 hover:text-brass-bright focus-ring"
          aria-label="Dispensar anúncio"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
