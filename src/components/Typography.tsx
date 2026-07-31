import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type Tone = 'default' | 'muted' | 'faint' | 'brass'

const toneClasses: Record<Tone, string> = {
  default: 'text-vellum',
  muted: 'text-vellum-muted',
  faint: 'text-vellum-faint',
  brass: 'text-brass-bright',
}

type HeadingLevel = 1 | 2 | 3 | 4

const headingSize: Record<HeadingLevel, string> = {
  1: 'font-display text-h1',
  2: 'font-display text-h2',
  3: 'font-display text-h3',
  4: 'font-display text-h4',
}

export function Display({
  className,
  size = 'lg',
  tone = 'default',
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { size?: 'lg' | 'sm'; tone?: Tone }) {
  return (
    <h1
      className={cn(
        'font-display',
        size === 'lg' ? 'text-display' : 'text-display-sm',
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function Heading({
  level = 2,
  as,
  className,
  tone = 'default',
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel
  as?: ElementType
  tone?: Tone
}) {
  const Tag = (as ?? (`h${level}` as ElementType))
  return (
    <Tag className={cn(headingSize[level], toneClasses[tone], className)} {...props}>
      {children}
    </Tag>
  )
}

export function Lead({
  className,
  tone = 'muted',
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { tone?: Tone }) {
  return <p className={cn('font-sans text-lead max-w-measure', toneClasses[tone], className)} {...props} />
}

export function Text({
  className,
  size = 'md',
  tone = 'default',
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { size?: 'md' | 'sm'; tone?: Tone }) {
  return (
    <p
      className={cn(
        'font-sans max-w-measure',
        size === 'md' ? 'text-body' : 'text-body-sm',
        toneClasses[tone],
        className
      )}
      {...props}
    />
  )
}

export function Caption({
  className,
  tone = 'faint',
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { tone?: Tone }) {
  return <p className={cn('font-sans text-caption', toneClasses[tone], className)} {...props} />
}

export function Overline({
  className,
  tone = 'brass',
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { tone?: Tone }) {
  return (
    <p
      className={cn('font-mono text-overline uppercase', toneClasses[tone], className)}
      {...props}
    />
  )
}

export function InlineCode({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        'rounded-sm border border-line bg-panel2 px-1.5 py-0.5 font-mono text-[0.85em] text-brass-bright',
        className
      )}
      {...props}
    />
  )
}

export function Prose({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'max-w-prose space-y-4 text-body text-vellum-muted',
        '[&_h2]:font-display [&_h2]:text-h2 [&_h2]:text-vellum [&_h2]:mt-10 [&_h2]:mb-3',
        '[&_h3]:font-display [&_h3]:text-h3 [&_h3]:text-vellum [&_h3]:mt-8 [&_h3]:mb-2',
        '[&_p]:leading-relaxed',
        '[&_a]:text-brass-bright [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-brass-dim/50 hover:[&_a]:decoration-brass',
        '[&_strong]:text-vellum [&_strong]:font-medium',
        '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5',
        '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5',
        className
      )}
    >
      {children}
    </div>
  )
}
