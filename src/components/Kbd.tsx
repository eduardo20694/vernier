import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface KbdProps extends HTMLAttributes<HTMLElement> {}

// Tecla de atalho — o detalhe premium que faz a UI parecer instrumentada.
// Space Mono + borda inferior mais pesada simula a face física de uma tecla.
export function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-line border-b-2',
        'bg-panel2 px-1.5 font-mono text-[10px] font-medium uppercase tracking-wide text-vellum-muted',
        className
      )}
      {...props}
    />
  )
}
