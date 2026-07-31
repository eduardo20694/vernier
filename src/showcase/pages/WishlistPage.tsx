import { useState } from 'react'
import { Gauge, Heart, Layers, Ruler, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '../../components/Button'
import { Badge } from '../../components/Badge'
import { Breadcrumb } from '../../components/Breadcrumb'
import { IconButton } from '../../components/IconButton'
import { MarketingShell } from './MarketingShell'
import { type CommerceProduct, WISHLIST_INITIAL, formatBRL } from './commerceDemoData'

function productIcon(id: string) {
  if (id === 'p2') return <Layers className="h-10 w-10" strokeWidth={1.5} />
  if (id === 'p3') return <Ruler className="h-10 w-10" strokeWidth={1.5} />
  return <Gauge className="h-10 w-10" strokeWidth={1.5} />
}

function WishlistCard({
  product,
  onRemove,
  onMoveToCart,
}: {
  product: CommerceProduct
  onRemove: () => void
  onMoveToCart: () => void
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition-colors hover:border-brass-dim/50">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-gradient-to-b from-panel2 to-panel">
        <div className="flex h-full w-full items-center justify-center text-brass">
          {productIcon(product.id)}
        </div>
        {product.badge && (
          <Badge tone="brass" className="absolute left-3 top-3">
            {product.badge}
          </Badge>
        )}
        <IconButton
          label="Remover da lista"
          tone="rust"
          size="sm"
          onClick={onRemove}
          className="absolute right-3 top-3 bg-ink/80"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </IconButton>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-medium text-vellum">{product.title}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-vellum-muted">
          {product.description}
        </p>
        <p className="mt-4 font-display text-2xl text-vellum">{formatBRL(product.price)}</p>
        <Button variant="gradient" size="sm" className="mt-5 w-full" onClick={onMoveToCart}>
          <ShoppingCart className="h-4 w-4" aria-hidden />
          Mover para o carrinho
        </Button>
      </div>
    </article>
  )
}

export function WishlistPage() {
  const [items, setItems] = useState(WISHLIST_INITIAL)
  const [movedIds, setMovedIds] = useState<string[]>([])

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  function moveToCart(id: string) {
    setMovedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    removeItem(id)
  }

  return (
    <MarketingShell>
      <div className="border-b border-line bg-panel/40 px-5 py-3 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
            Loja Vernier
          </p>
          <Button variant="ghost" size="sm">
            <ShoppingBag className="h-4 w-4" aria-hidden />
            Carrinho
          </Button>
        </div>
      </div>

      <div className="px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb
            items={[
              { label: 'Loja', href: '#' },
              { label: 'Lista de desejos', current: true },
            ]}
          />

          <header className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-brass-bright" aria-hidden />
                <h1 className="font-display text-3xl text-vellum">Lista de desejos</h1>
              </div>
              <p className="mt-2 text-sm text-vellum-muted">
                {items.length} {items.length === 1 ? 'item salvo' : 'itens salvos'} para comprar depois.
              </p>
            </div>
            {movedIds.length > 0 && (
              <p className="rounded-lg border border-verdigris-dim/50 bg-verdigris/10 px-3 py-2 text-sm text-verdigris">
                {movedIds.length} {movedIds.length === 1 ? 'item movido' : 'itens movidos'} para o carrinho.
              </p>
            )}
          </header>

          {items.length === 0 ? (
            <div className="mt-12 rounded-xl border border-dashed border-line bg-panel/30 px-6 py-16 text-center">
              <Heart className="mx-auto h-10 w-10 text-vellum-faint" strokeWidth={1.25} aria-hidden />
              <p className="mt-4 font-display text-xl text-vellum">Sua lista está vazia</p>
              <p className="mt-2 text-sm text-vellum-muted">
                Explore a loja e salve produtos para comprar mais tarde.
              </p>
              <Button variant="primary" size="sm" className="mt-6">
                Ver loja
              </Button>
            </div>
          ) : (
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((product) => (
                <li key={product.id}>
                  <WishlistCard
                    product={product}
                    onRemove={() => removeItem(product.id)}
                    onMoveToCart={() => moveToCart(product.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </MarketingShell>
  )
}
