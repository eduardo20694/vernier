import { useCallback, useRef, useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface ResizablePanelsProps extends HTMLAttributes<HTMLDivElement> {
  left: ReactNode
  right: ReactNode
  /** Fração inicial do painel esquerdo (0–1) */
  defaultRatio?: number
  minRatio?: number
  maxRatio?: number
  orientation?: 'horizontal' | 'vertical'
}

export function ResizablePanels({
  className,
  left,
  right,
  defaultRatio = 0.4,
  minRatio = 0.2,
  maxRatio = 0.8,
  orientation = 'horizontal',
  ...props
}: ResizablePanelsProps) {
  const [ratio, setRatio] = useState(defaultRatio)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const next =
        orientation === 'horizontal'
          ? (e.clientX - rect.left) / rect.width
          : (e.clientY - rect.top) / rect.height
      setRatio(Math.min(maxRatio, Math.max(minRatio, next)))
    },
    [orientation, minRatio, maxRatio]
  )

  const stop = useCallback(() => {
    dragging.current = false
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', stop)
  }, [onPointerMove])

  const start = () => {
    dragging.current = true
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', stop)
  }

  const horizontal = orientation === 'horizontal'

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex overflow-hidden rounded border border-line bg-panel',
        horizontal ? 'flex-row' : 'flex-col',
        className
      )}
      {...props}
    >
      <div
        className="min-h-0 min-w-0 overflow-auto"
        style={
          horizontal
            ? { width: `${ratio * 100}%` }
            : { height: `${ratio * 100}%` }
        }
      >
        {left}
      </div>
      <div
        role="separator"
        aria-orientation={orientation}
        aria-valuenow={Math.round(ratio * 100)}
        aria-valuemin={Math.round(minRatio * 100)}
        aria-valuemax={Math.round(maxRatio * 100)}
        tabIndex={0}
        onPointerDown={start}
        onKeyDown={(e) => {
          const step = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -0.02 : e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 0.02 : 0
          if (!step) return
          e.preventDefault()
          setRatio((r) => Math.min(maxRatio, Math.max(minRatio, r + step)))
        }}
        className={cn(
          'shrink-0 bg-line/80 transition-colors hover:bg-brass focus-ring',
          horizontal ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'
        )}
      />
      <div className="min-h-0 min-w-0 flex-1 overflow-auto">{right}</div>
    </div>
  )
}
