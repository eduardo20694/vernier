import type { HTMLAttributes, ReactNode } from 'react'
import { Bath, BedDouble, MapPin, Ruler } from 'lucide-react'
import { cn } from '../lib/cn'
import { Badge } from './Badge'
import { Button } from './Button'

export interface PropertyCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: string
  address: string
  price: string
  bedrooms: number
  bathrooms: number
  area: number
  badge?: string
  icon?: ReactNode
  onView?: () => void
}

export function PropertyCard({
  className,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  area,
  badge,
  icon,
  onView,
  ...props
}: PropertyCardProps) {
  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-line bg-panel',
        'transition-colors hover:border-brass-dim/50',
        className
      )}
      {...props}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-gradient-to-b from-panel2 to-panel">
        {icon ?? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-16 w-20 rounded border border-line/60 bg-panel2/80" />
          </div>
        )}
        {badge && (
          <Badge tone="brass" className="absolute left-3 top-3">
            {badge}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="font-display text-xl text-vellum">{price}</p>
        <h3 className="mt-1 font-medium text-vellum">{title}</h3>
        <p className="mt-1 flex items-start gap-1.5 text-sm text-vellum-muted">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" aria-hidden />
          {address}
        </p>

        <ul className="mt-4 flex flex-wrap gap-3 text-xs text-vellum-faint">
          <li className="flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5 text-brass-dim" aria-hidden />
            {bedrooms} quartos
          </li>
          <li className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5 text-brass-dim" aria-hidden />
            {bathrooms} banh.
          </li>
          <li className="flex items-center gap-1">
            <Ruler className="h-3.5 w-3.5 text-brass-dim" aria-hidden />
            {area} m²
          </li>
        </ul>

        {onView && (
          <Button variant="secondary" size="sm" className="mt-4 w-full" onClick={onView}>
            Ver imóvel
          </Button>
        )}
      </div>
    </article>
  )
}

export function PropertyGrid({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2', className)} {...props}>
      {children}
    </div>
  )
}
