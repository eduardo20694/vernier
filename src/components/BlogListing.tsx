import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { PostGrid, type PostCardProps } from './PostCard'

export interface BlogListingProps {
  title?: string
  description?: string
  posts: PostCardProps[]
  footer?: ReactNode
  className?: string
}

export function BlogListing({
  title = 'Publicações',
  description = 'Artigos, notas técnicas e atualizações da equipe.',
  posts,
  footer,
  className,
}: BlogListingProps) {
  return (
    <section className={cn('mx-auto w-full max-w-6xl', className)}>
      {(title || description) && (
        <header className="mb-8 max-w-2xl">
          {title && <h2 className="font-display text-3xl text-vellum">{title}</h2>}
          {description && (
            <p className="mt-2 text-sm text-vellum-muted">{description}</p>
          )}
        </header>
      )}
      <PostGrid posts={posts} />
      {footer && <div className="mt-8 flex justify-center">{footer}</div>}
    </section>
  )
}
