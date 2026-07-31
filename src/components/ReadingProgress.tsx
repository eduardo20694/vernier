import { useEffect, useState } from 'react'
import { cn } from '../lib/cn'

export interface ReadingProgressProps {
  /** Scroll container; defaults to document */
  target?: HTMLElement | null
  className?: string
  /** Fixed to top of viewport */
  fixed?: boolean
}

function computeProgress(el?: HTMLElement | null) {
  if (el) {
    const max = el.scrollHeight - el.clientHeight
    if (max <= 0) return 0
    return Math.min(100, Math.max(0, (el.scrollTop / max) * 100))
  }
  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  if (max <= 0) return 0
  return Math.min(100, Math.max(0, (window.scrollY / max) * 100))
}

export function ReadingProgress({
  target,
  className,
  fixed = true,
}: ReadingProgressProps) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => setPct(computeProgress(target))
    update()
    const scrollTarget: Window | HTMLElement = target ?? window
    scrollTarget.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      scrollTarget.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [target])

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label="Progresso de leitura"
      className={cn(
        'pointer-events-none h-0.5 w-full overflow-hidden bg-panel2/80',
        fixed && 'fixed inset-x-0 top-0 z-50',
        className
      )}
    >
      <div
        className="h-full bg-gradient-to-r from-brass-dim via-brass to-brass-bright transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
