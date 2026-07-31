import { useState } from 'react'
import { BookOpen, Gauge, PlayCircle } from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { Chip } from '../../components/Chip'
import { CourseCard, CourseGrid } from '../../components/CourseCard'
import { FilterBar } from '../../components/FilterBar'
import type { ActiveFilter } from '../../components/FilterBar'
import { PageHeader } from '../../components/PageHeader'
import { SidebarNav } from '../../components/SidebarNav'
import { UserMenu } from '../../components/UserMenu'
import { AppPageShell } from './PageFrame'

const LEVELS = [
  { id: 'all', label: 'Todos' },
  { id: 'beginner', label: 'Iniciante' },
  { id: 'intermediate', label: 'Intermediário' },
  { id: 'advanced', label: 'Avançado' },
]

export function CourseCatalogPage() {
  const [level, setLevel] = useState('all')
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])

  function selectLevel(id: string, label: string) {
    setLevel(id)
    if (id === 'all') {
      setActiveFilters([])
    } else {
      setActiveFilters([{ id: `lvl-${id}`, label, tone: 'verdigris' }])
    }
  }

  return (
    <AppPageShell>
      <AppShell
        className="h-full w-full rounded-none border-0 shadow-none"
        sidebar={
          <SidebarNav
            brand={
              <>
                <BookOpen className="h-4 w-4 shrink-0 text-brass-bright" aria-hidden />
                <span data-sidebar-label className="truncate text-base">
                  Vernier Academy
                </span>
              </>
            }
            activeId="catalog"
            sections={[
              {
                items: [
                  { id: 'catalog', label: 'Catálogo', icon: <BookOpen /> },
                  { id: 'my-courses', label: 'Meus cursos', icon: <PlayCircle /> },
                ],
              },
            ]}
          />
        }
        topbar={
          <TopNav
            brand={<span className="text-sm text-vellum-muted">Catálogo de cursos</span>}
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
        <div className="mx-auto max-w-5xl space-y-6">
          <PageHeader
            title="Aprenda Vernier"
            description="Design systems, tokens e componentes — do básico ao avançado, no ritmo oceano."
          />

          <FilterBar
            active={activeFilters}
            onRemove={() => selectLevel('all', 'Todos')}
            onClearAll={() => selectLevel('all', 'Todos')}
          >
            {LEVELS.map((lvl) => (
              <Chip
                key={lvl.id}
                tone={lvl.id === level ? 'verdigris' : 'neutral'}
                selected={lvl.id === level}
                onClick={() => selectLevel(lvl.id, lvl.label)}
              >
                {lvl.label}
              </Chip>
            ))}
          </FilterBar>

          <CourseGrid>
            <CourseCard
              title="Fundamentos do design system Vernier"
              instructor="Marina Costa"
              level="Iniciante"
              duration="4 h 20 min"
              lessons={12}
              icon={<Gauge className="h-12 w-12" strokeWidth={1.25} />}
            />
            <CourseCard
              title="Tokens dia e noite"
              instructor="Lucas Ferreira"
              progress={68}
              duration="2 h 45 min"
              lessons={8}
            />
            <CourseCard
              title="Showcase e vitrine interativa"
              instructor="Ana Ribeiro"
              level="Intermediário"
              duration="3 h 10 min"
              lessons={10}
            />
            <CourseCard
              title="MCP: instalar componentes no seu app"
              instructor="Pedro Alves"
              progress={100}
              duration="1 h 30 min"
              lessons={5}
            />
            <CourseCard
              title="Layouts SaaS com AppShell"
              instructor="Julia Mendes"
              level="Avançado"
              duration="5 h 00 min"
              lessons={14}
            />
            <CourseCard
              title="Acessibilidade e focus-ring"
              instructor="Rafael Souza"
              level="Intermediário"
              duration="2 h 15 min"
              lessons={7}
            />
          </CourseGrid>
        </div>
      </AppShell>
    </AppPageShell>
  )
}
