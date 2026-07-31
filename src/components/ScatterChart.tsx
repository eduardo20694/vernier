import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import { cn } from '../lib/cn'
import { CHART_COLORS } from './Charts'

export interface ScatterPoint {
  x: number
  y: number
  z?: number
  name?: string
}

export interface ScatterSeries {
  key: string
  label?: string
  color?: string
  data: ScatterPoint[]
}

export interface VernierScatterChartProps {
  series: ScatterSeries[]
  height?: number
  className?: string
  showGrid?: boolean
  xLabel?: string
  yLabel?: string
}

const FALLBACK = [
  CHART_COLORS.azureBright,
  CHART_COLORS.verdigris,
  CHART_COLORS.azure,
  CHART_COLORS.rust,
] as const

function ScatterTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload?: ScatterPoint; name?: string }>
}) {
  if (!active || !payload?.length) return null
  const p = payload[0]?.payload
  if (!p) return null
  return (
    <div className="rounded-md border border-line bg-panel2 px-3 py-2 text-xs shadow-plate">
      {p.name && <p className="mb-1 font-medium text-vellum">{p.name}</p>}
      <p className="font-mono tabular-nums text-vellum-muted">
        x {p.x} · y {p.y}
        {p.z != null ? ` · z ${p.z}` : ''}
      </p>
    </div>
  )
}

export function VernierScatterChart({
  series,
  height = 280,
  className,
  showGrid = true,
  xLabel,
  yLabel,
}: VernierScatterChartProps) {
  return (
    <div className={cn('w-full min-w-0', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 8, right: 12, left: 4, bottom: 8 }}>
          {showGrid && (
            <CartesianGrid
              stroke="rgb(var(--line) / 0.45)"
              strokeDasharray="2 6"
              vertical={false}
            />
          )}
          <XAxis
            type="number"
            dataKey="x"
            name={xLabel ?? 'x'}
            tick={{ fill: 'rgb(var(--vellum-faint))', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yLabel ?? 'y'}
            tick={{ fill: 'rgb(var(--vellum-faint))', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={42}
          />
          <ZAxis type="number" dataKey="z" range={[40, 160]} />
          <Tooltip content={<ScatterTooltip />} cursor={{ strokeDasharray: '4 4' }} />
          {series.map((s, i) => (
            <Scatter
              key={s.key}
              name={s.label ?? s.key}
              data={s.data}
              fill={s.color ?? FALLBACK[i % FALLBACK.length]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
