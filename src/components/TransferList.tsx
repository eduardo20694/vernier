import { useMemo, useState, type HTMLAttributes, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'

export interface TransferListItem {
  id: string
  label: ReactNode
  disabled?: boolean
}

export interface TransferListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  available: TransferListItem[]
  selected: TransferListItem[]
  onChange: (next: { available: TransferListItem[]; selected: TransferListItem[] }) => void
  availableTitle?: string
  selectedTitle?: string
}

function ListBox({
  title,
  items,
  picked,
  onToggle,
}: {
  title: string
  items: TransferListItem[]
  picked: Set<string>
  onToggle: (id: string) => void
}) {
  return (
    <div className="flex min-h-[220px] min-w-[160px] flex-1 flex-col overflow-hidden rounded border border-line bg-panel">
      <div className="border-b border-line bg-panel2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
        {title}
        <span className="ml-2 text-brass-bright">{items.length}</span>
      </div>
      <ul className="flex-1 overflow-auto p-1" role="listbox" aria-multiselectable aria-label={title}>
        {items.length === 0 && (
          <li className="px-2 py-6 text-center text-xs text-vellum-faint">Vazio</li>
        )}
        {items.map((item) => {
          const isPicked = picked.has(item.id)
          return (
            <li key={item.id}>
              <button
                type="button"
                role="option"
                aria-selected={isPicked}
                disabled={item.disabled}
                onClick={() => onToggle(item.id)}
                className={cn(
                  'flex w-full items-center rounded-sm px-2.5 py-1.5 text-left text-sm',
                  'text-vellum-muted hover:bg-panel2 hover:text-vellum focus-ring',
                  isPicked && 'bg-brass/15 text-brass-bright',
                  'disabled:opacity-40'
                )}
              >
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function TransferList({
  className,
  available,
  selected,
  onChange,
  availableTitle = 'Disponíveis',
  selectedTitle = 'Selecionados',
  ...props
}: TransferListProps) {
  const [leftPick, setLeftPick] = useState<Set<string>>(new Set())
  const [rightPick, setRightPick] = useState<Set<string>>(new Set())

  const leftMap = useMemo(() => new Map(available.map((i) => [i.id, i])), [available])
  const rightMap = useMemo(() => new Map(selected.map((i) => [i.id, i])), [selected])

  const toggle = (side: 'left' | 'right', id: string) => {
    const setter = side === 'left' ? setLeftPick : setRightPick
    setter((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const moveRight = () => {
    const moving = available.filter((i) => leftPick.has(i.id) && !i.disabled)
    if (moving.length === 0) return
    onChange({
      available: available.filter((i) => !leftPick.has(i.id)),
      selected: [...selected, ...moving],
    })
    setLeftPick(new Set())
  }

  const moveLeft = () => {
    const moving = selected.filter((i) => rightPick.has(i.id) && !i.disabled)
    if (moving.length === 0) return
    onChange({
      available: [...available, ...moving],
      selected: selected.filter((i) => !rightPick.has(i.id)),
    })
    setRightPick(new Set())
  }

  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-stretch', className)} {...props}>
      <ListBox
        title={availableTitle}
        items={available}
        picked={leftPick}
        onToggle={(id) => {
          if (!leftMap.get(id)?.disabled) toggle('left', id)
        }}
      />
      <div className="flex flex-row items-center justify-center gap-2 sm:flex-col">
        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label="Mover para selecionados"
          disabled={leftPick.size === 0}
          onClick={moveRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label="Mover para disponíveis"
          disabled={rightPick.size === 0}
          onClick={moveLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <ListBox
        title={selectedTitle}
        items={selected}
        picked={rightPick}
        onToggle={(id) => {
          if (!rightMap.get(id)?.disabled) toggle('right', id)
        }}
      />
    </div>
  )
}
