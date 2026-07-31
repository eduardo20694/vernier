import { useState, type HTMLAttributes } from 'react'
import { cn } from '../lib/cn'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './Dialog'

export interface GalleryItem {
  src: string
  alt: string
  caption?: string
}

export interface GalleryProps extends HTMLAttributes<HTMLElement> {
  items: GalleryItem[]
  columns?: 2 | 3 | 4
}

const colClasses: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export function Gallery({ items, columns = 3, className, ...props }: GalleryProps) {
  const [active, setActive] = useState<GalleryItem | null>(null)

  return (
    <>
      <ul className={cn('grid gap-3', colClasses[columns], className)} {...props}>
        {items.map((item) => (
          <li key={item.src + item.alt}>
            <button
              type="button"
              onClick={() => setActive(item)}
              className={cn(
                'group relative w-full overflow-hidden rounded-lg border border-line bg-panel text-left',
                'focus-ring transition-colors hover:border-brass-dim/60'
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {item.caption && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-2.5 pt-8 text-xs text-vellum">
                  {item.caption}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent size="xl" className="overflow-hidden p-0 sm:p-0" showClose>
          {active && (
            <>
              <DialogTitle className="sr-only">{active.alt}</DialogTitle>
              {active.caption ? (
                <DialogDescription className="sr-only">{active.caption}</DialogDescription>
              ) : (
                <DialogDescription className="sr-only">{active.alt}</DialogDescription>
              )}
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[80vh] w-full object-contain"
              />
              {active.caption && (
                <p className="border-t border-line px-4 py-3 text-sm text-vellum-muted">
                  {active.caption}
                </p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
