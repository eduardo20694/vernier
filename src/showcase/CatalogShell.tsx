import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Gauge, Menu, Moon, Search, Sun } from 'lucide-react'
import { SearchInput } from '../components/SearchInput'
import { Badge } from '../components/Badge'
import { Kbd } from '../components/Kbd'
import { EmptyState } from '../components/EmptyState'
import { Button } from '../components/Button'
import { SegmentedControl } from '../components/SegmentedControl'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../components/Sheet'
import { hydrateFont } from '../lib/fonts'
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

interface CatalogSidebarContentProps {
  theme: VernierTheme
  themeLabel: string
  themeAria: string
  catalogSubtitle: string
  searchPlaceholder: string
  isPagesMode: boolean
  toggleTheme: () => void
  onNavigate?: () => void
  searchId?: string
}

function CatalogSidebarContent({
  theme,
  themeLabel,
  themeAria,
  catalogSubtitle,
  searchPlaceholder,
  isPagesMode,
  toggleTheme,
  onNavigate,
  searchId = 'catalog-search',
}: CatalogSidebarContentProps) {
  const {
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
  } = useCatalogFilter()

  const categoryLabel = isPagesMode ? 'Tipos' : 'Categorias'

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="shrink-0 border-b border-brass/20 px-5 pb-4 pt-5">
        <a href="#topo" className="flex items-center gap-3 rounded-sm focus-ring" onClick={onNavigate}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-gradient-to-b from-panel2 to-panel text-brass-bright shadow-forged">
            <Gauge className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-lg leading-none tracking-tight text-vellum">Vernier</p>
            <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
              {catalogSubtitle}
            </p>
          </div>
        </a>
      </div>

      {/* Modo */}
      <section className="shrink-0 space-y-2.5 px-5 pt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-vellum-faint">Modo</p>
        <SegmentedControl
          value={viewMode}
          onChange={(mode) => {
            setViewMode(mode)
            onNavigate?.()
          }}
          options={[
            { value: 'components', label: 'Componentes' },
            { value: 'pages', label: 'Páginas' },
          ]}
          size="sm"
          className="w-full"
        />
        <div className="flex items-center gap-2">
          <Badge tone="neutral" className="shrink-0">
            {isPagesMode ? `${visiblePageCount} / ${TOTAL_PAGES}` : `${visibleCount} / ${TOTAL_PLATES}`}
          </Badge>
          <button
            type="button"
            className="theme-toggle ml-auto shrink-0"
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
      </section>

      {/* Buscar */}
      <section className="shrink-0 space-y-2 px-5 pt-4">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-vellum-faint">Buscar</p>
          <div className="flex items-center gap-1.5 text-[10px] text-vellum-faint">
            <Kbd>/</Kbd>
          </div>
        </div>
        <SearchInput
          id={searchId}
          className="w-full"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery('')}
        />
      </section>

      {/* Categorias / Tipos */}
      <section className="flex min-h-0 flex-1 flex-col px-5 pb-2 pt-4">
        <p className="mb-2 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-vellum-faint">
          {categoryLabel}
        </p>
        <nav className="catalog-sidebar-nav -mx-1 flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-1">
          {isPagesMode
            ? PAGE_KINDS.map((k) => {
                const active = pageKind === k.id
                return (
                  <button
                    key={k.id}
                    type="button"
                    onClick={() => {
                      setPageKind(k.id)
                      onNavigate?.()
                    }}
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
                    onClick={() => {
                      setCategory(c.id)
                      onNavigate?.()
                    }}
                    data-active={active}
                    className="catalog-tab focus-ring"
                  >
                    {c.label}
                  </button>
                )
              })}
        </nav>
      </section>

      {/* Version footer */}
      <footer className="mt-auto shrink-0 border-t border-line/40 px-5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint/80">
          v0.1 · aço oceano
        </p>
      </footer>
    </div>
  )
}

export function CatalogShell({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CatalogCategory>('all')
  const [viewMode, setViewMode] = useState<CatalogViewMode>('components')
  const [pageKind, setPageKind] = useState<PageKind | 'all'>('all')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [theme, setTheme] = useState<VernierTheme>(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.classList.contains('light') ? 'light' : 'dark'
  })
  const visibleCount = useMemo(() => countVisible(query, category), [query, category])
  const visiblePageCount = useMemo(() => countVisiblePages(query, pageKind), [query, pageKind])
  const isPagesMode = viewMode === 'pages'

  useEffect(() => {
    hydrateTheme()
    hydrateFont()
    setTheme(readStoredTheme())
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) return
      e.preventDefault()
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      document.getElementById(isDesktop ? 'catalog-search' : 'catalog-search-mobile')?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggleTheme = () => {
    const next: VernierTheme = theme === 'dark' ? 'light' : 'dark'
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

  const sidebarProps: CatalogSidebarContentProps = {
    theme,
    themeLabel,
    themeAria,
    catalogSubtitle,
    searchPlaceholder,
    isPagesMode,
    toggleTheme,
  }

  return (
    <CatalogFilterContext.Provider value={value}>
      <div className="catalog-shell relative min-h-screen text-vellum">
        <div aria-hidden className="catalog-ambient pointer-events-none fixed inset-0" />

        {/* Mobile top bar */}
        <div className="catalog-mobile-bar sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line px-4 md:hidden">
          <a href="#topo" className="flex items-center gap-2.5 rounded-sm focus-ring">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-gradient-to-b from-panel2 to-panel text-brass-bright shadow-forged">
              <Gauge className="h-3.5 w-3.5" />
            </div>
            <span className="font-display text-base text-vellum">Vernier</span>
          </a>

          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" aria-label="Abrir navegação do catálogo">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="catalog-sidebar relative w-[min(100vw,300px)] max-w-[300px] p-0"
            >
              <SheetTitle className="sr-only">Navegação do catálogo</SheetTitle>
              <CatalogSidebarContent
                {...sidebarProps}
                searchId="catalog-search-mobile"
                onNavigate={() => setMobileNavOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="catalog-layout min-h-[calc(100vh-3.5rem)] md:min-h-screen">
          {/* Desktop sidebar — fixed so it stays pinned while main scrolls */}
          <aside className="catalog-sidebar fixed left-0 top-0 z-30 hidden h-dvh w-[280px] lg:w-[300px] md:block">
            <CatalogSidebarContent {...sidebarProps} />
          </aside>

          {/* Main column */}
          <div className="catalog-main flex min-w-0 flex-col md:pl-[280px] lg:pl-[300px]">
            <main id="topo" className="relative flex-1 px-5 pb-28 pt-6 sm:px-8 lg:px-10">
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
        </div>
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
    <section id={id} className="catalog-plate group mb-14 scroll-mt-6">
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
