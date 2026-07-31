import type { HTMLAttributes, ReactNode } from 'react'
import { ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { cn } from '../lib/cn'
import { IconButton } from './IconButton'

export interface SortableListItem {
  id: string
  content: ReactNode
}

export interface SortableListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onChange'> {
  items: SortableListItem[]
  onChange: (items: SortableListItem[]) => void
  disabled?: boolean
}

export function SortableList({
  className,
  items,
  onChange,
  disabled,
  ...props
}: SortableListProps) {
  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= items.length) return
    const next = [...items]
    const [row] = next.splice(index, 1)
    next.splice(target, 0, row)
    onChange(next)
  }

  return (
    <ul
      className={cn(
        'flex flex-col gap-1.5 rounded border border-line bg-panel p-1.5',
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            'flex items-center gap-2 rounded border border-line bg-panel2 px-2 py-1.5',
            'shadow-[inset_0_1px_0_rgb(var(--mist)/0.04)]'
          )}
        >
          <GripVertical className="h-4 w-4 shrink-0 text-vellum-faint" aria-hidden />
          <div className="min-w-0 flex-1 text-sm text-vellum">{item.content}</div>
          <div className="flex shrink-0 gap-0.5">
            <IconButton
              label="Mover para cima"
              size="sm"
              disabled={disabled || index === 0}
              onClick={() => move(index, -1)}
            >
              <ChevronUp />
            </IconButton>
            <IconButton
              label="Mover para baixo"
              size="sm"
              disabled={disabled || index === items.length - 1}
              onClick={() => move(index, 1)}
            >
              <ChevronDown />
            </IconButton>
          </div>
        </li>
      ))}
    </ul>
  )
}
