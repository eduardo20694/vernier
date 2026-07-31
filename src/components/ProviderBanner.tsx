import type { ReactNode } from 'react'
import { AlertTriangle, Timer, WifiOff, type LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'

export type ProviderBannerVariant = 'offline' | 'timeout' | 'error' | 'degraded'

export interface ProviderBannerProps {
  variant: ProviderBannerVariant
  provider: string
  title?: string
  description?: string
  onRetry?: () => void
  retryLabel?: string
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
  children?: ReactNode
}

type VariantConfig = {
  icon: LucideIcon
  defaultTitle: string
  defaultDescription: string
  borderClass: string
  bgClass: string
  iconClass: string
  titleClass: string
}

const variantConfig: Record<ProviderBannerVariant, VariantConfig> = {
  offline: {
    icon: WifiOff,
    defaultTitle: 'indisponível',
    defaultDescription: 'Não foi possível estabelecer conexão com o provedor. Verifique a rede ou tente novamente.',
    borderClass: 'border-rust-dim/70',
    bgClass: 'bg-gradient-to-r from-rust/18 via-rust/8 to-panel2',
    iconClass: 'text-rust',
    titleClass: 'text-rust',
  },
  timeout: {
    icon: Timer,
    defaultTitle: 'tempo limite excedido',
    defaultDescription: 'A consulta excedeu o tempo limite. O serviço pode estar sobrecarregado.',
    borderClass: 'border-brass-dim/60',
    bgClass: 'bg-gradient-to-r from-brass/12 via-brass/5 to-panel2',
    iconClass: 'text-brass-bright',
    titleClass: 'text-brass-bright',
  },
  error: {
    icon: AlertTriangle,
    defaultTitle: 'falha na integração',
    defaultDescription: 'O provedor retornou um erro inesperado. Nossa equipe foi notificada.',
    borderClass: 'border-rust-dim/70',
    bgClass: 'bg-gradient-to-r from-rust/15 via-rust/6 to-panel2',
    iconClass: 'text-rust',
    titleClass: 'text-rust',
  },
  degraded: {
    icon: AlertTriangle,
    defaultTitle: 'serviço degradado',
    defaultDescription: 'Respostas podem estar incompletas ou desatualizadas até a normalização.',
    borderClass: 'border-brass-dim/50',
    bgClass: 'bg-gradient-to-r from-brass/10 via-panel2 to-panel2',
    iconClass: 'text-brass-bright',
    titleClass: 'text-brass-bright',
  },
}

export function ProviderBanner({
  variant,
  provider,
  title,
  description,
  onRetry,
  retryLabel = 'Tentar novamente',
  secondaryAction,
  className,
  children,
}: ProviderBannerProps) {
  const cfg = variantConfig[variant]
  const Icon = cfg.icon
  const resolvedTitle = title ?? `${provider} ${cfg.defaultTitle}`
  const resolvedDescription = description ?? cfg.defaultDescription

  return (
    <div
      role="alert"
      className={cn(
        'relative overflow-hidden rounded-lg border-2 px-4 py-3.5',
        'shadow-[inset_0_1px_0_rgb(var(--brass)/0.08),0_1px_0_rgb(var(--shade)/0.2)]',
        cfg.borderClass,
        cfg.bgClass,
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brass/50 via-rust/40 to-brass-dim/30"
      />

      <div className="flex flex-wrap items-start gap-4 pl-2">
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-panel/80',
            cfg.iconClass
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <p className={cn('font-display text-sm font-medium', cfg.titleClass)}>{resolvedTitle}</p>
          <p className="text-sm leading-relaxed text-vellum-muted">{resolvedDescription}</p>
          {children}
        </div>

        {(onRetry || secondaryAction) && (
          <div className="flex shrink-0 flex-wrap items-center gap-2 pl-2 sm:pl-0">
            {onRetry && (
              <Button type="button" variant="primary" size="sm" onClick={onRetry}>
                {retryLabel}
              </Button>
            )}
            {secondaryAction && (
              <Button type="button" variant="secondary" size="sm" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
