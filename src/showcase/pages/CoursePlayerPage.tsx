import { useState } from 'react'
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Gauge,
  PlayCircle,
} from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { Button } from '../../components/Button'
import { Progress } from '../../components/Progress'
import { UserMenu } from '../../components/UserMenu'
import { cn } from '../../lib/cn'
import { AppPageShell } from './PageFrame'

interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
}

const LESSONS: Lesson[] = [
  { id: '1', title: 'Boas-vindas ao oceano', duration: '4:12', completed: true },
  { id: '2', title: 'Anatomia dos tokens', duration: '12:30', completed: true },
  { id: '3', title: 'Paleta ink, panel e brass', duration: '18:45', completed: true },
  { id: '4', title: 'Modo dia vs. modo noite', duration: '15:20', completed: false },
  { id: '5', title: 'CSS variables na prática', duration: '22:10', completed: false },
  { id: '6', title: 'Exportar para Tailwind', duration: '14:55', completed: false },
  { id: '7', title: 'Projeto final: tema custom', duration: '28:00', completed: false },
]

function LessonSidebar({
  lessons,
  activeId,
  progressPct,
  completedCount,
  onSelect,
}: {
  lessons: Lesson[]
  activeId: string
  progressPct: number
  completedCount: number
  onSelect: (id: string) => void
}) {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-panel">
      <div className="flex h-14 items-center gap-2 border-b border-line px-4 font-display text-vellum">
        <BookOpen className="h-4 w-4 shrink-0 text-brass-bright" aria-hidden />
        <span className="truncate text-sm">Tokens dia e noite</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <Progress value={progressPct} label="Progresso do curso" showValue />
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
          {completedCount} de {lessons.length} aulas concluídas
        </p>
        <ul className="mt-4 space-y-0.5">
          {lessons.map((lesson) => {
            const isActive = lesson.id === activeId
            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  onClick={() => onSelect(lesson.id)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors focus-ring',
                    isActive
                      ? 'bg-brass/[0.08] text-brass-bright'
                      : 'text-vellum-muted hover:bg-panel2/60 hover:text-vellum'
                  )}
                >
                  {lesson.completed ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-verdigris" aria-hidden />
                  ) : (
                    <span
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px]',
                        isActive ? 'border-brass text-brass' : 'border-line text-vellum-faint'
                      )}
                    >
                      {lesson.id}
                    </span>
                  )}
                  <span className="min-w-0 flex-1 truncate">{lesson.title}</span>
                  <span className="shrink-0 font-mono text-[10px] text-vellum-faint">
                    {lesson.duration}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

export function CoursePlayerPage() {
  const [lessons, setLessons] = useState(LESSONS)
  const [activeId, setActiveId] = useState('4')

  const active = lessons.find((l) => l.id === activeId) ?? lessons[0]
  const completedCount = lessons.filter((l) => l.completed).length
  const progressPct = Math.round((completedCount / lessons.length) * 100)

  function markComplete() {
    setLessons((prev) =>
      prev.map((l) => (l.id === activeId ? { ...l, completed: true } : l))
    )
  }

  function selectNext() {
    const idx = lessons.findIndex((l) => l.id === activeId)
    const next = lessons[idx + 1]
    if (next) setActiveId(next.id)
  }

  return (
    <AppPageShell>
      <AppShell
        className="h-full w-full rounded-none border-0 shadow-none"
        sidebar={
          <LessonSidebar
            lessons={lessons}
            activeId={activeId}
            progressPct={progressPct}
            completedCount={completedCount}
            onSelect={setActiveId}
          />
        }
        topbar={
          <TopNav
            brand={
              <>
                <Gauge className="h-4 w-4 text-brass-bright" aria-hidden />
                <span className="text-sm text-vellum-muted">Vernier Academy</span>
              </>
            }
            actions={
              <UserMenu
                name="Marina Costa"
                email="marina@vernier.dev"
                onSettings={() => undefined}
                onLogout={() => undefined}
              />
            }
          />
        }
      >
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-plate">
            <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-panel2 via-ink/80 to-panel">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--brass)/0.08),transparent_70%)]" />
              <button
                type="button"
                className="relative flex h-16 w-16 items-center justify-center rounded-full border border-brass-dim/60 bg-ink/60 text-brass-bright backdrop-blur-sm transition-transform hover:scale-105 focus-ring"
                aria-label={`Reproduzir ${active.title}`}
              >
                <PlayCircle className="h-10 w-10" strokeWidth={1.25} />
              </button>
              <p className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
                Prévia · {active.duration}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
                Aula {active.id} · Tokens dia e noite
              </p>
              <h1 className="mt-1 font-display text-2xl text-vellum">{active.title}</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {!active.completed && (
                <Button variant="gradient" size="sm" onClick={markComplete}>
                  <Check className="h-4 w-4" aria-hidden />
                  Marcar concluída
                </Button>
              )}
              {active.completed && (
                <Button variant="secondary" size="sm" disabled>
                  <CheckCircle2 className="h-4 w-4 text-verdigris" aria-hidden />
                  Concluída
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={selectNext}>
                Próxima aula
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>

          <Progress value={progressPct} label="Seu progresso neste curso" showValue />
        </div>
      </AppShell>
    </AppPageShell>
  )
}
