import { useMemo, useState } from 'react'
import { ChefHat, Clock, MapPin, UtensilsCrossed } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/Tabs'
import { Button } from '../../components/Button'
import { Badge } from '../../components/Badge'
import { MarketingShell } from './MarketingShell'

interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  category: string
  badge?: string
}

const MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Tartare de atum',
    description: 'Atum fresco, gergelim negro, emulsão cítrica e chips de batata-doce.',
    price: 'R$ 68',
    category: 'entradas',
    badge: 'Chef',
  },
  {
    id: 'm2',
    name: 'Carpaccio de beterraba',
    description: 'Beterraba curada, queijo de cabra, rúcula e redução de balsâmico.',
    price: 'R$ 52',
    category: 'entradas',
  },
  {
    id: 'm3',
    name: 'Robalo grelhado',
    description: 'Purê de mandioquinha, legumes salteados e molho de ervas oceânicas.',
    price: 'R$ 98',
    category: 'principais',
    badge: 'Popular',
  },
  {
    id: 'm4',
    name: 'Risoto de camarão',
    description: 'Arborio, camarões salteados, açafrão e finalização com limão siciliano.',
    price: 'R$ 86',
    category: 'principais',
  },
  {
    id: 'm5',
    name: 'Mousse de chocolate amargo',
    description: '70% cacau, crumble de castanha e gel de frutas vermelhas.',
    price: 'R$ 38',
    category: 'sobremesas',
  },
  {
    id: 'm6',
    name: 'Pavlova tropical',
    description: 'Merengue crocante, creme, manga e maracujá.',
    price: 'R$ 42',
    category: 'sobremesas',
  },
  {
    id: 'm7',
    name: 'Soda oceânica',
    description: 'Gin, tônica artesanal, pepino e zeste de limão.',
    price: 'R$ 32',
    category: 'bebidas',
  },
  {
    id: 'm8',
    name: 'Café Vernier',
    description: 'Blend exclusivo — notas de caramelo e cacau.',
    price: 'R$ 14',
    category: 'bebidas',
  },
]

const CATEGORIES = [
  { id: 'entradas', label: 'Entradas' },
  { id: 'principais', label: 'Principais' },
  { id: 'sobremesas', label: 'Sobremesas' },
  { id: 'bebidas', label: 'Bebidas' },
]

export function RestaurantMenuPage() {
  const [tab, setTab] = useState('entradas')
  const [cartCount, setCartCount] = useState(0)

  const items = useMemo(() => MENU.filter((m) => m.category === tab), [tab])

  return (
    <MarketingShell>
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-panel2/80 to-ink px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <ChefHat className="mx-auto h-8 w-8 text-brass-bright" aria-hidden />
          <h1 className="mt-4 font-display text-4xl text-vellum">Maré & Brasa</h1>
          <p className="mt-2 text-sm text-vellum-muted">
            Cozinha contemporânea com inspiração oceânica — ingredientes locais e técnica precisa.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-vellum-faint">
            <li className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brass" aria-hidden />
              Rua das Palmeiras, 42 — Vila Mariana
            </li>
            <li className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brass" aria-hidden />
              Ter–Dom · 18h–23h
            </li>
          </ul>
        </div>
      </section>

      <div className="px-5 py-8 pb-24 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full justify-start overflow-x-auto">
              {CATEGORIES.map((c) => (
                <TabsTrigger key={c.id} value={c.id}>
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {CATEGORIES.map((c) => (
              <TabsContent key={c.id} value={c.id}>
                <ul className="divide-y divide-line">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 py-5 first:pt-2">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-line bg-panel2/60">
                        <UtensilsCrossed className="h-5 w-5 text-brass/50" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium text-vellum">{item.name}</h3>
                          {item.badge && <Badge tone="brass">{item.badge}</Badge>}
                        </div>
                        <p className="mt-1 text-sm text-vellum-muted">{item.description}</p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <p className="font-display text-lg text-vellum">{item.price}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCartCount((n) => n + 1)}
                        >
                          Adicionar
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-panel2/95 px-4 py-3 shadow-plate backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <p className="text-sm text-vellum-muted">
            {cartCount > 0 ? (
              <>
                <span className="font-medium text-vellum">{cartCount}</span> itens selecionados
              </>
            ) : (
              'Selecione pratos para fazer seu pedido'
            )}
          </p>
          <Button variant="gradient" size="sm" disabled={cartCount === 0}>
            Fazer pedido
          </Button>
        </div>
      </div>
    </MarketingShell>
  )
}
