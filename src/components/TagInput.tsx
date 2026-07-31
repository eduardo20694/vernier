import { useId, useState, type KeyboardEvent } from 'react'
import { cn } from '../lib/cn'
import { Chip } from './Chip'

export interface TagInputProps {
  value?: string[]
  defaultValue?: string[]
  onChange?: (tags: string[]) => void
  label?: string
  hint?: string
  error?: string
  placeholder?: string
  disabled?: boolean
  id?: string
  name?: string
  className?: string
  maxTags?: number
}

function normalize(tag: string) {
  return tag.trim().replace(/^,+|,+$/g, '')
}

export function TagInput({
  value: valueProp,
  defaultValue = [],
  onChange,
  label,
  hint,
  error,
  placeholder = 'Digite e pressione Enter…',
  disabled,
  id,
  name,
  className,
  maxTags,
}: TagInputProps) {
  const autoId = useId()
  const inputId = id || name || autoId
  const [internal, setInternal] = useState<string[]>(defaultValue)
  const [draft, setDraft] = useState('')
  const tags = valueProp ?? internal

  function setTags(next: string[]) {
    if (valueProp === undefined) setInternal(next)
    onChange?.(next)
  }

  function addTag(raw: string) {
    const tag = normalize(raw)
    if (!tag || tags.includes(tag)) {
      setDraft('')
      return
    }
    if (maxTags != null && tags.length >= maxTags) {
      setDraft('')
      return
    }
    setTags([...tags, tag])
    setDraft('')
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag))
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(draft)
      return
    }
    if (e.key === 'Backspace' && !draft && tags.length > 0) {
      e.preventDefault()
      removeTag(tags[tags.length - 1]!)
    }
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-vellum-muted">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex min-h-10 flex-wrap items-center gap-1.5 rounded border bg-panel px-2 py-1.5',
          'transition-colors duration-150 focus-within:border-brass-dim',
          error ? 'border-rust' : 'border-line',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {tags.map((tag) => (
          <Chip
            key={tag}
            tone="brass"
            selected
            onRemove={disabled ? undefined : () => removeTag(tag)}
          >
            {tag}
          </Chip>
        ))}
        <input
          id={inputId}
          name={name}
          value={draft}
          disabled={disabled}
          placeholder={tags.length === 0 ? placeholder : undefined}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => {
            if (draft.trim()) addTag(draft)
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className="min-w-[8rem] flex-1 bg-transparent px-1.5 py-1 text-sm text-vellum outline-none placeholder:text-vellum-faint focus-ring rounded-sm"
        />
      </div>
      {error && (
        <span id={`${inputId}-error`} className="text-xs text-rust">
          {error}
        </span>
      )}
      {!error && hint && (
        <span id={`${inputId}-hint`} className="text-xs text-vellum-faint">
          {hint}
        </span>
      )}
    </div>
  )
}
