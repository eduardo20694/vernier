import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Avatar } from './Avatar'

export interface CommentItem {
  id: string
  author: string
  avatarSrc?: string
  body: string
  time?: string
  replies?: CommentItem[]
}

export interface CommentListProps {
  comments: CommentItem[]
  className?: string
  /** Render reply / actions under each comment */
  renderActions?: (comment: CommentItem) => ReactNode
  empty?: ReactNode
}

function CommentNode({
  comment,
  depth,
  renderActions,
}: {
  comment: CommentItem
  depth: number
  renderActions?: (comment: CommentItem) => ReactNode
}) {
  return (
    <li className={cn(depth > 0 && 'mt-3 border-l border-line pl-4')}>
      <div className="flex gap-3">
        <Avatar
          size="sm"
          fallback={comment.author}
          src={comment.avatarSrc}
          ring={false}
          tone="neutral"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm font-medium text-vellum">{comment.author}</span>
            {comment.time && (
              <span className="font-mono text-[10px] text-vellum-faint">{comment.time}</span>
            )}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-vellum-muted whitespace-pre-wrap">
            {comment.body}
          </p>
          {renderActions && <div className="mt-2">{renderActions(comment)}</div>}
          {comment.replies && comment.replies.length > 0 && (
            <ul className="mt-1">
              {comment.replies.map((r) => (
                <CommentNode
                  key={r.id}
                  comment={r}
                  depth={depth + 1}
                  renderActions={renderActions}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  )
}

export function CommentList({
  comments,
  className,
  renderActions,
  empty,
}: CommentListProps) {
  if (!comments.length) {
    return (
      <div className={cn('py-8 text-center text-sm text-vellum-faint', className)}>
        {empty ?? 'Nenhum comentário ainda.'}
      </div>
    )
  }

  return (
    <ul className={cn('space-y-5', className)}>
      {comments.map((c) => (
        <CommentNode key={c.id} comment={c} depth={0} renderActions={renderActions} />
      ))}
    </ul>
  )
}
