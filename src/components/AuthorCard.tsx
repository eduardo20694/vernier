import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Avatar } from './Avatar'
import { Link } from './Link'

export interface AuthorLink {
  label: string
  href: string
}

export interface AuthorCardProps {
  name: string
  bio?: string
  role?: string
  avatarSrc?: string
  links?: AuthorLink[]
  actions?: ReactNode
  className?: string
}

export function AuthorCard({
  name,
  bio,
  role,
  avatarSrc,
  links,
  actions,
  className,
}: AuthorCardProps) {
  return (
    <div
      className={cn(
        'flex gap-4 rounded-xl border border-line bg-gradient-to-b from-panel2 via-panel to-ink p-5',
        'shadow-[inset_0_1px_0_rgb(var(--brass)/0.08)]',
        className
      )}
    >
      <Avatar src={avatarSrc} fallback={name} size="lg" tone="brass" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="font-display text-lg font-medium text-vellum">{name}</p>
            {role && (
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-brass-dim">
                {role}
              </p>
            )}
          </div>
          {actions}
        </div>
        {bio && <p className="mt-2 text-sm leading-relaxed text-vellum-muted">{bio}</p>}
        {links && links.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} tone="brass" className="text-sm">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
