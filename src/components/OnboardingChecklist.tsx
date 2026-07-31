import type { HTMLAttributes } from 'react'
import { Check, Circle } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Progress } from './Progress'

export interface OnboardingChecklistItem {
  id: string
  title: string
  description?: string
  done: boolean
  onAction?: () => void
  actionLabel?: string
}

export interface OnboardingChecklistProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  items: OnboardingChecklistItem[]
  onDismiss?: () => void
  dismissLabel?: string
  /** Rótulo de progresso; padrão "N de M concluídos" */
  progressLabel?: string
}

export function OnboardingChecklist({
  title,
  description,
  items,
  onDismiss,
  dismissLabel = 'Pular por agora',
  progressLabel,
  className,
  ...props
}: OnboardingChecklistProps) {
  const total = items.length
  const completed = items.filter((item) => item.done).length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const resolvedProgressLabel =
    progressLabel ?? `${completed} de ${total} concluído${total === 1 ? '' : 's'}`

  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-gradient-to-b from-panel2/80 to-panel p-5 shadow-plate',
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h2 className="font-display text-lg font-medium text-vellum">{title}</h2>
          {description && (
            <p className="text-sm leading-relaxed text-vellum-muted">{description}</p>
          )}
        </div>
        {onDismiss && (
          <Button variant="ghost" size="sm" className="shrink-0 self-start" onClick={onDismiss}>
            {dismissLabel}
          </Button>
        )}
      </div>

      <div className="mt-5">
        <Progress
          value={completed}
          max={total || 1}
          label={resolvedProgressLabel}
          showValue={false}
          aria-label={resolvedProgressLabel}
        />
        <p className="mt-1 text-right font-mono text-[11px] tabular-nums text-brass-bright">
          {pct}%
        </p>
      </div>

      <ul className="mt-5 space-y-1" aria-label="Lista de configuração inicial">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              'flex items-start gap-3 rounded-lg border border-transparent px-2 py-3 transition-colors',
              item.done && 'opacity-80'
            )}
          >
            <span
              className={cn(
                'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                item.done
                  ? 'border-brass bg-gradient-to-b from-brass-bright to-brass text-ink shadow-[0_0_10px_rgb(var(--brass)/0.3)]'
                  : 'border-line bg-panel2 text-vellum-faint'
              )}
              aria-hidden
            >
              {item.done ? (
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              ) : (
                <Circle className="h-3 w-3" strokeWidth={2} />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  'text-sm font-medium',
                  item.done ? 'text-vellum-muted line-through decoration-vellum-faint/60' : 'text-vellum'
                )}
              >
                {item.title}
              </p>
              {item.description && (
                <p className="mt-0.5 text-xs leading-relaxed text-vellum-faint">{item.description}</p>
              )}
            </div>

            {!item.done && item.onAction && (
              <Button
                variant="secondary"
                size="sm"
                className="shrink-0"
                onClick={item.onAction}
              >
                {item.actionLabel ?? 'Começar'}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
