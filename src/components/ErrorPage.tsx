import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Display, Lead } from './Typography'

export function ErrorPage({
  code = '404',
  title = 'Página não encontrada',
  description = 'Esse caminho não existe na bancada — ou foi movido.',
  action,
  className,
}: {
  code?: string
  title?: string
  description?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-line bg-panel px-6 py-16 text-center',
        className
      )}
    >
      <p className="font-mono text-sm tracking-[0.3em] text-brass-dim">{code}</p>
      <Display size="sm" className="mt-4">
        {title}
      </Display>
      <Lead className="mx-auto mt-3 max-w-md">{description}</Lead>
      <div className="mt-8">{action ?? <Button variant="gradient">Voltar ao início</Button>}</div>
    </div>
  )
}
