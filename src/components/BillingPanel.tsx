import { CreditCard, Download, Pencil } from 'lucide-react'
import { cn } from '../lib/cn'
import { Badge } from './Badge'
import { Button } from './Button'
import { SettingsSection } from './SettingsSection'

export type InvoiceStatus = 'paid' | 'pending'

export interface BillingPlan {
  name: string
  price: string
  renewDate: string
}

export interface BillingPaymentMethod {
  brand: string
  last4: string
}

export interface BillingInvoice {
  id: string
  date: string
  amount: string
  status: InvoiceStatus
}

export interface BillingPanelProps {
  plan?: BillingPlan
  paymentMethod?: BillingPaymentMethod
  invoices?: BillingInvoice[]
  onChangePlan?: () => void
  onEditPayment?: () => void
  onDownloadInvoice?: (id: string) => void
  className?: string
}

const defaultPlan: BillingPlan = {
  name: 'Profissional',
  price: 'R$ 149/mês',
  renewDate: '15 ago 2026',
}

const defaultPaymentMethod: BillingPaymentMethod = {
  brand: 'Visa',
  last4: '4242',
}

const defaultInvoices: BillingInvoice[] = [
  { id: 'inv-001', date: '15 jul 2026', amount: 'R$ 149,00', status: 'paid' },
  { id: 'inv-002', date: '15 jun 2026', amount: 'R$ 149,00', status: 'paid' },
  { id: 'inv-003', date: '15 mai 2026', amount: 'R$ 149,00', status: 'pending' },
]

const statusLabels: Record<InvoiceStatus, string> = {
  paid: 'Pago',
  pending: 'Pendente',
}

const statusTones: Record<InvoiceStatus, 'verdigris' | 'rust'> = {
  paid: 'verdigris',
  pending: 'rust',
}

export function BillingPanel({
  plan = defaultPlan,
  paymentMethod = defaultPaymentMethod,
  invoices = defaultInvoices,
  onChangePlan,
  onEditPayment,
  onDownloadInvoice,
  className,
}: BillingPanelProps) {
  return (
    <div className={cn('space-y-10', className)}>
      <SettingsSection
        title="Plano atual"
        description="Gerencie sua assinatura e ciclo de cobrança."
        action={
          onChangePlan && (
            <Button variant="secondary" size="sm" onClick={onChangePlan}>
              Alterar plano
            </Button>
          )
        }
      >
        <div className="rounded-xl border border-line bg-gradient-to-b from-panel2 to-panel p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-dim">
                Assinatura ativa
              </p>
              <h3 className="mt-1 font-display text-xl text-vellum">{plan.name}</h3>
              <p className="mt-2 font-display text-2xl text-vellum">{plan.price}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-vellum-muted">
            Próxima renovação em{' '}
            <span className="font-medium text-vellum">{plan.renewDate}</span>
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Forma de pagamento"
        description="Cartão usado nas cobranças recorrentes."
        action={
          onEditPayment && (
            <Button variant="ghost" size="sm" onClick={onEditPayment}>
              <Pencil className="h-3.5 w-3.5" aria-hidden />
              Editar
            </Button>
          )
        }
      >
        <div className="flex items-center gap-4 rounded-lg border border-line bg-panel2/40 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-panel text-brass">
            <CreditCard className="h-4 w-4" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-vellum">{paymentMethod.brand}</p>
            <p className="font-mono text-sm tabular-nums text-vellum-muted">
              •••• •••• •••• {paymentMethod.last4}
            </p>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Faturas"
        description="Histórico de cobranças e comprovantes."
      >
        <ul className="divide-y divide-line rounded-lg border border-line">
          {invoices.map((invoice) => (
            <li
              key={invoice.id}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-vellum">{invoice.date}</p>
                <p className="font-mono text-sm tabular-nums text-vellum-muted">{invoice.amount}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={statusTones[invoice.status]}>{statusLabels[invoice.status]}</Badge>
                {onDownloadInvoice && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownloadInvoice(invoice.id)}
                    aria-label={`Baixar fatura de ${invoice.date}`}
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    Baixar
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </SettingsSection>
    </div>
  )
}
