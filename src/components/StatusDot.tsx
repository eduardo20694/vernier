import { cn } from '../lib/cn'

type Tone = 'brass' | 'verdigris' | 'rust' | 'neutral'
type Size = 'sm' | 'md'

export interface StatusDotProps {
  tone?: Tone
  pulse?: boolean
  label?: string
  size?: Size
  className?: string
}

const toneClasses: Record<Tone, string> = {
  brass: 'bg-brass shadow-[0_0_8px_rgb(var(--brass)/0.65)]',
  verdigris: 'bg-verdigris shadow-[0_0_8px_rgba(94,140,122,0.65)]',
  rust: 'bg-rust shadow-[0_0_8px_rgba(166,67,43,0.65)]',
  neutral: 'bg-vellum-faint shadow-none',
}

const pulseRing: Record<Tone, string> = {
  brass: 'bg-brass',
  verdigris: 'bg-verdigris',
  rust: 'bg-rust',
  neutral: 'bg-vellum-faint',
}

// LED de painel — o detalhe que faz um status parecer vivo sem emoji.
export function StatusDot({
  tone = 'verdigris',
  pulse = false,
  label,
  size = 'md',
  className,
}: StatusDotProps) {
  const dim = size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2'

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative inline-flex">
        {pulse && (
          <span
            aria-hidden
            className={cn(
              'absolute inset-0 animate-ping rounded-full opacity-40',
              pulseRing[tone],
              dim
            )}
          />
        )}
        <span className={cn('relative rounded-full', dim, toneClasses[tone])} />
      </span>
      {label && <span className="text-sm text-vellum-muted">{label}</span>}
    </span>
  )
}
