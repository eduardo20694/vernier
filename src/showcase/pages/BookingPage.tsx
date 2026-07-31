import { useMemo, useState } from 'react'
import { CalendarDays, Gauge } from 'lucide-react'
import { BookingAgenda } from '../../components/BookingAgenda'
import { buildBookingSlots } from './demoData'

export function BookingPage() {
  const [bookingDate, setBookingDate] = useState(() => new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>('10:00')
  const bookingSlots = useMemo(() => buildBookingSlots(), [bookingDate])

  return (
    <div className="min-h-full bg-ink text-vellum">
      <header className="flex items-center gap-3 border-b border-line bg-gradient-to-b from-panel2/90 to-panel/90 px-5 py-4">
        <Gauge className="h-5 w-5 text-brass-bright" aria-hidden />
        <div>
          <p className="font-display text-lg leading-none">Vernier Consultoria</p>
          <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-vellum-faint">
            <CalendarDays className="h-3 w-3" aria-hidden />
            Agendamento online
          </p>
        </div>
      </header>
      <div className="px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-lg">
          <BookingAgenda
            selectedDate={bookingDate}
            onDateChange={setBookingDate}
            slots={bookingSlots}
            selectedSlotId={selectedSlot}
            onSelectSlot={setSelectedSlot}
            onConfirm={() => undefined}
            timezoneLabel="Horários em America/São_Paulo"
            serviceLabel="Consultoria de design system — 45 min"
          />
        </div>
      </div>
    </div>
  )
}
