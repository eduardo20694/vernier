import { cn } from '../lib/cn'
import { CHART_COLORS } from './Charts'

export interface HeatmapCell {
  /** Row key (e.g. weekday) or y index label */
  row: string
  /** Column key (e.g. week / hour) */
  col: string
  value: number
  label?: string
}

export interface HeatmapProps {
  cells: HeatmapCell[]
  rows?: string[]
  cols?: string[]
  /** Max value for color scale; defaults to max in cells */
  max?: number
  className?: string
  /** Accessible name for the grid */
  'aria-label'?: string
}

function intensityColor(t: number): string {
  const clamped = Math.min(1, Math.max(0, t))
  if (clamped <= 0) return 'rgb(var(--panel2))'
  // Soft azure ramp
  const a = 0.12 + clamped * 0.78
  return `color-mix(in srgb, ${CHART_COLORS.azureBright} ${Math.round(a * 100)}%, rgb(var(--panel)))`
}

export function Heatmap({
  cells,
  rows: rowsProp,
  cols: colsProp,
  max: maxProp,
  className,
  'aria-label': ariaLabel = 'Mapa de calor',
}: HeatmapProps) {
  const rows =
    rowsProp ??
    Array.from(new Set(cells.map((c) => c.row)))
  const cols =
    colsProp ??
    Array.from(new Set(cells.map((c) => c.col)))
  const max =
    maxProp ??
    Math.max(1, ...cells.map((c) => c.value))

  const map = new Map(cells.map((c) => [`${c.row}::${c.col}`, c]))

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn(
        'overflow-x-auto rounded-lg border border-line bg-gradient-to-b from-panel2 via-panel to-ink p-3',
        className
      )}
    >
      <div
        className="inline-grid gap-1"
        style={{
          gridTemplateColumns: `auto repeat(${cols.length}, minmax(14px, 1fr))`,
        }}
      >
        <div />
        {cols.map((col) => (
          <div
            key={col}
            className="px-0.5 text-center font-mono text-[9px] uppercase tracking-wider text-vellum-faint"
          >
            {col}
          </div>
        ))}
        {rows.map((row) => (
          <div key={row} className="contents">
            <div className="flex items-center pr-2 font-mono text-[10px] text-vellum-faint">
              {row}
            </div>
            {cols.map((col) => {
              const cell = map.get(`${row}::${col}`)
              const value = cell?.value ?? 0
              const t = value / max
              return (
                <div
                  key={`${row}-${col}`}
                  title={cell?.label ?? `${row} · ${col}: ${value}`}
                  className="aspect-square min-h-[14px] min-w-[14px] rounded-sm border border-line/60"
                  style={{ backgroundColor: intensityColor(t) }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
