import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

export type TerminalLineKind = 'prompt' | 'output' | 'error' | 'comment'

export interface TerminalLine {
  kind?: TerminalLineKind
  content: ReactNode
  /** Prefixo do prompt (ex: `vernier$`) */
  prompt?: string
}

export interface TerminalProps extends HTMLAttributes<HTMLDivElement> {
  lines: TerminalLine[]
  title?: string
}

const kindClass: Record<TerminalLineKind, string> = {
  prompt: 'text-brass-bright',
  output: 'text-vellum-muted',
  error: 'text-rust',
  comment: 'text-vellum-faint',
}

export function Terminal({
  className,
  lines,
  title = 'terminal',
  ...props
}: TerminalProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded border border-line bg-[#0a1528] text-[#e8eef8]',
        'shadow-plate',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-rust/80" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-brass/70" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-verdigris/70" aria-hidden />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
          {title}
        </span>
      </div>
      <pre className="max-h-80 overflow-auto p-3 font-mono text-xs leading-relaxed">
        {lines.map((line, i) => {
          const kind = line.kind ?? (line.prompt != null ? 'prompt' : 'output')
          return (
            <div key={i} className={cn('whitespace-pre-wrap break-all', kindClass[kind])}>
              {kind === 'prompt' && (
                <span className="mr-2 text-verdigris">{line.prompt ?? '$'}</span>
              )}
              {line.content}
            </div>
          )
        })}
      </pre>
    </div>
  )
}
