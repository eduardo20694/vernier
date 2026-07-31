import { useState, type FormEvent } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Input } from './Input'

export interface WaitlistFormProps {
  title?: string
  description?: string
  placeholder?: string
  submitLabel?: string
  /** Social proof count */
  count?: number
  countLabel?: string
  onSubmit?: (email: string) => void | Promise<void>
  className?: string
}

export function WaitlistForm({
  title = 'Entre na lista',
  description = 'Seja avisado no lançamento — sem spam.',
  placeholder = 'seu@email.com',
  submitLabel = 'Quero acesso',
  count,
  countLabel = 'já na fila',
  onSubmit,
  className,
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email.trim()) {
      setError('Informe um e-mail válido.')
      return
    }
    setLoading(true)
    try {
      await onSubmit?.(email.trim())
      setDone(true)
    } catch {
      setError('Não foi possível entrar na lista. Tente de novo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-panel p-6 shadow-plate sm:p-8',
        className
      )}
    >
      <h2 className="font-display text-h3 text-vellum">{title}</h2>
      {description && <p className="mt-2 text-sm text-vellum-muted">{description}</p>}
      {typeof count === 'number' && (
        <p className="mt-3 font-mono text-xs tabular-nums text-brass-dim">
          <span className="text-brass-bright">{count.toLocaleString('pt-BR')}</span> {countLabel}
        </p>
      )}
      {done ? (
        <p className="mt-5 text-sm text-verdigris">Você está na lista. Obrigado!</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start"
        >
          <div className="min-w-0 flex-1">
            <Input
              type="email"
              name="email"
              autoComplete="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="E-mail"
              disabled={loading}
            />
          </div>
          <Button type="submit" variant="gradient" loading={loading}>
            {submitLabel}
          </Button>
        </form>
      )}
      {error && <p className="mt-3 text-sm text-rust">{error}</p>}
    </div>
  )
}
