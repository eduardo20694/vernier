import { useCallback, useEffect, useState, type DragEvent } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { cn } from '../lib/cn'
import { IconButton } from './IconButton'

export interface ImageUploadItem {
  id: string
  file?: File
  url: string
  name?: string
}

export interface ImageUploadProps {
  value?: ImageUploadItem[]
  onChange?: (items: ImageUploadItem[]) => void
  accept?: string
  multiple?: boolean
  maxFiles?: number
  label?: string
  hint?: string
  className?: string
}

function makeId() {
  return `img-${Math.random().toString(36).slice(2, 9)}`
}

export function ImageUpload({
  value,
  onChange,
  accept = 'image/*',
  multiple = true,
  maxFiles = 8,
  label = 'Arraste imagens aqui',
  hint = 'ou clique para selecionar',
  className,
}: ImageUploadProps) {
  const [internal, setInternal] = useState<ImageUploadItem[]>([])
  const [over, setOver] = useState(false)
  const items = value ?? internal

  const setItems = useCallback(
    (next: ImageUploadItem[]) => {
      if (value === undefined) setInternal(next)
      onChange?.(next)
    },
    [onChange, value]
  )

  useEffect(() => {
    return () => {
      // Revoke object URLs created by this instance when uncontrolled
      if (value === undefined) {
        internal.forEach((i) => {
          if (i.file && i.url.startsWith('blob:')) URL.revokeObjectURL(i.url)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cleanup on unmount only
  }, [])

  const addFiles = useCallback(
    (files: File[]) => {
      const images = files.filter((f) => f.type.startsWith('image/'))
      const room = Math.max(0, maxFiles - items.length)
      const slice = images.slice(0, room)
      if (!slice.length) return
      const next = [
        ...items,
        ...slice.map((file) => ({
          id: makeId(),
          file,
          url: URL.createObjectURL(file),
          name: file.name,
        })),
      ]
      setItems(next)
    },
    [items, maxFiles, setItems]
  )

  const remove = (id: string) => {
    const target = items.find((i) => i.id === id)
    if (target?.file && target.url.startsWith('blob:')) URL.revokeObjectURL(target.url)
    setItems(items.filter((i) => i.id !== id))
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setOver(false)
    addFiles(Array.from(e.dataTransfer.files))
  }

  return (
    <div className={cn('space-y-3', className)}>
      <label
        onDragOver={(e) => {
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={handleDrop}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-8 text-center transition-all duration-200',
          over
            ? 'border-brass bg-brass/10'
            : 'border-line bg-panel/40 hover:border-brass-dim/60 hover:bg-panel2/40'
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-panel2 text-brass">
          <ImagePlus className="h-4 w-4" />
        </div>
        <p className="font-display text-base text-vellum">{label}</p>
        <p className="text-xs text-vellum-faint">{hint}</p>
        <input
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            addFiles(Array.from(e.target.files ?? []))
            e.target.value = ''
          }}
        />
      </label>
      {items.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="group relative h-20 w-20 overflow-hidden rounded-lg border border-line bg-panel2"
            >
              <img
                src={item.url}
                alt={item.name ?? 'Preview'}
                className="h-full w-full object-cover"
              />
              <IconButton
                label="Remover"
                size="sm"
                tone="rust"
                className="absolute right-1 top-1 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => remove(item.id)}
              >
                <X className="h-3.5 w-3.5" />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
