import { useCallback, useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '../lib/cn'
import { formatCpf } from '../lib/br'
import { IconButton } from './IconButton'

export type SensitiveMaskPattern = 'cpf' | 'phone' | 'beneficio' | 'custom'

export interface SensitiveDataProps {
  value: string
  maskPattern?: SensitiveMaskPattern
  customMask?: (value: string) => string
  revealed?: boolean
  defaultRevealed?: boolean
  onRevealedChange?: (revealed: boolean) => void
  label?: string
  className?: string
}

function maskCpf(value: string): string {
  const digits = value.replace(/\D/g, '')
  const formatted = formatCpf(digits)
  if (digits.length <= 2) return '*'.repeat(formatted.length || 3)
  const visible = formatted.slice(-2)
  return `***.***.***-${visible}`
}

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '')
  const last4 = digits.slice(-4).padStart(4, '*')
  return `(**) *****-${last4}`
}

function maskBeneficio(value: string): string {
  const digits = value.replace(/\D/g, '')
  const tail = digits.slice(-2).padStart(2, '*')
  return `***.*****.${'*'.repeat(2)}-${tail}`
}

function applyMask(
  value: string,
  pattern: SensitiveMaskPattern,
  customMask?: (value: string) => string
): string {
  if (pattern === 'custom' && customMask) return customMask(value)
  switch (pattern) {
    case 'cpf':
      return maskCpf(value)
    case 'phone':
      return maskPhone(value)
    case 'beneficio':
      return maskBeneficio(value)
    default:
      return '••••••••'
  }
}

export function SensitiveData({
  value,
  maskPattern = 'cpf',
  customMask,
  revealed: revealedProp,
  defaultRevealed = false,
  onRevealedChange,
  label,
  className,
}: SensitiveDataProps) {
  const autoId = useId()
  const [internalRevealed, setInternalRevealed] = useState(defaultRevealed)
  const revealed = revealedProp ?? internalRevealed

  const toggle = useCallback(() => {
    const next = !revealed
    if (revealedProp === undefined) setInternalRevealed(next)
    onRevealedChange?.(next)
  }, [revealed, revealedProp, onRevealedChange])

  const display = revealed ? value : applyMask(value, maskPattern, customMask)

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <span id={`${autoId}-label`} className="text-sm font-medium text-vellum-muted">
          {label}
        </span>
      )}
      <div
        className={cn(
          'flex h-10 items-center gap-2 rounded border border-line bg-panel px-2',
          'shadow-[inset_0_1px_0_rgb(var(--mist)/0.04)]'
        )}
      >
        <span
          id={autoId}
          aria-labelledby={label ? `${autoId}-label` : undefined}
          className={cn(
            'min-w-0 flex-1 truncate px-1 text-sm',
            revealed ? 'font-mono text-brass-bright' : 'font-mono text-vellum-muted tracking-wider'
          )}
        >
          {display}
        </span>
        <IconButton
          label={revealed ? 'Ocultar' : 'Mostrar'}
          tone="neutral"
          size="sm"
          onClick={toggle}
        >
          {revealed ? <EyeOff /> : <Eye />}
        </IconButton>
      </div>
    </div>
  )
}
