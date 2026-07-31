import {
  useCallback,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'

export interface TreeNode {
  id: string
  label: string
  icon?: ReactNode
  children?: TreeNode[]
  disabled?: boolean
}

export interface TreeViewProps {
  nodes: TreeNode[]
  selectedId?: string
  onSelect?: (id: string, node: TreeNode) => void
  defaultExpandedIds?: string[]
  className?: string
}

function collectIds(nodes: TreeNode[], out: string[] = []): string[] {
  for (const n of nodes) {
    out.push(n.id)
    if (n.children?.length) collectIds(n.children, out)
  }
  return out
}

function findNode(nodes: TreeNode[], id: string): TreeNode | undefined {
  for (const n of nodes) {
    if (n.id === id) return n
    if (n.children?.length) {
      const found = findNode(n.children, id)
      if (found) return found
    }
  }
  return undefined
}

function visibleIds(nodes: TreeNode[], expanded: Set<string>): string[] {
  const result: string[] = []
  const walk = (list: TreeNode[]) => {
    for (const n of list) {
      if (n.disabled) continue
      result.push(n.id)
      if (n.children?.length && expanded.has(n.id)) walk(n.children)
    }
  }
  walk(nodes)
  return result
}

export function TreeView({
  nodes,
  selectedId,
  onSelect,
  defaultExpandedIds = [],
  className,
}: TreeViewProps) {
  const listId = useId()
  const [expanded, setExpanded] = useState(() => new Set(defaultExpandedIds))
  const [focusId, setFocusId] = useState<string | undefined>(
    () => selectedId ?? collectIds(nodes)[0]
  )

  const flatVisible = useMemo(() => visibleIds(nodes, expanded), [nodes, expanded])

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const select = useCallback(
    (node: TreeNode) => {
      if (node.disabled) return
      setFocusId(node.id)
      onSelect?.(node.id, node)
    },
    [onSelect]
  )

  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const current = focusId ?? flatVisible[0]
    if (!current) return
    const index = flatVisible.indexOf(current)
    const node = findNode(nodes, current)
    if (!node) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = flatVisible[Math.min(flatVisible.length - 1, index + 1)]
      if (next) setFocusId(next)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = flatVisible[Math.max(0, index - 1)]
      if (prev) setFocusId(prev)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      if (node.children?.length) {
        if (!expanded.has(node.id)) toggle(node.id)
        else {
          const next = flatVisible[Math.min(flatVisible.length - 1, index + 1)]
          if (next) setFocusId(next)
        }
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      if (node.children?.length && expanded.has(node.id)) toggle(node.id)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      select(node)
    } else if (e.key === 'Home') {
      e.preventDefault()
      if (flatVisible[0]) setFocusId(flatVisible[0])
    } else if (e.key === 'End') {
      e.preventDefault()
      const last = flatVisible[flatVisible.length - 1]
      if (last) setFocusId(last)
    }
  }

  return (
    <ul
      id={listId}
      role="tree"
      aria-label="Árvore"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        'space-y-0.5 rounded-md border border-line bg-panel p-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brass-dim/50',
        className
      )}
    >
      {nodes.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          depth={0}
          expanded={expanded}
          selectedId={selectedId}
          focusId={focusId}
          onToggle={toggle}
          onSelect={select}
          onFocus={setFocusId}
        />
      ))}
    </ul>
  )
}

function TreeItem({
  node,
  depth,
  expanded,
  selectedId,
  focusId,
  onToggle,
  onSelect,
  onFocus,
}: {
  node: TreeNode
  depth: number
  expanded: Set<string>
  selectedId?: string
  focusId?: string
  onToggle: (id: string) => void
  onSelect: (node: TreeNode) => void
  onFocus: (id: string) => void
}) {
  const hasChildren = Boolean(node.children?.length)
  const isOpen = expanded.has(node.id)
  const selected = node.id === selectedId
  const focused = node.id === focusId

  return (
    <li role="treeitem" aria-expanded={hasChildren ? isOpen : undefined} aria-selected={selected}>
      <div
        className={cn(
          'flex w-full items-center gap-1 rounded-md py-1.5 pr-2 text-left transition-colors',
          node.disabled && 'pointer-events-none opacity-40',
          selected
            ? 'bg-panel2 text-brass-bright shadow-[inset_2px_0_0_0_rgb(var(--brass))]'
            : 'text-vellum-muted hover:bg-panel2/70 hover:text-vellum',
          focused && !selected && 'ring-1 ring-inset ring-brass-dim/40'
        )}
        style={{ paddingLeft: 8 + depth * 14 }}
      >
        {hasChildren ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label={isOpen ? 'Recolher' : 'Expandir'}
            onClick={() => onToggle(node.id)}
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-vellum-faint hover:text-vellum focus-ring"
          >
            <ChevronRight
              className={cn('h-3.5 w-3.5 transition-transform duration-150', isOpen && 'rotate-90')}
            />
          </button>
        ) : (
          <span className="inline-block h-5 w-5 shrink-0" aria-hidden />
        )}

        <button
          type="button"
          tabIndex={-1}
          disabled={node.disabled}
          onClick={() => onSelect(node)}
          onFocus={() => onFocus(node.id)}
          className="flex min-w-0 flex-1 items-center gap-2 rounded px-1 py-0.5 text-left focus-ring"
        >
          {node.icon && (
            <span className="shrink-0 text-vellum-faint [&_svg]:h-3.5 [&_svg]:w-3.5">{node.icon}</span>
          )}
          <span className="truncate">{node.label}</span>
        </button>
      </div>

      {hasChildren && isOpen && (
        <ul role="group" className="space-y-0.5">
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              selectedId={selectedId}
              focusId={focusId}
              onToggle={onToggle}
              onSelect={onSelect}
              onFocus={onFocus}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
