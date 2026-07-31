import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Avatar } from './Avatar'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

export interface MentionOption {
  id: string
  label: string
  handle?: string
  avatarSrc?: string
  description?: string
}

export interface MentionListProps {
  options: MentionOption[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSelect?: (option: MentionOption) => void
  activeId?: string
  /** Trigger element when used as popover */
  children?: ReactNode
  /** Standalone list without popover wrapper */
  standalone?: boolean
  className?: string
  emptyLabel?: string
}

function MentionOptions({
  options,
  onSelect,
  activeId,
  emptyLabel,
  className,
}: {
  options: MentionOption[]
  onSelect?: (option: MentionOption) => void
  activeId?: string
  emptyLabel: string
  className?: string
}) {
  if (!options.length) {
    return (
      <p className={cn('px-3 py-4 text-center text-xs text-vellum-faint', className)}>
        {emptyLabel}
      </p>
    )
  }

  return (
    <ul className={cn('max-h-56 overflow-y-auto py-1', className)} role="listbox">
      {options.map((opt) => {
        const active = activeId === opt.id
        return (
          <li key={opt.id} role="option" aria-selected={active}>
            <button
              type="button"
              className={cn(
                'flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors',
                'hover:bg-panel focus-ring',
                active && 'bg-brass/10'
              )}
              onClick={() => onSelect?.(opt)}
            >
              <Avatar
                size="sm"
                fallback={opt.label}
                src={opt.avatarSrc}
                ring={false}
                tone="neutral"
              />
              <div className="min-w-0">
                <p className="truncate text-sm text-vellum">{opt.label}</p>
                <p className="truncate font-mono text-[10px] text-vellum-faint">
                  {opt.handle ? `@${opt.handle.replace(/^@/, '')}` : opt.description}
                </p>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export function MentionList({
  options,
  open,
  onOpenChange,
  onSelect,
  activeId,
  children,
  standalone = false,
  className,
  emptyLabel = 'Nenhuma menção',
}: MentionListProps) {
  const list = (
    <MentionOptions
      options={options}
      onSelect={onSelect}
      activeId={activeId}
      emptyLabel={emptyLabel}
      className={standalone ? className : undefined}
    />
  )

  if (standalone) {
    return (
      <div
        className={cn(
          'overflow-hidden rounded-lg border border-line bg-panel2 shadow-plate',
          className
        )}
      >
        {list}
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {children && <PopoverTrigger asChild>{children}</PopoverTrigger>}
      <PopoverContent className={cn('w-64 p-0', className)} align="start">
        {list}
      </PopoverContent>
    </Popover>
  )
}
