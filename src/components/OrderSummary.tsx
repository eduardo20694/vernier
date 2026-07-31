import { useState, type FormEvent } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Divider } from './Divider'
import { Input } from './Input'

export interface OrderSummaryLineItem {
  id: string
  label: string
  amount: number
  quantity?: number
}

export interface OrderSummaryProps {
  items: OrderSummaryLineItem[]
  subtotal: number
  shipping?: number
  tax?: number
  discount?: number
  total: number
  currencyLabel?: string
  promoCode?: string
  onPromoCodeChange?: (code: string) => void
  onApplyPromo?: (code: string) => void
  onCheckout?: () => void
  checkoutLabel?: string
  loading?: boolean
  className?: string
}

function formatCurrency(value: number, currencyLabel = 'BRL') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currencyLabel,
  }).format(value)
}

function SummaryRow({
  label,
  value,
  currencyLabel,
  muted,
  highlight,
}: {
  label: string
  value: number
  currencyLabel: string
  muted?: boolean
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className={cn(muted ? 'text-vellum-muted' : 'text-vellum')}>{label}</span>
      <span
        className={cn(
          'font-mono tabular-nums',
          highlight ? 'text-lg text-vellum' : muted ? 'text-vellum-muted' : 'text-vellum'
        )}
      >
        {formatCurrency(value, currencyLabel)}
      </span>
    </div>
  )
}

export function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  currencyLabel = 'BRL',
  promoCode: promoCodeProp,
  onPromoCodeChange,
  onApplyPromo,
  onCheckout,
  checkoutLabel = 'Finalizar pedido',
  loading,
  className,
}: OrderSummaryProps) {
  const [localPromo, setLocalPromo] = useState('')
  const promoCode = promoCodeProp ?? localPromo
  const setPromoCode = onPromoCodeChange ?? setLocalPromo

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault()
    onApplyPromo?.(promoCode.trim())
  }

  return (
    <aside
      className={cn(
        'rounded-xl border border-line bg-panel p-6 shadow-plate',
        className
      )}
    >
      <h2 className="font-display text-lg font-medium text-vellum">Resumo do pedido</h2>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-start justify-between gap-3 text-sm">
            <span className="min-w-0 text-vellum-muted">
              {item.quantity != null && item.quantity > 1
                ? `${item.quantity}× ${item.label}`
                : item.label}
            </span>
            <span className="shrink-0 font-mono tabular-nums text-vellum">
              {formatCurrency(item.amount, currencyLabel)}
            </span>
          </li>
        ))}
      </ul>

      <Divider className="my-5" />

      <div className="space-y-2.5">
        <SummaryRow label="Subtotal" value={subtotal} currencyLabel={currencyLabel} muted />
        {shipping != null && (
          <SummaryRow label="Frete" value={shipping} currencyLabel={currencyLabel} muted />
        )}
        {tax != null && (
          <SummaryRow label="Impostos" value={tax} currencyLabel={currencyLabel} muted />
        )}
        {discount != null && discount > 0 && (
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-verdigris">Desconto</span>
            <span className="font-mono tabular-nums text-verdigris">
              −{formatCurrency(discount, currencyLabel)}
            </span>
          </div>
        )}
      </div>

      <Divider className="my-5" />

      <SummaryRow label="Total" value={total} currencyLabel={currencyLabel} highlight />

      {onApplyPromo && (
        <form onSubmit={handleApplyPromo} className="mt-6 flex gap-2">
          <Input
            className="flex-1"
            placeholder="Código promocional"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            aria-label="Código promocional"
          />
          <Button type="submit" variant="secondary" className="shrink-0">
            Aplicar
          </Button>
        </form>
      )}

      {onCheckout && (
        <Button
          className="mt-6 w-full"
          variant="gradient"
          loading={loading}
          onClick={onCheckout}
        >
          {checkoutLabel}
        </Button>
      )}
    </aside>
  )
}
