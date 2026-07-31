import { useCallback, useEffect, useId, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../lib/cn'
import {
  FONT_CATEGORY_LABEL,
  FONT_PRESETS,
  applyFont,
  getFontPreset,
  readStoredFont,
  type VernierFontId,
} from '../lib/fonts'

const CATEGORY_ORDER = ['brand', 'ui', 'editorial'] as const

interface FontPickerProps {
  className?: string
  onFontChange?: (id: VernierFontId) => void
}

export function FontPicker({ className, onFontChange }: FontPickerProps) {
  const groupId = useId()
  const [activeId, setActiveId] = useState<VernierFontId>(() => readStoredFont())

  useEffect(() => {
    setActiveId(readStoredFont())
  }, [])

  const select = useCallback(
    (id: VernierFontId) => {
      applyFont(id)
      setActiveId(id)
      onFontChange?.(id)
    },
    [onFontChange]
  )

  const sorted = [...FONT_PRESETS].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
  )

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass-dim">
            Tipografia global
          </p>
          <p className="mt-1 font-display text-lg text-vellum">Escolha a voz do catálogo</p>
          <p className="mt-1 max-w-xl text-sm text-vellum-muted">
            Aplica em todo o showcase — pranchas, páginas e chrome com{' '}
            <span className="font-mono text-xs text-vellum-faint">font-sans</span> /{' '}
            <span className="font-mono text-xs text-vellum-faint">font-display</span>. Persiste
            no navegador.
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
          Ativo: {getFontPreset(activeId).name}
        </p>
      </div>

      <div
        role="radiogroup"
        aria-labelledby={`${groupId}-label`}
        className="font-picker-grid"
      >
        <span id={`${groupId}-label`} className="sr-only">
          Selecionar tipografia global
        </span>
        {sorted.map((preset) => {
          const selected = preset.id === activeId
          return (
            <button
              key={preset.id}
              type="button"
              role="radio"
              aria-checked={selected}
              data-active={selected}
              onClick={() => select(preset.id)}
              className="font-picker-card focus-ring"
            >
              <div className="font-picker-card__head">
                <span
                  className="font-picker-card__sample"
                  style={{ fontFamily: preset.displayFamily }}
                >
                  {preset.sampleWord}
                </span>
                {selected && (
                  <span className="font-picker-card__check" aria-hidden>
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                )}
              </div>
              <span
                className="font-picker-card__numerals tabular-nums"
                style={{ fontFamily: preset.displayFamily }}
              >
                0123456789
              </span>
              <div className="font-picker-card__meta">
                <span className="font-picker-card__name">{preset.name}</span>
                <span className="font-picker-card__chip">{FONT_CATEGORY_LABEL[preset.category]}</span>
              </div>
              <span className="font-picker-card__tagline">{preset.tagline}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
