export type VernierFontCategory = 'ui' | 'editorial' | 'brand'

export type VernierFontId =
  | 'vernier'
  | 'inter'
  | 'manrope'
  | 'geist'
  | 'plus-jakarta'
  | 'general-sans'
  | 'satoshi'
  | 'playfair'
  | 'instrument-serif'
  | 'newsreader'
  | 'lora'
  | 'dm-serif'
  | 'cormorant'

export interface VernierFontPreset {
  id: VernierFontId
  name: string
  tagline: string
  category: VernierFontCategory
  displayFamily: string
  sansFamily: string
  sampleWord: string
}

export const FONT_STORAGE_KEY = 'vernier-font'
export const DEFAULT_FONT_ID: VernierFontId = 'vernier'

export const FONT_PRESETS: VernierFontPreset[] = [
  {
    id: 'vernier',
    name: 'Vernier',
    tagline: 'Fraunces + General Sans — par original',
    category: 'brand',
    displayFamily: '"Fraunces", Georgia, serif',
    sansFamily: '"General Sans", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Aa',
  },
  {
    id: 'inter',
    name: 'Inter',
    tagline: 'Neutro, denso, produto',
    category: 'ui',
    displayFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    sansFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Aa',
  },
  {
    id: 'manrope',
    name: 'Manrope',
    tagline: 'Geométrico e legível',
    category: 'ui',
    displayFamily: '"Manrope", "Segoe UI", system-ui, sans-serif',
    sansFamily: '"Manrope", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Aa',
  },
  {
    id: 'geist',
    name: 'Geist',
    tagline: 'Vercel — técnico e limpo',
    category: 'ui',
    displayFamily: '"Geist Sans", "Segoe UI", system-ui, sans-serif',
    sansFamily: '"Geist Sans", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Aa',
  },
  {
    id: 'plus-jakarta',
    name: 'Plus Jakarta Sans',
    tagline: 'Arredondado, SaaS moderno',
    category: 'ui',
    displayFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif',
    sansFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Aa',
  },
  {
    id: 'general-sans',
    name: 'General Sans',
    tagline: 'Corpo Vernier, UI puro',
    category: 'ui',
    displayFamily: '"General Sans", "Segoe UI", system-ui, sans-serif',
    sansFamily: '"General Sans", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Aa',
  },
  {
    id: 'satoshi',
    name: 'Satoshi',
    tagline: 'Grotesk contemporâneo',
    category: 'ui',
    displayFamily: '"Satoshi", "Segoe UI", system-ui, sans-serif',
    sansFamily: '"Satoshi", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Aa',
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    tagline: 'Serif editorial clássico',
    category: 'editorial',
    displayFamily: '"Playfair Display", Georgia, serif',
    sansFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Ag',
  },
  {
    id: 'instrument-serif',
    name: 'Instrument Serif',
    tagline: 'Serif expressivo, blog',
    category: 'editorial',
    displayFamily: '"Instrument Serif", Georgia, serif',
    sansFamily: '"Manrope", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Ag',
  },
  {
    id: 'newsreader',
    name: 'Newsreader',
    tagline: 'Leitura longa, jornal',
    category: 'editorial',
    displayFamily: '"Newsreader", Georgia, serif',
    sansFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Ag',
  },
  {
    id: 'lora',
    name: 'Lora',
    tagline: 'Serif calibrado, conteúdo',
    category: 'editorial',
    displayFamily: '"Lora", Georgia, serif',
    sansFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Ag',
  },
  {
    id: 'dm-serif',
    name: 'DM Serif Display',
    tagline: 'Display serif nítido',
    category: 'editorial',
    displayFamily: '"DM Serif Display", Georgia, serif',
    sansFamily: '"Manrope", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Ag',
  },
  {
    id: 'cormorant',
    name: 'Cormorant Garamond',
    tagline: 'Elegante, revista',
    category: 'editorial',
    displayFamily: '"Cormorant Garamond", Georgia, serif',
    sansFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    sampleWord: 'Ag',
  },
]

const presetById = new Map(FONT_PRESETS.map((p) => [p.id, p]))

export function getFontPreset(id: VernierFontId): VernierFontPreset {
  return presetById.get(id) ?? presetById.get(DEFAULT_FONT_ID)!
}

export function isVernierFontId(value: string): value is VernierFontId {
  return presetById.has(value as VernierFontId)
}

export function readStoredFont(): VernierFontId {
  try {
    const stored = localStorage.getItem(FONT_STORAGE_KEY)
    if (stored && isVernierFontId(stored)) return stored
  } catch {
    /* ignore */
  }
  return DEFAULT_FONT_ID
}

export function applyFont(id: VernierFontId) {
  const preset = getFontPreset(id)
  const root = document.documentElement
  root.style.setProperty('--font-display', preset.displayFamily)
  root.style.setProperty('--font-sans', preset.sansFamily)
  root.dataset.font = id
  try {
    localStorage.setItem(FONT_STORAGE_KEY, id)
  } catch {
    /* ignore */
  }
}

/** Call before first paint / React mount to reduce flash. */
export function hydrateFont() {
  applyFont(readStoredFont())
}

export const FONT_CATEGORY_LABEL: Record<VernierFontCategory, string> = {
  brand: 'Vernier',
  ui: 'UI',
  editorial: 'Editorial',
}

/** Compact map for inline hydration in index.html — keep in sync. */
export const FONT_INLINE_HYDRATE: Record<
  VernierFontId,
  { display: string; sans: string }
> = Object.fromEntries(
  FONT_PRESETS.map((p) => [p.id, { display: p.displayFamily, sans: p.sansFamily }])
) as Record<VernierFontId, { display: string; sans: string }>
