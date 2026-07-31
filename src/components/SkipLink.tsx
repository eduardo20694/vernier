import type { AnchorHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string
}

/** Link de acessibilidade — visível só no foco, pula para o conteúdo principal. */
export function SkipLink({
  className,
  href = '#conteudo',
  children = 'Pular para o conteúdo',
  ...props
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'fixed left-4 top-4 z-[100] -translate-y-[200%] rounded border border-brass',
        'bg-panel2 px-4 py-2 text-sm font-medium text-brass-bright shadow-brass',
        'outline-none transition-transform focus:translate-y-0 focus-ring',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
