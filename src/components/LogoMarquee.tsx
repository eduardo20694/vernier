import type { CSSProperties } from 'react'
import { cn } from '../lib/cn'
import type { LogoItem } from './LogoCloud'

export interface LogoMarqueeProps {
  logos: LogoItem[]
  title?: string
  /** Seconds for one full loop */
  duration?: number
  className?: string
  pauseOnHover?: boolean
}

function LogoChip({ logo }: { logo: LogoItem }) {
  const content = logo.src ? (
    <img
      src={logo.src}
      alt={logo.name}
      className="h-7 max-w-[120px] object-contain opacity-50 grayscale"
    />
  ) : (
    <span className="font-display text-base text-vellum-faint">{logo.name}</span>
  )

  if (logo.href) {
    return (
      <a
        href={logo.href}
        className="inline-flex shrink-0 items-center px-6 focus-ring rounded"
        aria-label={logo.name}
      >
        {content}
      </a>
    )
  }
  return (
    <div className="inline-flex shrink-0 items-center px-6" aria-label={logo.name}>
      {content}
    </div>
  )
}

export function LogoMarquee({
  logos,
  title,
  duration = 28,
  className,
  pauseOnHover = true,
}: LogoMarqueeProps) {
  const track = [...logos, ...logos]
  const style = {
    ['--marquee-duration' as string]: `${duration}s`,
  } as CSSProperties

  return (
    <section className={cn('w-full', className)} style={style}>
      <style>{`
        @keyframes vernier-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .vernier-marquee-track {
          animation: vernier-marquee var(--marquee-duration) linear infinite;
        }
        .vernier-marquee-pause:hover .vernier-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .vernier-marquee-track { animation: none; }
        }
      `}</style>
      {title && (
        <p className="mb-5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
          {title}
        </p>
      )}
      <div
        className={cn(
          'relative overflow-hidden mask-[linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]',
          pauseOnHover && 'vernier-marquee-pause'
        )}
      >
        <div className="vernier-marquee-track flex w-max items-center">
          {track.map((logo, i) => (
            <LogoChip key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  )
}
