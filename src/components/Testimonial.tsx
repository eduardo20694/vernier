import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Avatar } from './Avatar'

export interface TestimonialProps extends HTMLAttributes<HTMLElement> {
  quote: ReactNode
  author: string
  role?: string
  avatarSrc?: string
  avatarAlt?: string
}

export function Testimonial({
  quote,
  author,
  role,
  avatarSrc,
  avatarAlt,
  className,
  ...props
}: TestimonialProps) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col rounded-xl border border-line bg-panel p-6 shadow-plate',
        className
      )}
      {...props}
    >
      <blockquote className="flex-1 font-display text-lg leading-snug text-vellum italic">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar src={avatarSrc} alt={avatarAlt ?? author} fallback={author} size="sm" tone="brass" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-vellum">{author}</p>
          {role && <p className="truncate text-xs text-vellum-muted">{role}</p>}
        </div>
      </figcaption>
    </figure>
  )
}

export function TestimonialGrid({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)}
      {...props}
    >
      {children}
    </div>
  )
}
