import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
  current?: boolean
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  separator?: ReactNode
}

export function Breadcrumb({
  items,
  className,
  separator = <ChevronRight className="h-3 w-3 text-vellum-faint" />,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5 text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1 || item.current
          const content = last ? (
            <span aria-current="page" className="font-medium text-brass-bright">
              {item.label}
            </span>
          ) : item.href ? (
            <a
              href={item.href}
              className="text-vellum-muted transition-colors hover:text-vellum focus-ring rounded-sm"
            >
              {item.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={item.onClick}
              className="text-vellum-muted transition-colors hover:text-vellum focus-ring rounded-sm"
            >
              {item.label}
            </button>
          )

          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>{separator}</span>}
              {content}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
