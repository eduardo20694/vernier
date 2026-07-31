import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Search } from 'lucide-react'
import { Dialog, DialogContent } from './Dialog'
import { cn } from '../lib/cn'

export interface CommandItem {
  id: string
  label: string
  hint?: string
  icon?: ReactNode
  group?: string
  onSelect?: () => void
}

export function CommandPalette({
  open,
  onOpenChange,
  items,
  placeholder = 'Buscar comando…',
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CommandItem[]
  placeholder?: string
}) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.hint?.toLowerCase().includes(q) ||
        i.group?.toLowerCase().includes(q)
    )
  }, [items, query])

  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>()
    for (const item of filtered) {
      const key = item.group ?? 'Geral'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(item)
    }
    return Array.from(map.entries())
  }, [filtered])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg" showClose={false} className="gap-0 overflow-hidden p-0">
        <div className="flex items-center gap-2 border-b border-line px-4">
          <Search className="h-4 w-4 shrink-0 text-vellum-faint" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-12 w-full bg-transparent text-sm text-vellum outline-none placeholder:text-vellum-faint"
          />
          <kbd className="hidden rounded border border-line bg-panel2 px-1.5 py-0.5 font-mono text-[10px] text-vellum-faint sm:inline">
            esc
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {groups.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-vellum-faint">Nenhum comando encontrado.</p>
          )}
          {groups.map(([group, groupItems]) => (
            <div key={group} className="mb-2">
              <p className="px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
                {group}
              </p>
              {groupItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.onSelect?.()
                    onOpenChange(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-sm',
                    'text-vellum-muted hover:bg-panel2 hover:text-vellum focus-ring'
                  )}
                >
                  {item.icon && <span className="text-brass-dim">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                  {item.hint && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
                      {item.hint}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
