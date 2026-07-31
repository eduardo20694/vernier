import { cn } from '../lib/cn'
import { Badge } from './Badge'

export interface ChangelogEntry {
  id?: string
  version: string
  date: string
  title?: string
  changes: string[]
  tone?: 'brass' | 'verdigris' | 'rust' | 'neutral'
}

export interface ChangelogProps {
  title?: string
  entries: ChangelogEntry[]
  className?: string
}

export function Changelog({ title = 'Changelog', entries, className }: ChangelogProps) {
  return (
    <section className={cn('w-full max-w-2xl', className)}>
      {title && <h2 className="mb-6 font-display text-3xl text-vellum">{title}</h2>}
      <ol className="space-y-0">
        {entries.map((entry, i) => {
          const last = i === entries.length - 1
          return (
            <li key={entry.id ?? entry.version} className="relative flex gap-4 pb-8 last:pb-0">
              {!last && (
                <span
                  aria-hidden
                  className="absolute left-[7px] top-4 h-[calc(100%-8px)] w-px bg-gradient-to-b from-brass-dim/50 via-line to-transparent"
                />
              )}
              <span
                aria-hidden
                className="relative z-[1] mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brass ring-4 ring-ink shadow-[0_0_10px_rgb(var(--brass)/0.45)]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={entry.tone ?? 'brass'}>v{entry.version.replace(/^v/i, '')}</Badge>
                  <time className="font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
                    {entry.date}
                  </time>
                </div>
                {entry.title && (
                  <p className="mt-2 font-medium text-vellum">{entry.title}</p>
                )}
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-vellum-muted">
                  {entry.changes.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
