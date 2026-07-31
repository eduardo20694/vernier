import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Avatar } from './Avatar'

export interface ProfileHeaderProps {
  name: string
  subtitle?: string
  avatarSrc?: string
  coverSrc?: string
  cover?: ReactNode
  actions?: ReactNode
  className?: string
}

export function ProfileHeader({
  name,
  subtitle,
  avatarSrc,
  coverSrc,
  cover,
  actions,
  className,
}: ProfileHeaderProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-line bg-panel shadow-plate',
        className
      )}
    >
      <div className="relative h-28 bg-gradient-to-r from-brass/20 via-panel2 to-verdigris/15 sm:h-36">
        {cover ??
          (coverSrc ? (
            <img src={coverSrc} alt="" className="h-full w-full object-cover" />
          ) : null)}
      </div>
      <div className="relative flex flex-col gap-4 px-5 pb-5 pt-0 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="flex items-end gap-4">
          <div className="-mt-10 shrink-0 sm:-mt-12">
            <Avatar
              src={avatarSrc}
              fallback={name}
              size="lg"
              tone="brass"
              className="h-20 w-20 text-base ring-4 ring-offset-0 ring-panel sm:h-24 sm:w-24"
            />
          </div>
          <div className="min-w-0 pb-1">
            <h1 className="font-display text-xl font-medium tracking-tight text-vellum sm:text-2xl">
              {name}
            </h1>
            {subtitle && <p className="mt-0.5 text-sm text-vellum-muted">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex flex-wrap gap-2 sm:pb-1">{actions}</div>}
      </div>
    </div>
  )
}
