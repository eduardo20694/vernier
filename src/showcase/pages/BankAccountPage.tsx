import { useState } from 'react'
import {
  ArrowLeftRight,
  CreditCard,
  Gauge,
  Landmark,
  Receipt,
  Wallet,
} from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { SidebarNav } from '../../components/SidebarNav'
import { PageHeader } from '../../components/PageHeader'
import { Stat } from '../../components/Stat'
import { DataCard } from '../../components/DataCard'
import { Timeline } from '../../components/Timeline'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/Table'
import { Button } from '../../components/Button'
import { Badge } from '../../components/Badge'
import { UserMenu } from '../../components/UserMenu'
import { ThemeToggle } from '../../components/ThemeToggle'
import { AppPageShell } from './PageFrame'

const STATEMENT = [
  { id: 't1', date: '31 Jul', desc: 'PIX recebido — Freelance design', amount: '+ R$ 4.200,00', type: 'credit' as const },
  { id: 't2', date: '30 Jul', desc: 'Débito automático — Assinatura SaaS', amount: '- R$ 149,00', type: 'debit' as const },
  { id: 't3', date: '28 Jul', desc: 'Transferência enviada — Poupança', amount: '- R$ 1.000,00', type: 'debit' as const },
  { id: 't4', date: '25 Jul', desc: 'PIX recebido — Reembolso', amount: '+ R$ 89,90', type: 'credit' as const },
  { id: 't5', date: '22 Jul', desc: 'Compra cartão — Mercado', amount: '- R$ 312,45', type: 'debit' as const },
]

const TIMELINE = STATEMENT.map((t) => ({
  title: t.desc,
  description: t.amount,
  meta: t.date,
  tone: t.type === 'credit' ? ('verdigris' as const) : ('rust' as const),
}))

export function BankAccountPage() {
  const [nav, setNav] = useState('account')
  const [view, setView] = useState<'table' | 'timeline'>('table')

  return (
    <AppPageShell>
      <AppShell
        className="h-full w-full rounded-none border-0 shadow-none"
        sidebar={
          <SidebarNav
            brand={
              <>
                <Landmark className="h-4 w-4 shrink-0 text-brass-bright" aria-hidden />
                <span data-sidebar-label className="truncate text-base">
                  Vernier Pay
                </span>
              </>
            }
            activeId={nav}
            onNavigate={setNav}
            sections={[
              {
                title: 'Conta',
                items: [
                  { id: 'account', label: 'Visão geral', icon: <Wallet /> },
                  { id: 'cards', label: 'Cartões', icon: <CreditCard /> },
                  { id: 'transfers', label: 'Transferências', icon: <ArrowLeftRight /> },
                ],
              },
            ]}
            footer="Demo UI"
          />
        }
        topbar={
          <TopNav
            brand={<span className="text-sm text-vellum-muted">Conta corrente</span>}
            actions={
              <>
                <ThemeToggle showLabel={false} />
                <UserMenu
                  name="Marina Costa"
                  email="marina@email.com"
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
            title="Conta corrente"
            description="Saldo, extrato e transferências — interface ilustrativa."
            actions={
              <Button variant="gradient" size="sm">
                <ArrowLeftRight className="h-4 w-4" aria-hidden />
                Transferir
              </Button>
            }
          />

          <p className="rounded-lg border border-line/60 bg-panel2/40 px-3 py-2 text-xs text-vellum-faint">
            Demo UI · sem dados reais — não é instituição financeira nem serviço bancário.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Stat
              className="sm:col-span-2 lg:col-span-1"
              label="Saldo disponível"
              value="R$ 12.847,32"
              hint="atualizado agora"
              delta="+2,4%"
              deltaTone="up"
              icon={<Wallet className="h-4 w-4" />}
            />
            <DataCard
              label="Entradas do mês"
              value="R$ 8.420,00"
              delta="+18%"
              deltaTone="up"
              description="PIX e transferências recebidas."
              icon={<Receipt className="h-4 w-4" />}
            />
            <DataCard
              label="Saídas do mês"
              value="R$ 3.891,45"
              delta="-6%"
              deltaTone="up"
              description="Débitos, cartão e transferências."
              icon={<Gauge className="h-4 w-4" />}
            />
          </div>

          <section>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-sm text-vellum">Extrato recente</h2>
              <div className="flex gap-1 rounded-lg border border-line p-0.5">
                <button
                  type="button"
                  onClick={() => setView('table')}
                  className={`rounded-md px-3 py-1 text-xs transition-colors focus-ring ${
                    view === 'table'
                      ? 'bg-panel2 text-vellum'
                      : 'text-vellum-faint hover:text-vellum-muted'
                  }`}
                >
                  Tabela
                </button>
                <button
                  type="button"
                  onClick={() => setView('timeline')}
                  className={`rounded-md px-3 py-1 text-xs transition-colors focus-ring ${
                    view === 'timeline'
                      ? 'bg-panel2 text-vellum'
                      : 'text-vellum-faint hover:text-vellum-muted'
                  }`}
                >
                  Timeline
                </button>
              </div>
            </div>

            {view === 'table' ? (
              <div className="overflow-hidden rounded-xl border border-line">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {STATEMENT.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-mono text-sm tabular-nums text-vellum-faint">
                          {row.date}
                        </TableCell>
                        <TableCell className="text-vellum">{row.desc}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              row.type === 'credit'
                                ? 'font-mono text-sm tabular-nums text-verdigris'
                                : 'font-mono text-sm tabular-nums text-rust'
                            }
                          >
                            {row.amount}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="rounded-xl border border-line bg-panel p-5">
                <Timeline items={TIMELINE} />
              </div>
            )}
          </section>

          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm">
              Exportar extrato
            </Button>
            <Badge tone="neutral">Conta · **** 4821</Badge>
          </div>
        </div>
      </AppShell>
    </AppPageShell>
  )
}
