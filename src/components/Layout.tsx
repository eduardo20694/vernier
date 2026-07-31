import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export function Container({
  className,
  size = 'lg',
  ...props
}: HTMLAttributes<HTMLDivElement> & { size?: 'sm' | 'md' | 'lg' | 'full' }) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5',
        size === 'sm' && 'max-w-2xl',
        size === 'md' && 'max-w-4xl',
        size === 'lg' && 'max-w-6xl',
        size === 'full' && 'max-w-none',
        className
      )}
      {...props}
    />
  )
}

export function Stack({
  className,
  gap = 'md',
  ...props
}: HTMLAttributes<HTMLDivElement> & { gap?: 'sm' | 'md' | 'lg' }) {
  return (
    <div
      className={cn(
        'flex flex-col',
        gap === 'sm' && 'gap-2',
        gap === 'md' && 'gap-4',
        gap === 'lg' && 'gap-8',
        className
      )}
      {...props}
    />
  )
}

export function Inline({
  className,
  gap = 'md',
  ...props
}: HTMLAttributes<HTMLDivElement> & { gap?: 'sm' | 'md' | 'lg' }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center',
        gap === 'sm' && 'gap-2',
        gap === 'md' && 'gap-3',
        gap === 'lg' && 'gap-5',
        className
      )}
      {...props}
    />
  )
}
