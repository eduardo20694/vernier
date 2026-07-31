import { useState } from 'react'
import {
  CheckCircle2,
  Gauge,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
  Zap,
} from 'lucide-react'
import { Breadcrumb } from '../../components/Breadcrumb'
import { Button } from '../../components/Button'
import { CreditCardInput, type CreditCardValue } from '../../components/CreditCardInput'
import { Input } from '../../components/Input'
import { Navbar, NavLink } from '../../components/Navbar'
import { OrderSummary } from '../../components/OrderSummary'
import { RadioGroup, RadioGroupItem } from '../../components/RadioGroup'
import { Stepper } from '../../components/Stepper'
import {
  ORDER_LINE_ITEMS,
  ORDER_SHIPPING,
  ORDER_SUBTOTAL,
  ORDER_TAX,
  ORDER_TOTAL,
  SHIPPING_METHODS,
  formatBRL,
} from './commerceDemoData'
import { cn } from '../../lib/cn'

const CHECKOUT_STEPS = [
  { title: 'Endereço', description: 'Dados de entrega' },
  { title: 'Frete', description: 'Modalidade' },
  { title: 'Pagamento', description: 'Cartão' },
  { title: 'Confirmação', description: 'Revisão' },
]

const METHOD_ICONS = {
  standard: Package,
  express: Zap,
  pickup: MapPin,
} as const

export function CheckoutStepsPage() {
  const [step, setStep] = useState(0)
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [card, setCard] = useState<CreditCardValue>({ number: '', expiry: '', cvc: '' })
  const [confirmed, setConfirmed] = useState(false)

  const selectedShipping = SHIPPING_METHODS.find((m) => m.id === shippingMethod)
  const shippingCost = selectedShipping?.price ?? ORDER_SHIPPING
  const total = ORDER_SUBTOTAL + shippingCost + ORDER_TAX

  function nextStep() {
    if (step < CHECKOUT_STEPS.length - 1) {
      setStep((s) => s + 1)
    } else {
      setConfirmed(true)
    }
  }

  function prevStep() {
    setStep((s) => Math.max(0, s - 1))
  }

  return (
    <div className="min-h-full bg-ink text-vellum">
      <Navbar
        brand={
          <>
            <Gauge className="h-4 w-4 text-brass-bright" aria-hidden />
            <span>Vernier Shop</span>
          </>
        }
        links={
          <>
            <NavLink>Loja</NavLink>
            <NavLink>Carrinho</NavLink>
            <NavLink active>Checkout</NavLink>
          </>
        }
        actions={
          <Button variant="ghost" size="sm">
            <ShoppingBag className="h-4 w-4" aria-hidden />
            Carrinho
          </Button>
        }
        className="border-b border-line"
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Breadcrumb
          items={[
            { label: 'Carrinho', href: '#' },
            { label: 'Checkout', current: true },
          ]}
        />

        <header className="mt-6">
          <h1 className="font-display text-2xl text-vellum">Finalizar pedido</h1>
          <p className="mt-1 text-sm text-vellum-muted">
            Complete as etapas abaixo para concluir sua compra.
          </p>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div className="min-w-0 space-y-8">
            <Stepper steps={CHECKOUT_STEPS} current={step} />

            {confirmed ? (
              <div className="rounded-xl border border-verdigris-dim/50 bg-verdigris/10 p-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-verdigris" aria-hidden />
                <h2 className="mt-4 font-display text-xl text-vellum">Pedido confirmado!</h2>
                <p className="mt-2 text-sm text-vellum-muted">
                  Enviamos a confirmação para seu e-mail. Previsão de entrega:{' '}
                  {selectedShipping?.eta ?? 'em breve'}.
                </p>
                <p className="mt-4 font-mono text-sm text-vellum-faint">Pedido #VNR-2026-0847</p>
              </div>
            ) : (
              <>
                {step === 0 && (
                  <section className="space-y-4 rounded-xl border border-line bg-panel/50 p-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-brass" aria-hidden />
                      <h2 className="font-display text-lg text-vellum">Endereço de entrega</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input label="Nome completo" placeholder="Ana Souza" autoComplete="name" />
                      <Input label="CEP" placeholder="01310-100" autoComplete="postal-code" />
                    </div>
                    <Input label="Rua" placeholder="Av. Paulista" autoComplete="street-address" />
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Input label="Número" placeholder="1000" />
                      <Input label="Complemento" placeholder="Apto 42" className="sm:col-span-2" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input label="Bairro" placeholder="Bela Vista" />
                      <Input label="Cidade" placeholder="São Paulo" autoComplete="address-level2" />
                    </div>
                  </section>
                )}

                {step === 1 && (
                  <section>
                    <div className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-brass" aria-hidden />
                      <h2 className="font-display text-lg text-vellum">Escolha o frete</h2>
                    </div>
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                      className="mt-5 space-y-3"
                      aria-label="Modalidade de frete"
                    >
                      {SHIPPING_METHODS.map((option) => {
                        const Icon = METHOD_ICONS[option.id]
                        const checked = shippingMethod === option.id
                        return (
                          <label
                            key={option.id}
                            htmlFor={`checkout-ship-${option.id}`}
                            className={cn(
                              'flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors',
                              checked
                                ? 'border-brass bg-brass/5'
                                : 'border-line bg-panel hover:border-brass-dim/50'
                            )}
                          >
                            <RadioGroupItem id={`checkout-ship-${option.id}`} value={option.id} className="mt-1" />
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-panel2 text-brass">
                              <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center justify-between gap-2">
                                <span className="font-medium text-vellum">{option.label}</span>
                                <span className="font-mono text-sm tabular-nums text-vellum">
                                  {option.price === 0 ? 'Grátis' : formatBRL(option.price)}
                                </span>
                              </span>
                              <span className="mt-1 block text-sm text-vellum-muted">
                                {option.description}
                              </span>
                            </span>
                          </label>
                        )
                      })}
                    </RadioGroup>
                  </section>
                )}

                {step === 2 && (
                  <section className="max-w-md space-y-4">
                    <header>
                      <h2 className="font-display text-lg text-vellum">Pagamento</h2>
                      <p className="mt-1 text-sm text-vellum-muted">
                        Informe os dados do cartão para cobrança segura.
                      </p>
                    </header>
                    <CreditCardInput value={card} onChange={setCard} />
                  </section>
                )}

                {step === 3 && (
                  <section className="space-y-4 rounded-xl border border-line bg-panel/50 p-6">
                    <h2 className="font-display text-lg text-vellum">Revise seu pedido</h2>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-vellum-muted">Endereço</dt>
                        <dd className="text-right text-vellum">Av. Paulista, 1000 — São Paulo, SP</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-vellum-muted">Frete</dt>
                        <dd className="text-right text-vellum">
                          {selectedShipping?.label} ({selectedShipping?.eta})
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-vellum-muted">Pagamento</dt>
                        <dd className="text-right font-mono text-vellum">
                          {card.number ? `•••• ${card.number.slice(-4)}` : 'Cartão informado'}
                        </dd>
                      </div>
                    </dl>
                    <p className="border-t border-line pt-4 text-sm text-vellum-muted">
                      Total: <span className="font-display text-lg text-vellum">{formatBRL(total)}</span>
                    </p>
                  </section>
                )}

                <div className="flex justify-between gap-3">
                  <Button variant="ghost" disabled={step === 0} onClick={prevStep}>
                    Voltar
                  </Button>
                  <Button variant="gradient" onClick={nextStep}>
                    {step === CHECKOUT_STEPS.length - 1 ? 'Confirmar pedido' : 'Continuar'}
                  </Button>
                </div>
              </>
            )}
          </div>

          <aside className="lg:sticky lg:top-6">
            <OrderSummary
              items={ORDER_LINE_ITEMS}
              subtotal={ORDER_SUBTOTAL}
              shipping={shippingCost}
              tax={ORDER_TAX}
              total={total}
              onApplyPromo={() => undefined}
              checkoutLabel={step === CHECKOUT_STEPS.length - 1 ? 'Confirmar pedido' : undefined}
              onCheckout={step === CHECKOUT_STEPS.length - 1 ? nextStep : undefined}
            />
          </aside>
        </div>
      </main>
    </div>
  )
}
