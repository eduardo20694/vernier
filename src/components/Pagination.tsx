import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  /** Quantidade máxima de botões numéricos visíveis (ímpar funciona melhor) */
  siblingCount?: number
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function getPages(page: number, totalPages: number, siblingCount: number): (number | 'ellipsis')[] {
  const totalNumbers = siblingCount * 2 + 5

  if (totalPages <= totalNumbers) {
    return range(1, totalPages)
  }

  const left = Math.max(page - siblingCount, 1)
  const right = Math.min(page + siblingCount, totalPages)
  const showLeftEllipsis = left > 2
  const showRightEllipsis = right < totalPages - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = range(1, 3 + siblingCount * 2)
    return [...leftRange, 'ellipsis', totalPages]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = range(totalPages - (2 + siblingCount * 2), totalPages)
    return [1, 'ellipsis', ...rightRange]
  }

  return [1, 'ellipsis', ...range(left, right), 'ellipsis', totalPages]
}

function PageButton({
  active,
  disabled,
  children,
  onClick,
  label,
}: {
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  label?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex h-8 min-w-8 items-center justify-center rounded-sm px-2 font-mono text-xs tabular-nums',
        'transition-colors duration-150 focus-ring',
        active
          ? 'bg-brass text-ink'
          : 'text-vellum-muted hover:bg-panel2 hover:text-vellum',
        'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent'
      )}
    >
      {children}
    </button>
  )
}

// Paginação densamente tipográfica: números em mono, página ativa em brass —
// a mesma lógica contábil da Table, aplicada à navegação de listas.
export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages < 1) return null

  const pages = getPages(page, totalPages, siblingCount)

  return (
    <nav aria-label="Paginação" className={cn('inline-flex items-center gap-1', className)}>
      <PageButton
        label="Página anterior"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </PageButton>

      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e-${i}`} className="px-1 font-mono text-xs text-vellum-faint" aria-hidden>
            …
          </span>
        ) : (
          <PageButton key={p} active={p === page} onClick={() => onPageChange(p)} label={`Página ${p}`}>
            {p}
          </PageButton>
        )
      )}

      <PageButton
        label="Próxima página"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </PageButton>
    </nav>
  )
}
