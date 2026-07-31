import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'
import { Badge } from './Badge'
import { EmptySearch } from './EmptySearch'
import { FilterBar, type ActiveFilter, type FilterBarProps } from './FilterBar'
import { Skeleton } from './Skeleton'

export interface SearchResultItem {
  id: string
  title: string
  description: string
  href?: string
  meta?: string
  category?: string
}

export interface SearchResultsProps {
  query: string
  results: SearchResultItem[]
  /** Total global (ex.: paginação); padrão = results.length */
  total?: number
  loading?: boolean
  /** Slot livre acima da lista (ex.: SearchInput) */
  searchSlot?: ReactNode
  /** Filtros ativos para FilterBar */
  activeFilters?: ActiveFilter[]
  onRemoveFilter?: FilterBarProps['onRemove']
  onClearFilters?: FilterBarProps['onClearAll']
  /** Controles de filtro (Select, Popover, etc.) */
  filterControls?: ReactNode
  /** Alternativa: chips simples sem FilterBar */
  filterChips?: ReactNode
  onResultClick?: (item: SearchResultItem) => void
  emptyAction?: ReactNode
  className?: string
  /** Rótulo do cabeçalho; padrão ecoa a query */
  heading?: string
}

function formatCount(n: number) {
  return n.toLocaleString('pt-BR')
}

function ResultSkeleton() {
  return (
    <div className="flex flex-col gap-2 border-b border-line px-4 py-4 last:border-b-0">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full max-w-md" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  )
}

function ResultRow({
  item,
  onClick,
}: {
  item: SearchResultItem
  onClick?: (item: SearchResultItem) => void
}) {
  const interactive = Boolean(onClick || item.href)
  const content = (
    <>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-vellum group-hover:text-brass-bright transition-colors">
            {item.title}
          </span>
          {item.category && (
            <Badge tone="neutral" className="normal-case tracking-normal">
              {item.category}
            </Badge>
          )}
        </div>
        <p className="text-sm leading-relaxed text-vellum-muted line-clamp-2">{item.description}</p>
        {item.meta && (
          <p className="font-mono text-[11px] tabular-nums text-vellum-faint">{item.meta}</p>
        )}
      </div>
      {interactive && (
        <ChevronRight
          className="mt-0.5 h-4 w-4 shrink-0 text-vellum-faint transition-colors group-hover:text-brass-bright"
          aria-hidden
        />
      )}
    </>
  )

  const rowClass = cn(
    'group flex w-full items-start gap-3 border-b border-line px-4 py-4 text-left transition-colors last:border-b-0',
    interactive && 'cursor-pointer hover:bg-panel2/60 focus-ring rounded-sm'
  )

  if (item.href && !onClick) {
    return (
      <a href={item.href} className={rowClass}>
        {content}
      </a>
    )
  }

  if (onClick) {
    return (
      <button type="button" className={rowClass} onClick={() => onClick(item)}>
        {content}
      </button>
    )
  }

  return <div className={cn(rowClass, 'cursor-default')}>{content}</div>
}

export function SearchResults({
  query,
  results,
  total,
  loading = false,
  searchSlot,
  activeFilters,
  onRemoveFilter,
  onClearFilters,
  filterControls,
  filterChips,
  onResultClick,
  emptyAction,
  className,
  heading,
}: SearchResultsProps) {
  const count = total ?? results.length
  const hasFilters =
    Boolean(filterControls) ||
    Boolean(filterChips) ||
    (activeFilters?.length ?? 0) > 0

  const resolvedHeading = heading ?? (
    query.trim() ? (
      <>
        Resultados para{' '}
        <span className="text-brass-bright">&ldquo;{query.trim()}&rdquo;</span>
      </>
    ) : (
      'Resultados da busca'
    )
  )

  return (
    <div className={cn('flex flex-col', className)}>
      <header className="border-b border-line pb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 space-y-1">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-vellum">
              {resolvedHeading}
            </h1>
            {!loading && (
              <p className="text-sm text-vellum-muted">
                {count === 0
                  ? 'Nenhum resultado encontrado'
                  : count === 1
                    ? '1 resultado'
                    : `${formatCount(count)} resultados`}
              </p>
            )}
            {loading && (
              <p className="text-sm text-vellum-faint" aria-live="polite">
                Buscando…
              </p>
            )}
          </div>
          {searchSlot && <div className="w-full sm:max-w-sm">{searchSlot}</div>}
        </div>

        {hasFilters && (
          <div className="mt-4">
            {filterChips ? (
              <div className="flex flex-wrap items-center gap-2">{filterChips}</div>
            ) : (
              <FilterBar
                active={activeFilters}
                onRemove={onRemoveFilter}
                onClearAll={onClearFilters}
              >
                {filterControls}
              </FilterBar>
            )}
          </div>
        )}
      </header>

      <div className="min-h-[12rem]" aria-busy={loading}>
        {loading ? (
          <div role="status" aria-label="Carregando resultados">
            {Array.from({ length: 4 }, (_, i) => (
              <ResultSkeleton key={i} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <EmptySearch query={query.trim() || undefined} action={emptyAction} />
        ) : (
          <ul className="divide-y divide-line">
            {results.map((item) => (
              <li key={item.id}>
                <ResultRow item={item} onClick={onResultClick} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
