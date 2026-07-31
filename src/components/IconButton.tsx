import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../lib/cn'

type Tone = 'neutral' | 'brass' | 'verdigris' | 'rust'
type Size = 'sm' | 'md' | 'lg'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  tone?: Tone
  size?: Size
  children: ReactNode
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 w-8 [&_svg]:h-3.5 [&_svg]:w-3.5',
  md: 'h-10 w-10 [&_svg]:h-4 [&_svg]:w-4',
  lg: 'h-12 w-12 [&_svg]:h-5 [&_svg]:w-5',
}

const toneClasses: Record<Tone, string> = {
  neutral:
    'border-line bg-gradient-to-b from-panel2 to-panel text-vellum-muted hover:text-vellum hover:border-brass-dim/60',
  brass:
    'border-brass-dim/70 bg-gradient-to-b from-brass/20 to-brass/5 text-brass-bright hover:from-brass/30 hover:border-brass shadow-[0_0_16px_-6px_rgb(var(--brass)/0.45)]',
  verdigris:
    'border-verdigris-dim/70 bg-gradient-to-b from-verdigris/20 to-verdigris/5 text-verdigris hover:from-verdigris/30 hover:border-verdigris',
  rust:
    'border-rust-dim/70 bg-gradient-to-b from-rust/20 to-rust/5 text-rust hover:from-rust/30 hover:border-rust',
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, label, tone = 'neutral', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        className={cn(
          'inline-flex items-center justify-center rounded border',
          'shadow-[inset_0_1px_0_rgba(237,232,223,0.06)]',
          'transition-all duration-200 ease-out focus-ring',
          'disabled:cursor-not-allowed disabled:opacity-40',
          'active:scale-[0.96] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]',
          sizeClasses[size],
          toneClasses[tone],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
IconButton.displayName = 'IconButton'
