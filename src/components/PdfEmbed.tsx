import { useState, type HTMLAttributes } from 'react'
import { ExternalLink, FileX2 } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'

export interface PdfEmbedProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  title?: string
  /** Altura do viewport do documento (px ou CSS). Padrão: 480px */
  height?: number | string
  downloadLabel?: string
  emptyMessage?: string
  errorMessage?: string
}

export function PdfEmbed({
  src,
  title = 'Documento',
  height = 480,
  downloadLabel = 'Baixar PDF',
  emptyMessage = 'Nenhum documento disponível.',
  errorMessage = 'Não foi possível carregar o documento.',
  className,
  ...props
}: PdfEmbedProps) {
  const [loadError, setLoadError] = useState(false)
  const heightStyle = typeof height === 'number' ? `${height}px` : height

  const showViewer = Boolean(src) && !loadError

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-line bg-panel shadow-plate',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line bg-gradient-to-b from-panel2 to-panel px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-rust/70" />
            <span className="h-2 w-2 rounded-full bg-brass/60" />
            <span className="h-2 w-2 rounded-full bg-verdigris/70" />
          </div>
          <p className="truncate font-mono text-[11px] text-vellum-muted">{title}</p>
        </div>
        {src && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0 text-xs"
            onClick={() => window.open(src, '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            Abrir em nova aba
          </Button>
        )}
      </div>

      {!src && (
        <div
          className="flex flex-col items-center justify-center gap-3 bg-ink/40 px-6 text-center"
          style={{ height: heightStyle }}
        >
          <FileX2 className="h-8 w-8 text-vellum-faint" aria-hidden />
          <p className="text-sm text-vellum-muted">{emptyMessage}</p>
        </div>
      )}

      {src && loadError && (
        <div
          className="flex flex-col items-center justify-center gap-4 bg-ink/40 px-6 text-center"
          style={{ height: heightStyle }}
        >
          <FileX2 className="h-8 w-8 text-rust/80" aria-hidden />
          <p className="text-sm text-vellum-muted">{errorMessage}</p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => window.open(src, '_blank', 'noopener,noreferrer')}
          >
            {downloadLabel}
          </Button>
        </div>
      )}

      {showViewer && (
        <div className="bg-ink" style={{ height: heightStyle }}>
          <object
            data={src}
            type="application/pdf"
            title={title}
            className="h-full w-full"
            onError={() => setLoadError(true)}
          >
            <iframe
              src={src}
              title={title}
              className="h-full w-full border-0"
              onError={() => setLoadError(true)}
            />
          </object>
        </div>
      )}
    </div>
  )
}
