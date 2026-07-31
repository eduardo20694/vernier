import { useMemo, useState } from 'react'
import { Gauge } from 'lucide-react'
import { PricingToggle, type PricingPeriod } from '../../components/PricingToggle'
import { PricingCards, type PricingPlan } from '../../components/PricingCards'
import { ComparisonTable } from '../../components/ComparisonTable'
import { FAQ } from '../../components/FAQ'
import { SectionCTA } from '../../components/SectionCTA'
import { Footer } from '../../components/Footer'
import { Navbar, NavLink } from '../../components/Navbar'
import { Button } from '../../components/Button'
import { BrowserFrame } from '../../components/BrowserFrame'

const basePlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Inicial',
    price: 'R$ 0',
    period: '/mês',
    description: 'Para protótipos e vitrines.',
    features: ['Até 3 projetos', 'Componentes base', 'Suporte comunitário'],
    cta: 'Começar grátis',
  },
  {
    id: 'pro',
    name: 'Profissional',
    price: 'R$ 89',
    period: '/mês',
    description: 'Para equipes em produção.',
    features: ['Projetos ilimitados', 'Todos os blocos', 'Suporte prioritário'],
    cta: 'Assinar Pro',
    highlighted: true,
  },
  {
    id: 'team',
    name: 'Equipe',
    price: 'R$ 249',
    period: '/mês',
    description: 'Governança e escala.',
    features: ['SSO', 'Tokens customizados', 'SLA dedicado'],
    cta: 'Falar com vendas',
  },
]

const yearlyPlans: PricingPlan[] = [
  { ...basePlans[0], price: 'R$ 0', period: '/ano' },
  { ...basePlans[1], price: 'R$ 854', period: '/ano', highlighted: true },
  { ...basePlans[2], price: 'R$ 2.390', period: '/ano' },
]

const faqItems = [
  {
    question: 'Preciso publicar um pacote npm?',
    answer:
      'Não. O Vernier é distribuído como componentes copiáveis ou via MCP — você traz só o que usa.',
  },
  {
    question: 'Funciona com meu stack React?',
    answer: 'Sim: React 18+, TypeScript, Tailwind e Radix. Vite ou Next, tanto faz.',
  },
  {
    question: 'Posso trocar as cores?',
    answer: 'Sim — ajuste tokens em tokens.json e variáveis CSS; as classes Tailwind seguem.',
  },
]

const footerColumns = [
  {
    title: 'Produto',
    links: [
      { label: 'Recursos', href: '#' },
      { label: 'Preços', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contato', href: '#' },
    ],
  },
]

export function PricingPage() {
  const [period, setPeriod] = useState<PricingPeriod>('monthly')

  const plans = useMemo(
    () => (period === 'yearly' ? yearlyPlans : basePlans),
    [period]
  )

  return (
    <BrowserFrame url="https://vernier.dev/precos" contentClassName="max-h-none">
      <div className="min-h-full bg-ink text-vellum">
        <Navbar
          brand={
            <>
              <Gauge className="h-4 w-4 text-brass-bright" aria-hidden />
              <span>Vernier</span>
            </>
          }
          links={
            <>
              <NavLink>Recursos</NavLink>
              <NavLink active>
                Preços
              </NavLink>
              <NavLink>FAQ</NavLink>
            </>
          }
          actions={
            <>
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
              <Button variant="primary" size="sm">
                Começar
              </Button>
            </>
          }
        />
        <main className="mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6">
          <header className="text-center">
            <h1 className="font-display text-display-sm text-vellum sm:text-display">
              Planos calibrados para cada fase
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-vellum-muted">
              Do protótipo ao produto em produção — escolha o plano e ajuste quando crescer.
            </p>
            <div className="mt-6 flex justify-center">
              <PricingToggle value={period} onChange={setPeriod} yearlyBadge="−20%" />
            </div>
          </header>

          <PricingCards plans={plans} />

          <ComparisonTable
            caption="Comparativo de planos Vernier"
            plans={[
              { id: 'starter', name: 'Inicial' },
              { id: 'pro', name: 'Profissional', highlighted: true },
              { id: 'team', name: 'Equipe' },
            ]}
            features={[
              {
                id: 'projects',
                name: 'Projetos',
                values: { starter: '3', pro: 'Ilimitado', team: 'Ilimitado' },
              },
              {
                id: 'components',
                name: 'Todos os componentes',
                values: { starter: false, pro: true, team: true },
              },
              {
                id: 'sso',
                name: 'SSO',
                values: { starter: false, pro: false, team: true },
              },
              {
                id: 'sla',
                name: 'SLA dedicado',
                values: { starter: false, pro: false, team: true },
              },
            ]}
          />

          <FAQ
            title="Perguntas frequentes"
            description="Respostas diretas sobre planos, cobrança e migração."
            items={faqItems}
          />

          <SectionCTA
            title="Pronto para calibrar sua interface?"
            description="Comece grátis — faça upgrade quando a equipe crescer."
            primaryLabel="Criar conta"
          />
        </main>
        <Footer
          brand="Vernier"
          tagline="Instrumentos de interface — aço azul, precisão oceânica."
          columns={footerColumns}
          legal="© 2026 Vernier"
        />
      </div>
    </BrowserFrame>
  )
}
