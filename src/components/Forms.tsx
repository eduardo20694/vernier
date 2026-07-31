import type { FormEvent, ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Input } from './Input'
import { PasswordInput } from './PasswordInput'
import { Textarea } from './Textarea'
import { Checkbox } from './Checkbox'
import { Switch } from './Switch'
import { Field, Fieldset } from './Field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select'

export function FormCard({
  title,
  description,
  children,
  footer,
  className,
}: {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'w-full max-w-md overflow-hidden rounded-xl border border-line bg-panel shadow-plate',
        className
      )}
    >
      <div className="border-b border-line px-5 py-4">
        <h3 className="font-display text-lg text-vellum">{title}</h3>
        {description && <p className="mt-1 text-sm text-vellum-muted">{description}</p>}
      </div>
      <div className="space-y-4 p-5">{children}</div>
      {footer && <div className="border-t border-line bg-panel2/40 px-5 py-4">{footer}</div>}
    </div>
  )
}

export function LoginForm({
  onSubmit,
  className,
}: {
  onSubmit?: (data: { email: string; password: string; remember: boolean }) => void
  className?: string
}) {
  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onSubmit?.({
      email: String(fd.get('email') ?? ''),
      password: String(fd.get('password') ?? ''),
      remember: fd.get('remember') === 'on',
    })
  }

  return (
    <FormCard
      className={className}
      title="Entrar na bancada"
      description="Acesse o painel com suas credenciais."
      footer={
        <Button type="submit" form="vernier-login" variant="gradient" className="w-full">
          Entrar
        </Button>
      }
    >
      <form id="vernier-login" className="space-y-4" onSubmit={handle}>
        <Input name="email" type="email" label="Email" placeholder="voce@empresa.com" required />
        <PasswordInput name="password" label="Senha" required />
        <Checkbox name="remember" id="remember" label="Manter conectado" />
      </form>
    </FormCard>
  )
}

export function SettingsForm({
  onSubmit,
  className,
}: {
  onSubmit?: () => void
  className?: string
}) {
  return (
    <FormCard
      className={cn('max-w-lg', className)}
      title="Preferências do cluster"
      description="Ajustes que valem pra todos os nós deste ambiente."
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost">
            Cancelar
          </Button>
          <Button type="submit" form="vernier-settings" variant="gradient" onClick={onSubmit}>
            Salvar alterações
          </Button>
        </div>
      }
    >
      <form id="vernier-settings" className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <Fieldset legend="identidade">
          <Field label="Nome do cluster">
            <Input defaultValue="produção-sa" />
          </Field>
          <Field label="Região">
            <Select defaultValue="sa-east-1">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sa-east-1">São Paulo</SelectItem>
                <SelectItem value="us-east-1">N. Virginia</SelectItem>
                <SelectItem value="eu-west-1">Irlanda</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Fieldset>

        <Fieldset legend="alerta">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-vellum">Notificações Slack</p>
              <p className="text-xs text-vellum-faint">Incidentes críticos em tempo real</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Field label="Webhook" hint="URL HTTPS">
            <Input placeholder="https://hooks.slack.com/…" />
          </Field>
        </Fieldset>

        <Field label="Notas internas">
          <Textarea placeholder="Runbook, contatos on-call…" rows={3} />
        </Field>
      </form>
    </FormCard>
  )
}
