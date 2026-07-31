import { useState } from 'react'
import { Gauge, Layers, ShoppingBag } from 'lucide-react'
import { ProductCard, ProductGrid } from '../../components/ProductCard'
import { CartDrawer } from '../../components/CartDrawer'
import { Button } from '../../components/Button'
import { MarketingShell } from './MarketingShell'
import { DEFAULT_CART_ITEMS } from './demoData'

export function CommerceShopPage() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState(DEFAULT_CART_ITEMS)
  const [qtyA, setQtyA] = useState(1)
  const [qtyB, setQtyB] = useState(2)

  function updateCartQty(id: string, quantity: number) {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  function removeCartItem(id: string) {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <MarketingShell>
      <div className="border-b border-line bg-panel/40 px-5 py-3 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
            Loja Vernier
          </p>
          <Button variant="primary" size="sm" onClick={() => setCartOpen(true)}>
            <ShoppingBag className="h-4 w-4" aria-hidden />
            Carrinho ({cartItems.length})
          </Button>
        </div>
      </div>
      <div className="px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 max-w-2xl">
            <h1 className="font-display text-3xl text-vellum">Kits de calibração</h1>
            <p className="mt-2 text-sm text-vellum-muted">
              Ferramentas físicas e digitais para manter sua interface no azul oceano.
            </p>
          </header>
          <ProductGrid>
            <ProductCard
              title="Calibrador de tokens"
              description="Kit completo para sincronizar paletas dia/noite."
              price="R$ 89,90"
              badge="Novo"
              icon={<Gauge className="h-10 w-10" strokeWidth={1.5} />}
              quantity={qtyA}
              onQuantityChange={setQtyA}
              onAddToCart={() => setCartOpen(true)}
            />
            <ProductCard
              title="Kit showcase"
              description="Placas numeradas + MCP para instalar no seu app."
              price="R$ 149,00"
              icon={<Layers className="h-10 w-10" strokeWidth={1.5} />}
              quantity={qtyB}
              onQuantityChange={setQtyB}
              onAddToCart={() => setCartOpen(true)}
            />
          </ProductGrid>
        </div>
      </div>
      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateQty={updateCartQty}
        onRemove={removeCartItem}
        onCheckout={() => setCartOpen(false)}
      />
    </MarketingShell>
  )
}
