import { Gauge } from 'lucide-react'
import { AnnouncementBar } from '../../components/AnnouncementBar'
import { Hero } from '../../components/Hero'
import { WaitlistForm } from '../../components/WaitlistForm'
import { LogoCloud } from '../../components/LogoCloud'
import { Navbar, NavLink } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Button } from '../../components/Button'
import { BrowserFrame } from '../../components/BrowserFrame'

const footerColumns = [
  {
    title: 'Produto',
    links: [
      { label: 'Recursos', href: '#' },
      { label: 'Roadmap', href: '#' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre', href: '#' },
      { label: 'Contato', href: '#' },
    ],
  },
]

const logos = [
  { name: 'Atlas' },
  { name: 'Meridian' },
  { name: 'Helix' },
  { name: 'Nova' },
  { name: 'Prisma' },
]

export function LandingWaitlistPage() {
  return (
    <BrowserFrame url="https://vernier.dev/em-breve" contentClassName="max-h-none">
      <div className="min-h-full bg-ink text-vellum">
        <AnnouncementBar href="#" linkLabel="Saiba mais">
          Lançamento em breve — entre na lista e ganhe acesso antecipado.
        </AnnouncementBar>
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
              <NavLink>Roadmap</NavLink>
            </>
          }
          actions={
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
          }
        />
        <main className="mx-auto max-w-4xl space-y-12 px-4 py-10 sm:px-6">
          <Hero
            eyebrow="Em breve"
            title="A bancada está sendo calibrada"
            description="Componentes de precisão oceânica — dia e noite, tokens sincronizados, vitrine viva. Seja avisado no lançamento."
            primaryAction={{ label: 'Entrar na lista' }}
          />
          <WaitlistForm
            count={1247}
            countLabel="já na fila"
            onSubmit={async () => undefined}
          />
          <LogoCloud logos={logos} title="Equipes aguardando o lançamento" />
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
