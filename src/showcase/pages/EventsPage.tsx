import { useMemo, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { FilterBar, type ActiveFilter } from '../../components/FilterBar'
import { EventCard, EventGrid } from '../../components/EventCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/Select'
import { MarketingShell } from './MarketingShell'

const EVENTS = [
  {
    id: 'e1',
    title: 'Vernier Design Summit',
    date: '15 Ago 2026 · 19h',
    venue: 'Centro de Convenções — São Paulo',
    price: 'A partir de R$ 120',
    category: 'Conferência',
    month: 'ago',
    venueKey: 'sp',
    priceKey: 'paid',
  },
  {
    id: 'e2',
    title: 'Workshop: Tokens em produção',
    date: '22 Ago 2026 · 14h',
    venue: 'Hub Criativo — Pinheiros',
    price: 'R$ 89',
    category: 'Workshop',
    month: 'ago',
    venueKey: 'sp',
    priceKey: 'paid',
  },
  {
    id: 'e3',
    title: 'Meetup Vernier Rio',
    date: '30 Ago 2026 · 18h30',
    venue: 'Casa Firme — Botafogo',
    price: 'Gratuito',
    category: 'Meetup',
    month: 'ago',
    venueKey: 'rj',
    priceKey: 'free',
  },
  {
    id: 'e4',
    title: 'Noite de instrumentação UI',
    date: '5 Set 2026 · 20h',
    venue: 'Teatro Blue Steel — Centro, RJ',
    price: 'A partir de R$ 45',
    category: 'Palestra',
    month: 'set',
    venueKey: 'rj',
    priceKey: 'paid',
  },
  {
    id: 'e5',
    title: 'Open Studio Vernier',
    date: '12 Set 2026 · 10h',
    venue: 'Estúdio Vernier — Vila Madalena',
    price: 'Gratuito',
    category: 'Open house',
    month: 'set',
    venueKey: 'sp',
    priceKey: 'free',
  },
  {
    id: 'e6',
    title: 'Curso intensivo de showcase',
    date: '20 Set 2026 · 09h',
    venue: 'Online — transmissão ao vivo',
    price: 'R$ 199',
    category: 'Curso',
    month: 'set',
    venueKey: 'online',
    priceKey: 'paid',
  },
]

export function EventsPage() {
  const [month, setMonth] = useState('all')
  const [venue, setVenue] = useState('all')
  const [priceType, setPriceType] = useState('all')
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])

  function syncFilters(m: string, v: string, p: string) {
    const next: ActiveFilter[] = []
    if (m !== 'all') {
      const labels: Record<string, string> = { ago: 'Agosto', set: 'Setembro' }
      next.push({ id: 'month', label: labels[m] ?? m, tone: 'brass' })
    }
    if (v !== 'all') {
      const labels: Record<string, string> = {
        sp: 'São Paulo',
        rj: 'Rio de Janeiro',
        online: 'Online',
      }
      next.push({ id: 'venue', label: labels[v] ?? v, tone: 'verdigris' })
    }
    if (p !== 'all') {
      next.push({
        id: 'price',
        label: p === 'free' ? 'Gratuito' : 'Pago',
        tone: 'neutral',
      })
    }
    setActiveFilters(next)
  }

  const filtered = useMemo(() => {
    return EVENTS.filter((e) => {
      if (month !== 'all' && e.month !== month) return false
      if (venue !== 'all' && e.venueKey !== venue) return false
      if (priceType !== 'all' && e.priceKey !== priceType) return false
      return true
    })
  }, [month, venue, priceType])

  return (
    <MarketingShell>
      <div className="border-b border-line bg-panel/40 px-5 py-3 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center gap-2">
          <CalendarDays className="h-4 w-4 text-brass-bright" aria-hidden />
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
            Vernier Eventos
          </p>
        </div>
      </div>

      <div className="px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-6 max-w-2xl">
            <h1 className="font-display text-3xl text-vellum">Próximos eventos</h1>
            <p className="mt-2 text-sm text-vellum-muted">
              Conferências, workshops e meetups da comunidade Vernier.
            </p>
          </header>

          <FilterBar
            active={activeFilters}
            onRemove={(id) => {
              if (id === 'month') {
                setMonth('all')
                syncFilters('all', venue, priceType)
              } else if (id === 'venue') {
                setVenue('all')
                syncFilters(month, 'all', priceType)
              } else {
                setPriceType('all')
                syncFilters(month, venue, 'all')
              }
            }}
            onClearAll={() => {
              setMonth('all')
              setVenue('all')
              setPriceType('all')
              setActiveFilters([])
            }}
          >
            <Select
              value={month}
              onValueChange={(v) => {
                setMonth(v)
                syncFilters(v, venue, priceType)
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer mês</SelectItem>
                <SelectItem value="ago">Agosto</SelectItem>
                <SelectItem value="set">Setembro</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={venue}
              onValueChange={(v) => {
                setVenue(v)
                syncFilters(month, v, priceType)
              }}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Local" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer local</SelectItem>
                <SelectItem value="sp">São Paulo</SelectItem>
                <SelectItem value="rj">Rio de Janeiro</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={priceType}
              onValueChange={(v) => {
                setPriceType(v)
                syncFilters(month, venue, v)
              }}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer</SelectItem>
                <SelectItem value="free">Gratuito</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
              </SelectContent>
            </Select>
          </FilterBar>

          <p className="mb-4 mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-vellum-faint">
            {filtered.length} eventos
          </p>
          <EventGrid>
            {filtered.map((e) => (
              <EventCard
                key={e.id}
                title={e.title}
                date={e.date}
                venue={e.venue}
                price={e.price}
                category={e.category}
                onView={() => undefined}
              />
            ))}
          </EventGrid>
        </div>
      </div>
    </MarketingShell>
  )
}
