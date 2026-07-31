import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/cn'

type Tone = 'neutral' | 'brass' | 'verdigris' | 'rust'

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  tone?: Tone
  selected?: boolean
  onRemove?: () => void
  leading?: ReactNode
}

const toneIdle: Record<Tone, string> = {
  neutral: 'border-line bg-panel2/80 text-vellum-muted hover:border-brass-dim/50 hover:text-vellum',
  brass: 'border-brass-dim/50 bg-brass/10 text-brass-bright hover:bg-brass/15',
  verdigris: 'border-verdigris-dim/50 bg-verdigris/10 text-verdigris hover:bg-verdigris/15',
  rust: 'border-rust-dim/50 bg-rust/10 text-rust hover:bg-rust/15',
}

const toneSelected: Record<Tone, string> = {
  neutral:
    'border-brass-dim text-ink bg-gradient-to-b from-brass-bright via-brass to-brass-dim shadow-[inset_0_1px_0_rgba(255,240,210,0.35)]',
  brass:
    'border-brass text-ink bg-gradient-to-b from-brass-bright via-brass to-brass-dim shadow-[inset_0_1px_0_rgba(255,240,210,0.35)]',
  verdigris: 'border-verdigris text-ink bg-gradient-to-b from-verdigris to-verdigris-dim',
  rust: 'border-rust text-vellum bg-gradient-to-b from-rust to-rust-dim',
}

export function Chip({
  className,
  tone = 'neutral',
  selected,
  onRemove,
  leading,
  children,
  onClick,
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center gap-1 rounded-full border pl-2.5 text-xs font-medium',
        'transition-all duration-150',
        onRemove ? 'pr-1' : 'pr-2.5',
        selected ? toneSelected[tone] : toneIdle[tone],
        className
      )}
    >
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className="inline-flex items-center gap-1.5 focus-ring rounded-full"
        {...props}
      >
        {leading}
        <span>{children}</span>
      </button>
      {onRemove && (
        <button
          type="button"
          aria-label="Remover"
          onClick={onRemove}
          className={cn(
            'inline-flex rounded-full p-1 focus-ring',
            selected ? 'hover:bg-ink/15' : 'hover:bg-panel'
          )}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
}
