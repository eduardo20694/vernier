import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { cn } from '../lib/cn'
import { Checkbox } from './Checkbox'
import { SearchInput } from './SearchInput'

export interface DataColumn<T> {
  key: keyof T & string
  header: string
  numeric?: boolean
  sortable?: boolean
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  className,
}: {
  columns: DataColumn<T>[]
  rows: T[]
  className?: string
}) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<keyof T & string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = rows
    if (q) {
      list = list.filter((row) =>
        columns.some((c) => String(row[c.key] ?? '').toLowerCase().includes(q))
      )
    }
    if (sortKey) {
      list = [...list].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        if (av === bv) return 0
        if (av == null) return 1
        if (bv == null) return -1
        const cmp = av < bv ? -1 : 1
        return sortDir === 'asc' ? cmp : -cmp
      })
    }
    return list
  }, [rows, query, columns, sortKey, sortDir])

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((r) => selected.has(r.id))

  const toggleSort = (key: keyof T & string) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const toggleAll = () => {
    if (allVisibleSelected) {
      setSelected((prev) => {
        const next = new Set(prev)
        filtered.forEach((r) => next.delete(r.id))
        return next
      })
    } else {
      setSelected((prev) => {
        const next = new Set(prev)
        filtered.forEach((r) => next.add(r.id))
        return next
      })
    }
  }

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className={cn('w-full overflow-hidden rounded-xl border border-line bg-panel', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2.5">
        <SearchInput
          className="max-w-xs flex-1"
          placeholder="Filtrar linhas…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery('')}
        />
        <span className="font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
          {selected.size} sel. · {filtered.length} linhas
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-panel2 text-xs uppercase tracking-wide text-vellum-muted">
            <tr>
              <th className="w-10 px-3 py-2.5">
                <Checkbox
                  checked={allVisibleSelected}
                  onCheckedChange={toggleAll}
                  aria-label="Selecionar todas"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn('px-4 py-2.5 font-medium', col.numeric ? 'text-right' : 'text-left')}
                >
                  {col.sortable !== false ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-vellum"
                    >
                      {col.header}
                      {sortKey === col.key ? (
                        sortDir === 'asc' ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-40" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-t border-line hover:bg-panel2/40">
                <td className="px-3 py-3">
                  <Checkbox
                    checked={selected.has(row.id)}
                    onCheckedChange={() => toggleRow(row.id)}
                    aria-label={`Selecionar ${row.id}`}
                  />
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-3',
                      col.numeric && 'text-right font-mono tabular-nums'
                    )}
                  >
                    {String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-10 text-center text-vellum-faint">
                  Nenhuma linha.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
