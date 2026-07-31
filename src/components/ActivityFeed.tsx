import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Avatar } from './Avatar'

export interface ActivityItem {
  id: string
  title: string
  description?: string
  time: string
  actor?: string
  avatarSrc?: string
  icon?: ReactNode
  tone?: 'brass' | 'verdigris' | 'rust' | 'neutral'
}

export interface ActivityFeedProps {
  items: ActivityItem[]
  className?: string
  title?: string
}

export function ActivityFeed({ items, className, title }: ActivityFeedProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {title && (
        <h3 className="mb-4 font-display text-lg text-vellum">{title}</h3>
      )}
      <ol className="space-y-0">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
              {!last && (
                <span
                  aria-hidden
                  className="absolute left-4 top-10 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-line via-line to-transparent"
                />
              )}
              <div className="relative z-[1] shrink-0">
                {item.icon ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel2 text-brass-bright">
                    {item.icon}
                  </div>
                ) : (
                  <Avatar
                    size="sm"
                    fallback={item.actor ?? item.title}
                    src={item.avatarSrc}
                    tone={item.tone ?? 'brass'}
                    ring={false}
                  />
                )}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <p className="text-sm text-vellum">
                    {item.actor && (
                      <span className="font-medium text-vellum">{item.actor} </span>
                    )}
                    <span className={item.actor ? 'text-vellum-muted' : 'font-medium'}>
                      {item.title}
                    </span>
                  </p>
                  <time className="font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
                    {item.time}
                  </time>
                </div>
                {item.description && (
                  <p className="mt-1 text-sm text-vellum-muted">{item.description}</p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
