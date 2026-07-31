import { useState, type FormEvent, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Input } from './Input'

export interface NewsletterProps extends Omit<HTMLAttributes<HTMLElement>, 'onSubmit'> {
  title?: string
  description?: string
  placeholder?: string
  submitLabel?: string
  onSubmit?: (email: string) => void | Promise<void>
  successMessage?: string
  errorMessage?: string
  success?: boolean
  error?: boolean | string
}

export function Newsletter({
  title = 'Receba novidades',
  description = 'Atualizações da bancada — sem spam, só o essencial.',
  placeholder = 'seu@email.com',
  submitLabel = 'Inscrever',
  onSubmit,
  successMessage = 'Inscrição confirmada. Obrigado!',
  errorMessage = 'Não foi possível inscrever. Tente de novo.',
  success,
  error,
  className,
  ...props
}: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [localSuccess, setLocalSuccess] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const isSuccess = success ?? localSuccess
  const errorText =
    typeof error === 'string' ? error : error ? errorMessage : localError

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLocalError(null)
    if (!email.trim()) {
      setLocalError('Informe um e-mail válido.')
      return
    }
    setLoading(true)
    try {
      await onSubmit?.(email.trim())
      setLocalSuccess(true)
    } catch {
      setLocalError(errorMessage)
      setLocalSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  let status: ReactNode = null
  if (isSuccess) {
    status = <p className="mt-3 text-sm text-verdigris">{successMessage}</p>
  } else if (errorText) {
    status = <p className="mt-3 text-sm text-rust">{errorText}</p>
  }

  return (
    <section
      className={cn(
        'rounded-xl border border-line bg-panel p-6 shadow-plate sm:p-8',
        className
      )}
      {...props}
    >
      <h2 className="font-display text-h3 text-vellum">{title}</h2>
      {description && <p className="mt-2 text-sm text-vellum-muted">{description}</p>}
      {!isSuccess && (
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
          <Button type="submit" variant="gradient" loading={loading} className="sm:mt-0">
            {submitLabel}
          </Button>
        </form>
      )}
      {status}
    </section>
  )
}
