import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { SearchInput } from './SearchInput'

export function TopNav({
  brand,
  links,
  search,
  onSearch,
  actions,
  className,
}: {
  brand: ReactNode
  links?: ReactNode
  search?: string
  onSearch?: (value: string) => void
  actions?: ReactNode
  className?: string
}) {
  return (
    <header
      className={cn(
        'flex h-14 items-center gap-4 border-b border-line px-4 sm:px-5',
        'bg-panel/95 backdrop-blur-md',
        className
      )}
    >
      <div className="flex shrink-0 items-center gap-2 font-display text-vellum">{brand}</div>
      {links && <nav className="hidden items-center gap-1 md:flex">{links}</nav>}
      {onSearch && (
        <div className="mx-auto hidden w-full max-w-sm lg:block">
          <SearchInput
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            onClear={() => onSearch('')}
            placeholder="Buscar…"
            className="w-full"
          />
        </div>
      )}
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </header>
  )
}

export function AppShell({
  sidebar,
  topbar,
  children,
  className,
}: {
  sidebar?: ReactNode
  topbar?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex h-[420px] overflow-hidden rounded-xl border border-line bg-ink shadow-plate', className)}>
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        {topbar}
        <div className="flex-1 overflow-auto bg-gradient-to-b from-panel/40 to-ink p-5">{children}</div>
      </div>
    </div>
  )
}
