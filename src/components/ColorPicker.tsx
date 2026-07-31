import { useId, useMemo, type ChangeEvent } from 'react'
import { cn } from '../lib/cn'
import { Label } from './Label'

export interface ColorPreset {
  label: string
  value: string
}

export interface ColorPickerProps {
  label?: string
  value: string
  onChange: (value: string) => void
  presets?: ColorPreset[]
  className?: string
  id?: string
  disabled?: boolean
}

/** Default Vernier swatches — azure accent, teal, rust, vellum-ish. */
export const VERNIER_COLOR_PRESETS: ColorPreset[] = [
  { label: 'Azure', value: '#3E8AE8' },
  { label: 'Azure claro', value: '#4B8CFF' },
  { label: 'Teal', value: '#3A968A' },
  { label: 'Rust', value: '#DC5050' },
  { label: 'Vellum', value: '#EAF0FA' },
  { label: 'Vellum muted', value: '#A0B0C8' },
]

function normalizeHex(raw: string): string | null {
  const t = raw.trim()
  const withHash = t.startsWith('#') ? t : `#${t}`
  if (/^#[0-9A-Fa-f]{6}$/.test(withHash)) return withHash.toUpperCase()
  if (/^#[0-9A-Fa-f]{3}$/.test(withHash)) {
    const [, r, g, b] = withHash
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase()
  }
  return null
}

function toNativeColor(value: string): string {
  return normalizeHex(value) ?? '#3E8AE8'
}

export function ColorPicker({
  label,
  value,
  onChange,
  presets = VERNIER_COLOR_PRESETS,
  className,
  id,
  disabled,
}: ColorPickerProps) {
  const autoId = useId()
  const colorId = id ?? autoId
  const hexId = `${colorId}-hex`
  const nativeValue = useMemo(() => toNativeColor(value), [value])
  const displayHex = normalizeHex(value) ?? value

  const emit = (next: string) => {
    const normalized = normalizeHex(next)
    if (normalized) onChange(normalized)
    else onChange(next)
  }

  const onNativeChange = (e: ChangeEvent<HTMLInputElement>) => {
    emit(e.target.value)
  }

  const onHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const normalized = normalizeHex(raw)
    if (normalized) onChange(normalized)
    else onChange(raw)
  }

  const onHexBlur = () => {
    const normalized = normalizeHex(value)
    if (normalized && normalized !== value) onChange(normalized)
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && <Label htmlFor={colorId}>{label}</Label>}

      <div className="flex items-center gap-2">
        <label
          htmlFor={colorId}
          className={cn(
            'relative h-10 w-12 shrink-0 overflow-hidden rounded border border-line bg-panel2',
            'focus-within:ring-2 focus-within:ring-brass-dim/50',
            disabled && 'opacity-50'
          )}
        >
          <span className="sr-only">{label ? `${label} — seletor` : 'Seletor de cor'}</span>
          <input
            id={colorId}
            type="color"
            value={nativeValue}
            onChange={onNativeChange}
            disabled={disabled}
            aria-label={label ? `${label} — cor` : 'Cor'}
            className="absolute inset-0 h-full w-full cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed"
          />
        </label>

        <div className="relative min-w-0 flex-1">
          <label htmlFor={hexId} className="sr-only">
            {label ? `${label} — hexadecimal` : 'Cor hexadecimal'}
          </label>
          <input
            id={hexId}
            type="text"
            inputMode="text"
            spellCheck={false}
            autoComplete="off"
            value={displayHex}
            onChange={onHexChange}
            onBlur={onHexBlur}
            disabled={disabled}
            placeholder="#3E8AE8"
            aria-label={label ? `${label} — hexadecimal` : 'Cor hexadecimal'}
            className={cn(
              'h-10 w-full rounded border border-line bg-panel px-3 font-mono text-sm uppercase text-vellum',
              'placeholder:text-vellum-faint focus-ring focus:border-brass-dim',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          />
        </div>
      </div>

      {presets.length > 0 && (
        <div role="group" aria-label={label ? `${label} — predefinições` : 'Cores predefinidas'}>
          <ul className="flex flex-wrap gap-1.5">
            {presets.map((preset) => {
              const active = normalizeHex(value) === normalizeHex(preset.value)
              return (
                <li key={preset.value}>
                  <button
                    type="button"
                    title={preset.label}
                    aria-label={preset.label}
                    aria-pressed={active}
                    disabled={disabled}
                    onClick={() => emit(preset.value)}
                    className={cn(
                      'h-7 w-7 rounded-md border transition-transform focus-ring',
                      'hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50',
                      active ? 'border-brass-bright ring-2 ring-brass-dim/40' : 'border-line'
                    )}
                    style={{ backgroundColor: preset.value }}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
