import { useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'

export interface NavSection {
  title?: string
  items: {
    id: string
    label: string
    icon?: ReactNode
    badge?: string
  }[]
}

export function SidebarNav({
  brand,
  sections,
  activeId,
  onNavigate,
  footer,
  collapsible = true,
  className,
}: {
  brand: ReactNode
  sections: NavSection[]
  activeId?: string
  onNavigate?: (id: string) => void
  footer?: ReactNode
  collapsible?: boolean
  className?: string
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      data-collapsed={collapsed ? '' : undefined}
      className={cn(
        'group/sidebar relative flex shrink-0 flex-col border-r border-line bg-panel transition-[width] duration-200',
        collapsed ? 'w-[68px]' : 'w-60',
        className
      )}
    >
      <div
        className={cn(
          'flex h-14 items-center border-b border-line px-4 font-display text-vellum',
          collapsed ? 'justify-center' : 'gap-2',
          '[&_[data-sidebar-label]]:group-data-[collapsed]/sidebar:hidden'
        )}
      >
        {brand}
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto py-3">
        {sections.map((section, si) => (
          <div key={section.title ?? si}>
            {section.title && !collapsed && (
              <p className="mb-1 px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
                {section.title}
              </p>
            )}
            <div className="space-y-0.5 px-2">
              {section.items.map((item) => {
                const active = item.id === activeId
                return (
                  <button
                    key={item.id}
                    type="button"
                    title={collapsed ? item.label : undefined}
                    onClick={() => onNavigate?.(item.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors focus-ring',
                      collapsed && 'justify-center px-0',
                      active
                        ? 'bg-panel2 text-brass-bright shadow-[inset_2px_0_0_0_rgb(var(--brass))]'
                        : 'text-vellum-muted hover:bg-panel2/70 hover:text-vellum'
                    )}
                  >
                    {item.icon && <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4">{item.icon}</span>}
                    {!collapsed && <span className="flex-1 truncate text-left">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="rounded-sm bg-brass/15 px-1.5 py-0.5 font-mono text-[10px] text-brass-bright">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {footer && !collapsed && (
        <div className="border-t border-line p-4 text-xs text-vellum-faint">{footer}</div>
      )}

      {collapsible && (
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-16 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-panel2 text-vellum-faint shadow-plate hover:text-vellum focus-ring"
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      )}
    </aside>
  )
}
