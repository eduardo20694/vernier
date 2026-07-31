import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function daysInMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function formatMonth(d: Date) {
  return d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
}

export function Calendar({
  value,
  onChange,
  className,
}: {
  value?: Date
  onChange?: (date: Date) => void
  className?: string
}) {
  const [cursor, setCursor] = useState(() => startOfMonth(value ?? new Date()))

  const cells = useMemo(() => {
    const first = startOfMonth(cursor)
    const total = daysInMonth(cursor)
    const pad = first.getDay()
    const out: (Date | null)[] = Array.from({ length: pad }, () => null)
    for (let day = 1; day <= total; day++) {
      out.push(new Date(cursor.getFullYear(), cursor.getMonth(), day))
    }
    while (out.length % 7 !== 0) out.push(null)
    return out
  }, [cursor])

  return (
    <div className={cn('w-[280px] rounded-xl border border-line bg-panel p-3 shadow-plate', className)}>
      <div className="mb-3 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          aria-label="Mês anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <p className="font-display text-sm capitalize text-vellum">{formatMonth(cursor)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          aria-label="Próximo mês"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d, i) => (
          <div key={`${d}-${i}`} className="py-1 text-center font-mono text-[10px] text-vellum-faint">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const selected = value && sameDay(day, value)
          const today = sameDay(day, new Date())
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onChange?.(day)}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-md font-mono text-xs tabular-nums transition-colors focus-ring',
                selected
                  ? 'bg-gradient-to-b from-brass-bright to-brass text-ink'
                  : 'text-vellum-muted hover:bg-panel2 hover:text-vellum',
                today && !selected && 'ring-1 ring-brass-dim/50'
              )}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
