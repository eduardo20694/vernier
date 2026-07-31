import type { ReactNode } from 'react'
import { SearchX } from 'lucide-react'
import { cn } from '../lib/cn'
import { EmptyState } from './EmptyState'

export interface EmptySearchProps {
  query?: string
  title?: string
  description?: string
  action?: ReactNode
  className?: string
  icon?: ReactNode
}

export function EmptySearch({
  query,
  title,
  description,
  action,
  className,
  icon,
}: EmptySearchProps) {
  const resolvedTitle =
    title ?? (query ? `Nada para “${query}”` : 'Nenhum resultado')
  const resolvedDescription =
    description ??
    (query
      ? 'Tente outro termo ou limpe os filtros.'
      : 'Digite para buscar na bancada.')

  return (
    <EmptyState
      className={cn(className)}
      icon={icon ?? <SearchX className="h-5 w-5" />}
      title={resolvedTitle}
      description={resolvedDescription}
      action={action}
    />
  )
}
