import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface LogoItem {
  name: string
  src?: string
  href?: string
}

export interface LogoCloudProps extends HTMLAttributes<HTMLElement> {
  logos: LogoItem[]
  title?: string
}

export function LogoCloud({ logos, title, className, ...props }: LogoCloudProps) {
  return (
    <section className={cn('w-full', className)} {...props}>
      {title && (
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
          {title}
        </p>
      )}
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {logos.map((logo) => {
          const content = logo.src ? (
            <img
              src={logo.src}
              alt={logo.name}
              className="h-8 max-w-[140px] object-contain opacity-45 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0"
            />
          ) : (
            <span className="font-display text-lg text-vellum-faint transition-colors duration-200 group-hover:text-vellum">
              {logo.name}
            </span>
          )

          return (
            <li key={logo.name}>
              {logo.href ? (
                <a
                  href={logo.href}
                  className="group inline-flex items-center focus-ring rounded"
                  aria-label={logo.name}
                >
                  {content}
                </a>
              ) : (
                <div className="group inline-flex items-center" aria-label={logo.name}>
                  {content}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
