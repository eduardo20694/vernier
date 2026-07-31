import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'

export interface JsonViewerProps extends HTMLAttributes<HTMLDivElement> {
  data: unknown
  initiallyExpanded?: boolean
  maxDepth?: number
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function JsonNode({
  name,
  value,
  depth,
  maxDepth,
  initiallyExpanded,
}: {
  name?: string
  value: unknown
  depth: number
  maxDepth: number
  initiallyExpanded: boolean
}) {
  const expandable = Array.isArray(value) || isPlainObject(value)
  const [open, setOpen] = useState(initiallyExpanded && depth < maxDepth)

  let preview: ReactNode
  if (value === null) preview = <span className="text-rust">null</span>
  else if (typeof value === 'string')
    preview = <span className="text-verdigris">&quot;{value}&quot;</span>
  else if (typeof value === 'number')
    preview = <span className="text-brass-bright">{value}</span>
  else if (typeof value === 'boolean')
    preview = <span className="text-brass">{String(value)}</span>
  else if (Array.isArray(value))
    preview = <span className="text-vellum-faint">Array({value.length})</span>
  else if (isPlainObject(value))
    preview = (
      <span className="text-vellum-faint">
        Object({'{'}
        {Object.keys(value).length}
        {'}'})
      </span>
    )
  else preview = <span className="text-vellum-muted">{String(value)}</span>

  const entries = expandable
    ? Array.isArray(value)
      ? value.map((v, i) => [String(i), v] as const)
      : Object.entries(value as Record<string, unknown>)
    : []

  return (
    <div className="font-mono text-xs leading-relaxed">
      <div className="flex items-start gap-1">
        {expandable ? (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm text-vellum-faint hover:text-brass-bright focus-ring"
            aria-expanded={open}
            aria-label={open ? 'Recolher' : 'Expandir'}
          >
            <ChevronRight className={cn('h-3 w-3 transition-transform', open && 'rotate-90')} />
          </button>
        ) : (
          <span className="inline-block w-4 shrink-0" />
        )}
        {name != null && (
          <span className="text-vellum-muted">
            {name}
            <span className="text-vellum-faint">: </span>
          </span>
        )}
        {!expandable || !open ? preview : Array.isArray(value) ? (
          <span className="text-vellum-faint">[</span>
        ) : (
          <span className="text-vellum-faint">{'{'}</span>
        )}
      </div>
      {expandable && open && (
        <div className="ml-4 border-l border-line pl-2">
          {entries.map(([k, v]) => (
            <JsonNode
              key={k}
              name={k}
              value={v}
              depth={depth + 1}
              maxDepth={maxDepth}
              initiallyExpanded={initiallyExpanded}
            />
          ))}
          <div className="text-vellum-faint">{Array.isArray(value) ? ']' : '}'}</div>
        </div>
      )}
    </div>
  )
}

export function JsonViewer({
  className,
  data,
  initiallyExpanded = true,
  maxDepth = 3,
  ...props
}: JsonViewerProps) {
  return (
    <div
      className={cn(
        'overflow-auto rounded border border-line bg-panel p-3 text-vellum',
        'shadow-[inset_0_1px_0_rgb(var(--mist)/0.04)]',
        className
      )}
      {...props}
    >
      <JsonNode
        value={data}
        depth={0}
        maxDepth={maxDepth}
        initiallyExpanded={initiallyExpanded}
      />
    </div>
  )
}
