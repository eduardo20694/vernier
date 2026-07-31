import type { HTMLAttributes } from 'react'
import { CalendarDays, MapPin, Ticket } from 'lucide-react'
import { cn } from '../lib/cn'
import { Badge } from './Badge'
import { Button } from './Button'

export interface EventCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: string
  date: string
  venue: string
  price: string
  category?: string
  onView?: () => void
}

export function EventCard({
  className,
  title,
  date,
  venue,
  price,
  category,
  onView,
  ...props
}: EventCardProps) {
  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-line bg-panel',
        'transition-colors hover:border-brass-dim/50',
        className
      )}
      {...props}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-gradient-to-br from-panel2 via-ink/40 to-panel">
        <div className="absolute inset-0 flex items-center justify-center">
          <CalendarDays className="h-10 w-10 text-brass/40" strokeWidth={1.25} aria-hidden />
        </div>
        {category && (
          <Badge tone="verdigris" className="absolute left-3 top-3">
            {category}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg text-vellum">{title}</h3>
        <ul className="mt-3 space-y-2 text-sm text-vellum-muted">
          <li className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-brass" aria-hidden />
            {date}
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-brass" aria-hidden />
            {venue}
          </li>
          <li className="flex items-center gap-2 font-medium text-vellum">
            <Ticket className="h-3.5 w-3.5 shrink-0 text-brass-bright" aria-hidden />
            {price}
          </li>
        </ul>

        {onView && (
          <Button variant="secondary" size="sm" className="mt-4 w-full" onClick={onView}>
            Ver evento
          </Button>
        )}
      </div>
    </article>
  )
}

export function EventGrid({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)} {...props}>
      {children}
    </div>
  )
}
