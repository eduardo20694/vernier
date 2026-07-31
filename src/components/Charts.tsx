import { useId, type ReactNode } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TooltipContentProps } from 'recharts'
import { cn } from '../lib/cn'

/** Vernier chart palette — azure ocean-steel (+ teal / muted secondary). */
export const CHART_COLORS = {
  azure: '#3E8AE8',
  azureBright: '#4B8CFF',
  azureDim: '#2758A8',
  verdigris: '#3A968A',
  rust: '#DC5050',
  vellum: '#A0B0C8',
  /** Theme-safe hint; prefer CSS vars for strokes in charts. */
  grid: 'rgb(var(--line) / 0.55)',
  axis: 'rgb(var(--vellum-faint))',
} as const

const SERIES_FALLBACK = [
  CHART_COLORS.azureBright,
  CHART_COLORS.verdigris,
  CHART_COLORS.azure,
  CHART_COLORS.rust,
  CHART_COLORS.vellum,
] as const

/** Theme-safe strokes via CSS variables (light + dark). */
const STROKE = {
  grid: 'rgb(var(--line) / 0.45)',
  axis: 'rgb(var(--vellum-faint))',
  cursor: 'rgb(var(--brass) / 0.35)',
} as const

export type ChartDatum = Record<string, string | number | null | undefined>

export interface ChartSeries {
  key: string
  label?: string
  color?: string
}

export interface ChartBaseProps {
  data: ChartDatum[]
  xKey: string
  series: ChartSeries[]
  height?: number
  className?: string
  showGrid?: boolean
  showLegend?: boolean
}

export type ChartDeltaTone = 'up' | 'down' | 'neutral'

export interface ChartCardShellProps {
  title?: string
  description?: string
  overline?: string
  delta?: string
  deltaTone?: ChartDeltaTone
  className?: string
  children: ReactNode
}

function seriesColor(s: ChartSeries, index: number): string {
  return s.color ?? SERIES_FALLBACK[index % SERIES_FALLBACK.length]
}

function hexToRgba(hex: string, alpha: number): string {
  const raw = hex.replace('#', '')
  if (raw.length !== 6) return hex
  const r = Number.parseInt(raw.slice(0, 2), 16)
  const g = Number.parseInt(raw.slice(2, 4), 16)
  const b = Number.parseInt(raw.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function ChartTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-md border border-line bg-panel px-3.5 py-2.5 shadow-plate">
      {label != null && label !== '' && (
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-vellum-faint">
          {String(label)}
        </p>
      )}
      <ul className="space-y-1.5">
        {payload.map((entry) => (
          <li key={String(entry.dataKey)} className="flex items-center gap-2.5 text-xs text-vellum">
            <span
              className="h-2 w-2 shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgb(var(--mist)/0.12)]"
              style={{ backgroundColor: entry.color ?? CHART_COLORS.azure }}
            />
            <span className="text-vellum-muted">{entry.name}</span>
            <span className="ml-auto font-mono tabular-nums text-vellum">
              {entry.value == null ? '—' : String(entry.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const axisTick = {
  fill: STROKE.axis,
  fontSize: 11,
  fontFamily: 'Space Mono, ui-monospace, monospace',
}

const legendStyle = {
  fontSize: 12,
  color: 'rgb(var(--vellum-muted))',
  fontFamily: 'General Sans, Segoe UI, system-ui, sans-serif',
  paddingTop: 10,
}

function ActiveDot({
  cx,
  cy,
  stroke,
}: {
  cx?: number
  cy?: number
  stroke?: string
}) {
  if (cx == null || cy == null) return null
  const color = stroke ?? CHART_COLORS.azureBright
  return (
    <g>
      <circle cx={cx} cy={cy} r={8} fill={hexToRgba(color, 0.18)} />
      <circle cx={cx} cy={cy} r={4.5} fill={color} stroke="rgb(var(--panel))" strokeWidth={2} />
    </g>
  )
}

export function ChartContainer({
  height = 260,
  className,
  children,
}: {
  height?: number
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('w-full min-w-0', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

function SharedCartesian({
  xKey,
  showGrid,
  yDomain,
}: {
  xKey: string
  showGrid: boolean
  yDomain?: [number | string, number | string]
}) {
  return (
    <>
      {showGrid && (
        <CartesianGrid
          stroke={STROKE.grid}
          strokeDasharray="2 6"
          vertical={false}
          strokeOpacity={0.7}
        />
      )}
      <XAxis
        dataKey={xKey}
        tick={axisTick}
        axisLine={false}
        tickLine={false}
        dy={8}
      />
      <YAxis
        tick={axisTick}
        axisLine={false}
        tickLine={false}
        dx={-4}
        width={42}
        domain={yDomain}
      />
      <Tooltip
        content={ChartTooltip}
        cursor={{ stroke: STROKE.cursor, strokeWidth: 1, strokeDasharray: '4 4' }}
      />
    </>
  )
}

export function VernierLineChart({
  data,
  xKey,
  series,
  height = 260,
  className,
  showGrid = true,
  showLegend = true,
}: ChartBaseProps) {
  return (
    <ChartContainer height={height} className={className}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <SharedCartesian xKey={xKey} showGrid={showGrid} />
        {showLegend && <Legend wrapperStyle={legendStyle} iconType="circle" iconSize={8} />}
        {series.map((s, i) => {
          const color = seriesColor(s, i)
          return (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={color}
              strokeWidth={2.5}
              dot={false}
              activeDot={<ActiveDot stroke={color} />}
            />
          )
        })}
      </LineChart>
    </ChartContainer>
  )
}

export function VernierBarChart({
  data,
  xKey,
  series,
  height = 260,
  className,
  showGrid = true,
  showLegend = true,
}: ChartBaseProps) {
  const gid = useId().replace(/:/g, '')

  return (
    <ChartContainer height={height} className={className}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s, i) => {
            const color = seriesColor(s, i)
            return (
              <linearGradient key={s.key} id={`${gid}-bar-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.95} />
                <stop offset="100%" stopColor={color} stopOpacity={0.35} />
              </linearGradient>
            )
          })}
        </defs>
        <SharedCartesian xKey={xKey} showGrid={showGrid} />
        {showLegend && <Legend wrapperStyle={legendStyle} iconType="square" iconSize={8} />}
        {series.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label ?? s.key}
            fill={`url(#${gid}-bar-${i})`}
            radius={[6, 6, 2, 2]}
            maxBarSize={36}
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}

export function VernierAreaChart({
  data,
  xKey,
  series,
  height = 260,
  className,
  showGrid = true,
  showLegend = true,
}: ChartBaseProps) {
  const gid = useId().replace(/:/g, '')

  return (
    <ChartContainer height={height} className={className}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s, i) => {
            const color = seriesColor(s, i)
            return (
              <linearGradient key={s.key} id={`${gid}-area-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.38} />
                <stop offset="55%" stopColor={color} stopOpacity={0.12} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            )
          })}
        </defs>
        <SharedCartesian xKey={xKey} showGrid={showGrid} />
        {showLegend && <Legend wrapperStyle={legendStyle} iconType="circle" iconSize={8} />}
        {series.map((s, i) => {
          const color = seriesColor(s, i)
          return (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={color}
              fill={`url(#${gid}-area-${i})`}
              strokeWidth={2.5}
              activeDot={<ActiveDot stroke={color} />}
            />
          )
        })}
      </AreaChart>
    </ChartContainer>
  )
}

export interface ComboChartProps extends ChartBaseProps {
  /** Series keys rendered as bars (rest as lines). Defaults to first series. */
  barKeys?: string[]
  lineKeys?: string[]
}

export function VernierComboChart({
  data,
  xKey,
  series,
  height = 260,
  className,
  showGrid = true,
  showLegend = true,
  barKeys,
  lineKeys,
}: ComboChartProps) {
  const gid = useId().replace(/:/g, '')
  const bars =
    barKeys ??
    (series.length > 0 ? [series[0].key] : [])
  const lines =
    lineKeys ??
    series.filter((s) => !bars.includes(s.key)).map((s) => s.key)

  return (
    <ChartContainer height={height} className={className}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s, i) => {
            if (!bars.includes(s.key)) return null
            const color = seriesColor(s, i)
            return (
              <linearGradient key={s.key} id={`${gid}-combo-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color} stopOpacity={0.3} />
              </linearGradient>
            )
          })}
        </defs>
        <SharedCartesian xKey={xKey} showGrid={showGrid} />
        {showLegend && <Legend wrapperStyle={legendStyle} iconSize={8} />}
        {series.map((s, i) => {
          const color = seriesColor(s, i)
          if (bars.includes(s.key)) {
            return (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label ?? s.key}
                fill={`url(#${gid}-combo-${i})`}
                radius={[6, 6, 2, 2]}
                maxBarSize={32}
              />
            )
          }
          if (lines.includes(s.key)) {
            return (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label ?? s.key}
                stroke={color}
                strokeWidth={2.5}
                dot={false}
                activeDot={<ActiveDot stroke={color} />}
              />
            )
          }
          return null
        })}
      </ComposedChart>
    </ChartContainer>
  )
}

export interface DonutSlice {
  key: string
  label: string
  value: number
  color?: string
}

export interface VernierDonutChartProps {
  data: DonutSlice[]
  height?: number
  className?: string
  /** Value shown in the center (defaults to sum). */
  centerValue?: string | number
  centerCaption?: string
  showLegend?: boolean
  innerRadius?: number | string
  outerRadius?: number | string
}

export function VernierDonutChart({
  data,
  height = 240,
  className,
  centerValue,
  centerCaption,
  showLegend = true,
  innerRadius = '58%',
  outerRadius = '82%',
}: VernierDonutChartProps) {
  const total = data.reduce((acc, d) => acc + d.value, 0)
  const display = centerValue ?? total

  return (
    <div className={cn('relative w-full min-w-0', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={ChartTooltip} />
          {showLegend && <Legend wrapperStyle={legendStyle} iconType="circle" iconSize={8} />}
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy={showLegend ? '46%' : '50%'}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2.5}
            stroke="rgb(var(--panel))"
            strokeWidth={3}
          >
            {data.map((slice, i) => (
              <Cell
                key={slice.key}
                fill={slice.color ?? SERIES_FALLBACK[i % SERIES_FALLBACK.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div
        className={cn(
          'pointer-events-none absolute inset-0 flex flex-col items-center justify-center',
          showLegend && 'pb-6'
        )}
      >
        <span className="font-mono text-2xl font-medium tabular-nums tracking-tight text-vellum">
          {display}
        </span>
        {centerCaption && (
          <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-vellum-faint">
            {centerCaption}
          </span>
        )}
      </div>
    </div>
  )
}

export interface SparklineProps {
  data: ChartDatum[]
  dataKey: string
  color?: string
  height?: number
  className?: string
  /** Area fill under the line (default true). */
  area?: boolean
}

export function Sparkline({
  data,
  dataKey,
  color = CHART_COLORS.azureBright,
  height = 40,
  className,
  area = true,
}: SparklineProps) {
  const gid = useId().replace(/:/g, '')

  return (
    <div className={cn('w-full min-w-0', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id={`${gid}-spark`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill={area ? `url(#${gid}-spark)` : 'transparent'}
            dot={false}
            isAnimationActive={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export interface FunnelStage {
  key: string
  label: string
  value: number
  color?: string
}

export interface VernierFunnelChartProps {
  stages: FunnelStage[]
  className?: string
  /** Show absolute value on each stage. */
  showValues?: boolean
}

export function VernierFunnelChart({
  stages,
  className,
  showValues = true,
}: VernierFunnelChartProps) {
  const max = Math.max(...stages.map((s) => s.value), 1)

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {stages.map((stage, i) => {
        const widthPct = Math.max(28, (stage.value / max) * 100)
        const color = stage.color ?? SERIES_FALLBACK[i % SERIES_FALLBACK.length]
        const prev = stages[i - 1]?.value
        const drop =
          prev != null && prev > 0 ? Math.round(((prev - stage.value) / prev) * 100) : null

        return (
          <div key={stage.key} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-3 px-0.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-vellum-faint">
                {stage.label}
              </span>
              <span className="flex items-center gap-2 font-mono text-xs tabular-nums text-vellum">
                {showValues && <span>{stage.value.toLocaleString('pt-BR')}</span>}
                {drop != null && drop > 0 && (
                  <span className="text-[10px] text-vellum-faint">−{drop}%</span>
                )}
              </span>
            </div>
            <div className="flex justify-center">
              <div
                className="relative h-9 overflow-hidden rounded-md border border-line/60 shadow-[inset_0_1px_0_rgb(var(--mist)/0.06)] transition-[width]"
                style={{
                  width: `${widthPct}%`,
                  background: `linear-gradient(180deg, ${hexToRgba(color, 0.55)} 0%, ${hexToRgba(color, 0.22)} 100%)`,
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${hexToRgba(color, 0.7)}, transparent)` }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export interface VernierRadarChartProps {
  data: ChartDatum[]
  /** Category key on each datum (angle axis). */
  angleKey: string
  series: ChartSeries[]
  height?: number
  className?: string
  showLegend?: boolean
}

export function VernierRadarChart({
  data,
  angleKey,
  series,
  height = 260,
  className,
  showLegend = true,
}: VernierRadarChartProps) {
  return (
    <ChartContainer height={height} className={className}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
        <PolarGrid stroke={STROKE.grid} strokeOpacity={0.8} />
        <PolarAngleAxis
          dataKey={angleKey}
          tick={{
            fill: STROKE.axis,
            fontSize: 10,
            fontFamily: 'Space Mono, ui-monospace, monospace',
          }}
        />
        <PolarRadiusAxis
          tick={false}
          axisLine={false}
          tickCount={4}
        />
        <Tooltip content={ChartTooltip} />
        {showLegend && <Legend wrapperStyle={legendStyle} iconType="circle" iconSize={8} />}
        {series.map((s, i) => {
          const color = seriesColor(s, i)
          return (
            <Radar
              key={s.key}
              name={s.label ?? s.key}
              dataKey={s.key}
              stroke={color}
              fill={color}
              fillOpacity={0.18}
              strokeWidth={2}
            />
          )
        })}
      </RadarChart>
    </ChartContainer>
  )
}

const deltaToneClass: Record<ChartDeltaTone, string> = {
  up: 'border-verdigris-dim/70 bg-verdigris/[0.12] text-verdigris',
  down: 'border-rust-dim/70 bg-rust/[0.12] text-rust',
  neutral: 'border-line bg-panel2/80 text-vellum-muted',
}

export function ChartCardShell({
  title,
  description,
  overline,
  delta,
  deltaTone = 'neutral',
  className,
  children,
}: ChartCardShellProps) {
  const hasHeader = Boolean(title || description || overline || delta)

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-line bg-panel shadow-plate',
        'bg-gradient-to-b from-panel2/80 via-panel to-panel',
        className
      )}
    >
      {hasHeader && (
        <div className="relative border-b border-line/70 bg-panel-recess px-5 py-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-bright/40 to-transparent"
          />
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {overline && (
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-dim">
                  {overline}
                </p>
              )}
              {title && (
                <h3
                  className={cn(
                    'font-display text-lg font-medium tracking-tight text-vellum',
                    overline && 'mt-1'
                  )}
                >
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-vellum-muted">{description}</p>
              )}
            </div>
            {delta && (
              <span
                className={cn(
                  'shrink-0 rounded-sm border px-2 py-0.5 font-mono text-[11px] font-medium tabular-nums tracking-wide',
                  deltaToneClass[deltaTone]
                )}
              >
                {delta}
              </span>
            )}
          </div>
        </div>
      )}
      <div className="px-3 pb-4 pt-3">{children}</div>
    </div>
  )
}

export interface ChartCardProps extends ChartBaseProps {
  title?: string
  description?: string
  overline?: string
  delta?: string
  deltaTone?: ChartDeltaTone
}

export function LineChartCard({
  title,
  description,
  overline,
  delta,
  deltaTone,
  className,
  ...chart
}: ChartCardProps) {
  return (
    <ChartCardShell
      title={title}
      description={description}
      overline={overline}
      delta={delta}
      deltaTone={deltaTone}
      className={className}
    >
      <VernierLineChart {...chart} className={undefined} />
    </ChartCardShell>
  )
}

export function BarChartCard({
  title,
  description,
  overline,
  delta,
  deltaTone,
  className,
  ...chart
}: ChartCardProps) {
  return (
    <ChartCardShell
      title={title}
      description={description}
      overline={overline}
      delta={delta}
      deltaTone={deltaTone}
      className={className}
    >
      <VernierBarChart {...chart} className={undefined} />
    </ChartCardShell>
  )
}

export function AreaChartCard({
  title,
  description,
  overline,
  delta,
  deltaTone,
  className,
  ...chart
}: ChartCardProps) {
  return (
    <ChartCardShell
      title={title}
      description={description}
      overline={overline}
      delta={delta}
      deltaTone={deltaTone}
      className={className}
    >
      <VernierAreaChart {...chart} className={undefined} />
    </ChartCardShell>
  )
}

export interface ComboChartCardProps extends ComboChartProps {
  title?: string
  description?: string
  overline?: string
  delta?: string
  deltaTone?: ChartDeltaTone
}

export function ComboChartCard({
  title,
  description,
  overline,
  delta,
  deltaTone,
  className,
  ...chart
}: ComboChartCardProps) {
  return (
    <ChartCardShell
      title={title}
      description={description}
      overline={overline}
      delta={delta}
      deltaTone={deltaTone}
      className={className}
    >
      <VernierComboChart {...chart} className={undefined} />
    </ChartCardShell>
  )
}

export interface DonutChartCardProps extends VernierDonutChartProps {
  title?: string
  description?: string
  overline?: string
  delta?: string
  deltaTone?: ChartDeltaTone
}

export function DonutChartCard({
  title,
  description,
  overline,
  delta,
  deltaTone,
  className,
  ...chart
}: DonutChartCardProps) {
  return (
    <ChartCardShell
      title={title}
      description={description}
      overline={overline}
      delta={delta}
      deltaTone={deltaTone}
      className={className}
    >
      <VernierDonutChart {...chart} className={undefined} />
    </ChartCardShell>
  )
}

export interface FunnelChartCardProps extends VernierFunnelChartProps {
  title?: string
  description?: string
  overline?: string
  delta?: string
  deltaTone?: ChartDeltaTone
}

export function FunnelChartCard({
  title,
  description,
  overline,
  delta,
  deltaTone,
  className,
  ...chart
}: FunnelChartCardProps) {
  return (
    <ChartCardShell
      title={title}
      description={description}
      overline={overline}
      delta={delta}
      deltaTone={deltaTone}
      className={className}
    >
      <div className="px-2 py-1">
        <VernierFunnelChart {...chart} className={undefined} />
      </div>
    </ChartCardShell>
  )
}

export interface RadarChartCardProps extends VernierRadarChartProps {
  title?: string
  description?: string
  overline?: string
  delta?: string
  deltaTone?: ChartDeltaTone
}

export function RadarChartCard({
  title,
  description,
  overline,
  delta,
  deltaTone,
  className,
  ...chart
}: RadarChartCardProps) {
  return (
    <ChartCardShell
      title={title}
      description={description}
      overline={overline}
      delta={delta}
      deltaTone={deltaTone}
      className={className}
    >
      <VernierRadarChart {...chart} className={undefined} />
    </ChartCardShell>
  )
}
