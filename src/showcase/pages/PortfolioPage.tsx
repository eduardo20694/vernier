import { ArrowUpRight, Gauge } from 'lucide-react'
import { BrowserFrame } from '../../components/BrowserFrame'
import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { Gallery, type GalleryItem } from '../../components/Gallery'
import { Navbar, NavLink } from '../../components/Navbar'
import { SectionCTA } from '../../components/SectionCTA'
import { Overline, Prose } from '../../components/Typography'

const SELECTED_WORK: GalleryItem[] = [
  {
    src: 'https://picsum.photos/seed/vernier-port-1/800/600',
    alt: 'Dashboard operacional com painéis azul-escuro',
    caption: 'Atlas — painel de telemetria marítima',
  },
  {
    src: 'https://picsum.photos/seed/vernier-port-2/800/600',
    alt: 'Landing page com hero em gradiente oceânico',
    caption: 'Meridian — landing B2B instrumentação',
  },
  {
    src: 'https://picsum.photos/seed/vernier-port-3/800/600',
    alt: 'Catálogo de produtos com cards metálicos',
    caption: 'Helix — e-commerce industrial',
  },
  {
    src: 'https://picsum.photos/seed/vernier-port-4/800/600',
    alt: 'Documentação técnica com sidebar escura',
    caption: 'Nova — docs de API em PT-BR',
  },
  {
    src: 'https://picsum.photos/seed/vernier-port-5/800/600',
    alt: 'App mobile preview em frame escuro',
    caption: 'Prisma — app de campo offline-first',
  },
  {
    src: 'https://picsum.photos/seed/vernier-port-6/800/600',
    alt: 'Blog editorial com tipografia display',
    caption: 'Vernier — vitrine de componentes',
  },
]

const footerColumns = [
  {
    title: 'Estúdio',
    links: [
      { label: 'Trabalhos', href: '#' },
      { label: 'Processo', href: '#' },
      { label: 'Contato', href: '#' },
    ],
  },
  {
    title: 'Redes',
    links: [
      { label: 'Dribbble', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  },
]

export function PortfolioPage() {
  return (
    <BrowserFrame url="https://vernier.dev/estudio/portfolio" contentClassName="max-h-none">
      <div className="min-h-full bg-ink text-vellum">
        <Navbar
          brand={
            <>
              <Gauge className="h-4 w-4 text-brass-bright" aria-hidden />
              <span>Vernier Studio</span>
            </>
          }
          links={
            <>
              <NavLink active>
                Trabalhos
              </NavLink>
              <NavLink>Serviços</NavLink>
              <NavLink>Sobre</NavLink>
            </>
          }
          actions={
            <Button variant="primary" size="sm">
              Iniciar projeto
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden />
            </Button>
          }
        />

        <main>
          {/* Full-bleed hero inside frame */}
          <section
            className="relative overflow-hidden border-b border-line"
            aria-labelledby="portfolio-hero-title"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgb(var(--brass)/0.18),transparent_55%),linear-gradient(to_bottom,rgb(var(--panel2)/0.9),rgb(var(--ink)))]"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brass-dim/50 to-transparent"
            />
            <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
              <Overline tone="brass">Portfólio editorial</Overline>
              <h1
                id="portfolio-hero-title"
                className="mt-4 max-w-3xl font-display text-display-sm leading-[0.95] text-vellum sm:text-display"
              >
                Interfaces com precisão de instrumento
              </h1>
              <p className="mt-6 max-w-2xl text-lead text-vellum-muted">
                Projetos selecionados onde profundidade oceânica, tipografia display e detalhes em
                latão sustentam produtos reais — de dashboards a landings e documentação.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="gradient" size="lg">
                  Ver trabalhos
                </Button>
                <Button variant="forged" size="lg">
                  Baixar deck
                </Button>
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-5xl space-y-16 px-4 py-14 sm:px-6">
            <section aria-labelledby="selected-work-title">
              <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 id="selected-work-title" className="font-display text-3xl text-vellum">
                    Trabalhos selecionados
                  </h2>
                  <p className="mt-2 text-sm text-vellum-muted">
                    Seis entregas recentes — clique para ampliar.
                  </p>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
                  2024 — 2026
                </p>
              </header>
              <Gallery items={SELECTED_WORK} columns={3} />
            </section>

            <section
              aria-labelledby="about-title"
              className="grid gap-10 rounded-2xl border border-line bg-panel/40 p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:p-10"
            >
              <div>
                <Overline tone="brass">Sobre o estúdio</Overline>
                <h2 id="about-title" className="mt-3 font-display text-3xl text-vellum">
                  Design de produto, não decoração
                </h2>
              </div>
              <Prose className="text-vellum-muted">
                <p>
                  O Vernier Studio nasce da mesma oficina da biblioteca: tokens calibrados, Radix por
                  baixo, copy em português claro. Cada projeto parte de sistemas reutilizáveis — não
                  de templates genéricos.
                </p>
                <p>
                  Trabalhamos com equipes de produto, engenharia e marca para lançar interfaces que
                  envelhecem bem: dia e noite, mobile e desktop, docs e app.
                </p>
              </Prose>
            </section>

            <SectionCTA
              title="Vamos calibrar o seu próximo lançamento?"
              description="Conte o escopo — landing, dashboard ou design system completo. Respondemos em 48h."
              primaryLabel="Agendar conversa"
              secondaryLabel="Ver serviços"
            />
          </div>
        </main>

        <Footer
          brand="Vernier Studio"
          tagline="Portfólio editorial — aço azul, latão e azure."
          columns={footerColumns}
          legal="© 2026 Vernier Studio"
        />
      </div>
    </BrowserFrame>
  )
}
