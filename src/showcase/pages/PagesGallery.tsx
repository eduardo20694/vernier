import { useEffect, useMemo, useState } from 'react'
import { FileText, LayoutTemplate, Maximize2 } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Badge } from '../../components/Badge'
import { EmptyState } from '../../components/EmptyState'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { useCatalogFilter } from '../CatalogShell'
import { PagePreview } from './pageComponents'
import { PageFrame } from './PageFrame'
import { FullscreenPreview } from './FullscreenPreview'
import {
  PAGES,
  PAGE_KINDS,
  kindLabel,
  pageMatches,
  type PageKind,
} from './registry'

function VerButton({
  pageId,
  onOpen,
  size = 'default',
}: {
  pageId: string
  onOpen: (id: string) => void
  size?: 'default' | 'compact'
}) {
  if (size === 'compact') {
    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs text-brass-bright hover:text-brass"
        onClick={(e) => {
          e.stopPropagation()
          onOpen(pageId)
        }}
      >
        <Maximize2 className="h-3 w-3" aria-hidden />
        Ver
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className="border-line bg-panel/80"
      onClick={() => onOpen(pageId)}
    >
      <Maximize2 className="h-4 w-4" aria-hidden />
      Ver
    </Button>
  )
}

export function PagesGallery() {
  const { query, pageKind, setQuery, setPageKind } = useCatalogFilter()
  const filtered = useMemo(
    () => PAGES.filter((p) => pageMatches(p, query, pageKind)),
    [query, pageKind]
  )
  const [selectedId, setSelectedId] = useState(PAGES[0]?.id ?? '')
  const [fullscreenId, setFullscreenId] = useState<string | null>(null)

  useEffect(() => {
    if (filtered.length === 0) return
    if (!filtered.some((p) => p.id === selectedId)) {
      setSelectedId(filtered[0].id)
    }
  }, [filtered, selectedId])

  const selected = PAGES.find((p) => p.id === selectedId)

  function openFullscreen(id: string) {
    setSelectedId(id)
    setFullscreenId(id)
  }

  if (filtered.length === 0) {
    return (
      <EmptyState
        className="catalog-empty mx-auto mt-10 max-w-lg"
        icon={<LayoutTemplate className="h-5 w-5" />}
        title="Nenhuma página nesta seleção"
        description="Ajuste o termo ou limpe o filtro — todas as receitas voltam à vitrine."
        action={
          <Button
            size="sm"
            variant="forged"
            onClick={() => {
              setQuery('')
              setPageKind('all')
            }}
          >
            Limpar filtros
          </Button>
        }
      />
    )
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
        <aside className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
            {filtered.length} {filtered.length === 1 ? 'página' : 'páginas'}
          </p>
          <ul className="space-y-2">
            {filtered.map((page) => {
              const active = page.id === selectedId
              return (
                <li key={page.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(page.id)}
                    data-active={active}
                    className={cn(
                      'group w-full rounded-xl border px-4 py-3.5 text-left transition-all focus-ring',
                      active
                        ? 'border-brass-dim/60 bg-panel2 shadow-[inset_0_1px_0_rgb(var(--brass)/0.12)]'
                        : 'border-line bg-panel/40 hover:border-line hover:bg-panel2/50'
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-sm text-vellum">{page.title}</span>
                      <Badge tone="neutral" className="text-[10px]">
                        {kindLabel(page.kind)}
                      </Badge>
                      <span
                        className={cn(
                          'ml-auto transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
                          active ? 'opacity-100' : 'opacity-0'
                        )}
                      >
                        <VerButton pageId={page.id} onOpen={openFullscreen} size="compact" />
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-vellum-muted">
                      {page.description}
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <div className="min-w-0 space-y-4">
          {selected && (
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <FileText className="h-4 w-4 shrink-0 text-brass-dim" aria-hidden />
                  <h2 className="font-display text-xl text-vellum">{selected.title}</h2>
                  <Badge tone="brass">{kindLabel(selected.kind)}</Badge>
                </div>
                <p className="mt-1 max-w-prose text-sm text-vellum-muted">{selected.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <IconButton
                  label="Ver em tela cheia"
                  tone="brass"
                  size="sm"
                  className="sm:hidden"
                  onClick={() => openFullscreen(selected.id)}
                >
                  <Maximize2 />
                </IconButton>
                <VerButton pageId={selected.id} onOpen={openFullscreen} />
              </div>
            </header>
          )}

          <PageFrame>
            {selected && <PagePreview pageId={selected.id} />}
          </PageFrame>
        </div>
      </div>

      {fullscreenId && (
        <FullscreenPreview pageId={fullscreenId} onClose={() => setFullscreenId(null)} />
      )}
    </>
  )
}

export { PAGE_KINDS, type PageKind }
