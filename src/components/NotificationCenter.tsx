import { useState, type ReactNode } from 'react'
import { Bell } from 'lucide-react'
import { cn } from '../lib/cn'
import { IconButton } from './IconButton'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
import { StatusDot } from './StatusDot'

export interface NotificationItem {
  id: string
  title: string
  description?: string
  time: string
  unread?: boolean
  icon?: ReactNode
  onClick?: () => void
}

export interface NotificationCenterProps {
  items: NotificationItem[]
  onMarkAllRead?: () => void
  emptyText?: string
  className?: string
  label?: string
}

export function NotificationCenter({
  items,
  onMarkAllRead,
  emptyText = 'Nenhuma notificação.',
  className,
  label = 'Notificações',
}: NotificationCenterProps) {
  const [open, setOpen] = useState(false)
  const unreadCount = items.filter((i) => i.unread).length

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <IconButton label={label} className={cn('relative', className)}>
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brass shadow-[0_0_8px_rgb(var(--brass)/0.7)]" />
          )}
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-line px-3 py-2.5">
          <p className="font-display text-sm text-vellum">{label}</p>
          {onMarkAllRead && unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="text-xs text-brass-bright transition-colors hover:text-brass focus-ring rounded-sm"
            >
              Marcar todas como lidas
            </button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {items.length === 0 ? (
            <p className="px-3 py-8 text-center text-xs text-vellum-faint">{emptyText}</p>
          ) : (
            <ul className="divide-y divide-line">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      item.onClick?.()
                      setOpen(false)
                    }}
                    className={cn(
                      'flex w-full gap-3 px-3 py-3 text-left transition-colors hover:bg-panel',
                      item.unread && 'bg-brass/[0.04]'
                    )}
                  >
                    <div className="mt-1 shrink-0">
                      {item.icon ?? (
                        <StatusDot tone={item.unread ? 'brass' : 'neutral'} pulse={!!item.unread} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p
                          className={cn(
                            'truncate text-sm',
                            item.unread ? 'font-medium text-vellum' : 'text-vellum-muted'
                          )}
                        >
                          {item.title}
                        </p>
                        <time className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
                          {item.time}
                        </time>
                      </div>
                      {item.description && (
                        <p className="mt-0.5 line-clamp-2 text-xs text-vellum-faint">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
