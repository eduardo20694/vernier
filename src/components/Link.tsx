import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  tone?: 'brass' | 'muted' | 'subtle'
  underline?: boolean
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, tone = 'brass', underline = true, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'transition-colors duration-150 focus-ring rounded-sm',
          tone === 'brass' && 'text-brass-bright hover:text-brass',
          tone === 'muted' && 'text-vellum-muted hover:text-vellum',
          tone === 'subtle' && 'text-vellum-faint hover:text-vellum-muted',
          underline && 'underline underline-offset-4 decoration-brass-dim/40 hover:decoration-brass',
          className
        )}
        {...props}
      />
    )
  }
)
Link.displayName = 'Link'
