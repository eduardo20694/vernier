import { useMemo, useState } from 'react'
import { Gauge, Layers, ShoppingBag } from 'lucide-react'
import { Plate } from './CatalogShell'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs'
import {
  LandingPageSaaS,
  LandingPageProduct,
  LandingPageStudio,
} from '../components/LandingPage'
import { BlogListing } from '../components/BlogListing'
import { ContactSection } from '../components/ContactSection'
import { BottomTabBar, bottomTabDemoItems } from '../components/BottomTabBar'
import { ValidatedForm } from '../components/ValidatedForm'
import { ProductCard, ProductGrid } from '../components/ProductCard'
import { CartDrawer, type CartItem } from '../components/CartDrawer'
import { OrderSummary } from '../components/OrderSummary'
import { BillingPanel } from '../components/BillingPanel'
import { SearchResults } from '../components/SearchResults'
import { OnboardingChecklist, type OnboardingChecklistItem } from '../components/OnboardingChecklist'
import { BookingAgenda, type BookingTimeSlot } from '../components/BookingAgenda'
import { Button } from '../components/Button'
import { SearchInput } from '../components/SearchInput'
import { Chip } from '../components/Chip'
import type { ActiveFilter } from '../components/FilterBar'
import { Caption } from '../components/Typography'

const DEMO_POSTS = [
  {
    title: 'Tokens dia/noite sem remendos',
    excerpt: 'Como calibrar variáveis CSS para que Tailwind e Radix compartilhem a mesma paleta oceânica.',
    category: 'Design system',
    author: 'Marina Costa',
    date: '2026-07-12',
    href: '#',
  },
  {
    title: 'Showcase como catálogo vivo',
    excerpt: 'Placas numeradas, busca por categoria e instalação via MCP — o fluxo completo da biblioteca.',
    category: 'Produto',
    author: 'Rafael Mendes',
    date: '2026-06-28',
    href: '#',
  },
  {
    title: 'Formulários com RHF + Zod',
    excerpt: 'Padrão ValidatedForm para leads: validação acessível, mensagens em PT-BR e submit tipado.',
    category: 'Engenharia',
    author: 'Ana Souza',
    date: '2026-06-05',
    href: '#',
  },
]

const SEARCH_RESULTS = [
  {
    id: 'r1',
    title: 'Gauge — medidor circular',
    description: 'Indicador analógico com arco em latão, ideal para KPIs de instrumentação.',
    category: 'Instrumento',
    meta: 'Placa 48',
  },
  {
    id: 'r2',
    title: 'FilterBar — filtros ativos',
    description: 'Barra com chips removíveis e slot para controles adicionais.',
    category: 'Dados',
    meta: 'Placa 87',
  },
  {
    id: 'r3',
    title: 'LandingPageSaaS — receita completa',
    description: 'Hero, logos, features, preços, FAQ e CTA final em um único bloco.',
    category: 'Layout',
    meta: 'Placa 153',
  },
]

function buildBookingSlots(): BookingTimeSlot[] {
  return [
    { id: '09:00', time: '09:00', available: true },
    { id: '10:00', time: '10:00', available: true },
    { id: '11:00', time: '11:00', available: false },
    { id: '14:00', time: '14:00', available: true },
    { id: '15:00', time: '15:00', available: true },
    { id: '16:00', time: '16:00', available: false },
  ]
}

const INITIAL_ONBOARDING: OnboardingChecklistItem[] = [
  {
    id: 'profile',
    title: 'Complete seu perfil',
    description: 'Nome, avatar e cargo visíveis para a equipe.',
    done: true,
  },
  {
    id: 'theme',
    title: 'Escolha o tema',
    description: 'Dia ou noite — tokens sincronizados em toda a interface.',
    done: true,
  },
  {
    id: 'invite',
    title: 'Convide colegas',
    description: 'Adicione até 3 membros no plano gratuito.',
    done: false,
    actionLabel: 'Convidar',
    onAction: () => undefined,
  },
  {
    id: 'project',
    title: 'Crie o primeiro projeto',
    description: 'Importe componentes da vitrine ou comece do zero.',
    done: false,
    actionLabel: 'Novo projeto',
    onAction: () => undefined,
  },
]

export function Plates153to164() {
  const [tab, setTab] = useState('home')
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 'p1', name: 'Calibrador de tokens', price: 89.9, quantity: 1 },
    { id: 'p2', name: 'Kit showcase', price: 149, quantity: 1 },
  ])
  const [qtyA, setQtyA] = useState(1)
  const [qtyB, setQtyB] = useState(2)
  const [searchQuery, setSearchQuery] = useState('gauge')
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([
    { id: 'cat-layout', label: 'Layout', tone: 'brass' },
  ])
  const [onboardingItems, setOnboardingItems] = useState(INITIAL_ONBOARDING)
  const [bookingDate, setBookingDate] = useState(() => new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>('10:00')
  const bookingSlots = useMemo(() => buildBookingSlots(), [bookingDate])

  function updateCartQty(id: string, quantity: number) {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  function removeCartItem(id: string) {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  function toggleOnboardingItem(id: string) {
    setOnboardingItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    )
  }

  const orderSubtotal = 387.9
  const orderShipping = 19.9
  const orderTax = 34.5
  const orderTotal = orderSubtotal + orderShipping + orderTax

  return (
    <>
      <Plate number="153" title="Landing pages">
        <Tabs defaultValue="saas">
          <TabsList>
            <TabsTrigger value="saas">SaaS</TabsTrigger>
            <TabsTrigger value="product">Produto</TabsTrigger>
            <TabsTrigger value="studio">Estúdio</TabsTrigger>
          </TabsList>
          <div className="mt-4 max-h-[520px] overflow-auto rounded-xl border border-line bg-ink/20">
            <TabsContent value="saas" className="m-0">
              <LandingPageSaaS />
            </TabsContent>
            <TabsContent value="product" className="m-0">
              <LandingPageProduct />
            </TabsContent>
            <TabsContent value="studio" className="m-0">
              <LandingPageStudio />
            </TabsContent>
          </div>
        </Tabs>
      </Plate>

      <Plate number="154" title="Blog listing">
        <BlogListing
          title="Notas da oficina"
          description="Atualizações sobre tokens, vitrine e novos blocos."
          posts={DEMO_POSTS}
          footer={
            <Button variant="secondary" size="sm">
              Ver arquivo completo
            </Button>
          }
        />
      </Plate>

      <Plate number="155" title="Contato">
        <ContactSection
          onSubmit={async () => {
            await new Promise((r) => setTimeout(r, 600))
          }}
        />
      </Plate>

      <Plate number="156" title="Bottom tabs">
        <div className="relative mx-auto h-64 max-w-xs overflow-hidden rounded-2xl border border-line bg-panel2 shadow-plate">
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 pb-16 text-center">
            <Layers className="h-8 w-8 text-brass/60" strokeWidth={1.5} aria-hidden />
            <Caption>
              Aba ativa:{' '}
              <span className="text-brass-bright">
                {bottomTabDemoItems.find((t) => t.id === tab)?.label ?? tab}
              </span>
            </Caption>
          </div>
          <BottomTabBar
            items={bottomTabDemoItems}
            value={tab}
            onValueChange={setTab}
            className="absolute inset-x-0 bottom-0"
          />
        </div>
      </Plate>

      <Plate number="157" title="Form kit">
        <ValidatedForm
          onSubmit={(data) => {
            console.info('Lead enviado:', data)
          }}
        />
      </Plate>

      <Plate number="158" title="Product card">
        <ProductGrid>
          <ProductCard
            title="Calibrador de tokens"
            description="Kit completo para sincronizar paletas dia/noite."
            price="R$ 89,90"
            badge="Novo"
            icon={<Gauge className="h-10 w-10" strokeWidth={1.5} />}
            quantity={qtyA}
            onQuantityChange={setQtyA}
            onAddToCart={() => setCartOpen(true)}
          />
          <ProductCard
            title="Kit showcase"
            description="Placas numeradas + MCP para instalar no seu app."
            price="R$ 149,00"
            icon={<Layers className="h-10 w-10" strokeWidth={1.5} />}
            quantity={qtyB}
            onQuantityChange={setQtyB}
            onAddToCart={() => setCartOpen(true)}
          />
        </ProductGrid>
      </Plate>

      <Plate number="159" title="Cart drawer">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" onClick={() => setCartOpen(true)}>
            <ShoppingBag className="h-4 w-4" aria-hidden />
            Abrir carrinho ({cartItems.length})
          </Button>
          <Caption>Sheet lateral com itens, quantidade e checkout.</Caption>
        </div>
        <CartDrawer
          open={cartOpen}
          onOpenChange={setCartOpen}
          items={cartItems}
          onUpdateQty={updateCartQty}
          onRemove={removeCartItem}
          onCheckout={() => setCartOpen(false)}
        />
      </Plate>

      <Plate number="160" title="Order summary">
        <div className="max-w-md">
          <OrderSummary
            items={[
              { id: '1', label: 'Calibrador de tokens', amount: 89.9, quantity: 1 },
              { id: '2', label: 'Kit showcase', amount: 298, quantity: 2 },
            ]}
            subtotal={orderSubtotal}
            shipping={orderShipping}
            tax={orderTax}
            total={orderTotal}
            onApplyPromo={() => undefined}
            onCheckout={() => undefined}
          />
        </div>
      </Plate>

      <Plate number="161" title="Billing">
        <BillingPanel
          onChangePlan={() => undefined}
          onEditPayment={() => undefined}
          onDownloadInvoice={() => undefined}
        />
      </Plate>

      <Plate number="162" title="Search results">
        <SearchResults
          query={searchQuery}
          results={searchQuery.trim() ? SEARCH_RESULTS : []}
          total={searchQuery.trim() ? 12 : 0}
          searchSlot={
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar componentes…"
              aria-label="Buscar componentes"
            />
          }
          activeFilters={activeFilters}
          onRemoveFilter={(id) =>
            setActiveFilters((prev) => prev.filter((f) => f.id !== id))
          }
          onClearFilters={() => setActiveFilters([])}
          filterControls={
            <Chip
              tone="brass"
              onClick={() =>
                setActiveFilters((prev) =>
                  prev.some((f) => f.id === 'cat-forms')
                    ? prev
                    : [...prev, { id: 'cat-forms', label: 'Forms', tone: 'neutral' }]
                )
              }
            >
              + Forms
            </Chip>
          }
          onResultClick={() => undefined}
          emptyAction={
            <Button variant="secondary" size="sm" onClick={() => setSearchQuery('gauge')}>
              Limpar busca
            </Button>
          }
        />
      </Plate>

      <Plate number="163" title="Onboarding">
        <OnboardingChecklist
          title="Configure seu workspace"
          description="Quatro passos para deixar a equipe pronta — marque itens para simular progresso."
          items={onboardingItems.map((item) => ({
            ...item,
            onAction: item.onAction
              ? () => toggleOnboardingItem(item.id)
              : undefined,
          }))}
          onDismiss={() => setOnboardingItems(INITIAL_ONBOARDING)}
        />
      </Plate>

      <Plate number="164" title="Booking">
        <BookingAgenda
          selectedDate={bookingDate}
          onDateChange={setBookingDate}
          slots={bookingSlots}
          selectedSlotId={selectedSlot}
          onSelectSlot={setSelectedSlot}
          onConfirm={() => undefined}
          timezoneLabel="Horários em America/São_Paulo"
          serviceLabel="Consultoria de design system — 45 min"
        />
      </Plate>
    </>
  )
}
