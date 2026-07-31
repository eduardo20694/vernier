import { cn } from '../lib/cn'
import { Avatar } from './Avatar'

export interface TeamMember {
  id?: string
  name: string
  role: string
  bio?: string
  avatarSrc?: string
  tone?: 'brass' | 'verdigris' | 'rust' | 'neutral'
}

export interface TeamGridProps {
  title?: string
  description?: string
  members: TeamMember[]
  className?: string
}

export function TeamGrid({ title, description, members, className }: TeamGridProps) {
  return (
    <section className={cn('w-full', className)}>
      {(title || description) && (
        <header className="mb-8 max-w-2xl">
          {title && <h2 className="font-display text-3xl text-vellum">{title}</h2>}
          {description && (
            <p className="mt-2 text-sm text-vellum-muted">{description}</p>
          )}
        </header>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m, i) => (
          <li
            key={m.id ?? i}
            className="flex flex-col items-start gap-3 rounded-xl border border-line bg-panel p-5"
          >
            <Avatar
              size="lg"
              fallback={m.name}
              src={m.avatarSrc}
              tone={m.tone ?? 'brass'}
              ring={false}
            />
            <div>
              <p className="font-display text-lg text-vellum">{m.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brass-bright">
                {m.role}
              </p>
              {m.bio && <p className="mt-2 text-sm text-vellum-muted">{m.bio}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
