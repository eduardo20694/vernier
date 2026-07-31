import type { HTMLAttributes, ReactNode } from 'react'
import { BookOpen, PlayCircle } from 'lucide-react'
import { cn } from '../lib/cn'
import { Badge } from './Badge'
import { CircularProgress } from './CircularProgress'
import { Avatar } from './Avatar'

export interface CourseCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string
  instructor: string
  thumbnailSrc?: string
  /** 0–100 — exibe anel de progresso quando definido */
  progress?: number
  /** Badge de nível quando não há progresso */
  level?: string
  duration?: string
  lessons?: number
  icon?: ReactNode
}

export function CourseCard({
  className,
  title,
  instructor,
  thumbnailSrc,
  progress,
  level,
  duration,
  lessons,
  icon,
  ...props
}: CourseCardProps) {
  const showProgress = progress != null && progress > 0

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-line bg-panel',
        'transition-colors hover:border-brass-dim/50',
        className
      )}
      {...props}
    >
      <div className="relative aspect-video overflow-hidden border-b border-line bg-gradient-to-b from-panel2 to-panel">
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-brass">
            {icon ?? <PlayCircle className="h-12 w-12" strokeWidth={1.25} aria-hidden />}
          </div>
        )}
        {showProgress ? (
          <div className="absolute right-3 top-3 rounded-full border border-line bg-ink/80 p-1 backdrop-blur-sm">
            <CircularProgress value={progress} size={44} strokeWidth={4} showValue />
          </div>
        ) : level ? (
          <Badge tone="verdigris" className="absolute left-3 top-3">
            {level}
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-medium leading-snug text-vellum">{title}</h3>
        <div className="mt-3 flex items-center gap-2.5">
          <Avatar fallback={instructor} size="sm" tone="neutral" ring={false} />
          <span className="text-sm text-vellum-muted">{instructor}</span>
        </div>
        {(duration || lessons != null) && (
          <p className="mt-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-vellum-faint">
            <BookOpen className="h-3 w-3" aria-hidden />
            {lessons != null && <span>{lessons} aulas</span>}
            {lessons != null && duration && <span aria-hidden>·</span>}
            {duration && <span>{duration}</span>}
          </p>
        )}
      </div>
    </article>
  )
}

export interface CourseGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function CourseGrid({ className, children, ...props }: CourseGridProps) {
  return (
    <div
      className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)}
      {...props}
    >
      {children}
    </div>
  )
}
