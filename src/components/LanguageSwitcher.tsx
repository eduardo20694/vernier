import { cn } from '../lib/cn'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select'

export interface LocaleOption {
  value: string
  label: string
}

export interface LanguageSwitcherProps {
  value: string
  onChange: (value: string) => void
  locales?: LocaleOption[]
  className?: string
  /** Compact trigger width */
  compact?: boolean
}

const DEFAULT_LOCALES: LocaleOption[] = [
  { value: 'pt-BR', label: 'PT' },
  { value: 'en', label: 'EN' },
  { value: 'es', label: 'ES' },
]

export function LanguageSwitcher({
  value,
  onChange,
  locales = DEFAULT_LOCALES,
  className,
  compact = true,
}: LanguageSwitcherProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label="Idioma"
        className={cn(compact ? 'h-8 w-[72px] px-2 text-xs' : 'w-[140px]', className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((l) => (
          <SelectItem key={l.value} value={l.value}>
            {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
