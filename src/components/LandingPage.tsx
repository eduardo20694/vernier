import type { ReactNode } from 'react'
import {
  BarChart3,
  Gauge,
  Layers,
  Shield,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import { cn } from '../lib/cn'
import { AnnouncementBar } from './AnnouncementBar'
import { Button } from './Button'
import { ComparisonTable } from './ComparisonTable'
import { FAQ, type FAQItem } from './FAQ'
import { FeatureBento, type FeatureBentoItem } from './FeatureBento'
import { Footer, type FooterColumn } from './Footer'
import { Hero } from './Hero'
import { HeroSplit } from './HeroSplit'
import { LogoCloud, type LogoItem } from './LogoCloud'
import { Navbar, NavLink } from './Navbar'
import { PricingCards, type PricingPlan } from './PricingCards'
import { SectionCTA } from './SectionCTA'
import { Testimonial, TestimonialGrid } from './Testimonial'

export interface LandingNavLink {
  label: string
  onClick?: () => void
}

export interface LandingPageBaseProps {
  title?: string
  description?: string
  eyebrow?: string
  navLinks?: LandingNavLink[]
  onCtaClick?: () => void
  className?: string
}

const defaultNavLinks: LandingNavLink[] = [
  { label: 'Recursos' },
  { label: 'Preços' },
  { label: 'FAQ' },
]

const defaultFooterColumns: FooterColumn[] = [
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
  {
    title: 'Legal',
    links: [
      { label: 'Privacidade', href: '#' },
      { label: 'Termos', href: '#' },
    ],
  },
]

const defaultLogos: LogoItem[] = [
  { name: 'Atlas' },
  { name: 'Meridian' },
  { name: 'Helix' },
  { name: 'Nova' },
  { name: 'Prisma' },
]

const defaultFeatures: FeatureBentoItem[] = [
  {
    title: 'Painéis precisos',
    description: 'Layout modular com tokens Vernier — dia e noite sem refatorar CSS.',
    icon: <Layers className="h-5 w-5" strokeWidth={1.75} />,
    span: 2,
  },
  {
    title: 'Métricas ao vivo',
    description: 'Stats, gauges e sparklines prontos para dashboards operacionais.',
    icon: <BarChart3 className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    title: 'Acessível',
    description: 'Foco visível, contraste calibrado e padrões Radix por baixo.',
    icon: <Shield className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    title: 'Rápido de integrar',
    description: 'Copie componentes ou instale via MCP — sem pacote npm pesado.',
    icon: <Zap className="h-5 w-5" strokeWidth={1.75} />,
  },
]

const defaultPricingPlans: PricingPlan[] = [
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

const defaultFaqItems: FAQItem[] = [
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

function LandingShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto flex w-full max-w-6xl flex-col gap-10', className)}>
      {children}
    </div>
  )
}

function LandingNavbar({
  navLinks = defaultNavLinks,
  onCtaClick,
}: Pick<LandingPageBaseProps, 'navLinks' | 'onCtaClick'>) {
  return (
    <Navbar
      brand={<span>Vernier</span>}
      links={
        <>
          {navLinks.map((link) => (
            <NavLink key={link.label} onClick={link.onClick}>
              {link.label}
            </NavLink>
          ))}
        </>
      }
      actions={
        <Button variant="gradient" size="sm" onClick={onCtaClick}>
          Começar
        </Button>
      }
      className="rounded-xl border border-line"
    />
  )
}

function LandingFooter() {
  return (
    <Footer
      brand="Vernier"
      tagline="Instrumentos de interface — aço azul, precisão oceânica."
      columns={defaultFooterColumns}
      legal="© 2026 Vernier. Todos os direitos reservados."
      className="rounded-xl border border-line"
    />
  )
}

function HeroMediaPlaceholder() {
  return (
    <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border border-line bg-ink/50 p-6">
      <div className="grid w-full max-w-xs grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-md border border-line bg-panel2/80"
          />
        ))}
      </div>
    </div>
  )
}

export function LandingPageSaaS({
  title = 'Interface com precisão de instrumento',
  description = 'Componentes React calibrados para produtos que exigem clareza, contraste e ritmo visual consistente.',
  eyebrow = 'Biblioteca Vernier',
  navLinks,
  onCtaClick,
  className,
}: LandingPageBaseProps) {
  const plans = defaultPricingPlans.map((plan) => ({
    ...plan,
    onSelect: onCtaClick,
  }))

  return (
    <LandingShell className={className}>
      <LandingNavbar navLinks={navLinks} onCtaClick={onCtaClick} />
      <Hero
        eyebrow={eyebrow}
        title={title}
        description={description}
        primaryAction={{ label: 'Experimentar grátis', onClick: onCtaClick }}
        secondaryAction={{ label: 'Ver vitrine', onClick: onCtaClick }}
        media={<HeroMediaPlaceholder />}
      />
      <LogoCloud logos={defaultLogos} title="Confiado por equipes de produto" />
      <FeatureBento
        title="Tudo para lançar mais rápido"
        description="Blocos compostos, tokens documentados e showcase interativo."
        items={defaultFeatures}
      />
      <section>
        <header className="mb-6 text-center">
          <h2 className="font-display text-3xl text-vellum">Planos transparentes</h2>
          <p className="mt-2 text-sm text-vellum-muted">Escale quando precisar — sem surpresas.</p>
        </header>
        <PricingCards plans={plans} />
      </section>
      <FAQ items={defaultFaqItems} />
      <SectionCTA
        title="Pronto para calibrar sua interface?"
        description="Monte landing pages, dashboards e fluxos com a mesma linguagem visual."
        primaryLabel="Criar conta"
        onPrimary={onCtaClick}
        secondaryLabel="Agendar demo"
        onSecondary={onCtaClick}
      />
      <LandingFooter />
    </LandingShell>
  )
}

export function LandingPageProduct({
  title = 'Operações visíveis em tempo real',
  description = 'Monitore fluxos, equipes e métricas com componentes pensados para densidade informacional — sem perder legibilidade.',
  eyebrow = 'Produto Vernier',
  navLinks = [
    { label: 'Visão geral' },
    { label: 'Depoimentos' },
    { label: 'Preços' },
  ],
  onCtaClick,
  className,
}: LandingPageBaseProps) {
  const productFeatures: FeatureBentoItem[] = [
    {
      title: 'Fluxos conectados',
      description: 'Kanban, timelines e feeds no mesmo sistema visual.',
      icon: <Workflow className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      title: 'Presença da equipe',
      description: 'Avatares, status e notificações integrados aos painéis.',
      icon: <Users className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      title: 'Performance medida',
      description: 'Gauges, spark stats e heatmaps para decisões rápidas.',
      icon: <Gauge className="h-5 w-5" strokeWidth={1.75} />,
      span: 2,
    },
  ]

  return (
    <LandingShell className={className}>
      <LandingNavbar navLinks={navLinks} onCtaClick={onCtaClick} />
      <HeroSplit
        eyebrow={eyebrow}
        title={title}
        description={description}
        primaryAction={{ label: 'Solicitar acesso', onClick: onCtaClick }}
        secondaryAction={{ label: 'Ver demo', onClick: onCtaClick }}
        media={
          <div className="flex h-full min-h-[220px] items-center justify-center p-8">
            <Sparkles className="h-16 w-16 text-brass/40" strokeWidth={1.25} />
          </div>
        }
      />
      <FeatureBento
        title="Feito para operação diária"
        description="Componentes que aguentam dados densos e turnos longos."
        items={productFeatures}
      />
      <section>
        <header className="mb-6 max-w-2xl">
          <h2 className="font-display text-3xl text-vellum">Quem já usa</h2>
          <p className="mt-2 text-sm text-vellum-muted">
            Times de produto e engenharia que precisam de clareza sob pressão.
          </p>
        </header>
        <TestimonialGrid>
          <Testimonial
            quote="Reduzimos o tempo de montagem de dashboards pela metade — sem sacrificar acessibilidade."
            author="Marina Costa"
            role="Head of Product, Atlas"
          />
          <Testimonial
            quote="Os tokens dia/noite funcionam de primeira. Nada de remendar tema escuro depois."
            author="Rafael Mendes"
            role="Eng. Frontend, Helix"
          />
          <Testimonial
            quote="Vitrine viva: copiamos blocos direto para o app e customizamos só o necessário."
            author="Ana Souza"
            role="Design Lead, Nova"
          />
        </TestimonialGrid>
      </section>
      <SectionCTA
        title="Leve precisão para o seu produto"
        description="Blocos prontos, identidade consistente — ideal para barras fixas e CTAs persistentes."
        primaryLabel="Começar agora"
        onPrimary={onCtaClick}
        className="scroll-mt-4"
      />
      <LandingFooter />
    </LandingShell>
  )
}

export function LandingPageStudio({
  title = 'Estúdio digital com acabamento de aço',
  description = 'Sites, landing pages e micro-produtos com a estética Vernier — profundidade oceânica, detalhes em latão.',
  eyebrow = 'Vernier Studio',
  navLinks = [
    { label: 'Serviços' },
    { label: 'Comparar planos' },
    { label: 'FAQ' },
  ],
  onCtaClick,
  className,
}: LandingPageBaseProps) {
  const studioPlans = defaultPricingPlans.map((plan) => ({
    ...plan,
    onSelect: onCtaClick,
  }))

  return (
    <LandingShell className={className}>
      <div className="overflow-hidden rounded-xl border border-line">
        <AnnouncementBar href="#" linkLabel="Ver novidades">
          Novo pacote Studio — landing + blog + contato em um só fluxo.
        </AnnouncementBar>
        <LandingNavbar navLinks={navLinks} onCtaClick={onCtaClick} />
      </div>
      <Hero
        eyebrow={eyebrow}
        title={title}
        description={description}
        primaryAction={{ label: 'Contratar estúdio', onClick: onCtaClick }}
        secondaryAction={{ label: 'Portfólio', onClick: onCtaClick }}
      />
      <section>
        <header className="mb-6 text-center">
          <h2 className="font-display text-3xl text-vellum">Compare entregas</h2>
          <p className="mt-2 text-sm text-vellum-muted">
            Escolha o pacote — ou combine blocos à la carte.
          </p>
        </header>
        <ComparisonTable
          caption="Comparativo de pacotes Studio"
          plans={[
            { id: 'starter', name: 'Essencial' },
            { id: 'pro', name: 'Profissional', highlighted: true },
            { id: 'team', name: 'Enterprise' },
          ]}
          features={[
            {
              id: 'pages',
              name: 'Páginas incluídas',
              values: { starter: '5', pro: '15', team: 'Ilimitado' },
            },
            {
              id: 'blog',
              name: 'Blog + CMS',
              values: { starter: false, pro: true, team: true },
            },
            {
              id: 'support',
              name: 'Suporte dedicado',
              values: { starter: false, pro: true, team: true },
            },
            {
              id: 'sla',
              name: 'SLA 99,9%',
              values: { starter: false, pro: false, team: true },
            },
          ]}
          className="mb-8"
        />
        <PricingCards plans={studioPlans} />
      </section>
      <FAQ
        title="Dúvidas sobre o Studio"
        description="Prazos, revisões e entregáveis — respostas diretas."
        items={[
          ...defaultFaqItems,
          {
            question: 'Quantas rodadas de revisão?',
            answer: 'Essencial: 2 rodadas. Profissional: 4. Enterprise: ilimitadas no escopo acordado.',
          },
        ]}
      />
      <SectionCTA
        title="Vamos calibrar seu próximo lançamento"
        description="Briefing em 30 minutos — proposta em 48 horas."
        primaryLabel="Agendar conversa"
        onPrimary={onCtaClick}
      />
    </LandingShell>
  )
}
