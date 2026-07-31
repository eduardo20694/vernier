import { useState } from 'react'
import { Gauge } from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { SidebarNav } from '../../components/SidebarNav'
import { SearchResults } from '../../components/SearchResults'
import { SearchInput } from '../../components/SearchInput'
import { Chip } from '../../components/Chip'
import { Button } from '../../components/Button'
import { UserMenu } from '../../components/UserMenu'
import { AppPageShell } from './PageFrame'
import { DEFAULT_SEARCH_FILTERS, SEARCH_RESULTS } from './demoData'
import type { ActiveFilter } from '../../components/FilterBar'

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('gauge')
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>(DEFAULT_SEARCH_FILTERS)

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
            activeId="search"
            sections={[
              {
                items: [{ id: 'search', label: 'Busca global' }],
              },
            ]}
          />
        }
        topbar={
          <TopNav
            brand={<span className="text-sm text-vellum-muted">Busca</span>}
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
        <SearchResults
          query={searchQuery}
          results={searchQuery.trim() ? SEARCH_RESULTS : []}
          total={searchQuery.trim() ? 12 : 0}
          searchSlot={
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              placeholder="Buscar componentes…"
              aria-label="Buscar componentes"
            />
          }
          activeFilters={activeFilters}
          onRemoveFilter={(id) =>
            setActiveFilters((prev) => prev.filter((f) => f.id !== id))
          }
          onClearFilters={() => setActiveFilters([])}
          filterControls={
            <Chip
              tone="brass"
              onClick={() =>
                setActiveFilters((prev) =>
                  prev.some((f) => f.id === 'cat-forms')
                    ? prev
                    : [...prev, { id: 'cat-forms', label: 'Forms', tone: 'neutral' }]
                )
              }
            >
              + Forms
            </Chip>
          }
          onResultClick={() => undefined}
          emptyAction={
            <Button variant="secondary" size="sm" onClick={() => setSearchQuery('gauge')}>
              Limpar busca
            </Button>
          }
        />
      </AppShell>
    </AppPageShell>
  )
}
