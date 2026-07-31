import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'
import { Badge } from './Badge'

export interface RoleNavItem {
  id: string
  label: string
  href?: string
  onClick?: () => void
  /** Papéis autorizados; omitido = visível para todos */
  roles?: string[]
  badge?: string
  icon?: LucideIcon
}

export interface RoleNavProps {
  items: RoleNavItem[]
  currentRole: string
  activeId?: string
  /** vertical = lista lateral · horizontal = barra de abas */
  orientation?: 'vertical' | 'horizontal'
  className?: string
  onNavigate?: (id: string) => void
}

function itemAllowed(item: RoleNavItem, currentRole: string) {
  if (!item.roles?.length) return true
  return item.roles.includes(currentRole)
}

function NavBadge({ text }: { text: string }) {
  const tone =
    text.toLowerCase() === 'admin'
      ? 'brass'
      : text.toLowerCase() === 'coord'
        ? 'verdigris'
        : 'neutral'

  return (
    <Badge tone={tone} className="ml-auto shrink-0 normal-case tracking-normal">
      {text}
    </Badge>
  )
}

export function RoleNav({
  items,
  currentRole,
  activeId,
  orientation = 'vertical',
  className,
  onNavigate,
}: RoleNavProps) {
  const isVertical = orientation === 'vertical'

  return (
    <nav
      aria-label="Navegação por perfil"
      className={cn(
        isVertical ? 'flex flex-col gap-0.5' : 'flex flex-wrap items-center gap-1 border-b border-line',
        className
      )}
    >
      {items.map((item) => {
        const allowed = itemAllowed(item, currentRole)
        const active = item.id === activeId
        const Icon = item.icon

        const content = (
          <>
            {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden />}
            <span className={cn('truncate', isVertical ? 'flex-1 text-left' : undefined)}>
              {item.label}
            </span>
            {item.badge && allowed && <NavBadge text={item.badge} />}
          </>
        )

        const baseClass = cn(
          'inline-flex items-center gap-2 text-sm transition-colors focus-ring',
          isVertical
            ? 'w-full rounded-md px-3 py-2'
            : 'border-b-2 border-transparent px-3 py-2 -mb-px',
          !allowed && 'cursor-not-allowed opacity-40',
          allowed && !active && 'text-vellum-muted hover:text-vellum hover:bg-panel2/70',
          allowed &&
            active &&
            (isVertical
              ? 'bg-panel2 text-brass-bright shadow-[inset_2px_0_0_0_rgb(var(--brass))]'
              : 'border-brass text-brass-bright'),
          allowed && !active && !isVertical && 'hover:border-line'
        )

        const handleClick = () => {
          if (!allowed) return
          item.onClick?.()
          onNavigate?.(item.id)
        }

        if (item.href && allowed) {
          return (
            <a
              key={item.id}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              aria-disabled={!allowed || undefined}
              className={baseClass}
              onClick={(e) => {
                if (!allowed) {
                  e.preventDefault()
                  return
                }
                onNavigate?.(item.id)
              }}
            >
              {content}
            </a>
          )
        }

        return (
          <button
            key={item.id}
            type="button"
            disabled={!allowed}
            aria-current={active ? 'page' : undefined}
            className={baseClass}
            onClick={handleClick}
          >
            {content}
          </button>
        )
      })}
    </nav>
  )
}
