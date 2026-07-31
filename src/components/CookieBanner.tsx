import { useState } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'

export function CookieBanner({
  title = 'Cookies e telemetria',
  description = 'Usamos cookies essenciais e, com seu ok, métricas anônimas pra melhorar a bancada.',
  onAccept,
  onReject,
  className,
}: {
  title?: string
  description?: string
  onAccept?: () => void
  onReject?: () => void
  className?: string
}) {
  const [hidden, setHidden] = useState(false)
  if (hidden) return null

  return (
    <div
      role="dialog"
      aria-label={title}
      className={cn(
        'fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-xl border border-line bg-panel2 p-4 shadow-plate sm:left-auto',
        className
      )}
    >
      <p className="font-display text-base text-vellum">{title}</p>
      <p className="mt-1 text-sm text-vellum-muted">{description}</p>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            onReject?.()
            setHidden(true)
          }}
        >
          Só essenciais
        </Button>
        <Button
          size="sm"
          variant="gradient"
          onClick={() => {
            onAccept?.()
            setHidden(true)
          }}
        >
          Aceitar
        </Button>
      </div>
    </div>
  )
}
