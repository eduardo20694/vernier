import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface BrowserFrameProps {
  children: ReactNode
  /** Address bar URL display */
  url?: string
  title?: string
  className?: string
  contentClassName?: string
}

export function BrowserFrame({
  children,
  url,
  title,
  className,
  contentClassName,
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-line bg-panel shadow-plate',
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-gradient-to-b from-panel2 to-panel px-3 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-rust/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-brass/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-verdigris/80" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate rounded-md border border-line bg-ink/60 px-3 py-1 text-center font-mono text-[11px] text-vellum-faint">
            {url ?? title ?? 'vernier.app'}
          </div>
        </div>
        <div className="w-10" aria-hidden />
      </div>
      <div className={cn('bg-ink', contentClassName)}>{children}</div>
    </div>
  )
}
