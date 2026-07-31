import type { HTMLAttributes, ReactNode } from 'react'
import { ImageIcon, ShoppingCart } from 'lucide-react'
import { cn } from '../lib/cn'
import { Badge } from './Badge'
import { Button } from './Button'
import { QuantityInput } from './QuantityInput'

export interface ProductCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string
  description?: string
  price: string
  imageSrc?: string
  icon?: ReactNode
  badge?: string
  quantity?: number
  onQuantityChange?: (value: number) => void
  onAddToCart?: () => void
  ctaLabel?: string
}

export function ProductCard({
  className,
  title,
  description,
  price,
  imageSrc,
  icon,
  badge,
  quantity,
  onQuantityChange,
  onAddToCart,
  ctaLabel = 'Adicionar ao carrinho',
  ...props
}: ProductCardProps) {
  const showQuantity = quantity != null && onQuantityChange != null

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-line bg-panel',
        'transition-colors hover:border-brass-dim/50',
        className
      )}
      {...props}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-gradient-to-b from-panel2 to-panel">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : icon ? (
          <div className="flex h-full w-full items-center justify-center text-brass">{icon}</div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-vellum-faint">
            <ImageIcon className="h-8 w-8" strokeWidth={1.25} aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Sem imagem</span>
          </div>
        )}
        {badge && (
          <Badge tone="brass" className="absolute left-3 top-3">
            {badge}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-medium text-vellum">{title}</h3>
        {description && (
          <p className="mt-1.5 flex-1 text-sm leading-relaxed text-vellum-muted">{description}</p>
        )}
        <p className="mt-4 font-display text-2xl text-vellum">{price}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {showQuantity && (
            <QuantityInput
              value={quantity}
              onChange={onQuantityChange}
              min={1}
              size="sm"
              aria-label={`Quantidade de ${title}`}
            />
          )}
          {onAddToCart && (
            <Button
              className={cn(showQuantity ? 'flex-1 min-w-[8rem]' : 'w-full')}
              variant="gradient"
              size="sm"
              onClick={onAddToCart}
            >
              <ShoppingCart className="h-4 w-4" aria-hidden />
              {ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

export interface ProductGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function ProductGrid({ className, children, ...props }: ProductGridProps) {
  return (
    <div
      className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}
