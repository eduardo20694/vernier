import { useMemo, useState } from 'react'
import { Building2, Map } from 'lucide-react'
import { FilterBar, type ActiveFilter } from '../../components/FilterBar'
import { PropertyCard, PropertyGrid } from '../../components/PropertyCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/Select'
import { MarketingShell } from './MarketingShell'

const PROPERTIES = [
  {
    id: 'p1',
    title: 'Cobertura vista mar',
    address: 'Av. Atlântica, 1200 — Copacabana, RJ',
    price: 'R$ 2.890.000',
    bedrooms: 4,
    bathrooms: 3,
    area: 210,
    badge: 'Destaque',
  },
  {
    id: 'p2',
    title: 'Apartamento jardim',
    address: 'Rua Oscar Freire, 450 — Pinheiros, SP',
    price: 'R$ 1.450.000',
    bedrooms: 3,
    bathrooms: 2,
    area: 128,
  },
  {
    id: 'p3',
    title: 'Studio iluminado',
    address: 'Rua da Consolação, 88 — Centro, SP',
    price: 'R$ 680.000',
    bedrooms: 1,
    bathrooms: 1,
    area: 52,
    badge: 'Novo',
  },
  {
    id: 'p4',
    title: 'Casa com piscina',
    address: 'Alameda Santos, 2200 — Jardins, SP',
    price: 'R$ 3.200.000',
    bedrooms: 5,
    bathrooms: 4,
    area: 340,
  },
]

function MapPlaceholderPanel() {
  return (
    <div
      aria-label="Mapa ilustrativo — placeholder"
      className="relative h-full min-h-[320px] overflow-hidden rounded-xl border border-line bg-panel2/60 lg:min-h-0 lg:sticky lg:top-4"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--line)/0.35) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line)/0.35) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-24 w-24">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-brass-dim/50" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-brass-dim/50" />
          <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brass bg-brass/20 shadow-[0_0_20px_rgb(var(--brass)/0.35)]" />
          <span className="absolute left-[65%] top-[35%] h-2.5 w-2.5 rounded-full border border-brass-dim bg-brass/30" />
          <span className="absolute left-[30%] top-[60%] h-2.5 w-2.5 rounded-full border border-brass-dim bg-brass/30" />
          <span className="absolute left-[55%] top-[70%] h-2.5 w-2.5 rounded-full border border-brass-dim bg-brass/30" />
        </div>
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <Map className="h-3.5 w-3.5 text-brass" aria-hidden />
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-vellum-faint">
          Mapa ilustrativo
        </p>
      </div>
    </div>
  )
}

export function RealEstateListingPage() {
  const [priceRange, setPriceRange] = useState('all')
  const [bedrooms, setBedrooms] = useState('all')
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])

  function syncFilters(price: string, beds: string) {
    const next: ActiveFilter[] = []
    if (price !== 'all') {
      const labels: Record<string, string> = {
        'under-1m': 'Até R$ 1M',
        '1m-2m': 'R$ 1M – 2M',
        'over-2m': 'Acima de R$ 2M',
      }
      next.push({ id: 'price', label: labels[price] ?? price, tone: 'brass' })
    }
    if (beds !== 'all') {
      next.push({ id: 'beds', label: `${beds}+ quartos`, tone: 'verdigris' })
    }
    setActiveFilters(next)
  }

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      const priceNum = parseInt(p.price.replace(/\D/g, ''), 10)
      if (priceRange === 'under-1m' && priceNum >= 1_000_000) return false
      if (priceRange === '1m-2m' && (priceNum < 1_000_000 || priceNum > 2_000_000)) return false
      if (priceRange === 'over-2m' && priceNum <= 2_000_000) return false
      if (bedrooms !== 'all' && p.bedrooms < Number(bedrooms)) return false
      return true
    })
  }, [priceRange, bedrooms])

  return (
    <MarketingShell>
      <div className="border-b border-line bg-panel/40 px-5 py-3 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center gap-2">
          <Building2 className="h-4 w-4 text-brass-bright" aria-hidden />
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
            Vernier Imóveis
          </p>
        </div>
      </div>

      <div className="px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-6 max-w-2xl">
            <h1 className="font-display text-3xl text-vellum">Imóveis disponíveis</h1>
            <p className="mt-2 text-sm text-vellum-muted">
              Explore apartamentos e casas selecionados — filtros por preço e quartos.
            </p>
          </header>

          <FilterBar
            active={activeFilters}
            onRemove={(id) => {
              if (id === 'price') {
                setPriceRange('all')
                syncFilters('all', bedrooms)
              } else {
                setBedrooms('all')
                syncFilters(priceRange, 'all')
              }
            }}
            onClearAll={() => {
              setPriceRange('all')
              setBedrooms('all')
              setActiveFilters([])
            }}
          >
            <Select
              value={priceRange}
              onValueChange={(v) => {
                setPriceRange(v)
                syncFilters(v, bedrooms)
              }}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer preço</SelectItem>
                <SelectItem value="under-1m">Até R$ 1M</SelectItem>
                <SelectItem value="1m-2m">R$ 1M – 2M</SelectItem>
                <SelectItem value="over-2m">Acima de R$ 2M</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={bedrooms}
              onValueChange={(v) => {
                setBedrooms(v)
                syncFilters(priceRange, v)
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Quartos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer</SelectItem>
                <SelectItem value="1">1+ quartos</SelectItem>
                <SelectItem value="2">2+ quartos</SelectItem>
                <SelectItem value="3">3+ quartos</SelectItem>
                <SelectItem value="4">4+ quartos</SelectItem>
              </SelectContent>
            </Select>
          </FilterBar>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_minmax(240px,380px)]">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-vellum-faint">
                {filtered.length} imóveis
              </p>
              <PropertyGrid>
                {filtered.map((p) => (
                  <PropertyCard key={p.id} {...p} onView={() => undefined} />
                ))}
              </PropertyGrid>
            </div>
            <MapPlaceholderPanel />
          </div>
        </div>
      </div>
    </MarketingShell>
  )
}
