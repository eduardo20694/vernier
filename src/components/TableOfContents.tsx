import { cn } from '../lib/cn'

export interface TocItem {
  id: string
  title: string
  level?: 2 | 3 | 4
}

export interface TableOfContentsProps {
  items: TocItem[]
  title?: string
  activeId?: string
  className?: string
}

export function TableOfContents({
  items,
  title = 'Nesta página',
  activeId,
  className,
}: TableOfContentsProps) {
  return (
    <nav aria-label={title} className={cn('text-sm', className)}>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
        {title}
      </p>
      <ul className="space-y-1 border-l border-line">
        {items.map((item) => {
          const level = item.level ?? 2
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'block border-l-2 py-1 transition-colors duration-150 focus-ring rounded-r',
                  level === 2 && 'pl-3',
                  level === 3 && 'pl-5',
                  level === 4 && 'pl-7',
                  active
                    ? '-ml-px border-brass text-brass-bright'
                    : 'border-transparent text-vellum-muted hover:text-vellum'
                )}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
