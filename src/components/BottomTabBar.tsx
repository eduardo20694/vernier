import { useState } from 'react'
import { Bell, Home, Plus, Search, User, type LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

export interface BottomTabItem {
  id: string
  label: string
  icon: LucideIcon
  href?: string
  badge?: number
}

/** Tabs típicos para demos do showcase (Início, Busca, Criar, Alertas, Conta). */
export const bottomTabDemoItems: BottomTabItem[] = [
  { id: 'home', label: 'Início', icon: Home, href: '#' },
  { id: 'search', label: 'Busca', icon: Search, href: '#' },
  { id: 'create', label: 'Criar', icon: Plus, href: '#' },
  { id: 'alerts', label: 'Alertas', icon: Bell, badge: 3, href: '#' },
  { id: 'account', label: 'Conta', icon: User, href: '#' },
]

export interface BottomTabBarProps {
  items: BottomTabItem[]
  /** Controlled active tab id */
  value?: string
  /** Uncontrolled initial tab id */
  defaultValue?: string
  onValueChange?: (id: string) => void
  className?: string
}

function formatBadge(count: number) {
  if (count > 99) return '99+'
  return String(count)
}

function TabEntry({
  item,
  active,
  onSelect,
}: {
  item: BottomTabItem
  active: boolean
  onSelect: (id: string) => void
}) {
  const Icon = item.icon
  const showBadge = item.badge != null && item.badge > 0

  const className = cn(
    'relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2',
    'transition-colors duration-150 focus-ring',
    active
      ? 'text-brass-bright'
      : 'text-vellum-muted hover:text-vellum'
  )

  const content = (
    <>
      {active && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 mx-auto h-0.5 w-8 rounded-full bg-brass shadow-[0_0_8px_rgb(var(--brass)/0.55)]"
        />
      )}
      <span className="relative inline-flex">
        <Icon
          className={cn(
            'h-5 w-5 shrink-0 transition-colors',
            active && 'drop-shadow-[0_0_6px_rgb(var(--brass)/0.45)]'
          )}
          strokeWidth={active ? 2.25 : 2}
          aria-hidden
        />
        {showBadge && (
          <span
            className={cn(
              'absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center',
              'rounded-full border border-rust-dim/80 bg-rust px-1',
              'text-[9px] font-semibold leading-none text-vellum shadow-[0_0_6px_rgba(166,67,43,0.45)]'
            )}
          >
            {formatBadge(item.badge!)}
          </span>
        )}
      </span>
      <span className="w-full truncate text-center text-[10px] font-medium leading-tight">
        {item.label}
      </span>
    </>
  )

  if (item.href) {
    return (
      <a
        href={item.href}
        role="tab"
        aria-selected={active}
        aria-current={active ? 'page' : undefined}
        className={className}
        onClick={() => onSelect(item.id)}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={className}
      onClick={() => onSelect(item.id)}
    >
      {content}
    </button>
  )
}

// Barra inferior fixa — complementa o MobileNav hamburger em layouts mobile-first.
export function BottomTabBar({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
}: BottomTabBarProps) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.id ?? '')
  const current = value ?? internal

  function select(id: string) {
    if (value === undefined) setInternal(id)
    onValueChange?.(id)
  }

  return (
    <nav
      role="tablist"
      aria-label="Navegação principal"
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 border-t border-line bg-panel/95 backdrop-blur',
        className
      )}
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex h-14 max-w-lg items-stretch justify-around">
        {items.map((item) => (
          <TabEntry
            key={item.id}
            item={item}
            active={current === item.id}
            onSelect={select}
          />
        ))}
      </div>
    </nav>
  )
}
