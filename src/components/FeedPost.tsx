import type { HTMLAttributes, ReactNode } from 'react'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { cn } from '../lib/cn'
import { Avatar } from './Avatar'
import { Button } from './Button'

export interface FeedPostProps extends HTMLAttributes<HTMLElement> {
  author: string
  avatarSrc?: string
  time: string
  body: string
  likes?: number
  comments?: number
  liked?: boolean
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
  /** Comentários embutidos ou thread */
  children?: ReactNode
}

export function FeedPost({
  className,
  author,
  avatarSrc,
  time,
  body,
  likes = 0,
  comments = 0,
  liked = false,
  onLike,
  onComment,
  onShare,
  children,
  ...props
}: FeedPostProps) {
  return (
    <article
      className={cn(
        'rounded-xl border border-line bg-panel shadow-plate',
        className
      )}
      {...props}
    >
      <header className="flex items-start gap-3 px-4 pt-4">
        <Avatar fallback={author} src={avatarSrc} size="md" tone="brass" ring={false} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm font-medium text-vellum">{author}</span>
            <time className="font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
              {time}
            </time>
          </div>
        </div>
      </header>

      <p className="mt-3 whitespace-pre-wrap px-4 text-sm leading-relaxed text-vellum-muted">
        {body}
      </p>

      <footer className="mt-4 flex items-center gap-1 border-t border-line px-2 py-1">
        <Button
          variant="ghost"
          size="sm"
          className={cn('gap-1.5 text-xs', liked && 'text-rust')}
          onClick={onLike}
        >
          <Heart className={cn('h-4 w-4', liked && 'fill-current')} aria-hidden />
          {likes > 0 ? likes : 'Curtir'}
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={onComment}>
          <MessageCircle className="h-4 w-4" aria-hidden />
          {comments > 0 ? comments : 'Comentar'}
        </Button>
        <Button variant="ghost" size="sm" className="ml-auto gap-1.5 text-xs" onClick={onShare}>
          <Share2 className="h-4 w-4" aria-hidden />
          Compartilhar
        </Button>
      </footer>

      {children && <div className="border-t border-line px-4 py-4">{children}</div>}
    </article>
  )
}

export interface FeedListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/** Coluna de posts com sensação de feed infinito */
export function FeedList({ className, children, ...props }: FeedListProps) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {children}
      <p className="py-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
        Você chegou ao fim — por enquanto
      </p>
    </div>
  )
}
