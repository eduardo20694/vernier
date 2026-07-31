import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Input } from './Input'
import { Textarea } from './Textarea'

export interface ContactDetails {
  email?: string
  phone?: string
  address?: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactSectionProps {
  title?: string
  description?: string
  contact?: ContactDetails
  submitLabel?: string
  mapLabel?: string
  onSubmit?: (data: ContactFormData) => void | Promise<void>
  className?: string
}

function MapPlaceholder({ label }: { label: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-xl border border-line bg-panel2/60',
        'min-h-[180px] md:min-h-[220px]'
      )}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--line)/0.35) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line)/0.35) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-16 w-16">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-brass-dim/50" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-brass-dim/50" />
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brass bg-brass/20" />
        </div>
      </div>
      <p className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.16em] text-vellum-faint">
        {label}
      </p>
    </div>
  )
}

export function ContactSection({
  title = 'Fale conosco',
  description = 'Envie uma mensagem — respondemos em até um dia útil.',
  contact = {
    email: 'contato@vernier.dev',
    phone: '+55 11 4000-0000',
    address: 'Av. Paulista, 1000 — São Paulo, SP',
  },
  submitLabel = 'Enviar mensagem',
  mapLabel = 'Mapa',
  onSubmit,
  className,
}: ContactSectionProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Preencha nome, e-mail e mensagem.')
      return
    }

    setLoading(true)
    try {
      await onSubmit?.({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      })
      setDone(true)
    } catch {
      setError('Não foi possível enviar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={cn('mx-auto w-full max-w-6xl', className)}>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="font-display text-3xl text-vellum">{title}</h2>
          {description && (
            <p className="mt-2 max-w-md text-sm text-vellum-muted">{description}</p>
          )}
          <ul className="mt-8 space-y-4">
            {contact.email && (
              <li className="flex items-start gap-3 text-sm text-vellum-muted">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={2} />
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-brass-bright focus-ring rounded-sm"
                >
                  {contact.email}
                </a>
              </li>
            )}
            {contact.phone && (
              <li className="flex items-start gap-3 text-sm text-vellum-muted">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={2} />
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-brass-bright focus-ring rounded-sm"
                >
                  {contact.phone}
                </a>
              </li>
            )}
            {contact.address && (
              <li className="flex items-start gap-3 text-sm text-vellum-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={2} />
                <span>{contact.address}</span>
              </li>
            )}
          </ul>
          <div className="mt-8 lg:hidden">
            <MapPlaceholder label={mapLabel} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {done ? (
            <div className="rounded-xl border border-line bg-panel p-6 shadow-plate">
              <p className="text-sm text-verdigris">
                Mensagem enviada. Entraremos em contato em breve.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-line bg-panel p-6 shadow-plate sm:p-8"
            >
              <Input
                label="Nome"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
              <div className="mt-4">
                <Input
                  label="E-mail"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="mt-4">
                <Textarea
                  label="Mensagem"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" variant="gradient" className="mt-5" loading={loading}>
                {submitLabel}
              </Button>
              {error && <p className="mt-3 text-sm text-rust">{error}</p>}
            </form>
          )}
          <div className="hidden lg:block">
            <MapPlaceholder label={mapLabel} />
          </div>
        </div>
      </div>
    </section>
  )
}
