import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'
import { AspectRatio } from './AspectRatio'
import { Heading, Overline, Prose } from './Typography'

export interface BlogArticleProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  category?: string
  title: ReactNode
  author?: string
  date?: string
  readTime?: string
  coverSrc?: string
  coverAlt?: string
  coverRatio?: number
  toc?: ReactNode
  children: ReactNode
}

export function BlogArticle({
  category,
  title,
  author,
  date,
  readTime,
  coverSrc,
  coverAlt,
  coverRatio = 16 / 9,
  toc,
  children,
  className,
  ...props
}: BlogArticleProps) {
  const meta = [author, date, readTime].filter(Boolean)

  return (
    <article className={cn('w-full', className)} {...props}>
      <header className="mx-auto max-w-3xl">
        {category && <Overline tone="brass">{category}</Overline>}
        <Heading level={1} className="mt-3">
          {title}
        </Heading>
        {meta.length > 0 && (
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-vellum-faint">
            {author && <span>{author}</span>}
            {date && (
              <>
                {author && <span aria-hidden className="text-line">·</span>}
                <time dateTime={date}>{date}</time>
              </>
            )}
            {readTime && (
              <>
                {(author || date) && <span aria-hidden className="text-line">·</span>}
                <span>{readTime}</span>
              </>
            )}
          </p>
        )}
      </header>

      {coverSrc && (
        <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-xl border border-line">
          <AspectRatio ratio={coverRatio}>
            <img src={coverSrc} alt={coverAlt ?? ''} className="h-full w-full object-cover" />
          </AspectRatio>
        </div>
      )}

      <div
        className={cn(
          'mx-auto mt-10',
          toc ? 'grid max-w-5xl gap-10 lg:grid-cols-[1fr_220px]' : 'max-w-3xl'
        )}
      >
        <Prose>{children}</Prose>
        {toc && (
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-lg border border-line bg-panel/60 p-4">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
                Nesta página
              </p>
              {toc}
            </div>
          </aside>
        )}
      </div>
    </article>
  )
}
