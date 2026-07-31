import { useState } from 'react'
import { Gauge, Layers, Ruler, ShoppingBag, ShoppingCart } from 'lucide-react'
import { Breadcrumb } from '../../components/Breadcrumb'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { CartDrawer } from '../../components/CartDrawer'
import { ProductCard, ProductGrid } from '../../components/ProductCard'
import { QuantityInput } from '../../components/QuantityInput'
import { Rating } from '../../components/Rating'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/Tabs'
import { MarketingShell } from './MarketingShell'
import { DEFAULT_CART_ITEMS } from './demoData'
import { FEATURED_PRODUCT, RELATED_PRODUCTS, formatBRL } from './commerceDemoData'

const GALLERY_FRAMES = [
  { id: 'front', label: 'Vista frontal', icon: Gauge },
  { id: 'side', label: 'Perfil', icon: Ruler },
  { id: 'kit', label: 'Conteúdo', icon: Layers },
] as const

export function ProductDetailPage() {
  const [activeFrame, setActiveFrame] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState(DEFAULT_CART_ITEMS)

  const product = FEATURED_PRODUCT
  const ActiveIcon = GALLERY_FRAMES[activeFrame].icon

  function updateCartQty(id: string, qty: number) {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)))
  }

  function removeCartItem(id: string) {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  function handleAddToCart() {
    setCartOpen(true)
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

      <div className="px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb
            items={[
              { label: 'Loja', href: '#' },
              { label: 'Kits de calibração', href: '#' },
              { label: product.title, current: true },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-line bg-gradient-to-b from-panel2 to-panel">
                <div className="flex h-full w-full items-center justify-center text-brass">
                  <ActiveIcon className="h-24 w-24" strokeWidth={1.25} aria-hidden />
                </div>
                {product.badge && (
                  <Badge tone="brass" className="absolute left-4 top-4">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <ul className="flex gap-3" aria-label="Miniaturas do produto">
                {GALLERY_FRAMES.map((frame, i) => {
                  const Icon = frame.icon
                  const selected = i === activeFrame
                  return (
                    <li key={frame.id}>
                      <button
                        type="button"
                        onClick={() => setActiveFrame(i)}
                        aria-label={frame.label}
                        aria-pressed={selected}
                        className={
                          selected
                            ? 'flex h-16 w-16 items-center justify-center rounded-lg border border-brass bg-brass/10 text-brass-bright focus-ring'
                            : 'flex h-16 w-16 items-center justify-center rounded-lg border border-line bg-panel text-vellum-muted transition-colors hover:border-brass-dim/60 focus-ring'
                        }
                      >
                        <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div>
              <h1 className="font-display text-3xl text-vellum">{product.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Rating value={Math.round(product.rating)} readOnly size="sm" />
                <span className="text-sm text-vellum-muted">
                  {product.rating.toFixed(1)} · {product.reviewCount} avaliações
                </span>
              </div>
              <p className="mt-4 font-display text-3xl text-vellum">{formatBRL(product.price)}</p>
              <p className="mt-3 text-sm leading-relaxed text-vellum-muted">{product.description}</p>

              <div className="mt-8 flex flex-wrap items-end gap-4">
                <QuantityInput
                  label="Quantidade"
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={99}
                />
                <Button variant="gradient" className="min-w-[12rem] flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4" aria-hidden />
                  Adicionar ao carrinho
                </Button>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-vellum-muted">
                <li>Envio para todo o Brasil</li>
                <li>Garantia Vernier de 12 meses</li>
                <li>Suporte por e-mail em PT-BR</li>
              </ul>
            </div>
          </div>

          <div className="mt-14">
            <Tabs defaultValue="descricao">
              <TabsList>
                <TabsTrigger value="descricao">Descrição</TabsTrigger>
                <TabsTrigger value="especificacoes">Especificações</TabsTrigger>
                <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
              </TabsList>
              <TabsContent value="descricao">
                <p className="max-w-3xl text-sm leading-relaxed text-vellum-muted">
                  {product.longDescription}
                </p>
              </TabsContent>
              <TabsContent value="especificacoes">
                <dl className="grid max-w-xl gap-3 text-sm sm:grid-cols-2">
                  <div className="rounded-lg border border-line bg-panel/50 px-4 py-3">
                    <dt className="text-vellum-faint">Material</dt>
                    <dd className="mt-1 text-vellum">Aço oceano + acrílico fumê</dd>
                  </div>
                  <div className="rounded-lg border border-line bg-panel/50 px-4 py-3">
                    <dt className="text-vellum-faint">Dimensões</dt>
                    <dd className="mt-1 text-vellum">18 × 12 × 4 cm</dd>
                  </div>
                  <div className="rounded-lg border border-line bg-panel/50 px-4 py-3">
                    <dt className="text-vellum-faint">Peso</dt>
                    <dd className="mt-1 text-vellum">420 g</dd>
                  </div>
                  <div className="rounded-lg border border-line bg-panel/50 px-4 py-3">
                    <dt className="text-vellum-faint">SKU</dt>
                    <dd className="mt-1 font-mono text-vellum">VNR-CAL-001</dd>
                  </div>
                </dl>
              </TabsContent>
              <TabsContent value="avaliacoes">
                <ul className="max-w-2xl space-y-4">
                  <li className="rounded-xl border border-line bg-panel/50 p-4">
                    <div className="flex items-center gap-2">
                      <Rating value={5} readOnly size="sm" />
                      <span className="text-sm font-medium text-vellum">Marina Costa</span>
                    </div>
                    <p className="mt-2 text-sm text-vellum-muted">
                      Sincronizou nossa paleta dia/noite em uma tarde. O guia de migração vale cada centavo.
                    </p>
                  </li>
                  <li className="rounded-xl border border-line bg-panel/50 p-4">
                    <div className="flex items-center gap-2">
                      <Rating value={4} readOnly size="sm" />
                      <span className="text-sm font-medium text-vellum">Rafael Mendes</span>
                    </div>
                    <p className="mt-2 text-sm text-vellum-muted">
                      Acabamento impecável. Só faltou versão digital do cartão de contraste.
                    </p>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>

          <section className="mt-16 border-t border-line pt-12">
            <header className="mb-6">
              <h2 className="font-display text-2xl text-vellum">Produtos relacionados</h2>
              <p className="mt-1 text-sm text-vellum-muted">
                Outros itens da linha de calibração Vernier.
              </p>
            </header>
            <ProductGrid>
              {RELATED_PRODUCTS.map((item) => (
                <ProductCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  price={formatBRL(item.price)}
                  badge={item.badge}
                  icon={
                    item.id === 'p2' ? (
                      <Layers className="h-10 w-10" strokeWidth={1.5} />
                    ) : item.id === 'p3' ? (
                      <Ruler className="h-10 w-10" strokeWidth={1.5} />
                    ) : (
                      <Gauge className="h-10 w-10" strokeWidth={1.5} />
                    )
                  }
                  onAddToCart={() => setCartOpen(true)}
                />
              ))}
            </ProductGrid>
          </section>
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
