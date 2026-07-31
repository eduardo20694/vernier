import { useState } from 'react'
import { Gauge, ShoppingBag } from 'lucide-react'
import { OrderSummary } from '../../components/OrderSummary'
import { CreditCardInput, type CreditCardValue } from '../../components/CreditCardInput'
import { Button } from '../../components/Button'
import { Navbar, NavLink } from '../../components/Navbar'

const ORDER_SUBTOTAL = 238.9
const ORDER_SHIPPING = 19.9
const ORDER_TAX = 21.5
const ORDER_TOTAL = ORDER_SUBTOTAL + ORDER_SHIPPING + ORDER_TAX

export function CommerceCheckoutPage() {
  const [card, setCard] = useState<CreditCardValue>({
    number: '',
    expiry: '',
    cvc: '',
  })

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
      <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-2 lg:px-6">
        <section className="space-y-4">
          <header>
            <h1 className="font-display text-2xl text-vellum">Pagamento</h1>
            <p className="mt-1 text-sm text-vellum-muted">
              Informe os dados do cartão para finalizar o pedido.
            </p>
          </header>
          <CreditCardInput value={card} onChange={setCard} className="max-w-md" />
          <Button variant="gradient" className="w-full max-w-md">
            Pagar {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ORDER_TOTAL)}
          </Button>
        </section>
        <aside>
          <OrderSummary
            items={[
              { id: '1', label: 'Calibrador de tokens', amount: 89.9, quantity: 1 },
              { id: '2', label: 'Kit showcase', amount: 149, quantity: 1 },
            ]}
            subtotal={ORDER_SUBTOTAL}
            shipping={ORDER_SHIPPING}
            tax={ORDER_TAX}
            total={ORDER_TOTAL}
            onApplyPromo={() => undefined}
            onCheckout={() => undefined}
            checkoutLabel="Confirmar pedido"
          />
        </aside>
      </main>
    </div>
  )
}
