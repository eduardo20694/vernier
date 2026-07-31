import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'
import { Link } from './Link'
import { Overline } from './Typography'

export interface PostCardProps {
  title: string
  excerpt: string
  category?: string
  author?: string
  date?: string
  coverSrc?: string
  coverAlt?: string
  href?: string
  className?: string
}

function PostCardCover({
  coverSrc,
  coverAlt,
  title,
}: Pick<PostCardProps, 'coverSrc' | 'coverAlt' | 'title'>) {
  if (coverSrc) {
    return (
      <img
        src={coverSrc}
        alt={coverAlt ?? title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
    )
  }

  return (
    <div
      aria-hidden
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-panel2 via-ink/60 to-panel"
    >
      <div className="h-12 w-12 rounded-full border border-line bg-panel/40" />
    </div>
  )
}

export function PostCard({
  title,
  excerpt,
  category,
  author,
  date,
  coverSrc,
  coverAlt,
  href,
  className,
}: PostCardProps) {
  const meta = [author, date].filter(Boolean)

  const body = (
    <>
      <div className="aspect-video overflow-hidden rounded-t-xl border-b border-line bg-ink/30">
        <PostCardCover coverSrc={coverSrc} coverAlt={coverAlt} title={title} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {category && (
          <Overline tone="brass" className="mb-3 block">
            {category}
          </Overline>
        )}
        <h3 className="font-display text-lg leading-snug text-vellum transition-colors group-hover:text-brass-bright">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-vellum-muted">
          {excerpt}
        </p>
        {meta.length > 0 && (
          <p className="mt-4 flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-[0.14em] text-vellum-faint">
            {author && <span>{author}</span>}
            {author && date && <span aria-hidden>·</span>}
            {date && <time dateTime={date}>{date}</time>}
          </p>
        )}
      </div>
    </>
  )

  const cardClass = cn(
    'group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel',
    'shadow-plate transition-colors duration-200 hover:border-brass-dim/50',
    className
  )

  if (href) {
    return (
      <Link href={href} underline={false} tone="muted" className={cn(cardClass, 'no-underline')}>
        {body}
      </Link>
    )
  }

  return <article className={cardClass}>{body}</article>
}

export interface PostGridProps extends HTMLAttributes<HTMLDivElement> {
  posts: PostCardProps[]
}

export function PostGrid({ posts, className, ...props }: PostGridProps) {
  return (
    <div
      className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)}
      {...props}
    >
      {posts.map((post, i) => (
        <PostCard key={post.href ?? `${post.title}-${i}`} {...post} />
      ))}
    </div>
  )
}
