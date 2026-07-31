import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'
import { Avatar, type AvatarProps } from './Avatar'
import { StatusDot } from './StatusDot'

export type PresenceStatus = 'online' | 'away' | 'busy' | 'offline'

export interface PresenceProps extends HTMLAttributes<HTMLDivElement> {
  fallback: string
  src?: string
  alt?: string
  status?: PresenceStatus
  size?: AvatarProps['size']
  showLabel?: boolean
}

const statusMap: Record<
  PresenceStatus,
  { tone: 'verdigris' | 'brass' | 'rust' | 'neutral'; label: string; pulse?: boolean }
> = {
  online: { tone: 'verdigris', label: 'Online', pulse: true },
  away: { tone: 'brass', label: 'Ausente' },
  busy: { tone: 'rust', label: 'Ocupado' },
  offline: { tone: 'neutral', label: 'Offline' },
}

const dotPos: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'bottom-0 right-0',
  md: 'bottom-0 right-0',
  lg: 'bottom-0.5 right-0.5',
}

export function Presence({
  className,
  fallback,
  src,
  alt,
  status = 'online',
  size = 'md',
  showLabel = false,
  ...props
}: PresenceProps) {
  const meta = statusMap[status]

  return (
    <div className={cn('inline-flex items-center gap-2', className)} {...props}>
      <div className="relative inline-flex">
        <Avatar fallback={fallback} src={src} alt={alt} size={size} />
        <span className={cn('absolute', dotPos[size])}>
          <StatusDot tone={meta.tone} pulse={meta.pulse} size="sm" />
        </span>
      </div>
      {showLabel && (
        <div className="flex flex-col leading-tight">
          <span className="text-sm text-vellum">{fallback}</span>
          <span className="text-xs text-vellum-faint">{meta.label}</span>
        </div>
      )}
    </div>
  )
}
