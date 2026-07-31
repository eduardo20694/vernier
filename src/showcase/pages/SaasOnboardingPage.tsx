import { useState } from 'react'
import { Gauge, Settings } from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { SidebarNav } from '../../components/SidebarNav'
import { OnboardingChecklist } from '../../components/OnboardingChecklist'
import { UserMenu } from '../../components/UserMenu'
import { AppPageShell } from './PageFrame'
import { INITIAL_ONBOARDING } from './demoData'

export function SaasOnboardingPage() {
  const [items, setItems] = useState(INITIAL_ONBOARDING)

  function toggleItem(id: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    )
  }

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
            activeId="onboarding"
            sections={[
              {
                items: [
                  { id: 'onboarding', label: 'Primeiros passos', icon: <Settings /> },
                ],
              },
            ]}
            footer="Setup · 2/4"
          />
        }
        topbar={
          <TopNav
            brand={<span className="text-sm text-vellum-muted">Novo workspace</span>}
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
        <div className="mx-auto max-w-2xl">
          <OnboardingChecklist
            title="Configure seu workspace"
            description="Quatro passos para deixar a equipe pronta — marque itens para simular progresso."
            items={items.map((item) => ({
              ...item,
              onAction: item.onAction ? () => toggleItem(item.id) : undefined,
            }))}
            onDismiss={() => setItems(INITIAL_ONBOARDING)}
          />
        </div>
      </AppShell>
    </AppPageShell>
  )
}
