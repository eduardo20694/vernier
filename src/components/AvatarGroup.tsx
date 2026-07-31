import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'
import { Avatar, type AvatarProps } from './Avatar'

export interface AvatarGroupItem {
  fallback: string
  src?: string
  alt?: string
  tone?: AvatarProps['tone']
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  items: AvatarGroupItem[]
  max?: number
  size?: AvatarProps['size']
}

const overlap: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: '-ml-2',
  md: '-ml-2.5',
  lg: '-ml-3.5',
}

export function AvatarGroup({
  className,
  items,
  max = 4,
  size = 'md',
  ...props
}: AvatarGroupProps) {
  const visible = items.slice(0, max)
  const overflow = Math.max(0, items.length - max)

  return (
    <div
      className={cn('inline-flex items-center', className)}
      role="group"
      aria-label={`${items.length} avatares`}
      {...props}
    >
      {visible.map((item, i) => (
        <Avatar
          key={`${item.fallback}-${i}`}
          fallback={item.fallback}
          src={item.src}
          alt={item.alt}
          tone={item.tone}
          size={size}
          className={cn(i > 0 && overlap[size], 'ring-offset-ink')}
        />
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            'relative inline-flex shrink-0 items-center justify-center rounded-full',
            'border border-line bg-panel2 font-mono font-medium text-vellum-muted',
            'ring-2 ring-offset-2 ring-offset-ink ring-line',
            size === 'sm' && 'h-8 w-8 -ml-2 text-[10px]',
            size === 'md' && 'h-10 w-10 -ml-2.5 text-xs',
            size === 'lg' && 'h-14 w-14 -ml-3.5 text-sm'
          )}
          aria-label={`Mais ${overflow}`}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
