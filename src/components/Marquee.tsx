import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Duração de um ciclo em segundos */
  duration?: number
  pauseOnHover?: boolean
  reverse?: boolean
  gap?: number
}

export function Marquee({
  className,
  children,
  duration = 28,
  pauseOnHover = true,
  reverse = false,
  gap = 32,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden',
        'mask-[linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]',
        className
      )}
      {...props}
    >
      <style>{`
        @keyframes vernier-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className={cn(
          'flex w-max',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{
          gap,
          animation: `vernier-marquee ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
