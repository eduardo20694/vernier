import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

type Size = 'sm' | 'md' | 'lg'
type Tone = 'brass' | 'verdigris' | 'rust' | 'neutral'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback: string
  size?: Size
  tone?: Tone
  ring?: boolean
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 w-8 text-[10px]',
  md: 'h-10 w-10 text-xs',
  lg: 'h-14 w-14 text-sm',
}

const toneClasses: Record<Tone, string> = {
  brass: 'from-brass/30 to-brass-dim/20 text-brass-bright ring-brass/50',
  verdigris: 'from-verdigris/30 to-verdigris-dim/20 text-verdigris ring-verdigris/50',
  rust: 'from-rust/30 to-rust-dim/20 text-rust ring-rust/50',
  neutral: 'from-panel2 to-panel text-vellum-muted ring-line',
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

export function Avatar({
  className,
  src,
  alt,
  fallback,
  size = 'md',
  tone = 'brass',
  ring = true,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        'border border-line bg-gradient-to-br font-mono font-medium uppercase',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.35)]',
        ring && 'ring-2 ring-offset-2 ring-offset-ink',
        sizeClasses[size],
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt ?? fallback} className="h-full w-full object-cover" />
      ) : (
        <span aria-hidden>{initials(fallback)}</span>
      )}
      {!src && <span className="sr-only">{fallback}</span>}
    </div>
  )
}
