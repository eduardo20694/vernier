import type { HTMLAttributes, ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react'
import { cn } from '../lib/cn'

type Tone = 'neutral' | 'brass' | 'verdigris' | 'rust'

const toneClasses: Record<Tone, string> = {
  neutral:
    'border-line bg-gradient-to-r from-panel2 to-panel text-vellum [box-shadow:inset_3px_0_0_0_rgb(var(--line)),inset_0_1px_0_rgb(var(--mist)/0.04)]',
  brass:
    'border-brass-dim/55 bg-gradient-to-r from-brass/[0.12] to-panel/80 text-brass-bright [box-shadow:inset_3px_0_0_0_rgb(var(--brass)),inset_0_1px_0_rgb(var(--brass)/0.08)]',
  verdigris:
    'border-verdigris-dim/55 bg-gradient-to-r from-verdigris/[0.12] to-panel/80 text-verdigris [box-shadow:inset_3px_0_0_0_rgb(var(--verdigris)),inset_0_1px_0_rgb(var(--verdigris)/0.08)]',
  rust:
    'border-rust-dim/55 bg-gradient-to-r from-rust/[0.12] to-panel/80 text-rust [box-shadow:inset_3px_0_0_0_rgb(var(--rust)),inset_0_1px_0_rgb(var(--rust)/0.08)]',
}

const defaultIcons: Record<Tone, ReactNode> = {
  neutral: <Info className="h-4 w-4 shrink-0" />,
  brass: <TriangleAlert className="h-4 w-4 shrink-0" />,
  verdigris: <CheckCircle2 className="h-4 w-4 shrink-0" />,
  rust: <AlertCircle className="h-4 w-4 shrink-0" />,
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone
  title?: string
  icon?: ReactNode | false
}

// Alerta é mensagem persistente na página — diferente do Toast, que é
// efêmero. Tom e ícone padrão já carregam a intenção; o título em display
// ancora a hierarquia como no resto da Vernier.
export function Alert({ className, tone = 'neutral', title, icon, children, ...props }: AlertProps) {
  const resolvedIcon = icon === false ? null : icon ?? defaultIcons[tone]

  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 rounded-lg border px-4 py-3 text-sm',
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {resolvedIcon && <div className="mt-0.5">{resolvedIcon}</div>}
      <div className="min-w-0 flex-1">
        {title && <p className="font-display text-base font-medium leading-tight">{title}</p>}
        {children && (
          <div className={cn('text-sm opacity-80', title && 'mt-1')}>{children}</div>
        )}
      </div>
    </div>
  )
}
