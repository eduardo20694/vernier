import type { BlockquoteHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export function Blockquote({
  className,
  cite,
  children,
  ...props
}: BlockquoteHTMLAttributes<HTMLQuoteElement> & { cite?: string }) {
  return (
    <figure className={cn('my-2', className)}>
      <blockquote
        className={cn(
          'relative border-l-2 border-brass pl-5 font-display text-xl leading-snug text-vellum',
          'italic'
        )}
        {...props}
      >
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-3 pl-5 font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
          — {cite}
        </figcaption>
      )}
    </figure>
  )
}
