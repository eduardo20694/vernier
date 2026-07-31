import { CreditCard, Gauge, Settings, User } from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { SidebarNav } from '../../components/SidebarNav'
import { ProfileHeader } from '../../components/ProfileHeader'
import { SettingsSection } from '../../components/SettingsSection'
import { UserMenu } from '../../components/UserMenu'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { AppPageShell } from './PageFrame'

export function SettingsProfilePage() {
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
            activeId="profile"
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
            brand={<span className="text-sm text-vellum-muted">Perfil</span>}
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
        <div className="mx-auto max-w-2xl space-y-8">
          <ProfileHeader
            name="Marina Costa"
            subtitle="Produto · Vernier"
            cover={
              <div className="h-full w-full bg-gradient-to-r from-brass/30 via-panel2 to-verdigris/20" />
            }
            actions={
              <Button size="sm" variant="secondary">
                Alterar foto
              </Button>
            }
          />

          <SettingsSection
            title="Informações pessoais"
            description="Nome e bio visíveis para membros do workspace."
            action={
              <Button size="sm" variant="ghost">
                Cancelar
              </Button>
            }
          >
            <Input label="Nome completo" defaultValue="Marina Costa" />
            <Input label="Cargo" defaultValue="Head of Product" />
            <Textarea
              label="Bio"
              defaultValue="Calibrando interfaces com precisão oceânica."
              rows={3}
            />
            <div className="flex justify-end">
              <Button variant="gradient" size="sm">
                Salvar alterações
              </Button>
            </div>
          </SettingsSection>

          <SettingsSection
            title="Contato"
            description="Email principal da conta — usado para login e notificações."
          >
            <Input label="Email" type="email" defaultValue="marina@vernier.dev" />
          </SettingsSection>
        </div>
      </AppShell>
    </AppPageShell>
  )
}
