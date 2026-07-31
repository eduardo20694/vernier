import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../lib/cn'
import { IconButton } from './IconButton'

export function CopyButton({
  value,
  label = 'Copiar',
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  return (
    <IconButton
      label={copied ? 'Copiado' : label}
      tone={copied ? 'verdigris' : 'neutral'}
      size="sm"
      className={cn(className)}
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
      }}
    >
      {copied ? <Check /> : <Copy />}
    </IconButton>
  )
}
