import { useState } from 'react'
import {
  Activity,
  BarChart3,
  CreditCard,
  Gauge,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { SidebarNav } from '../../components/SidebarNav'
import { PageHeader } from '../../components/PageHeader'
import { MetricRow } from '../../components/MetricRow'
import { DataCard } from '../../components/DataCard'
import { LineChartCard } from '../../components/Charts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/Table'
import { ActivityFeed } from '../../components/ActivityFeed'
import { UserMenu } from '../../components/UserMenu'
import { NotificationCenter } from '../../components/NotificationCenter'
import { ThemeToggle } from '../../components/ThemeToggle'
import { Button } from '../../components/Button'
import { Badge } from '../../components/Badge'
import { AppPageShell } from './PageFrame'

const CHART_DATA = [
  { dia: 'Seg', requests: 4200, errors: 12 },
  { dia: 'Ter', requests: 5100, errors: 8 },
  { dia: 'Qua', requests: 4800, errors: 15 },
  { dia: 'Qui', requests: 6200, errors: 6 },
  { dia: 'Sex', requests: 5900, errors: 9 },
  { dia: 'Sáb', requests: 2100, errors: 3 },
  { dia: 'Dom', requests: 1800, errors: 2 },
]

const RECENT_CLIENTS = [
  { id: 'c1', name: 'Atlas Labs', plan: 'Profissional', mrr: 'R$ 149', status: 'Ativo' },
  { id: 'c2', name: 'Meridian Co.', plan: 'Enterprise', mrr: 'R$ 890', status: 'Ativo' },
  { id: 'c3', name: 'Helix Studio', plan: 'Starter', mrr: 'R$ 49', status: 'Trial' },
  { id: 'c4', name: 'Nova Systems', plan: 'Profissional', mrr: 'R$ 149', status: 'Ativo' },
  { id: 'c5', name: 'Prisma Dev', plan: 'Starter', mrr: 'R$ 49', status: 'Pausado' },
]

const ACTIVITY = [
  {
    id: 'a1',
    actor: 'Marina Costa',
    title: 'publicou calibração de tokens',
    time: 'há 12 min',
    tone: 'brass' as const,
  },
  {
    id: 'a2',
    actor: 'Rafael Mendes',
    title: 'convidou 2 membros para o workspace',
    time: 'há 45 min',
    tone: 'verdigris' as const,
  },
  {
    id: 'a3',
    actor: 'Sistema',
    title: 'backup diário concluído',
    time: 'há 2 h',
    icon: <Activity className="h-3.5 w-3.5" />,
    tone: 'neutral' as const,
  },
  {
    id: 'a4',
    actor: 'Ana Souza',
    title: 'atualizou plano para Profissional',
    time: 'há 5 h',
    tone: 'brass' as const,
  },
]

const NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Novo membro no workspace',
    description: 'Pedro Lima aceitou o convite.',
    time: 'há 8 min',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Limite de API atingido',
    description: '80% do quota mensal consumido.',
    time: 'há 1 h',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Fatura disponível',
    description: 'Julho 2026 — R$ 149,00',
    time: 'ontem',
    unread: false,
  },
]

export function AdminDashboardPage() {
  const [nav, setNav] = useState('overview')
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
                  Vernier
                </span>
              </>
            }
            activeId={nav}
            onNavigate={setNav}
            sections={[
              {
                title: 'Operação',
                items: [
                  { id: 'overview', label: 'Visão geral', icon: <LayoutDashboard /> },
                  { id: 'metrics', label: 'Métricas', icon: <BarChart3 /> },
                  { id: 'clients', label: 'Clientes', icon: <Users />, badge: '248' },
                ],
              },
              {
                title: 'Financeiro',
                items: [
                  { id: 'billing', label: 'Faturamento', icon: <CreditCard /> },
                ],
              },
              {
                title: 'Sistema',
                items: [
                  { id: 'settings', label: 'Configurações', icon: <Settings /> },
                ],
              },
            ]}
            footer="sa-east-1 · v0.1"
          />
        }
        topbar={
          <TopNav
            brand={<span className="text-sm text-vellum-muted">Console operacional</span>}
            search={search}
            onSearch={setSearch}
            actions={
              <>
                <NotificationCenter items={NOTIFICATIONS} onMarkAllRead={() => undefined} />
                <ThemeToggle showLabel={false} />
                <UserMenu
                  name="Marina Costa"
                  email="marina@vernier.dev"
                  plan="Profissional"
                  onSettings={() => undefined}
                  onLogout={() => undefined}
                />
              </>
            }
          />
        }
      >
        <div className="space-y-6">
          <PageHeader
            title="Visão geral"
            description="Métricas consolidadas do workspace — últimas 24 horas."
            actions={
              <>
                <Button variant="secondary" size="sm">
                  Exportar
                </Button>
                <Button variant="primary" size="sm">
                  Novo relatório
                </Button>
              </>
            }
          />

          <MetricRow
            metrics={[
              { label: 'Receita MRR', value: 'R$ 42,8k', delta: '+8,2%', deltaTone: 'up', hint: 'vs mês anterior' },
              { label: 'Clientes ativos', value: '248', delta: '+14', deltaTone: 'up', hint: 'novos este mês' },
              { label: 'Churn', value: '1,2%', delta: '-0,3%', deltaTone: 'up', hint: 'abaixo da meta' },
              { label: 'Uptime', value: '99,97%', delta: '0', deltaTone: 'flat', hint: '30 dias' },
            ]}
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <DataCard
              className="lg:col-span-1"
              label="Requisições API"
              value="1,2M"
              delta="+18%"
              deltaTone="up"
              description="Volume agregado na região sa-east-1."
              icon={<Activity className="h-4 w-4" />}
            />
            <DataCard
              className="lg:col-span-1"
              label="Tickets abertos"
              value="23"
              delta="-5"
              deltaTone="up"
              description="SLA médio de resposta: 2h 14min."
              icon={<Users className="h-4 w-4" />}
            />
            <DataCard
              className="lg:col-span-1"
              label="Conversão trial"
              value="34%"
              delta="+2,1%"
              deltaTone="up"
              description="Trials convertidos nos últimos 30 dias."
              icon={<BarChart3 className="h-4 w-4" />}
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
            <LineChartCard
              title="Tráfego da API"
              description="Requisições vs erros — última semana"
              overline="Métricas"
              delta="+12%"
              deltaTone="up"
              data={CHART_DATA}
              xKey="dia"
              series={[
                { key: 'requests', label: 'Requisições', color: '#4B8CFF' },
                { key: 'errors', label: 'Erros', color: '#DC5050' },
              ]}
              height={240}
            />
            <ActivityFeed title="Atividade recente" items={ACTIVITY} />
          </div>

          <div className="overflow-hidden rounded-xl border border-line">
            <div className="flex items-center justify-between border-b border-line bg-panel2/40 px-4 py-3">
              <h3 className="font-display text-sm text-vellum">Clientes recentes</h3>
              <Button variant="ghost" size="sm">
                Ver todos
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>MRR</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_CLIENTS.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium text-vellum">{client.name}</TableCell>
                    <TableCell>{client.plan}</TableCell>
                    <TableCell className="font-mono text-sm tabular-nums">{client.mrr}</TableCell>
                    <TableCell>
                      <Badge
                        tone={
                          client.status === 'Ativo'
                            ? 'verdigris'
                            : client.status === 'Trial'
                              ? 'brass'
                              : 'neutral'
                        }
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </AppShell>
    </AppPageShell>
  )
}
