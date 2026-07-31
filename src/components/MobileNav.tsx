import { Menu } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from './Sheet'

export interface MobileNavLink {
  label: string
  href?: string
  onClick?: () => void
}

export function MobileNav({
  brand,
  links,
  actions,
  className,
}: {
  brand: React.ReactNode
  links: MobileNavLink[]
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex h-14 items-center justify-between border-b border-line bg-panel px-4', className)}>
      <div className="font-display text-vellum">{brand}</div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" size="icon" aria-label="Abrir menu">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex w-full max-w-xs flex-col">
          <SheetTitle className="sr-only">Navegação</SheetTitle>
          <nav className="mt-6 flex flex-col gap-1">
            {links.map((l) => (
              <SheetClose key={l.label} asChild>
                <a
                  href={l.href ?? '#'}
                  onClick={l.onClick}
                  className="rounded-md px-3 py-2.5 text-sm text-vellum-muted hover:bg-panel2 hover:text-vellum focus-ring"
                >
                  {l.label}
                </a>
              </SheetClose>
            ))}
          </nav>
          {actions && <div className="mt-auto border-t border-line pt-4">{actions}</div>}
        </SheetContent>
      </Sheet>
    </div>
  )
}
