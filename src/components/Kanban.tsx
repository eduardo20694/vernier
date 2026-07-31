import { useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'
import { Badge } from './Badge'

export interface KanbanCard {
  id: string
  title: string
  description?: string
  meta?: ReactNode
  tone?: 'brass' | 'verdigris' | 'rust' | 'neutral'
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

export interface KanbanProps {
  columns: KanbanColumn[]
  onChange?: (columns: KanbanColumn[]) => void
  className?: string
}

export function Kanban({ columns: columnsProp, onChange, className }: KanbanProps) {
  const [internal, setInternal] = useState(columnsProp)
  const controlled = onChange != null
  const columns = controlled ? columnsProp : internal

  function commit(next: KanbanColumn[]) {
    if (!controlled) setInternal(next)
    onChange?.(next)
  }

  function moveCard(cardId: string, fromCol: number, direction: -1 | 1) {
    const toCol = fromCol + direction
    if (toCol < 0 || toCol >= columns.length) return

    const next = columns.map((c) => ({ ...c, cards: [...c.cards] }))
    const from = next[fromCol]!
    const to = next[toCol]!
    const idx = from.cards.findIndex((c) => c.id === cardId)
    if (idx < 0) return
    const [card] = from.cards.splice(idx, 1)
    if (!card) return
    to.cards.push(card)
    commit(next)
  }

  return (
    <div className={cn('flex gap-3 overflow-x-auto pb-2', className)}>
      {columns.map((col, colIndex) => (
        <section
          key={col.id}
          className="flex w-72 shrink-0 flex-col rounded-xl border border-line bg-panel/80"
        >
          <header className="flex items-center justify-between border-b border-line px-3 py-2.5">
            <h3 className="font-display text-sm text-vellum">{col.title}</h3>
            <Badge tone="neutral">{col.cards.length}</Badge>
          </header>
          <ul className="flex flex-1 flex-col gap-2 p-2">
            {col.cards.map((card) => (
              <li
                key={card.id}
                className="rounded-lg border border-line bg-panel2 p-3 shadow-[inset_0_1px_0_rgb(var(--mist)/0.06)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-vellum">{card.title}</p>
                  {card.tone && card.tone !== 'neutral' && (
                    <span
                      className={cn(
                        'mt-1 h-1.5 w-1.5 shrink-0 rounded-full',
                        card.tone === 'brass' && 'bg-brass',
                        card.tone === 'verdigris' && 'bg-verdigris',
                        card.tone === 'rust' && 'bg-rust'
                      )}
                      aria-hidden
                    />
                  )}
                </div>
                {card.description && (
                  <p className="mt-1 text-xs text-vellum-muted">{card.description}</p>
                )}
                {card.meta && <div className="mt-2 text-xs text-vellum-faint">{card.meta}</div>}
                <div className="mt-3 flex items-center justify-between gap-1">
                  <button
                    type="button"
                    disabled={colIndex === 0}
                    onClick={() => moveCard(card.id, colIndex, -1)}
                    className="inline-flex h-7 items-center gap-1 rounded border border-line px-2 text-[11px] text-vellum-muted transition-colors hover:border-brass-dim hover:text-brass-bright focus-ring disabled:opacity-30"
                    aria-label="Mover para coluna anterior"
                  >
                    <ChevronLeft className="h-3 w-3" />
                    Ant.
                  </button>
                  <button
                    type="button"
                    disabled={colIndex === columns.length - 1}
                    onClick={() => moveCard(card.id, colIndex, 1)}
                    className="inline-flex h-7 items-center gap-1 rounded border border-line px-2 text-[11px] text-vellum-muted transition-colors hover:border-brass-dim hover:text-brass-bright focus-ring disabled:opacity-30"
                    aria-label="Mover para próxima coluna"
                  >
                    Próx.
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </li>
            ))}
            {col.cards.length === 0 && (
              <li className="rounded-lg border border-dashed border-line px-3 py-8 text-center text-xs text-vellum-faint">
                Sem cards
              </li>
            )}
          </ul>
        </section>
      ))}
    </div>
  )
}
