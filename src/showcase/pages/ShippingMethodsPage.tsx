import { useState } from 'react'
import { Gauge, MapPin, Package, ShoppingBag, Truck, Zap } from 'lucide-react'
import { Breadcrumb } from '../../components/Breadcrumb'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Navbar, NavLink } from '../../components/Navbar'
import { RadioGroup, RadioGroupItem } from '../../components/RadioGroup'
import { SHIPPING_METHODS, formatBRL } from './commerceDemoData'
import { cn } from '../../lib/cn'

const METHOD_ICONS = {
  standard: Package,
  express: Zap,
  pickup: MapPin,
} as const

export function ShippingMethodsPage() {
  const [method, setMethod] = useState('standard')
  const selected = SHIPPING_METHODS.find((m) => m.id === method)

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
            <NavLink active>Frete</NavLink>
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

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb
          items={[
            { label: 'Carrinho', href: '#' },
            { label: 'Endereço e frete', current: true },
          ]}
        />

        <header className="mt-6">
          <h1 className="font-display text-2xl text-vellum">Endereço de entrega</h1>
          <p className="mt-1 text-sm text-vellum-muted">
            Informe onde deseja receber o pedido e escolha a modalidade de envio.
          </p>
        </header>

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="CEP" name="cep" placeholder="01310-100" autoComplete="postal-code" />
            <Input label="Estado" name="state" placeholder="SP" autoComplete="address-level1" />
          </div>
          <Input label="Rua" name="street" placeholder="Av. Paulista" autoComplete="street-address" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Número" name="number" placeholder="1000" />
            <Input
              label="Complemento"
              name="complement"
              placeholder="Apto 42"
              className="sm:col-span-2"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Bairro" name="district" placeholder="Bela Vista" />
            <Input label="Cidade" name="city" placeholder="São Paulo" autoComplete="address-level2" />
          </div>
        </form>

        <section className="mt-10">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-brass" aria-hidden />
            <h2 className="font-display text-lg text-vellum">Modalidade de frete</h2>
          </div>
          <p className="mt-1 text-sm text-vellum-muted">
            Selecione a opção que melhor se encaixa no seu prazo.
          </p>

          <RadioGroup
            value={method}
            onValueChange={setMethod}
            className="mt-5 space-y-3"
            aria-label="Modalidade de frete"
          >
            {SHIPPING_METHODS.map((option) => {
              const Icon = METHOD_ICONS[option.id]
              const checked = method === option.id
              return (
                <label
                  key={option.id}
                  htmlFor={`ship-${option.id}`}
                  className={cn(
                    'flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors',
                    checked
                      ? 'border-brass bg-brass/5 shadow-[inset_0_0_0_1px_rgb(var(--brass)/0.2)]'
                      : 'border-line bg-panel hover:border-brass-dim/50'
                  )}
                >
                  <RadioGroupItem
                    id={`ship-${option.id}`}
                    value={option.id}
                    className="mt-1"
                  />
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
                    <span className="mt-1 block text-sm text-vellum-muted">{option.description}</span>
                    <span className="mt-1 block font-mono text-xs text-vellum-faint">
                      Previsão: {option.eta}
                    </span>
                  </span>
                </label>
              )
            })}
          </RadioGroup>
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-sm text-vellum-muted">
            Frete selecionado:{' '}
            <span className="font-medium text-vellum">
              {selected?.label} —{' '}
              {selected?.price === 0 ? 'Grátis' : formatBRL(selected?.price ?? 0)}
            </span>
          </p>
          <Button variant="gradient">Continuar para pagamento</Button>
        </div>
      </main>
    </div>
  )
}
