import { useCallback, useEffect, useRef } from 'react'
import { LogOut } from 'lucide-react'
import { Button } from '../../components/Button'
import { PageFrame, PageFullscreenProvider } from './PageFrame'
import { PagePreview } from './pageComponents'

export function FullscreenPreview({
  pageId,
  onClose,
}: {
  pageId: string
  onClose: () => void
}) {
  const exitRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const handleClose = useCallback(() => {
    onClose()
    previousFocusRef.current?.focus()
  }, [onClose])

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const raf = requestAnimationFrame(() => exitRef.current?.focus())

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [handleClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-ink"
      role="dialog"
      aria-modal="true"
      aria-label="Visualização em tela cheia"
    >
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[101] flex justify-end p-4">
        <Button
          ref={exitRef}
          type="button"
          variant="secondary"
          size="sm"
          className="pointer-events-auto border-line bg-panel/95 backdrop-blur-sm"
          onClick={handleClose}
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Sair
        </Button>
      </div>

      <PageFullscreenProvider fullscreen>
        <PageFrame fullscreen className="flex-1">
          <PagePreview pageId={pageId} />
        </PageFrame>
      </PageFullscreenProvider>
    </div>
  )
}
