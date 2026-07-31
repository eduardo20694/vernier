import { File, X } from 'lucide-react'
import { cn } from '../lib/cn'
import { IconButton } from './IconButton'
import { Progress } from './Progress'

export interface FileListItem {
  id: string
  name: string
  size?: number | string
  progress?: number
  status?: 'uploading' | 'done' | 'error'
}

export interface FileListProps {
  files: FileListItem[]
  onRemove?: (id: string) => void
  className?: string
}

function formatSize(size?: number | string) {
  if (size == null) return null
  if (typeof size === 'string') return size
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export function FileList({ files, onRemove, className }: FileListProps) {
  if (!files.length) return null

  return (
    <ul className={cn('space-y-2', className)}>
      {files.map((f) => {
        const sizeLabel = formatSize(f.size)
        const uploading = f.status === 'uploading' || (f.progress != null && f.progress < 100)
        return (
          <li
            key={f.id}
            className="rounded-lg border border-line bg-gradient-to-b from-panel2 to-panel px-3 py-2.5"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded border border-line bg-panel text-brass-dim">
                <File className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-vellum">{f.name}</p>
                    <div className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-vellum-faint">
                      {sizeLabel && <span>{sizeLabel}</span>}
                      {f.status === 'error' && <span className="text-rust">Erro</span>}
                      {f.status === 'done' && <span className="text-verdigris">Pronto</span>}
                    </div>
                  </div>
                  {onRemove && (
                    <IconButton
                      label="Remover"
                      size="sm"
                      tone="neutral"
                      className="h-7 w-7 shrink-0"
                      onClick={() => onRemove(f.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </IconButton>
                  )}
                </div>
                {uploading && f.progress != null && (
                  <Progress
                    value={f.progress}
                    showValue={false}
                    label={undefined}
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
