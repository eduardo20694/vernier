import { useState } from 'react'
import { Check, Link2, Linkedin, Twitter } from 'lucide-react'
import { cn } from '../lib/cn'
import { IconButton } from './IconButton'

export interface SocialShareProps {
  url: string
  title?: string
  className?: string
  showCopy?: boolean
  showTwitter?: boolean
  showLinkedIn?: boolean
}

export function SocialShare({
  url,
  title = '',
  className,
  showCopy = true,
  showTwitter = true,
  showLinkedIn = true,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      {showCopy && (
        <IconButton
          label={copied ? 'Link copiado' : 'Copiar link'}
          tone={copied ? 'verdigris' : 'neutral'}
          size="sm"
          onClick={async () => {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
          }}
        >
          {copied ? <Check /> : <Link2 />}
        </IconButton>
      )}
      {showTwitter && (
        <IconButton
          label="Compartilhar no X"
          tone="neutral"
          size="sm"
          onClick={() => {
            window.open(
              `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
              '_blank',
              'noopener,noreferrer'
            )
          }}
        >
          <Twitter />
        </IconButton>
      )}
      {showLinkedIn && (
        <IconButton
          label="Compartilhar no LinkedIn"
          tone="neutral"
          size="sm"
          onClick={() => {
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
              '_blank',
              'noopener,noreferrer'
            )
          }}
        >
          <Linkedin />
        </IconButton>
      )}
    </div>
  )
}
