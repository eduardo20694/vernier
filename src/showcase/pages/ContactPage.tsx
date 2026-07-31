import { Gauge } from 'lucide-react'
import { ContactSection } from '../../components/ContactSection'
import { Navbar, NavLink } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Button } from '../../components/Button'
import { BrowserFrame } from '../../components/BrowserFrame'

const footerColumns = [
  {
    title: 'Produto',
    links: [
      { label: 'Recursos', href: '#' },
      { label: 'Preços', href: '#' },
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

export function ContactPage() {
  return (
    <BrowserFrame url="https://vernier.dev/contato" contentClassName="max-h-none">
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
              <NavLink>Produto</NavLink>
              <NavLink>Preços</NavLink>
              <NavLink active>
                Contato
              </NavLink>
            </>
          }
          actions={
            <Button variant="primary" size="sm">
              Começar
            </Button>
          }
        />
        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <ContactSection onSubmit={async () => undefined} />
        </main>
        <Footer
          brand="Vernier"
          tagline="Componentes com precisão de instrumento — aço oceano, dia e noite."
          columns={footerColumns}
          legal="© 2026 Vernier"
        />
      </div>
    </BrowserFrame>
  )
}
