import type { ElementType, HTMLAttributes, OlHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type Tone = 'default' | 'muted' | 'faint' | 'brass' | 'verdigris' | 'rust'

const toneClasses: Record<Tone, string> = {
  default: 'text-vellum',
  muted: 'text-vellum-muted',
  faint: 'text-vellum-faint',
  brass: 'text-brass-bright',
  verdigris: 'text-verdigris',
  rust: 'text-rust',
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

const headingSize: Record<HeadingLevel, string> = {
  1: 'font-display text-h1',
  2: 'font-display text-h2',
  3: 'font-display text-h3',
  4: 'font-display text-h4',
  5: 'font-display text-h5',
  6: 'font-display text-h6',
}

const textSizeClasses = {
  lg: 'text-lead',
  md: 'text-body',
  sm: 'text-body-sm',
  xs: 'text-caption',
} as const

const monoSizeClasses = {
  md: 'text-body',
  sm: 'text-body-sm',
} as const

const lineClampClasses = {
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
} as const

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

export function Subtitle({
  className,
  tone = 'muted',
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { tone?: Tone }) {
  return (
    <p className={cn('font-sans text-subtitle max-w-measure', toneClasses[tone], className)} {...props} />
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
}: HTMLAttributes<HTMLParagraphElement> & {
  size?: keyof typeof textSizeClasses
  tone?: Tone
}) {
  return (
    <p
      className={cn('font-sans max-w-measure', textSizeClasses[size], toneClasses[tone], className)}
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
  tone = 'faint',
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { tone?: Tone }) {
  return (
    <p
      className={cn('font-mono text-overline uppercase', toneClasses[tone], className)}
      {...props}
    />
  )
}

export function Small({
  className,
  tone = 'faint',
  ...props
}: HTMLAttributes<HTMLElement> & { tone?: Tone }) {
  return <small className={cn('font-sans text-caption', toneClasses[tone], className)} {...props} />
}

export function Strong({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <strong className={cn('font-medium text-vellum', className)} {...props} />
}

export function Em({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <em className={cn('italic text-vellum-muted', className)} {...props} />
}

export function Mark({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <mark
      className={cn(
        'rounded-sm bg-brass/20 px-1 py-0.5 text-vellum not-italic',
        className
      )}
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

export function Mono({
  className,
  size = 'sm',
  tone = 'brass',
  ...props
}: HTMLAttributes<HTMLElement> & {
  size?: keyof typeof monoSizeClasses
  tone?: Tone
}) {
  return (
    <span
      className={cn(
        'font-mono tabular-nums',
        monoSizeClasses[size],
        toneClasses[tone],
        className
      )}
      {...props}
    />
  )
}

export function GradientText({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'bg-brass-metal bg-clip-text text-transparent',
        className
      )}
      {...props}
    />
  )
}

export function Truncate({
  as: Tag = 'span',
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { as?: ElementType }) {
  return <Tag className={cn('block truncate', className)} {...props} />
}

export function LineClamp({
  lines = 2,
  as: Tag = 'p',
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  lines?: 2 | 3 | 4
  as?: ElementType
}) {
  return <Tag className={cn(lineClampClasses[lines], className)} {...props} />
}

export function Balance({
  as: Tag = 'span',
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { as?: ElementType }) {
  return <Tag className={cn('text-balance', className)} {...props} />
}

export function List({
  className,
  ...props
}: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        'list-disc space-y-1.5 pl-5 font-sans text-body text-vellum-muted marker:text-brass-dim',
        className
      )}
      {...props}
    />
  )
}

export function OrderedList({
  className,
  ...props
}: OlHTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn(
        'list-decimal space-y-1.5 pl-5 font-sans text-body text-vellum-muted marker:text-brass-dim',
        className
      )}
      {...props}
    />
  )
}

export function DefinitionList({
  className,
  ...props
}: HTMLAttributes<HTMLDListElement>) {
  return (
    <dl
      className={cn(
        'space-y-3 font-sans text-body',
        '[&_dt]:font-mono [&_dt]:text-body-sm [&_dt]:font-medium [&_dt]:text-brass-bright',
        '[&_dd]:mt-0.5 [&_dd]:text-vellum-muted',
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
        '[&_em]:italic [&_em]:text-vellum-muted',
        '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5',
        '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5',
        '[&_blockquote]:border-l-2 [&_blockquote]:border-brass-dim/60 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-vellum-muted',
        '[&_code]:rounded-sm [&_code]:border [&_code]:border-line [&_code]:bg-panel2 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-brass-bright',
        '[&_mark]:rounded-sm [&_mark]:bg-brass/20 [&_mark]:px-1 [&_mark]:py-0.5 [&_mark]:text-vellum',
        '[&_hr]:border-0 [&_hr]:border-t [&_hr]:border-line [&_hr]:my-8',
        className
      )}
    >
      {children}
    </div>
  )
}
