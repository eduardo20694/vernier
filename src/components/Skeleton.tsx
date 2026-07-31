import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Forma pré-definida — evita inventar dimensões em cada uso */
  shape?: 'line' | 'circle' | 'block'
}

// Placeholder de carregamento com pulso discreto. Não brilha nem usa
// shimmer colorido — a Vernier espera, não performa.
export function Skeleton({ className, shape = 'line', ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse bg-panel2 border border-line/60',
        shape === 'line' && 'h-3 w-full rounded-sm',
        shape === 'circle' && 'h-10 w-10 rounded-full',
        shape === 'block' && 'h-24 w-full rounded',
        className
      )}
      {...props}
    />
  )
}
