import { useCallback, useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { SensitiveData } from './SensitiveData'

export interface ClientCopyExtra {
  label: string
  value: string
}

export interface ClientCopyBlockProps {
  nome: string
  cpf: string
  telefone: string
  margem: string | number
  extras?: ClientCopyExtra[]
  className?: string
  /** When true, CPF and telefone use SensitiveData before copy */
  maskSensitive?: boolean
  copyFormat?: 'multiline' | 'tsv'
  copyLabel?: string
}

function formatMargem(margem: string | number): string {
  if (typeof margem === 'number') {
    return margem.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
  return margem
}

function buildCopyText(
  props: ClientCopyBlockProps,
  margemFormatted: string
): string {
  const lines = [
    `Nome: ${props.nome}`,
    `CPF: ${props.cpf}`,
    `Telefone: ${props.telefone}`,
    `Margem: ${margemFormatted}`,
    ...(props.extras?.map((e) => `${e.label}: ${e.value}`) ?? []),
  ]

  if (props.copyFormat === 'tsv') {
    return lines.map((l) => l.split(': ').slice(1).join(': ')).join('\t')
  }
  return lines.join('\n')
}

function CopyRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line/60 py-2 last:border-b-0">
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-vellum-faint">
        {label}
      </span>
      <span className="min-w-0 truncate text-right text-sm text-vellum">{children}</span>
    </div>
  )
}

export function ClientCopyBlock({
  nome,
  cpf,
  telefone,
  margem,
  extras,
  className,
  maskSensitive = false,
  copyFormat = 'multiline',
  copyLabel = 'Copiar dados',
}: ClientCopyBlockProps) {
  const [copied, setCopied] = useState(false)
  const margemFormatted = formatMargem(margem)

  const handleCopy = useCallback(async () => {
    const text = buildCopyText(
      { nome, cpf, telefone, margem, extras, copyFormat },
      margemFormatted
    )
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }, [nome, cpf, telefone, margem, extras, copyFormat, margemFormatted])

  return (
    <div
      className={cn(
        'rounded-lg border border-line bg-gradient-to-b from-panel2 via-panel to-ink',
        'shadow-[inset_0_1px_0_rgb(var(--brass)/0.08)]',
        className
      )}
    >
      <div className="border-b border-line px-4 py-2.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass-dim">
          Dados do cliente
        </p>
      </div>

      <div className="px-4 py-1">
        <CopyRow label="Nome">{nome}</CopyRow>

        {maskSensitive ? (
          <div className="py-2">
            <SensitiveData label="CPF" value={cpf} maskPattern="cpf" />
          </div>
        ) : (
          <CopyRow label="CPF">
            <span className="font-mono text-brass-bright">{cpf}</span>
          </CopyRow>
        )}

        {maskSensitive ? (
          <div className="py-2">
            <SensitiveData label="Telefone" value={telefone} maskPattern="phone" />
          </div>
        ) : (
          <CopyRow label="Telefone">
            <span className="font-mono">{telefone}</span>
          </CopyRow>
        )}

        <CopyRow label="Margem">
          <span className="font-mono tabular-nums text-verdigris">{margemFormatted}</span>
        </CopyRow>

        {extras?.map((extra) => (
          <CopyRow key={extra.label} label={extra.label}>
            {extra.value}
          </CopyRow>
        ))}
      </div>

      <div className="border-t border-line px-4 py-3">
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              {copyLabel}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
