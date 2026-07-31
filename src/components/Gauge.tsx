import { useId } from 'react'
import { cn } from '../lib/cn'

export interface GaugeProps {
  value: number
  max?: number
  label?: string
  unit?: string
  size?: 'sm' | 'md' | 'lg'
  tone?: 'brass' | 'verdigris' | 'rust'
  className?: string
}

const sizeMap = {
  sm: { box: 88, stroke: 7, text: 'text-lg', label: 'text-[10px]' },
  md: { box: 120, stroke: 8, text: 'text-2xl', label: 'text-xs' },
  lg: { box: 156, stroke: 10, text: 'text-3xl', label: 'text-sm' },
}

const toneStroke = {
  brass: 'rgb(var(--brass))',
  verdigris: 'rgb(var(--verdigris))',
  rust: 'rgb(var(--rust))',
}

// Instrumento circular — o vernier literal. Arco azure sobre trilho escuro,
// valor em Space Mono no centro. SVG puro, sem lib de chart.
export function Gauge({
  value,
  max = 100,
  label,
  unit = '%',
  size = 'md',
  tone = 'brass',
  className,
}: GaugeProps) {
  const uid = useId().replace(/:/g, '')
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const { box, stroke, text, label: labelSize } = sizeMap[size]
  const r = (box - stroke) / 2 - 4
  const c = 2 * Math.PI * r
  // Arco de ~270° (tipo manômetro), não círculo cheio
  const arc = c * 0.75
  const offset = arc - (pct / 100) * arc
  const cx = box / 2
  const cy = box / 2
  const gradId = `gauge-grad-${uid}`
  const glowId = `gauge-glow-${uid}`

  return (
    <div className={cn('relative inline-flex flex-col items-center', className)} style={{ width: box }}>
      <svg width={box} height={box} viewBox={`0 0 ${box} ${box}`} className="-rotate-[225deg]">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={toneStroke[tone]} stopOpacity="1" />
            <stop offset="55%" stopColor={toneStroke[tone]} stopOpacity="0.85" />
            <stop offset="100%" stopColor={toneStroke[tone]} stopOpacity="0.4" />
          </linearGradient>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`${gradId}-face`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="rgb(var(--mist))" stopOpacity="0.06" />
            <stop offset="100%" stopColor="rgb(var(--ink))" stopOpacity="0.15" />
          </radialGradient>
        </defs>
        <circle
          cx={cx}
          cy={cy}
          r={r - stroke * 0.35}
          fill={`url(#${gradId}-face)`}
          opacity="0.9"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgb(var(--line))"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arc} ${c}`}
          opacity="0.85"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arc} ${c}`}
          strokeDashoffset={offset}
          filter={`url(#${glowId})`}
          className="transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-1">
        <span className={cn('font-mono font-medium tabular-nums text-vellum leading-none', text)}>
          {Math.round(pct)}
          <span className="ml-0.5 text-[0.55em] text-vellum-faint">{unit}</span>
        </span>
        {label && (
          <span className={cn('mt-1.5 font-mono uppercase tracking-[0.16em] text-vellum-faint', labelSize)}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
