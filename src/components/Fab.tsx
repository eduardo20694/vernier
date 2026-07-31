import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type Corner = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'

export interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label?: string
  corner?: Corner
  extended?: boolean
}

const cornerClasses: Record<Corner, string> = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'top-right': 'top-6 right-6',
  'top-left': 'top-6 left-6',
}

export function Fab({
  className,
  icon,
  label,
  corner = 'bottom-right',
  extended = Boolean(label),
  disabled,
  ...props
}: FabProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label ?? props['aria-label']}
      className={cn(
        'fixed z-40 inline-flex items-center justify-center gap-2',
        'rounded-full border border-brass-bright/40 bg-gradient-to-b from-brass-bright via-brass to-brass-dim',
        'text-ink font-medium shadow-brass',
        'transition-all duration-200 ease-out focus-ring',
        'hover:from-brass-bright hover:via-brass hover:to-brass',
        'active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40',
        extended ? 'h-12 px-5' : 'h-14 w-14',
        cornerClasses[corner],
        className
      )}
      {...props}
    >
      <span className="inline-flex [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
      {extended && label && <span className="text-sm">{label}</span>}
    </button>
  )
}
