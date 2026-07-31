import { CreditCard, Gauge, Settings, User } from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { SidebarNav } from '../../components/SidebarNav'
import { BillingPanel } from '../../components/BillingPanel'
import { PageHeader } from '../../components/PageHeader'
import { UserMenu } from '../../components/UserMenu'
import { AppPageShell } from './PageFrame'

export function SettingsBillingPage() {
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
            activeId="billing"
            sections={[
              {
                title: 'Conta',
                items: [
                  { id: 'profile', label: 'Perfil', icon: <User /> },
                  { id: 'billing', label: 'Faturamento', icon: <CreditCard /> },
                ],
              },
              {
                title: 'Workspace',
                items: [
                  { id: 'settings', label: 'Configurações', icon: <Settings /> },
                ],
              },
            ]}
            footer="Plano Profissional"
          />
        }
        topbar={
          <TopNav
            brand={<span className="text-sm text-vellum-muted">Configurações</span>}
            actions={
              <UserMenu
                name="Marina Costa"
                email="marina@vernier.dev"
                plan="Profissional"
                onSettings={() => undefined}
                onLogout={() => undefined}
              />
            }
          />
        }
      >
        <div className="mx-auto max-w-3xl space-y-8">
          <PageHeader
            title="Faturamento"
            description="Gerencie plano, método de pagamento e histórico de faturas."
          />
          <BillingPanel
            onChangePlan={() => undefined}
            onEditPayment={() => undefined}
            onDownloadInvoice={() => undefined}
          />
        </div>
      </AppShell>
    </AppPageShell>
  )
}
