import { Compass, Gauge, Layers, MapPin, Package } from 'lucide-react'
import { Avatar } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import { ProductCard, ProductGrid } from '../../components/ProductCard'
import { Rating } from '../../components/Rating'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/Tabs'
import { MarketingShell } from './MarketingShell'

export function MarketplaceVendorPage() {
  return (
    <MarketingShell>
      <div className="border-b border-line bg-gradient-to-b from-panel/80 to-ink px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end">
          <Avatar fallback="Atelier Oceano" size="lg" tone="brass" className="h-20 w-20 text-lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-3xl text-vellum">Atelier Oceano</h1>
              <Badge tone="verdigris">Verificada</Badge>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-vellum-muted">
              Kits de calibração e ferramentas para interfaces no azul oceano — desde 2019.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Rating value={4.9} readOnly size="md" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
                4,9 · 128 avaliações · 48 produtos
              </span>
              <span className="flex items-center gap-1 text-xs text-vellum-faint">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Florianópolis, BR
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Tabs defaultValue="products">
            <TabsList>
              <TabsTrigger value="products">Produtos</TabsTrigger>
              <TabsTrigger value="about">Sobre</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <ProductGrid className="mt-2">
                <ProductCard
                  title="Calibrador de tokens"
                  description="Kit completo para sincronizar paletas dia/noite."
                  price="R$ 89,90"
                  badge="Destaque"
                  icon={<Gauge className="h-10 w-10" strokeWidth={1.5} />}
                  ctaLabel="Comprar"
                  onAddToCart={() => undefined}
                />
                <ProductCard
                  title="Bússola de grid"
                  description="Alinhamento visual para layouts responsivos."
                  price="R$ 72,00"
                  icon={<Compass className="h-10 w-10" strokeWidth={1.5} />}
                  ctaLabel="Comprar"
                  onAddToCart={() => undefined}
                />
                <ProductCard
                  title="Kit showcase"
                  description="Placas numeradas + MCP para instalar no seu app."
                  price="R$ 149,00"
                  icon={<Layers className="h-10 w-10" strokeWidth={1.5} />}
                  ctaLabel="Comprar"
                  onAddToCart={() => undefined}
                />
                <ProductCard
                  title="Estojo de transporte"
                  description="Case rígido para ferramentas de calibração."
                  price="R$ 119,00"
                  icon={<Package className="h-10 w-10" strokeWidth={1.5} />}
                  ctaLabel="Comprar"
                  onAddToCart={() => undefined}
                />
              </ProductGrid>
            </TabsContent>

            <TabsContent value="about">
              <div className="mt-2 max-w-2xl space-y-4 rounded-xl border border-line bg-panel p-6">
                <h2 className="font-display text-lg text-vellum">Nossa história</h2>
                <p className="text-sm leading-relaxed text-vellum-muted">
                  O Atelier Oceano nasceu da oficina Vernier como braço independente de kits
                  físicos e digitais. Cada produto passa por calibração manual antes do envio.
                </p>
                <p className="text-sm leading-relaxed text-vellum-muted">
                  Trabalhamos com design systems, estúdios de produto e equipes que precisam de
                  consistência visual entre hardware e software.
                </p>
                <dl className="grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
                      Desde
                    </dt>
                    <dd className="mt-0.5 text-sm text-vellum">2019</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
                      Tempo de resposta
                    </dt>
                    <dd className="mt-0.5 text-sm text-vellum">&lt; 24 h</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
                      Política de devolução
                    </dt>
                    <dd className="mt-0.5 text-sm text-vellum">30 dias</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
                      Envio
                    </dt>
                    <dd className="mt-0.5 text-sm text-vellum">Nacional e internacional</dd>
                  </div>
                </dl>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MarketingShell>
  )
}
