import { cn } from '../lib/cn'
import { Button } from './Button'

export interface SimulationOffer {
  parcela: number
  taxa: number
  cet: number
  prazo: number
  valor: number
  total: number
}

export interface SimulationDiffLabels {
  offerA?: string
  offerB?: string
  parcela?: string
  taxa?: string
  cet?: string
  prazo?: string
  valor?: string
  total?: string
  chooseA?: string
  chooseB?: string
}

export interface SimulationDiffProps {
  offerA: SimulationOffer
  offerB: SimulationOffer
  labels?: SimulationDiffLabels
  onChooseA?: () => void
  onChooseB?: () => void
  className?: string
}

type MetricKey = keyof SimulationOffer

type RowDef = {
  key: MetricKey
  label: string
  format: (v: number) => string
  /** true = menor é melhor (parcela, CET, taxa, total) */
  lowerIsBetter: boolean
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const pct = (v: number) =>
  `${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`

function buildRows(labels: SimulationDiffLabels): RowDef[] {
  return [
    { key: 'parcela', label: labels.parcela ?? 'Parcela', format: (v) => brl.format(v), lowerIsBetter: true },
    { key: 'taxa', label: labels.taxa ?? 'Taxa a.m.', format: pct, lowerIsBetter: true },
    { key: 'cet', label: labels.cet ?? 'CET a.a.', format: pct, lowerIsBetter: true },
    { key: 'prazo', label: labels.prazo ?? 'Prazo', format: (v) => `${v}x`, lowerIsBetter: false },
    { key: 'valor', label: labels.valor ?? 'Valor liberado', format: (v) => brl.format(v), lowerIsBetter: false },
    { key: 'total', label: labels.total ?? 'Total pago', format: (v) => brl.format(v), lowerIsBetter: true },
  ]
}

function betterSide(a: number, b: number, lowerIsBetter: boolean): 'a' | 'b' | 'tie' {
  if (a === b) return 'tie'
  if (lowerIsBetter) return a < b ? 'a' : 'b'
  return a > b ? 'a' : 'b'
}

function cellClass(side: 'a' | 'b', winner: 'a' | 'b' | 'tie') {
  if (winner === 'tie' || winner !== side) return 'text-vellum'
  return 'text-verdigris font-medium'
}

export function SimulationDiff({
  offerA,
  offerB,
  labels = {},
  onChooseA,
  onChooseB,
  className,
}: SimulationDiffProps) {
  const rows = buildRows(labels)
  const lblA = labels.offerA ?? 'Oferta A'
  const lblB = labels.offerB ?? 'Oferta B'

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-line bg-panel shadow-plate',
        className
      )}
    >
      <div className="grid grid-cols-[minmax(120px,1fr)_1fr_1fr] border-b border-line bg-gradient-to-b from-panel2 to-panel">
        <div className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
          Métrica
        </div>
        <div className="border-l border-line px-4 py-3 text-center font-display text-sm font-medium text-vellum">
          {lblA}
        </div>
        <div className="border-l border-line px-4 py-3 text-center font-display text-sm font-medium text-vellum">
          {lblB}
        </div>
      </div>

      {rows.map((row, idx) => {
        const valA = offerA[row.key]
        const valB = offerB[row.key]
        const winner = betterSide(valA, valB, row.lowerIsBetter)

        return (
          <div
            key={row.key}
            className={cn(
              'grid grid-cols-[minmax(120px,1fr)_1fr_1fr] border-b border-line last:border-b-0',
              idx % 2 === 0 ? 'bg-panel' : 'bg-panel2/30'
            )}
          >
            <div className="px-4 py-3 text-sm text-vellum-muted">{row.label}</div>
            <div
              className={cn(
                'border-l border-line px-4 py-3 text-center font-mono text-sm tabular-nums',
                cellClass('a', winner)
              )}
            >
              {row.format(valA)}
            </div>
            <div
              className={cn(
                'border-l border-line px-4 py-3 text-center font-mono text-sm tabular-nums',
                cellClass('b', winner)
              )}
            >
              {row.format(valB)}
            </div>
          </div>
        )
      })}

      {(onChooseA || onChooseB) && (
        <div className="grid grid-cols-2 gap-3 border-t border-line bg-gradient-to-b from-panel to-ink p-4">
          {onChooseA && (
            <Button type="button" variant="forged" onClick={onChooseA}>
              {labels.chooseA ?? `Escolher ${lblA}`}
            </Button>
          )}
          {onChooseB && (
            <Button type="button" variant="forged" onClick={onChooseB}>
              {labels.chooseB ?? `Escolher ${lblB}`}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
