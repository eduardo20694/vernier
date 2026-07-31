import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../lib/cn'

type Tone = 'neutral' | 'brass' | 'verdigris' | 'rust'

export interface ToastOptions {
  title: string
  description?: string
  tone?: Tone
  /** Duração em ms. Passe 0 pra manter até o usuário fechar. */
  duration?: number
}

interface ToastItem extends ToastOptions {
  id: string
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const toneClasses: Record<Tone, string> = {
  neutral: 'border-line',
  brass: 'border-brass-dim',
  verdigris: 'border-verdigris-dim',
  rust: 'border-rust-dim',
}

const toneAccent: Record<Tone, string> = {
  neutral: 'text-vellum',
  brass: 'text-brass-bright',
  verdigris: 'text-verdigris',
  rust: 'text-rust',
}

let idCounter = 0

function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem
  onDismiss: (id: string) => void
}) {
  const tone = item.tone ?? 'neutral'

  useEffect(() => {
    if (item.duration === 0) return
    const ms = item.duration ?? 4200
    const t = window.setTimeout(() => onDismiss(item.id), ms)
    return () => window.clearTimeout(t)
  }, [item.duration, item.id, onDismiss])

  return (
    <div
      role="status"
      className={cn(
        'pointer-events-auto flex w-[320px] items-start gap-3 rounded-lg border bg-panel2 p-3.5 shadow-plate',
        'animate-in fade-in-0 slide-in-from-bottom-2',
        toneClasses[tone]
      )}
    >
      <div className="min-w-0 flex-1">
        <p className={cn('font-display text-sm font-medium', toneAccent[tone])}>{item.title}</p>
        {item.description && (
          <p className="mt-0.5 text-xs text-vellum-muted">{item.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(item.id)}
        className="rounded text-vellum-faint hover:text-vellum focus-ring"
        aria-label="Fechar notificação"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((options: ToastOptions) => {
    const id = `toast-${++idCounter}`
    setItems((prev) => [...prev, { ...options, id }])
    return id
  }, [])

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div
            className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-2"
            aria-live="polite"
          >
            {items.map((item) => (
              <ToastCard key={item.id} item={item} onDismiss={dismiss} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast precisa estar dentro de <ToastProvider>')
  }
  return ctx
}
