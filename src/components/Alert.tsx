import type { HTMLAttributes, ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react'
import { cn } from '../lib/cn'

type Tone = 'neutral' | 'brass' | 'verdigris' | 'rust'

const toneClasses: Record<Tone, string> = {
  neutral: 'border-line bg-panel2 text-vellum',
  brass: 'border-brass-dim/60 bg-brass/10 text-brass-bright',
  verdigris: 'border-verdigris-dim/60 bg-verdigris/10 text-verdigris',
  rust: 'border-rust-dim/60 bg-rust/10 text-rust',
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
