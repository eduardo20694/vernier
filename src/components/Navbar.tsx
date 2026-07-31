import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function Navbar({
  brand,
  links,
  actions,
  className,
}: {
  brand: ReactNode
  links?: ReactNode
  actions?: ReactNode
  className?: string
}) {
  return (
    <header
      className={cn(
        'flex h-14 items-center gap-6 border-b border-line px-5',
        'bg-gradient-to-b from-panel2/90 to-panel/90 backdrop-blur-md',
        className
      )}
    >
      <div className="flex items-center gap-2 font-display text-vellum">{brand}</div>
      {links && <nav className="flex flex-1 items-center gap-1">{links}</nav>}
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </header>
  )
}

export function NavLink({
  active,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-sm px-3 py-1.5 text-sm transition-colors focus-ring',
        active ? 'bg-panel text-brass-bright' : 'text-vellum-muted hover:text-vellum hover:bg-panel2/60',
        className
      )}
      {...props}
    />
  )
}
