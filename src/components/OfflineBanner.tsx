import { useEffect, useState } from 'react'
import { WifiOff } from 'lucide-react'
import { cn } from '../lib/cn'

export interface OfflineBannerProps {
  /** Force offline state (for demos); otherwise listens to navigator.onLine */
  offline?: boolean
  message?: string
  className?: string
}

export function OfflineBanner({
  offline: offlineProp,
  message = 'Você está offline',
  className,
}: OfflineBannerProps) {
  const [online, setOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine
  )

  useEffect(() => {
    if (offlineProp !== undefined) return
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    setOnline(navigator.onLine)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [offlineProp])

  const isOffline = offlineProp ?? !online
  if (!isOffline) return null

  return (
    <div
      role="status"
      className={cn(
        'flex items-center justify-center gap-2 border-b border-rust-dim/50',
        'bg-gradient-to-r from-rust/20 via-rust/10 to-rust/20 px-4 py-2 text-sm text-rust',
        className
      )}
    >
      <WifiOff className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span>{message}</span>
    </div>
  )
}
