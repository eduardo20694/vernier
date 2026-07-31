import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface StatProps {
  label: string
  value: ReactNode
  hint?: string
  delta?: string
  deltaTone?: 'up' | 'down' | 'flat'
  icon?: ReactNode
  className?: string
}

const deltaToneClasses = {
  up: 'text-verdigris',
  down: 'text-rust',
  flat: 'text-vellum-faint',
}

// Número-instrumento: label miúdo, valor em display/mono, delta colorido.
// Superfície com gradiente sutil de painel pra parecer placa usinada.
export function Stat({ label, value, hint, delta, deltaTone = 'flat', icon, className }: StatProps) {
  return (
    <div
      className={cn(
        'relative min-w-[140px] overflow-hidden rounded-lg border border-line',
        'bg-gradient-to-b from-panel2 via-panel to-[#1E1B17]',
        'shadow-[inset_0_1px_0_rgba(201,166,107,0.08),0_1px_0_rgba(0,0,0,0.35)]',
        'px-4 py-3.5',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent"
      />
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">{label}</p>
        {icon && <div className="text-brass-dim">{icon}</div>}
      </div>
      <p className="mt-2 font-display text-3xl font-medium leading-none tracking-tight text-vellum">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-2">
        {delta && (
          <span className={cn('font-mono text-xs tabular-nums', deltaToneClasses[deltaTone])}>
            {delta}
          </span>
        )}
        {hint && <span className="text-xs text-vellum-faint">{hint}</span>}
      </div>
    </div>
  )
}
