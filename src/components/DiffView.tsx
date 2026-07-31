import { useMemo, type HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export type DiffMode = 'unified' | 'split'

export interface DiffViewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  oldText: string
  newText: string
  mode?: DiffMode
}

type DiffLine = {
  type: 'equal' | 'add' | 'remove'
  oldNo?: number
  newNo?: number
  text: string
}

function buildDiff(oldText: string, newText: string): DiffLine[] {
  const a = oldText.split('\n')
  const b = newText.split('\n')
  const n = a.length
  const m = b.length
  // LCS DP for simple line compare
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const lines: DiffLine[] = []
  let i = 0
  let j = 0
  let oldNo = 1
  let newNo = 1
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      lines.push({ type: 'equal', oldNo: oldNo++, newNo: newNo++, text: a[i] })
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      lines.push({ type: 'remove', oldNo: oldNo++, text: a[i] })
      i++
    } else {
      lines.push({ type: 'add', newNo: newNo++, text: b[j] })
      j++
    }
  }
  while (i < n) {
    lines.push({ type: 'remove', oldNo: oldNo++, text: a[i++] })
  }
  while (j < m) {
    lines.push({ type: 'add', newNo: newNo++, text: b[j++] })
  }
  return lines
}

export function DiffView({
  className,
  oldText,
  newText,
  mode = 'unified',
  ...props
}: DiffViewProps) {
  const lines = useMemo(() => buildDiff(oldText, newText), [oldText, newText])

  if (mode === 'split') {
    const left = lines.filter((l) => l.type !== 'add')
    const right = lines.filter((l) => l.type !== 'remove')
    return (
      <div
        className={cn(
          'grid grid-cols-1 overflow-hidden rounded border border-line bg-panel md:grid-cols-2',
          className
        )}
        {...props}
      >
        <pre className="overflow-auto border-b border-line p-0 font-mono text-xs md:border-b-0 md:border-r">
          {left.map((l, idx) => (
            <div
              key={`l-${idx}`}
              className={cn(
                'flex gap-3 px-3 py-0.5',
                l.type === 'remove' && 'bg-rust/15 text-rust',
                l.type === 'equal' && 'text-vellum-muted'
              )}
            >
              <span className="w-8 shrink-0 select-none text-right text-vellum-faint">
                {l.oldNo ?? ''}
              </span>
              <span className="whitespace-pre-wrap break-all">{l.type === 'remove' ? `- ${l.text}` : `  ${l.text}`}</span>
            </div>
          ))}
        </pre>
        <pre className="overflow-auto p-0 font-mono text-xs">
          {right.map((l, idx) => (
            <div
              key={`r-${idx}`}
              className={cn(
                'flex gap-3 px-3 py-0.5',
                l.type === 'add' && 'bg-verdigris/15 text-verdigris',
                l.type === 'equal' && 'text-vellum-muted'
              )}
            >
              <span className="w-8 shrink-0 select-none text-right text-vellum-faint">
                {l.newNo ?? ''}
              </span>
              <span className="whitespace-pre-wrap break-all">{l.type === 'add' ? `+ ${l.text}` : `  ${l.text}`}</span>
            </div>
          ))}
        </pre>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'overflow-auto rounded border border-line bg-panel p-0 font-mono text-xs',
        className
      )}
      {...props}
    >
      {lines.map((l, idx) => (
        <div
          key={idx}
          className={cn(
            'flex gap-3 px-3 py-0.5',
            l.type === 'add' && 'bg-verdigris/15 text-verdigris',
            l.type === 'remove' && 'bg-rust/15 text-rust',
            l.type === 'equal' && 'text-vellum-muted'
          )}
        >
          <span className="w-8 shrink-0 select-none text-right text-vellum-faint">
            {l.oldNo ?? ''}
          </span>
          <span className="w-8 shrink-0 select-none text-right text-vellum-faint">
            {l.newNo ?? ''}
          </span>
          <span className="whitespace-pre-wrap break-all">
            {l.type === 'add' ? '+' : l.type === 'remove' ? '-' : ' '} {l.text}
          </span>
        </div>
      ))}
    </div>
  )
}
