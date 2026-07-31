import { useCallback, useState, type DragEvent, type ReactNode } from 'react'
import { Upload } from 'lucide-react'
import { cn } from '../lib/cn'

export interface FileDropzoneProps {
  onFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
  label?: string
  hint?: string
  className?: string
  icon?: ReactNode
}

export function FileDropzone({
  onFiles,
  accept,
  multiple = true,
  label = 'Arraste arquivos aqui',
  hint = 'ou clique para selecionar',
  className,
  icon,
}: FileDropzoneProps) {
  const [over, setOver] = useState(false)

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setOver(false)
      const list = Array.from(e.dataTransfer.files)
      if (list.length) onFiles(list)
    },
    [onFiles]
  )

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-10 text-center transition-all duration-200',
        over
          ? 'border-brass bg-brass/10 shadow-[inset_0_0_0_1px_rgb(var(--brass)/0.25)]'
          : 'border-line bg-panel/40 hover:border-brass-dim/60 hover:bg-panel2/40',
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-panel2 text-brass">
        {icon ?? <Upload className="h-4 w-4" />}
      </div>
      <p className="font-display text-base text-vellum">{label}</p>
      <p className="text-xs text-vellum-faint">{hint}</p>
      <input
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          const list = Array.from(e.target.files ?? [])
          if (list.length) onFiles(list)
        }}
      />
    </label>
  )
}
