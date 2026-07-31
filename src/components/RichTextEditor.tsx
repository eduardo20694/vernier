import { useEffect, useRef, useState } from 'react'
import { Bold, Heading2, Italic, Link2, List } from 'lucide-react'
import { cn } from '../lib/cn'
import { Toggle } from './ToggleGroup'

export interface RichTextEditorProps {
  value?: string
  defaultValue?: string
  onChange?: (html: string) => void
  placeholder?: string
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  className?: string
  minHeight?: string
}

function exec(cmd: string, value?: string) {
  document.execCommand(cmd, false, value)
}

export function RichTextEditor({
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Escreva…',
  label,
  hint,
  error,
  disabled,
  className,
  minHeight = '160px',
}: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [focused, setFocused] = useState(false)
  const [empty, setEmpty] = useState(!(value ?? defaultValue))

  useEffect(() => {
    if (!ref.current) return
    if (value !== undefined && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value
      setEmpty(!value || value === '<br>')
    }
  }, [value])

  useEffect(() => {
    if (ref.current && value === undefined && defaultValue) {
      ref.current.innerHTML = defaultValue
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function emit() {
    const html = ref.current?.innerHTML ?? ''
    setEmpty(!html || html === '<br>')
    onChange?.(html)
  }

  function run(cmd: string, arg?: string) {
    if (disabled) return
    ref.current?.focus()
    if (cmd === 'createLink') {
      const url = window.prompt('URL do link')
      if (!url) return
      exec(cmd, url)
    } else {
      exec(cmd, arg)
    }
    emit()
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <span className="text-sm font-medium text-vellum-muted">{label}</span>}
      <div
        className={cn(
          'overflow-hidden rounded border bg-panel',
          error ? 'border-rust' : focused ? 'border-brass-dim' : 'border-line',
          disabled && 'opacity-50'
        )}
      >
        <div className="flex flex-wrap items-center gap-1 border-b border-line bg-panel2/60 p-1.5">
          <Toggle
            pressed={false}
            disabled={disabled}
            onPressedChange={() => run('bold')}
            aria-label="Negrito"
            className="h-8 w-8 px-0"
          >
            <Bold className="h-3.5 w-3.5" />
          </Toggle>
          <Toggle
            pressed={false}
            disabled={disabled}
            onPressedChange={() => run('italic')}
            aria-label="Itálico"
            className="h-8 w-8 px-0"
          >
            <Italic className="h-3.5 w-3.5" />
          </Toggle>
          <Toggle
            pressed={false}
            disabled={disabled}
            onPressedChange={() => run('formatBlock', 'h2')}
            aria-label="Título"
            className="h-8 w-8 px-0"
          >
            <Heading2 className="h-3.5 w-3.5" />
          </Toggle>
          <Toggle
            pressed={false}
            disabled={disabled}
            onPressedChange={() => run('insertUnorderedList')}
            aria-label="Lista"
            className="h-8 w-8 px-0"
          >
            <List className="h-3.5 w-3.5" />
          </Toggle>
          <Toggle
            pressed={false}
            disabled={disabled}
            onPressedChange={() => run('createLink')}
            aria-label="Link"
            className="h-8 w-8 px-0"
          >
            <Link2 className="h-3.5 w-3.5" />
          </Toggle>
        </div>
        <div className="relative">
          {empty && !focused && (
            <span className="pointer-events-none absolute left-3 top-3 text-sm text-vellum-faint">
              {placeholder}
            </span>
          )}
          <div
            ref={ref}
            contentEditable={!disabled}
            role="textbox"
            aria-multiline
            aria-invalid={!!error}
            aria-label={label ?? 'Editor de texto'}
            onInput={emit}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              'px-3 py-3 text-sm text-vellum outline-none focus-ring rounded-b',
              '[&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-vellum',
              '[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5',
              '[&_a]:text-brass-bright [&_a]:underline'
            )}
            style={{ minHeight }}
            suppressContentEditableWarning
          />
        </div>
      </div>
      {error && <span className="text-xs text-rust">{error}</span>}
      {!error && hint && <span className="text-xs text-vellum-faint">{hint}</span>}
    </div>
  )
}
