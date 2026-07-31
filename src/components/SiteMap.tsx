import { cn } from '../lib/cn'
import { Link } from './Link'

export interface SiteMapLink {
  label: string
  href: string
}

export interface SiteMapColumn {
  title: string
  links: SiteMapLink[]
}

export interface SiteMapProps {
  columns: SiteMapColumn[]
  title?: string
  className?: string
}

export function SiteMap({ columns, title, className }: SiteMapProps) {
  return (
    <nav aria-label={title ?? 'Mapa do site'} className={cn('w-full', className)}>
      {title && (
        <h2 className="mb-8 font-display text-h3 text-vellum">{title}</h2>
      )}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-brass-dim">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} tone="muted" underline={false} className="text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
