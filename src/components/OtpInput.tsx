import { useRef, type KeyboardEvent, type ClipboardEvent } from 'react'
import { cn } from '../lib/cn'

export function OtpInput({
  length = 6,
  value,
  onChange,
  className,
}: {
  length?: number
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const digits = Array.from({ length }, (_, i) => value[i] ?? '')

  const setAt = (index: number, char: string) => {
    const next = digits.map((d, i) => (i === index ? char : d))
    onChange(next.join('').slice(0, length))
  }

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (digits[index]) setAt(index, '')
      else if (index > 0) {
        setAt(index - 1, '')
        refs.current[index - 1]?.focus()
      }
      return
    }
    if (e.key === 'ArrowLeft' && index > 0) refs.current[index - 1]?.focus()
    if (e.key === 'ArrowRight' && index < length - 1) refs.current[index + 1]?.focus()
  }

  const onPaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!text) return
    onChange(text.padEnd(length, ' ').trimEnd().replace(/ /g, '').slice(0, length) || text)
    refs.current[Math.min(text.length, length - 1)]?.focus()
  }

  return (
    <div className={cn('flex gap-2', className)} onPaste={onPaste}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          inputMode="numeric"
          maxLength={1}
          value={digit}
          aria-label={`Dígito ${i + 1}`}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, '').slice(-1)
            setAt(i, v)
            if (v && i < length - 1) refs.current[i + 1]?.focus()
          }}
          onKeyDown={(e) => onKeyDown(i, e)}
          className={cn(
            'h-12 w-10 rounded-lg border border-line bg-panel text-center font-mono text-lg text-vellum',
            'focus-ring focus:border-brass-dim transition-colors'
          )}
        />
      ))}
    </div>
  )
}
