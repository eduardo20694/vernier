import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Gauge, Search } from 'lucide-react'
import { cn } from '../lib/cn'
import { SearchInput } from '../components/SearchInput'
import { Badge } from '../components/Badge'
import { Kbd } from '../components/Kbd'
import { EmptyState } from '../components/EmptyState'
import { Button } from '../components/Button'
import {
  CATEGORIES,
  TOTAL_PLATES,
  countVisible,
  plateMatches,
  type CatalogCategory,
} from './catalog'

interface CatalogFilterValue {
  query: string
  category: CatalogCategory
  setQuery: (q: string) => void
  setCategory: (c: CatalogCategory) => void
  visibleCount: number
}

const CatalogFilterContext = createContext<CatalogFilterValue | null>(null)

export function useCatalogFilter() {
  const ctx = useContext(CatalogFilterContext)
  if (!ctx) throw new Error('useCatalogFilter precisa do CatalogShell')
  return ctx
}

export function CatalogShell({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CatalogCategory>('all')
  const visibleCount = useMemo(() => countVisible(query, category), [query, category])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) return
      e.preventDefault()
      document.getElementById('catalog-search')?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo(
    () => ({ query, category, setQuery, setCategory, visibleCount }),
    [query, category, visibleCount]
  )

  return (
    <CatalogFilterContext.Provider value={value}>
      <div className="catalog-shell relative min-h-screen text-vellum">
        <div aria-hidden className="catalog-ambient pointer-events-none fixed inset-0" />

        <header className="sticky top-0 z-40 border-b border-line/80">
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-xl" />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/50 to-transparent"
          />

          <div className="relative mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-4 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-center gap-4">
              <a href="#topo" className="flex items-center gap-3 rounded-sm focus-ring">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-brass-dim/50 bg-gradient-to-b from-brass/20 to-transparent text-brass shadow-brass">
                  <Gauge className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-display text-lg leading-none text-vellum">Vernier</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
                    catálogo · {TOTAL_PLATES} pranchas
                  </p>
                </div>
              </a>

              <div className="ml-auto flex items-center gap-3">
                <Badge tone="brass" className="hidden sm:inline-flex">
                  {visibleCount} / {TOTAL_PLATES}
                </Badge>
                <div className="hidden items-center gap-1.5 text-xs text-vellum-faint md:flex">
                  <span>buscar</span>
                  <Kbd>/</Kbd>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <SearchInput
                id="catalog-search"
                className="w-full lg:max-w-md"
                placeholder="Filtrar peças — tipografia, sheet, gauge…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClear={() => setQuery('')}
              />

              <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {CATEGORIES.map((c) => {
                  const active = category === c.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={cn(
                        'shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-150 focus-ring',
                        active
                          ? 'border-brass bg-gradient-to-b from-brass-bright via-brass to-brass-dim text-ink shadow-[inset_0_1px_0_rgba(255,240,210,0.35)]'
                          : 'border-line bg-panel2/60 text-vellum-muted hover:border-brass-dim/50 hover:text-vellum'
                      )}
                    >
                      {c.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </header>

        <main className="relative mx-auto max-w-[1400px] px-5 pb-24 pt-10 sm:px-8 lg:px-10">
          {children}
          {visibleCount === 0 && (
            <EmptyState
              className="mx-auto mt-6 max-w-md rounded-xl border border-line bg-panel/60"
              icon={<Search className="h-5 w-5" />}
              title="Nenhuma prancha encontrada"
              description="Tenta outro termo ou limpa o filtro pra ver a bancada inteira."
              action={
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setQuery('')
                    setCategory('all')
                  }}
                >
                  Limpar filtros
                </Button>
              }
            />
          )}
        </main>

        <footer className="relative border-t border-line/60 py-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-vellum-faint">
            Vernier · bancada de instrumentista · v0.1
          </p>
        </footer>
      </div>
    </CatalogFilterContext.Provider>
  )
}

export function Plate({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: ReactNode
}) {
  const { query, category } = useCatalogFilter()
  const visible = plateMatches(number, title, query, category)
  const id = `plate-${number}`

  if (!visible) return null

  return (
    <section id={id} className="catalog-plate group mb-12 scroll-mt-40">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass-dim">
            Prancha {number}
          </span>
          <h2 className="font-display text-2xl text-vellum transition-colors duration-200 group-hover:text-brass-bright">
            {title}
          </h2>
        </div>
        <a
          href={`#${id}`}
          className="font-mono text-[10px] uppercase tracking-widest text-vellum-faint opacity-0 transition-opacity hover:text-brass group-hover:opacity-100 focus:opacity-100"
        >
          #{number}
        </a>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-line bg-gradient-to-b from-panel2/80 via-panel/90 to-ink/50 p-6 shadow-plate sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-brass/[0.07] blur-3xl"
        />
        <div className="shadow-board relative flex flex-wrap items-start gap-6">{children}</div>
      </div>
    </section>
  )
}
