import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: never
}

/** Conteúdo só para leitores de tela (sr-only). */
export function VisuallyHidden({ className, ...props }: VisuallyHiddenProps) {
  return <span className={cn('sr-only', className)} {...props} />
}
