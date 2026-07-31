import { useMemo } from 'react'
import { CalendarDays, Clock } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { DatePicker } from './DatePicker'
import { EmptyState } from './EmptyState'

export interface BookingTimeSlot {
  id: string
  time: string
  available: boolean
  label?: string
}

export interface BookingAgendaProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
  slots: BookingTimeSlot[]
  selectedSlotId?: string
  onSelectSlot: (slotId: string) => void
  onConfirm: () => void
  /** Ex.: "Horários em America/São_Paulo" */
  timezoneLabel?: string
  /** Rótulo do serviço ou duração exibido acima dos horários */
  serviceLabel?: string
  confirmLabel?: string
  /** Faixa de datas rápidas além do DatePicker */
  showDateStrip?: boolean
  dateStripDays?: number
  className?: string
  confirmDisabled?: boolean
  loading?: boolean
}

const WEEKDAY_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function buildDateStrip(anchor: Date, days: number) {
  const base = startOfDay(anchor)
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    return d
  })
}

export function BookingAgenda({
  selectedDate,
  onDateChange,
  slots,
  selectedSlotId,
  onSelectSlot,
  onConfirm,
  timezoneLabel,
  serviceLabel,
  confirmLabel = 'Reservar horário',
  showDateStrip = true,
  dateStripDays = 7,
  className,
  confirmDisabled,
  loading = false,
}: BookingAgendaProps) {
  const strip = useMemo(
    () => buildDateStrip(selectedDate, dateStripDays),
    [selectedDate, dateStripDays]
  )
  const availableCount = slots.filter((s) => s.available).length
  const hasSelection = Boolean(selectedSlotId)

  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-panel p-5 shadow-plate',
        className
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h2 className="font-display text-lg font-medium text-vellum">Agendar horário</h2>
          {timezoneLabel && (
            <p className="flex items-center gap-1.5 text-xs text-vellum-faint">
              <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {timezoneLabel}
            </p>
          )}
        </div>
        <DatePicker
          className="w-full sm:w-52"
          value={selectedDate}
          onChange={(d) => d && onDateChange(d)}
          label="Data"
        />
      </div>

      {showDateStrip && (
        <div
          className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Próximos dias"
        >
          {strip.map((day) => {
            const selected = sameDay(day, selectedDate)
            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => onDateChange(day)}
                className={cn(
                  'flex min-w-[4.25rem] flex-col items-center rounded-lg border px-2 py-2 text-center transition-colors focus-ring',
                  selected
                    ? 'border-brass bg-brass/10 text-brass-bright shadow-[0_0_0_1px_rgb(var(--brass)/0.2)]'
                    : 'border-line bg-panel2 text-vellum-muted hover:border-brass-dim/50 hover:text-vellum'
                )}
                aria-pressed={selected}
              >
                <span className="text-[10px] font-medium uppercase tracking-wide text-vellum-faint">
                  {WEEKDAY_SHORT[day.getDay()]}
                </span>
                <span className="font-mono text-sm tabular-nums">{day.getDate()}</span>
              </button>
            )
          })}
        </div>
      )}

      {serviceLabel && (
        <p className="mt-5 flex items-center gap-2 text-sm text-vellum-muted">
          <CalendarDays className="h-4 w-4 shrink-0 text-brass-bright" aria-hidden />
          {serviceLabel}
        </p>
      )}

      <div className="mt-5">
        {loading ? (
          <p className="py-8 text-center text-sm text-vellum-faint" aria-live="polite">
            Carregando horários…
          </p>
        ) : slots.length === 0 ? (
          <EmptyState
            className="py-8"
            icon={<Clock className="h-5 w-5" />}
            title="Sem horários neste dia"
            description="Escolha outra data ou volte mais tarde — a agenda ainda não foi liberada."
          />
        ) : availableCount === 0 ? (
          <EmptyState
            className="py-8"
            icon={<Clock className="h-5 w-5" />}
            title="Dia indisponível"
            description="Todos os horários estão ocupados. Tente outra data."
          />
        ) : (
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4"
            role="listbox"
            aria-label="Horários disponíveis"
          >
            {slots.map((slot) => {
              const selected = slot.id === selectedSlotId
              return (
                <button
                  key={slot.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={!slot.available}
                  onClick={() => slot.available && onSelectSlot(slot.id)}
                  className={cn(
                    'flex flex-col items-center justify-center rounded-lg border px-3 py-2.5 text-center transition-all focus-ring',
                    'disabled:cursor-not-allowed disabled:opacity-40 disabled:line-through',
                    selected
                      ? 'border-brass bg-brass/15 text-brass-bright shadow-[0_0_0_1px_rgb(var(--brass)/0.35),0_0_16px_-4px_rgb(var(--brass)/0.4)]'
                      : slot.available
                        ? 'border-line bg-panel2 text-vellum hover:border-brass-dim hover:text-brass-bright'
                        : 'border-line/60 bg-panel2/50 text-vellum-faint'
                  )}
                >
                  <span className="font-mono text-sm tabular-nums">{slot.time}</span>
                  {slot.label && (
                    <span className="mt-0.5 text-[10px] text-vellum-faint">{slot.label}</span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-vellum-faint">
          {hasSelection
            ? 'Confirme para reservar o horário selecionado.'
            : availableCount > 0
              ? 'Selecione um horário disponível.'
              : null}
        </p>
        <Button
          variant="primary"
          className="w-full sm:w-auto"
          disabled={!hasSelection || confirmDisabled || availableCount === 0}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  )
}
