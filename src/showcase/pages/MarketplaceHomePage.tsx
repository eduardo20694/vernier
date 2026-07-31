import { useState } from 'react'
import {
  Gauge,
  Layers,
  Package,
  ShieldCheck,
  Store,
  Truck,
  Wrench,
} from 'lucide-react'
import { Badge } from '../../components/Badge'
import { Chip } from '../../components/Chip'
import { FilterBar } from '../../components/FilterBar'
import type { ActiveFilter } from '../../components/FilterBar'
import { ProductCard, ProductGrid } from '../../components/ProductCard'
import { Rating } from '../../components/Rating'
import { SearchInput } from '../../components/SearchInput'
import { Avatar } from '../../components/Avatar'
import { MarketingShell } from './MarketingShell'
import { cn } from '../../lib/cn'

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'kits', label: 'Kits' },
  { id: 'tools', label: 'Ferramentas' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'templates', label: 'Templates' },
]

const VENDORS = [
  {
    id: 'atelier',
    name: 'Atelier Oceano',
    rating: 4.9,
    products: 48,
    tone: 'brass' as const,
  },
  {
    id: 'ferro',
    name: 'Ferro & Azul',
    rating: 4.7,
    products: 31,
    tone: 'verdigris' as const,
  },
  {
    id: 'vernier',
    name: 'Oficina Vernier',
    rating: 5,
    products: 62,
    tone: 'neutral' as const,
  },
]

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Compra protegida' },
  { icon: Truck, label: 'Envio rastreado' },
  { icon: Package, label: 'Devolução em 30 dias' },
]

export function MarketplaceHomePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])

  function selectCategory(id: string, label: string) {
    setCategory(id)
    if (id === 'all') {
      setActiveFilters([])
    } else {
      setActiveFilters([{ id: `cat-${id}`, label, tone: 'brass' }])
    }
  }

  return (
    <MarketingShell>
      <div className="border-b border-line bg-panel/40 px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
            Marketplace Vernier
          </p>
          <h1 className="mt-2 font-display text-3xl text-vellum">
            Lojas independentes, um só oceano
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-vellum-muted">
            Kits, ferramentas e templates de criadores verificados — curadoria multi-vendor com
            confiança de instrumento.
          </p>
          <div className="mt-6 max-w-xl">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery('')}
              placeholder="Buscar lojas, produtos ou criadores…"
              aria-label="Buscar no marketplace"
            />
          </div>
        </div>
      </div>

      <div className="px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl space-y-10">
          <FilterBar
            active={activeFilters}
            onRemove={() => selectCategory('all', 'Todos')}
            onClearAll={() => selectCategory('all', 'Todos')}
          >
            {CATEGORIES.map((cat) => (
              <Chip
                key={cat.id}
                tone={cat.id === category ? 'brass' : 'neutral'}
                selected={cat.id === category}
                onClick={() => selectCategory(cat.id, cat.label)}
              >
                {cat.label}
              </Chip>
            ))}
          </FilterBar>

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 className="font-display text-xl text-vellum">Lojas em destaque</h2>
              <Badge tone="verdigris">Verificadas</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {VENDORS.map((vendor) => (
                <article
                  key={vendor.id}
                  className={cn(
                    'flex items-center gap-4 rounded-xl border border-line bg-panel p-4',
                    'transition-colors hover:border-brass-dim/50'
                  )}
                >
                  <Avatar fallback={vendor.name} size="lg" tone={vendor.tone} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Store className="h-3.5 w-3.5 shrink-0 text-brass" aria-hidden />
                      <h3 className="truncate font-medium text-vellum">{vendor.name}</h3>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <Rating value={vendor.rating} readOnly size="sm" />
                      <span className="font-mono text-[10px] text-vellum-faint">
                        {vendor.products} produtos
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-xl text-vellum">Produtos populares</h2>
            <ProductGrid>
              <ProductCard
                title="Calibrador de tokens"
                description="Sincronize paletas dia/noite com precisão de laboratório."
                price="R$ 89,90"
                badge="Mais vendido"
                icon={<Gauge className="h-10 w-10" strokeWidth={1.5} />}
                ctaLabel="Ver na loja"
                onAddToCart={() => undefined}
              />
              <ProductCard
                title="Kit showcase MCP"
                description="Placas numeradas + servidor MCP para instalar no seu app."
                price="R$ 149,00"
                icon={<Layers className="h-10 w-10" strokeWidth={1.5} />}
                ctaLabel="Ver na loja"
                onAddToCart={() => undefined}
              />
              <ProductCard
                title="Chave de ajuste fino"
                description="Ferramenta física para alinhar grids e baseline tipográfico."
                price="R$ 54,00"
                icon={<Wrench className="h-10 w-10" strokeWidth={1.5} />}
                ctaLabel="Ver na loja"
                onAddToCart={() => undefined}
              />
              <ProductCard
                title="Pacote tokens oceano"
                description="JSON + CSS vars para ink, panel e brass luminoso."
                price="R$ 39,90"
                badge="Novo"
                icon={<Package className="h-10 w-10" strokeWidth={1.5} />}
                ctaLabel="Ver na loja"
                onAddToCart={() => undefined}
              />
            </ProductGrid>
          </section>

          <section className="rounded-xl border border-line bg-panel/60 px-5 py-6">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm text-vellum-muted">
                  <Icon className="h-5 w-5 text-verdigris" strokeWidth={1.5} aria-hidden />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </MarketingShell>
  )
}
