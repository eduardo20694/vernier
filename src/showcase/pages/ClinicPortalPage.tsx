import { useMemo, useState } from 'react'
import {
  CalendarDays,
  FileText,
  Gauge,
  HeartPulse,
  Pill,
  Stethoscope,
} from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { SidebarNav } from '../../components/SidebarNav'
import { PageHeader } from '../../components/PageHeader'
import { BookingAgenda } from '../../components/BookingAgenda'
import { Badge } from '../../components/Badge'
import { UserMenu } from '../../components/UserMenu'
import { ThemeToggle } from '../../components/ThemeToggle'
import { AppPageShell } from './PageFrame'
import { buildBookingSlots } from './demoData'

const UPCOMING = [
  {
    id: 'a1',
    doctor: 'Dra. Ana Mendes',
    specialty: 'Clínica geral',
    date: '5 Ago 2026',
    time: '09:30',
    status: 'Confirmada',
  },
  {
    id: 'a2',
    doctor: 'Dr. Paulo Ribeiro',
    specialty: 'Cardiologia',
    date: '12 Ago 2026',
    time: '14:00',
    status: 'Pendente',
  },
]

const DOCUMENTS = [
  { id: 'd1', title: 'Receita — Losartana 50mg', date: '28 Jul 2026', type: 'Receita' },
  { id: 'd2', title: 'Resultado — Hemograma completo', date: '15 Jul 2026', type: 'Exame' },
  { id: 'd3', title: 'Atestado médico', date: '3 Jul 2026', type: 'Documento' },
]

export function ClinicPortalPage() {
  const [nav, setNav] = useState('home')
  const [bookingDate, setBookingDate] = useState(() => new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>('09:00')
  const bookingSlots = useMemo(() => buildBookingSlots(), [bookingDate])

  return (
    <AppPageShell>
      <AppShell
        className="h-full w-full rounded-none border-0 shadow-none"
        sidebar={
          <SidebarNav
            brand={
              <>
                <HeartPulse className="h-4 w-4 shrink-0 text-brass-bright" aria-hidden />
                <span data-sidebar-label className="truncate text-base">
                  Clínica Vernier
                </span>
              </>
            }
            activeId={nav}
            onNavigate={setNav}
            sections={[
              {
                title: 'Paciente',
                items: [
                  { id: 'home', label: 'Início', icon: <Gauge /> },
                  { id: 'appointments', label: 'Consultas', icon: <CalendarDays /> },
                  { id: 'documents', label: 'Documentos', icon: <FileText /> },
                ],
              },
            ]}
            footer="Demo UI"
          />
        }
        topbar={
          <TopNav
            brand={<span className="text-sm text-vellum-muted">Portal do paciente</span>}
            actions={
              <>
                <ThemeToggle showLabel={false} />
                <UserMenu
                  name="Marina Costa"
                  email="marina@email.com"
                  onSettings={() => undefined}
                  onLogout={() => undefined}
                />
              </>
            }
          />
        }
      >
        <div className="space-y-6">
          <PageHeader
            title="Olá, Marina"
            description="Acompanhe consultas, agende horários e acesse seus documentos."
          />

          <p className="rounded-lg border border-line/60 bg-panel2/40 px-3 py-2 text-xs text-vellum-faint">
            Demo UI — interface ilustrativa. Não substitui prontuário nem sistema clínico real.
          </p>

          <section>
            <h2 className="mb-3 flex items-center gap-2 font-display text-sm text-vellum">
              <Stethoscope className="h-4 w-4 text-brass" aria-hidden />
              Próximas consultas
            </h2>
            <ul className="space-y-3">
              {UPCOMING.map((appt) => (
                <li
                  key={appt.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-panel p-4"
                >
                  <div>
                    <p className="font-medium text-vellum">{appt.doctor}</p>
                    <p className="text-xs text-vellum-faint">{appt.specialty}</p>
                  </div>
                  <div className="text-right text-sm text-vellum-muted">
                    <p>{appt.date}</p>
                    <p className="font-mono tabular-nums">{appt.time}</p>
                  </div>
                  <Badge tone={appt.status === 'Confirmada' ? 'verdigris' : 'brass'}>
                    {appt.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 font-display text-sm text-vellum">
              <CalendarDays className="h-4 w-4 text-brass" aria-hidden />
              Agendar consulta
            </h2>
            <BookingAgenda
              selectedDate={bookingDate}
              onDateChange={setBookingDate}
              slots={bookingSlots}
              selectedSlotId={selectedSlot}
              onSelectSlot={setSelectedSlot}
              onConfirm={() => undefined}
              timezoneLabel="Horários em America/São_Paulo"
              serviceLabel="Consulta clínica geral — 30 min"
              confirmLabel="Solicitar agendamento"
            />
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 font-display text-sm text-vellum">
              <Pill className="h-4 w-4 text-brass" aria-hidden />
              Receitas e documentos
            </h2>
            <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
              {DOCUMENTS.map((doc) => (
                <li
                  key={doc.id}
                  className="flex flex-wrap items-center justify-between gap-3 bg-panel px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 shrink-0 text-brass-dim" aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-vellum">{doc.title}</p>
                      <p className="text-xs text-vellum-faint">{doc.date}</p>
                    </div>
                  </div>
                  <Badge tone="neutral">{doc.type}</Badge>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </AppShell>
    </AppPageShell>
  )
}
