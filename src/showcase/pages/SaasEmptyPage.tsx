import { FolderOpen, Gauge, Settings } from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { SidebarNav } from '../../components/SidebarNav'
import { PageHeader } from '../../components/PageHeader'
import { EmptyState } from '../../components/EmptyState'
import { OnboardingChecklist } from '../../components/OnboardingChecklist'
import { UserMenu } from '../../components/UserMenu'
import { Button } from '../../components/Button'
import { AppPageShell } from './PageFrame'
import { INITIAL_ONBOARDING } from './demoData'

export function SaasEmptyPage() {
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
                  Vernier
                </span>
              </>
            }
            activeId="projects"
            sections={[
              {
                items: [
                  { id: 'projects', label: 'Projetos', icon: <FolderOpen /> },
                  { id: 'settings', label: 'Configurações', icon: <Settings /> },
                ],
              },
            ]}
            footer="Novo workspace"
          />
        }
        topbar={
          <TopNav
            brand={<span className="text-sm text-vellum-muted">Projetos</span>}
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
        <div className="mx-auto max-w-2xl space-y-8">
          <PageHeader
            title="Projetos"
            description="Organize calibrações e vitrines em um só lugar."
            actions={
              <Button variant="primary" size="sm">
                Novo projeto
              </Button>
            }
          />
          <EmptyState
            icon={<FolderOpen className="h-5 w-5" />}
            title="Nenhum projeto ainda"
            description="Crie o primeiro projeto ou importe componentes da vitrine para começar."
            action={
              <Button variant="gradient" size="sm">
                Criar projeto
              </Button>
            }
          />
          <OnboardingChecklist
            title="Primeiros passos"
            description="Complete o setup enquanto prepara seu primeiro projeto."
            items={INITIAL_ONBOARDING.map((item) => ({
              ...item,
              onAction: item.onAction ? () => undefined : undefined,
            }))}
          />
        </div>
      </AppShell>
    </AppPageShell>
  )
}
