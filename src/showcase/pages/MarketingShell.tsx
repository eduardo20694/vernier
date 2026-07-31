import type { ReactNode } from 'react'
import { Gauge } from 'lucide-react'
import { Navbar, NavLink } from '../../components/Navbar'
import { Footer, type FooterColumn } from '../../components/Footer'
import { Button } from '../../components/Button'

const footerColumns: FooterColumn[] = [
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

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
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
            <NavLink active>Produto</NavLink>
            <NavLink>Preços</NavLink>
            <NavLink>Blog</NavLink>
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
      <main>{children}</main>
      <Footer
        brand="Vernier"
        tagline="Componentes com precisão de instrumento — aço oceano, dia e noite."
        columns={footerColumns}
        legal={<span>© 2026 Vernier</span>}
      />
    </div>
  )
}
