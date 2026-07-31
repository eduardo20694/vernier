import { useMemo, useState } from 'react'
import { Bell, Gauge, Settings } from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { SidebarNav } from '../../components/SidebarNav'
import { PageHeader } from '../../components/PageHeader'
import { UserMenu } from '../../components/UserMenu'
import { FilterBar } from '../../components/FilterBar'
import { Chip } from '../../components/Chip'
import { Button } from '../../components/Button'
import { StatusDot } from '../../components/StatusDot'
import { cn } from '../../lib/cn'
import type { NotificationItem } from '../../components/NotificationCenter'
import { AppPageShell } from './PageFrame'
import { DEMO_NOTIFICATIONS } from './demoData'

type FilterKind = 'all' | 'unread' | 'system'

export function SaasNotificationsPage() {
  const [items, setItems] = useState(DEMO_NOTIFICATIONS)
  const [filter, setFilter] = useState<FilterKind>('all')
  const [activeFilters, setActiveFilters] = useState<{ id: string; label: string }[]>([])

  const filtered = useMemo(() => {
    let list = items
    if (filter === 'unread') list = list.filter((i) => i.unread)
    if (filter === 'system') list = list.filter((i) => i.title.startsWith('Sistema'))
    return list
  }, [items, filter])

  function markAllRead() {
    setItems((prev) => prev.map((i) => ({ ...i, unread: false })))
  }

  function markRead(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, unread: false } : i))
    )
  }

  return (
    <AppPageShell>
      <AppShell
        className="h-full w-full rounded-none border-0 shadow-none"
        sidebar={
          <SidebarNav
            brand={
              <>
                <Gauge className="h-4 w-4 shrink-0 text-brass-bright" aria-hidden />
                <span data-sidebar-label className="truncate text-base">
                  Vernier
                </span>
              </>
            }
            activeId="notifications"
            sections={[
              {
                items: [
                  { id: 'notifications', label: 'Notificações', icon: <Bell />, badge: '2' },
                  { id: 'settings', label: 'Configurações', icon: <Settings /> },
                ],
              },
            ]}
          />
        }
        topbar={
          <TopNav
            brand={<span className="text-sm text-vellum-muted">Central de notificações</span>}
            actions={
              <UserMenu
                name="Marina Costa"
                email="marina@vernier.dev"
                onSettings={() => undefined}
                onLogout={() => undefined}
              />
            }
          />
        }
      >
        <div className="mx-auto max-w-2xl space-y-6">
          <PageHeader
            title="Notificações"
            description="Atualizações do workspace, alertas e avisos do sistema."
            actions={
              items.some((i) => i.unread) ? (
                <Button variant="ghost" size="sm" onClick={markAllRead}>
                  Marcar todas como lidas
                </Button>
              ) : undefined
            }
          />

          <FilterBar
            active={activeFilters}
            onRemove={(id) => setActiveFilters((prev) => prev.filter((f) => f.id !== id))}
            onClearAll={() => setActiveFilters([])}
          >
            <Chip
              tone="brass"
              selected={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              Todas
            </Chip>
            <Chip
              tone="neutral"
              selected={filter === 'unread'}
              onClick={() => setFilter('unread')}
            >
              Não lidas
            </Chip>
            <Chip
              tone="neutral"
              selected={filter === 'system'}
              onClick={() => setFilter('system')}
            >
              Sistema
            </Chip>
          </FilterBar>

          <NotificationList items={filtered} onItemClick={markRead} />
        </div>
      </AppShell>
    </AppPageShell>
  )
}

function NotificationList({
  items,
  onItemClick,
}: {
  items: NotificationItem[]
  onItemClick: (id: string) => void
}) {
  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-line bg-panel/40 px-4 py-12 text-center text-sm text-vellum-muted">
        Nenhuma notificação nesta seleção.
      </p>
    )
  }

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel shadow-plate">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onItemClick(item.id)}
            className={cn(
              'flex w-full gap-3 px-4 py-4 text-left transition-colors hover:bg-panel2/60 focus-ring',
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
                <p className="mt-0.5 text-xs text-vellum-faint">{item.description}</p>
              )}
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}
