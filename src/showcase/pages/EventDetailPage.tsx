import { useState } from 'react'
import { CalendarDays, MapPin, Ticket } from 'lucide-react'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { QuantityInput } from '../../components/QuantityInput'
import { MarketingShell } from './MarketingShell'

const TIERS = [
  {
    id: 'general',
    name: 'Ingresso geral',
    price: 120,
    description: 'Acesso a todas as palestras e área de networking.',
    max: 4,
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 280,
    description: 'Assentos reservados, coffee break premium e kit Vernier.',
    max: 2,
  },
  {
    id: 'workshop',
    name: 'Workshop add-on',
    price: 89,
    description: 'Sessão prática de tokens — vagas limitadas.',
    max: 1,
  },
]

export function EventDetailPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    general: 1,
    vip: 0,
    workshop: 0,
  })

  const total = TIERS.reduce((sum, t) => sum + t.price * (quantities[t.id] ?? 0), 0)
  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0)

  return (
    <MarketingShell>
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-panel2/80 to-ink">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8">
          <Badge tone="verdigris" className="mb-4">
            Conferência
          </Badge>
          <h1 className="font-display text-4xl text-vellum">Vernier Design Summit</h1>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-vellum-muted">
            <li className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-brass" aria-hidden />
              15 Ago 2026 · 19h – 22h
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brass" aria-hidden />
              Centro de Convenções — São Paulo
            </li>
          </ul>
        </div>
      </section>

      <div className="px-5 py-8 sm:px-8">
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <h2 className="font-display text-xl text-vellum">Sobre o evento</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-vellum-muted">
              <p>
                Um encontro anual para designers e engenheiros que constroem interfaces com
                precisão de instrumento. Palestras sobre tokens, acessibilidade, showcase como
                catálogo vivo e integração via MCP.
              </p>
              <p>
                Networking ao final com coffee break e demonstrações ao vivo da biblioteca Vernier
                em modo dia e noite.
              </p>
            </div>

            <ul className="mt-8 space-y-3 border-t border-line pt-6 text-sm text-vellum-muted">
              <li className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-brass" aria-hidden />
                Capacidade: 320 participantes
              </li>
              <li className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-brass" aria-hidden />
                Check-in a partir das 18h30
              </li>
            </ul>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
            <div className="rounded-xl border border-line bg-panel p-5 shadow-plate">
              <h2 className="font-display text-lg text-vellum">Ingressos</h2>
              <ul className="mt-4 space-y-5">
                {TIERS.map((tier) => (
                  <li key={tier.id} className="border-b border-line pb-5 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-vellum">{tier.name}</p>
                        <p className="mt-0.5 text-xs text-vellum-faint">{tier.description}</p>
                        <p className="mt-2 font-display text-lg text-vellum">
                          R$ {tier.price.toFixed(0)}
                        </p>
                      </div>
                      <QuantityInput
                        value={quantities[tier.id] ?? 0}
                        onChange={(v) =>
                          setQuantities((prev) => ({ ...prev, [tier.id]: v }))
                        }
                        min={0}
                        max={tier.max}
                        size="sm"
                        aria-label={`Quantidade ${tier.name}`}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-sm text-vellum-muted">
                  {totalTickets} ingresso{totalTickets !== 1 ? 's' : ''}
                </span>
                <span className="font-display text-xl text-vellum">
                  R$ {total.toFixed(0)}
                </span>
              </div>

              <Button variant="gradient" className="mt-4 w-full" disabled={totalTickets === 0}>
                Comprar ingresso
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </MarketingShell>
  )
}
