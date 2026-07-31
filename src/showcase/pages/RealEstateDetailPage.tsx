import { useMemo, useState } from 'react'
import { Bath, BedDouble, Building2, Mail, Phone, Ruler } from 'lucide-react'
import { Avatar } from '../../components/Avatar'
import { BookingAgenda } from '../../components/BookingAgenda'
import { Button } from '../../components/Button'
import { Badge } from '../../components/Badge'
import { buildBookingSlots } from './demoData'
import { MarketingShell } from './MarketingShell'

const GALLERY = ['Vista principal', 'Sala de estar', 'Suíte master', 'Varanda']

export function RealEstateDetailPage() {
  const [activeImage, setActiveImage] = useState(0)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingDate, setBookingDate] = useState(() => new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>('14:00')
  const bookingSlots = useMemo(() => buildBookingSlots(), [bookingDate])

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
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="overflow-hidden rounded-xl border border-line bg-gradient-to-b from-panel2 to-panel">
                <div className="flex aspect-[16/10] items-center justify-center">
                  <Building2 className="h-16 w-16 text-brass/30" strokeWidth={1} aria-hidden />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {GALLERY.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`aspect-[4/3] rounded-lg border bg-panel2/60 transition-colors focus-ring ${
                      activeImage === i ? 'border-brass ring-1 ring-brass/30' : 'border-line hover:border-brass-dim/50'
                    }`}
                    aria-label={label}
                    aria-pressed={activeImage === i}
                  />
                ))}
              </div>

              <header className="mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="brass">Destaque</Badge>
                  <Badge tone="verdigris">Disponível</Badge>
                </div>
                <h1 className="mt-3 font-display text-3xl text-vellum">Cobertura vista mar</h1>
                <p className="mt-1 text-sm text-vellum-muted">
                  Av. Atlântica, 1200 — Copacabana, Rio de Janeiro
                </p>
                <p className="mt-4 font-display text-3xl text-vellum">R$ 2.890.000</p>
              </header>

              <ul className="mt-6 flex flex-wrap gap-6 border-y border-line py-5 text-sm text-vellum-muted">
                <li className="flex items-center gap-2">
                  <BedDouble className="h-4 w-4 text-brass" aria-hidden />4 quartos
                </li>
                <li className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-brass" aria-hidden />3 banheiros
                </li>
                <li className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-brass" aria-hidden />210 m²
                </li>
              </ul>

              <div className="mt-6 prose-sm max-w-none text-sm leading-relaxed text-vellum-muted">
                <p>
                  Cobertura duplex com vista panorâmica para o mar, acabamento em aço oceano e
                  iluminação natural em todos os ambientes. Varanda gourmet, suíte master com closet
                  e duas vagas de garagem.
                </p>
              </div>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-4 lg:self-start">
              <div className="rounded-xl border border-line bg-panel p-5 shadow-plate">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-vellum-faint">
                  Corretor responsável
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar fallback="RC" size="lg" tone="brass" />
                  <div>
                    <p className="font-medium text-vellum">Rafael Costa</p>
                    <p className="text-xs text-vellum-faint">CRECI 12345-SP</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-vellum-muted">
                  <li className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-brass" aria-hidden />
                    (21) 98765-4321
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-brass" aria-hidden />
                    rafael@vernier.imoveis
                  </li>
                </ul>
                <Button
                  variant="primary"
                  className="mt-5 w-full"
                  onClick={() => setShowBooking((v) => !v)}
                >
                  Agendar visita
                </Button>
              </div>

              {showBooking && (
                <BookingAgenda
                  selectedDate={bookingDate}
                  onDateChange={setBookingDate}
                  slots={bookingSlots}
                  selectedSlotId={selectedSlot}
                  onSelectSlot={setSelectedSlot}
                  onConfirm={() => undefined}
                  timezoneLabel="Horários em America/São_Paulo"
                  serviceLabel="Visita presencial — 60 min"
                  confirmLabel="Confirmar visita"
                />
              )}
            </aside>
          </div>
        </div>
      </div>
    </MarketingShell>
  )
}
