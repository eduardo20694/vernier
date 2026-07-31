import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../lib/cn'

export interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language = 'bash', className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-line bg-gradient-to-b from-panel2 to-ink shadow-forged',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass-dim">
          {language}
        </span>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
          }}
          className="inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs text-vellum-faint hover:bg-panel hover:text-vellum focus-ring"
        >
          {copied ? <Check className="h-3 w-3 text-verdigris" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-brass-bright">
        <code>{code}</code>
      </pre>
    </div>
  )
}
