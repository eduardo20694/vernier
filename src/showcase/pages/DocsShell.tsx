import { useState, type ReactNode } from 'react'
import {
  BookOpen,
  Code2,
  Gauge,
  Layers,
  Rocket,
  Settings,
  Wrench,
} from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { Button } from '../../components/Button'
import { SearchInput } from '../../components/SearchInput'
import { SidebarNav } from '../../components/SidebarNav'
import { AppPageShell } from './PageFrame'

const DOC_SECTIONS = [
  {
    title: 'Introdução',
    items: [
      { id: 'docs-home', label: 'Visão geral', icon: <BookOpen aria-hidden /> },
      { id: 'getting-started', label: 'Começando', icon: <Rocket aria-hidden /> },
    ],
  },
  {
    title: 'Guias',
    items: [
      { id: 'tokens', label: 'Tokens e temas', icon: <Layers aria-hidden /> },
      { id: 'components', label: 'Componentes', icon: <Code2 aria-hidden /> },
      { id: 'mcp', label: 'Instalação MCP', icon: <Wrench aria-hidden /> },
    ],
  },
  {
    title: 'Referência',
    items: [
      { id: 'api', label: 'API de props', icon: <Settings aria-hidden /> },
    ],
  },
]

export function DocsShell({
  children,
  activeId = 'docs-home',
}: {
  children: ReactNode
  activeId?: string
}) {
  const [search, setSearch] = useState('')

  return (
    <AppPageShell>
      <AppShell
        className="h-full w-full rounded-none border-0 shadow-none"
        sidebar={
          <SidebarNav
            brand={
              <>
                <Gauge className="h-4 w-4 shrink-0 text-brass-bright" aria-hidden />
                <span data-sidebar-label className="truncate text-base">
                  Docs Vernier
                </span>
              </>
            }
            activeId={activeId}
            sections={DOC_SECTIONS}
            footer={
              <p>
                v1.0 ·{' '}
                <a href="#" className="text-brass-bright hover:text-brass">
                  Changelog
                </a>
              </p>
            }
          />
        }
        topbar={
          <TopNav
            brand={
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-vellum-faint">
                Documentação
              </span>
            }
            search={search}
            onSearch={setSearch}
            actions={
              <>
                <Button variant="ghost" size="sm">
                  GitHub
                </Button>
                <Button variant="primary" size="sm">
                  Começar
                </Button>
              </>
            }
          />
        }
      >
        <div className="flex-1 overflow-y-auto bg-ink">
          <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">{children}</div>
        </div>
      </AppShell>
    </AppPageShell>
  )
}

export { DOC_SECTIONS }
