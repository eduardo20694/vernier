import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'
import { Badge } from './Badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table'

export interface CreditOfferRow {
  id: string
  prazoMeses: number
  parcela: number
  taxaAm: number
  cetAa: number
  valorLiberado?: number
  recommended?: boolean
}

export interface CreditOfferTableProps extends HTMLAttributes<HTMLDivElement> {
  rows: CreditOfferRow[]
  value?: string
  onValueChange?: (id: string) => void
  footerNote?: string
  showValorLiberado?: boolean
}

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const pct = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function formatPct(value: number): string {
  return `${pct.format(value)}%`
}

export function CreditOfferTable({
  rows,
  value,
  onValueChange,
  footerNote = 'Simulação sujeita a análise',
  showValorLiberado,
  className,
  ...props
}: CreditOfferTableProps) {
  const hasValorLiberado =
    showValorLiberado ?? rows.some((r) => r.valorLiberado != null)

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <Table>
        <TableHeader>
          <TableRow className="border-0 hover:bg-transparent">
            <TableHead className="w-8 px-3 py-2" />
            <TableHead className="px-3 py-2">Prazo</TableHead>
            <TableHead className="px-3 py-2" numeric>
              Parcela
            </TableHead>
            <TableHead className="px-3 py-2" numeric>
              Taxa
            </TableHead>
            <TableHead className="px-3 py-2" numeric>
              CET
            </TableHead>
            {hasValorLiberado && (
              <TableHead className="px-3 py-2" numeric>
                Liberado
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const selected = value === row.id
            return (
              <TableRow
                key={row.id}
                role="radio"
                aria-checked={selected}
                tabIndex={0}
                onClick={() => onValueChange?.(row.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onValueChange?.(row.id)
                  }
                }}
                className={cn(
                  'cursor-pointer transition-colors',
                  selected && 'bg-brass/[0.08] hover:bg-brass/[0.1]',
                  row.recommended &&
                    !selected &&
                    'bg-verdigris/[0.04] hover:bg-verdigris/[0.06]'
                )}
              >
                <TableCell className="w-8 px-3 py-2">
                  <span
                    className={cn(
                      'inline-flex h-4 w-4 items-center justify-center rounded-full border',
                      selected
                        ? 'border-brass bg-brass/15'
                        : 'border-line bg-panel'
                    )}
                    aria-hidden
                  >
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-brass-bright shadow-[0_0_6px_rgb(var(--brass)/0.55)]" />
                    )}
                  </span>
                </TableCell>
                <TableCell className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono tabular-nums text-vellum">
                      {row.prazoMeses}x
                    </span>
                    {row.recommended && (
                      <Badge tone="verdigris" className="normal-case tracking-normal">
                        Recomendada
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-3 py-2 font-medium text-vellum" numeric>
                  {brl.format(row.parcela)}
                </TableCell>
                <TableCell className="px-3 py-2 text-vellum-muted" numeric>
                  {formatPct(row.taxaAm)} a.m.
                </TableCell>
                <TableCell className="px-3 py-2 text-vellum-muted" numeric>
                  {formatPct(row.cetAa)} a.a.
                </TableCell>
                {hasValorLiberado && (
                  <TableCell className="px-3 py-2 text-brass-bright" numeric>
                    {row.valorLiberado != null
                      ? brl.format(row.valorLiberado)
                      : '—'}
                  </TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {footerNote && (
        <p className="px-1 font-mono text-[10px] uppercase tracking-[0.12em] text-vellum-faint">
          {footerNote}
        </p>
      )}
    </div>
  )
}
