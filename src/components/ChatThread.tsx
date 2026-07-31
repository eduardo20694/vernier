import { useState, type FormEvent, type ReactNode } from 'react'
import { Send } from 'lucide-react'
import { cn } from '../lib/cn'
import { Avatar } from './Avatar'
import { Button } from './Button'

export interface ChatMessage {
  id: string
  body: string
  from: 'me' | 'them'
  time?: string
  author?: string
  avatarSrc?: string
}

export interface ChatThreadProps {
  messages: ChatMessage[]
  onSend?: (body: string) => void
  placeholder?: string
  className?: string
  header?: ReactNode
  disabled?: boolean
}

export function ChatThread({
  messages,
  onSend,
  placeholder = 'Escreva uma mensagem…',
  className,
  header,
  disabled,
}: ChatThreadProps) {
  const [draft, setDraft] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    const body = draft.trim()
    if (!body) return
    onSend?.(body)
    setDraft('')
  }

  return (
    <div
      className={cn(
        'flex h-full min-h-[320px] flex-col overflow-hidden rounded-xl border border-line bg-panel',
        className
      )}
    >
      {header && (
        <div className="border-b border-line px-4 py-3 text-sm text-vellum">{header}</div>
      )}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg) => {
          const mine = msg.from === 'me'
          return (
            <div
              key={msg.id}
              className={cn('flex items-end gap-2', mine ? 'flex-row-reverse' : 'flex-row')}
            >
              {!mine && (
                <Avatar
                  size="sm"
                  fallback={msg.author ?? 'U'}
                  src={msg.avatarSrc}
                  ring={false}
                  tone="neutral"
                />
              )}
              <div
                className={cn(
                  'max-w-[75%] rounded-2xl px-3.5 py-2 text-sm',
                  mine
                    ? 'rounded-br-md bg-gradient-to-b from-brass-bright via-brass to-brass-dim text-ink'
                    : 'rounded-bl-md border border-line bg-panel2 text-vellum'
                )}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.body}</p>
                {msg.time && (
                  <p
                    className={cn(
                      'mt-1 font-mono text-[10px]',
                      mine ? 'text-ink/60' : 'text-vellum-faint'
                    )}
                  >
                    {msg.time}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <form
        onSubmit={submit}
        className="flex items-center gap-2 border-t border-line bg-panel2/60 p-3"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="h-10 flex-1 rounded border border-line bg-panel px-3 text-sm text-vellum outline-none placeholder:text-vellum-faint focus:border-brass-dim focus-ring disabled:opacity-50"
        />
        <Button type="submit" size="icon" variant="gradient" disabled={disabled || !draft.trim()} aria-label="Enviar">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
