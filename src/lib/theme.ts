export type VernierTheme = 'dark' | 'light'

export const THEME_STORAGE_KEY = 'vernier-theme'

export function readStoredTheme(): VernierTheme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* ignore */
  }
  return 'dark'
}

export function applyTheme(theme: VernierTheme) {
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

/** Call before first paint / React mount to reduce flash. */
export function hydrateTheme() {
  applyTheme(readStoredTheme())
}
