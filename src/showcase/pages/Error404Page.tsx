import { Gauge } from 'lucide-react'
import { ErrorPage } from '../../components/ErrorPage'
import { Button } from '../../components/Button'
import { Navbar, NavLink } from '../../components/Navbar'
import { usePageFullscreen } from './PageFrame'

export function Error404Page() {
  const fullscreen = usePageFullscreen()

  return (
    <div className={fullscreen ? 'flex min-h-screen flex-col bg-ink' : 'min-h-full bg-ink'}>
      <Navbar
        brand={
          <>
            <Gauge className="h-4 w-4 text-brass-bright" aria-hidden />
            <span>Vernier</span>
          </>
        }
        links={
          <>
            <NavLink>Início</NavLink>
            <NavLink>Catálogo</NavLink>
          </>
        }
        className="border-b border-line"
      />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <ErrorPage
          code="404"
          title="Página não encontrada"
          description="Esse caminho não existe na bancada — ou foi movido para outra placa."
          className="w-full max-w-xl border-0 bg-transparent shadow-none"
          action={
            <Button variant="gradient">Voltar ao catálogo</Button>
          }
        />
      </main>
    </div>
  )
}
