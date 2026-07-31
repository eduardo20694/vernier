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
  brass: '#C9A66B',
  verdigris: '#5E8C7A',
  rust: '#A6432B',
}

// Instrumento circular — o vernier literal. Arco de latão sobre trilho escuro,
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
            <stop offset="100%" stopColor={toneStroke[tone]} stopOpacity="0.55" />
          </linearGradient>
          <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#3A342C"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arc} ${c}`}
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
          <span className={cn('mt-1 font-mono uppercase tracking-widest text-vellum-faint', labelSize)}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
