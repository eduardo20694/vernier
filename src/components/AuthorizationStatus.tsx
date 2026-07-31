import { useEffect, useState } from 'react'
import { ExternalLink, RefreshCw } from 'lucide-react'
import { cn } from '../lib/cn'
import { Badge } from './Badge'
import { Button } from './Button'
import { Countdown } from './Countdown'
import { Link } from './Link'
import { StatusDot } from './StatusDot'

export type AuthorizationState =
  | 'pendente'
  | 'aguardando_cliente'
  | 'autorizado'
  | 'expirado'
  | 'recusado'

export interface AuthorizationStatusProps {
  state: AuthorizationState
  className?: string
  expiresAt?: Date | string | number
  secondsLeft?: number
  onResend?: () => void
  resendDisabled?: boolean
  resendLabel?: string
  authorizationUrl?: string
  onOpenAuthorization?: () => void
}

interface StateConfig {
  tone: 'brass' | 'verdigris' | 'rust' | 'neutral'
  badge: string
  title: string
  description: string
  pulse?: boolean
}

const stateConfig: Record<AuthorizationState, StateConfig> = {
  pendente: {
    tone: 'brass',
    badge: 'Pendente',
    title: 'Autorização pendente',
    description: 'Aguardando geração do link de autorização para o cliente.',
    pulse: true,
  },
  aguardando_cliente: {
    tone: 'brass',
    badge: 'Aguardando',
    title: 'Aguardando cliente',
    description: 'Link enviado. O cliente precisa confirmar a autorização digital.',
    pulse: true,
  },
  autorizado: {
    tone: 'verdigris',
    badge: 'Autorizado',
    title: 'Autorização confirmada',
    description: 'Cliente autorizou a consulta. Prosseguir com a simulação.',
  },
  expirado: {
    tone: 'rust',
    badge: 'Expirado',
    title: 'Autorização expirada',
    description: 'O prazo para autorização encerrou. Reenvie um novo link ao cliente.',
  },
  recusado: {
    tone: 'rust',
    badge: 'Recusado',
    title: 'Autorização recusada',
    description: 'O cliente recusou ou cancelou a autorização digital.',
  },
}

function CompactTimer({ secondsLeft }: { secondsLeft: number }) {
  const [remaining, setRemaining] = useState(secondsLeft)

  useEffect(() => {
    setRemaining(secondsLeft)
    const id = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(id)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [secondsLeft])

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60

  return (
    <span className="font-mono text-sm tabular-nums text-brass-bright">
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </span>
  )
}

export function AuthorizationStatus({
  state,
  className,
  expiresAt,
  secondsLeft,
  onResend,
  resendDisabled,
  resendLabel = 'Reenviar link',
  authorizationUrl,
  onOpenAuthorization,
}: AuthorizationStatusProps) {
  const cfg = stateConfig[state]
  const showResend =
    (state === 'aguardando_cliente' || state === 'expirado') && onResend
  const showOpenLink =
    (state === 'pendente' || state === 'aguardando_cliente') &&
    (authorizationUrl || onOpenAuthorization)
  const showTimer =
    (state === 'aguardando_cliente' || state === 'expirado') &&
    (expiresAt != null || secondsLeft != null)

  return (
    <div
      className={cn(
        'rounded-lg border border-line bg-gradient-to-b from-panel2 via-panel to-ink p-4',
        'shadow-[inset_0_1px_0_rgb(var(--brass)/0.06)]',
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <StatusDot tone={cfg.tone} pulse={cfg.pulse} size="md" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-base font-medium text-vellum">
                {cfg.title}
              </h3>
              <Badge tone={cfg.tone === 'neutral' ? 'neutral' : cfg.tone}>
                {cfg.badge}
              </Badge>
            </div>
            <p className="mt-1 max-w-prose text-sm text-vellum-muted">
              {cfg.description}
            </p>
          </div>
        </div>

        {showTimer && (
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-vellum-faint">
              Expira em
            </p>
            <div className="mt-1">
              {expiresAt != null ? (
                <Countdown
                  target={expiresAt}
                  className="gap-1"
                  labels={{ days: 'd', hours: 'h', minutes: 'm', seconds: 's' }}
                />
              ) : secondsLeft != null ? (
                <CompactTimer secondsLeft={secondsLeft} />
              ) : null}
            </div>
          </div>
        )}
      </div>

      {(showResend || showOpenLink) && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line/60 pt-4">
          {showResend && (
            <Button
              variant="secondary"
              size="sm"
              disabled={resendDisabled}
              onClick={onResend}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {resendLabel}
            </Button>
          )}
          {showOpenLink &&
            (authorizationUrl ? (
              <Link
                href={authorizationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Abrir autorização
              </Link>
            ) : (
              <Button variant="ghost" size="sm" onClick={onOpenAuthorization}>
                <ExternalLink className="h-3.5 w-3.5" />
                Abrir autorização
              </Button>
            ))}
        </div>
      )}
    </div>
  )
}
