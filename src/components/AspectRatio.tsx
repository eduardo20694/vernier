import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export function AspectRatio({
  ratio = 16 / 9,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ratio?: number }) {
  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={{ paddingBottom: `${100 / ratio}%` }}
      {...props}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}
