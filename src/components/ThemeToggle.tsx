import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '../lib/cn'
import {
  applyTheme,
  readStoredTheme,
  type VernierTheme,
} from '../lib/theme'

export interface ThemeToggleProps {
  /** Controlled theme */
  theme?: VernierTheme
  onThemeChange?: (theme: VernierTheme) => void
  className?: string
  /** Show Dia/Noite label */
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export function ThemeToggle({
  theme: themeProp,
  onThemeChange,
  className,
  showLabel = true,
  size = 'sm',
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<VernierTheme>(() => themeProp ?? readStoredTheme())

  useEffect(() => {
    if (themeProp !== undefined) setTheme(themeProp)
  }, [themeProp])

  const current = themeProp ?? theme
  const isDark = current === 'dark'
  const label = isDark ? 'Dia' : 'Noite'
  const aria = isDark ? 'Ativar modo dia' : 'Ativar modo noite'

  function toggle() {
    const next: VernierTheme = isDark ? 'light' : 'dark'
    const root = document.documentElement
    root.classList.add('theme-switching')
    window.setTimeout(() => root.classList.remove('theme-switching'), 280)
    applyTheme(next)
    setTheme(next)
    onThemeChange?.(next)
  }

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-line',
        'bg-gradient-to-b from-panel2 to-panel text-vellum-muted',
        'hover:border-brass-dim/60 hover:text-vellum focus-ring',
        'transition-colors duration-150',
        size === 'sm' ? 'h-8 px-2.5 text-xs' : 'h-10 px-3 text-sm',
        className
      )}
      onClick={toggle}
      aria-label={aria}
      aria-pressed={!isDark}
      title={aria}
    >
      <span aria-hidden>
        {isDark ? (
          <Sun className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
        ) : (
          <Moon className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
        )}
      </span>
      {showLabel && <span className="font-mono text-[10px] uppercase tracking-wider">{label}</span>}
    </button>
  )
}
