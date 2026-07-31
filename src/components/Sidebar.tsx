import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface SidebarItem {
  label: string
  icon?: ReactNode
  active?: boolean
  onClick?: () => void
}

export function Sidebar({
  brand,
  items,
  footer,
  className,
}: {
  brand: ReactNode
  items: SidebarItem[]
  footer?: ReactNode
  className?: string
}) {
  return (
    <aside className={cn('flex w-56 shrink-0 flex-col border-r border-line bg-panel', className)}>
      <div className="flex h-16 items-center gap-2 border-b border-line px-5 font-display text-vellum">
        {brand}
      </div>
      <nav className="flex-1 py-3">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={cn(
              'mx-2 flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors duration-150 focus-ring',
              item.active
                ? 'bg-panel2 text-brass-bright'
                : 'text-vellum-muted hover:bg-panel2/60 hover:text-vellum'
            )}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      {footer && <div className="border-t border-line p-4 font-mono text-xs text-vellum-faint">{footer}</div>}
    </aside>
  )
}
