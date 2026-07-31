import { useEffect, useRef, useState, type HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface AnimatedNumberProps extends HTMLAttributes<HTMLSpanElement> {
  value: number
  /** Duração da animação em ms */
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function AnimatedNumber({
  className,
  value,
  duration = 800,
  decimals = 0,
  prefix,
  suffix,
  ...props
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const from = fromRef.current
    const to = value
    if (from === to) {
      setDisplay(to)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const next = from + (to - from) * easeOutCubic(t)
      setDisplay(next)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      fromRef.current = to
    }
  }, [value, duration])

  const formatted = display.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span
      className={cn('font-mono tabular-nums text-brass-bright', className)}
      {...props}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
