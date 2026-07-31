import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'
import { Avatar } from './Avatar'
import { Chip } from './Chip'

export type ConvenioProduct = 'CLT' | 'FGTS' | 'INSS'

export interface BankConvenioItem {
  id: string
  name: string
  initials?: string
  available: ConvenioProduct[]
  disabled?: boolean
  hint?: string
}

export interface BankConvenioSelectorProps extends HTMLAttributes<HTMLDivElement> {
  items: BankConvenioItem[]
  value?: string
  onValueChange?: (id: string) => void
  variant?: 'cards' | 'list'
}

const ALL_PRODUCTS: ConvenioProduct[] = ['CLT', 'FGTS', 'INSS']

function ProductChips({
  available,
  muted,
}: {
  available: ConvenioProduct[]
  muted?: boolean
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ALL_PRODUCTS.map((product) => {
        const isAvailable = available.includes(product)
        return (
          <Chip
            key={product}
            tone={isAvailable && !muted ? 'verdigris' : 'neutral'}
            selected={false}
            className={cn(
              'pointer-events-none h-6 px-2 text-[10px]',
              (!isAvailable || muted) && 'opacity-45'
            )}
          >
            {product}
          </Chip>
        )
      })}
    </div>
  )
}

function BankCard({
  item,
  selected,
  onSelect,
}: {
  item: BankConvenioItem
  selected: boolean
  onSelect: () => void
}) {
  const disabled = item.disabled === true

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'flex w-full flex-col gap-3 rounded-lg border p-4 text-left transition-all duration-150 focus-ring',
        disabled
          ? 'cursor-not-allowed border-rust-dim/30 bg-panel/40 opacity-60'
          : selected
            ? 'border-brass bg-brass/[0.08] shadow-[0_0_0_1px_rgb(var(--brass)/0.2),inset_0_1px_0_rgb(var(--brass)/0.1)]'
            : 'border-line bg-gradient-to-b from-panel2 to-panel hover:border-brass-dim/50 hover:bg-panel2/80'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar
            fallback={item.initials ?? item.name}
            size="md"
            tone={disabled ? 'rust' : selected ? 'brass' : 'neutral'}
          />
          <div>
            <p className="font-medium text-vellum">{item.name}</p>
            {disabled ? (
              <p className="mt-0.5 text-xs text-rust">Indisponível</p>
            ) : item.hint ? (
              <p className="mt-0.5 text-xs text-vellum-faint">{item.hint}</p>
            ) : null}
          </div>
        </div>
        {!disabled && (
          <span
            className={cn(
              'mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
              selected ? 'border-brass bg-brass/15' : 'border-line bg-panel'
            )}
            aria-hidden
          >
            {selected && (
              <span className="h-2 w-2 rounded-full bg-brass-bright shadow-[0_0_6px_rgb(var(--brass)/0.55)]" />
            )}
          </span>
        )}
      </div>
      <ProductChips available={item.available} muted={disabled} />
    </button>
  )
}

function BankListRow({
  item,
  selected,
  onSelect,
}: {
  item: BankConvenioItem
  selected: boolean
  onSelect: () => void
}) {
  const disabled = item.disabled === true

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'flex w-full items-center gap-3 border-b border-line px-3 py-2.5 text-left transition-colors focus-ring last:border-b-0',
        disabled
          ? 'cursor-not-allowed bg-panel/30 opacity-55'
          : selected
            ? 'bg-brass/[0.08]'
            : 'hover:bg-panel2/60'
      )}
    >
      <span
        className={cn(
          'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
          disabled ? 'border-line/50' : selected ? 'border-brass bg-brass/15' : 'border-line bg-panel'
        )}
        aria-hidden
      >
        {selected && !disabled && (
          <span className="h-2 w-2 rounded-full bg-brass-bright shadow-[0_0_6px_rgb(var(--brass)/0.55)]" />
        )}
      </span>

      <Avatar
        fallback={item.initials ?? item.name}
        size="sm"
        tone={disabled ? 'rust' : 'neutral'}
        ring={false}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-vellum">{item.name}</span>
          {disabled && (
            <span className="shrink-0 text-[10px] uppercase tracking-wide text-rust">
              Indisponível
            </span>
          )}
        </div>
        {item.hint && !disabled && (
          <p className="truncate text-xs text-vellum-faint">{item.hint}</p>
        )}
      </div>

      <ProductChips available={item.available} muted={disabled} />
    </button>
  )
}

export function BankConvenioSelector({
  items,
  value,
  onValueChange,
  variant = 'cards',
  className,
  ...props
}: BankConvenioSelectorProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {variant === 'cards' ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <BankCard
              key={item.id}
              item={item}
              selected={value === item.id}
              onSelect={() => !item.disabled && onValueChange?.(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-line">
          {items.map((item) => (
            <BankListRow
              key={item.id}
              item={item}
              selected={value === item.id}
              onSelect={() => !item.disabled && onValueChange?.(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
