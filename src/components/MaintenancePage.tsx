import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Display, Lead } from './Typography'

export interface MaintenancePageProps {
  title?: string
  description?: string
  code?: string
  action?: ReactNode
  className?: string
}

export function MaintenancePage({
  title = 'Em manutenção',
  description = 'Estamos calibrando a bancada. Voltamos em breve.',
  code = '503',
  action,
  className,
}: MaintenancePageProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-xl border border-line bg-panel px-6 py-16 text-center shadow-plate',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--brass)/0.1),transparent_55%)]"
      />
      <p className="relative font-mono text-sm tracking-[0.3em] text-brass-dim">{code}</p>
      <Display size="sm" className="relative mt-4">
        {title}
      </Display>
      <Lead className="relative mx-auto mt-3 max-w-md">{description}</Lead>
      {action && <div className="relative mt-8">{action}</div>}
    </div>
  )
}
