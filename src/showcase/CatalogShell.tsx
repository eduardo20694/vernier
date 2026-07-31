import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Gauge, Moon, Search, Sun } from 'lucide-react'
import { SearchInput } from '../components/SearchInput'
import { Badge } from '../components/Badge'
import { Kbd } from '../components/Kbd'
import { EmptyState } from '../components/EmptyState'
import { Button } from '../components/Button'
import { SegmentedControl } from '../components/SegmentedControl'
import { applyTheme, hydrateTheme, readStoredTheme, type VernierTheme } from '../lib/theme'
import {
  CATEGORIES,
  TOTAL_PLATES,
  countVisible,
  plateMatches,
  type CatalogCategory,
} from './catalog'
import {
  PAGE_KINDS,
  TOTAL_PAGES,
  countVisiblePages,
  type PageKind,
} from './pages/registry'
import { PagesGallery } from './pages/PagesGallery'

export type CatalogViewMode = 'components' | 'pages'

interface CatalogFilterValue {
  query: string
  category: CatalogCategory
  setQuery: (q: string) => void
  setCategory: (c: CatalogCategory) => void
  visibleCount: number
  viewMode: CatalogViewMode
  setViewMode: (m: CatalogViewMode) => void
  pageKind: PageKind | 'all'
  setPageKind: (k: PageKind | 'all') => void
  visiblePageCount: number
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
  const [viewMode, setViewMode] = useState<CatalogViewMode>('components')
  const [pageKind, setPageKind] = useState<PageKind | 'all'>('all')
  const [theme, setTheme] = useState<VernierTheme>(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.classList.contains('light') ? 'light' : 'dark'
  })
  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const visibleCount = useMemo(() => countVisible(query, category), [query, category])
  const visiblePageCount = useMemo(() => countVisiblePages(query, pageKind), [query, pageKind])
  const isPagesMode = viewMode === 'pages'

  useEffect(() => {
    hydrateTheme()
    setTheme(readStoredTheme())
  }, [])

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

  useEffect(() => {
    return () => {
      if (switchTimer.current) clearTimeout(switchTimer.current)
    }
  }, [])

  const toggleTheme = () => {
    const next: VernierTheme = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) {
      root.classList.add('theme-switching')
      if (switchTimer.current) clearTimeout(switchTimer.current)
      switchTimer.current = setTimeout(() => {
        root.classList.remove('theme-switching')
      }, 420)
    }
    applyTheme(next)
    setTheme(next)
  }

  const value = useMemo(
    () => ({
      query,
      category,
      setQuery,
      setCategory,
      visibleCount,
      viewMode,
      setViewMode,
      pageKind,
      setPageKind,
      visiblePageCount,
    }),
    [query, category, visibleCount, viewMode, pageKind, visiblePageCount]
  )

  const themeLabel = theme === 'dark' ? 'Dia' : 'Noite'
  const themeAria = theme === 'dark' ? 'Ativar modo dia' : 'Ativar modo noite'

  const catalogSubtitle = isPagesMode
    ? `catálogo · ${TOTAL_PAGES} páginas`
    : `catálogo · ${TOTAL_PLATES} pranchas`

  const searchPlaceholder = isPagesMode
    ? 'Filtrar páginas — landing, admin, blog…'
    : 'Filtrar peças — tipografia, sheet, gauge…'

  const showComponentsEmpty = !isPagesMode && visibleCount === 0

  return (
    <CatalogFilterContext.Provider value={value}>
      <div className="catalog-shell relative min-h-screen text-vellum">
        <div aria-hidden className="catalog-ambient pointer-events-none fixed inset-0" />

        <header className="catalog-header sticky top-0 z-40">
          <div className="relative mx-auto flex max-w-[1400px] flex-col gap-5 px-5 py-4 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-center gap-4">
              <a href="#topo" className="flex items-center gap-3 rounded-sm focus-ring">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-gradient-to-b from-panel2 to-panel text-brass-bright shadow-forged">
                  <Gauge className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-display text-lg leading-none tracking-tight text-vellum">Vernier</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
                    {catalogSubtitle}
                  </p>
                </div>
              </a>

              <div className="ml-auto flex items-center gap-2.5 sm:gap-3">
                <Badge tone="neutral" className="hidden sm:inline-flex">
                  {isPagesMode
                    ? `${visiblePageCount} / ${TOTAL_PAGES}`
                    : `${visibleCount} / ${TOTAL_PLATES}`}
                </Badge>
                <div className="hidden items-center gap-1.5 text-xs text-vellum-faint lg:flex">
                  <span>buscar</span>
                  <Kbd>/</Kbd>
                </div>
                <button
                  type="button"
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label={themeAria}
                  aria-pressed={theme === 'light'}
                  title={themeAria}
                >
                  <span className="theme-toggle__icon" aria-hidden>
                    {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                  </span>
                  <span className="theme-toggle__label">{themeLabel}</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <SegmentedControl
                value={viewMode}
                onChange={setViewMode}
                options={[
                  { value: 'components', label: 'Componentes' },
                  { value: 'pages', label: 'Páginas' },
                ]}
                size="sm"
              />
            </div>

            <div className="flex flex-col gap-3.5 xl:flex-row xl:items-center xl:gap-5">
              <SearchInput
                id="catalog-search"
                className="w-full xl:w-[22rem] xl:shrink-0"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClear={() => setQuery('')}
              />

              <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {isPagesMode
                  ? PAGE_KINDS.map((k) => {
                      const active = pageKind === k.id
                      return (
                        <button
                          key={k.id}
                          type="button"
                          onClick={() => setPageKind(k.id)}
                          data-active={active}
                          className="catalog-tab focus-ring"
                        >
                          {k.label}
                        </button>
                      )
                    })
                  : CATEGORIES.map((c) => {
                      const active = category === c.id
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCategory(c.id)}
                          data-active={active}
                          className="catalog-tab focus-ring"
                        >
                          {c.label}
                        </button>
                      )
                    })}
              </div>
            </div>
          </div>
        </header>

        <main id="topo" className="relative mx-auto max-w-[1400px] px-5 pb-28 pt-8 sm:px-8 lg:px-10">
          {isPagesMode ? <PagesGallery /> : children}
          {showComponentsEmpty && (
            <EmptyState
              className="catalog-empty mx-auto mt-10 max-w-lg"
              icon={<Search className="h-5 w-5" />}
              title="Nenhuma prancha nesta bancada"
              description="Ajuste o termo ou limpe o filtro — o catálogo inteiro volta à luz."
              action={
                <Button
                  size="sm"
                  variant="forged"
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

        <footer className="relative border-t border-line/50 py-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-vellum-faint">
            Vernier · precisão em aço oceano · v0.1
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
  const { query, category, viewMode } = useCatalogFilter()
  if (viewMode === 'pages') return null
  const visible = plateMatches(number, title, query, category)
  const id = `plate-${number}`

  if (!visible) return null

  return (
    <section id={id} className="catalog-plate group mb-14 scroll-mt-44">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-baseline gap-3.5">
          <span className="plate-number">Prancha {number}</span>
          <h2 className="plate-title">{title}</h2>
        </div>
        <a
          href={`#${id}`}
          className="font-mono text-[10px] uppercase tracking-widest text-vellum-faint opacity-0 transition-opacity hover:text-brass-bright group-hover:opacity-100 focus:opacity-100"
        >
          #{number}
        </a>
      </div>

      <div className="catalog-plate-face relative p-5 sm:p-7 lg:p-8">
        <div className="catalog-plate-rivets" aria-hidden>
          <span />
          <span />
        </div>
        <div className="instrument-bay">
          <div className="shadow-board relative flex flex-wrap items-start gap-6">{children}</div>
        </div>
      </div>
    </section>
  )
}
