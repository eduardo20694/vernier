import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Link } from './Link'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export function Footer({
  brand,
  tagline,
  columns,
  legal,
  social,
  className,
}: {
  brand: ReactNode
  tagline?: string
  columns: FooterColumn[]
  legal?: ReactNode
  social?: ReactNode
  className?: string
}) {
  return (
    <footer className={cn('border-t border-line bg-panel', className)}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="font-display text-xl text-vellum">{brand}</div>
          {tagline && <p className="mt-3 max-w-sm text-sm text-vellum-muted">{tagline}</p>}
          {social && <div className="mt-5 flex gap-2">{social}</div>}
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} tone="muted" underline={false} className="text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {legal && (
        <div className="border-t border-line px-6 py-4 text-center text-xs text-vellum-faint">{legal}</div>
      )}
    </footer>
  )
}
