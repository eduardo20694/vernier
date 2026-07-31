import { createContext, useContext, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

const PageFullscreenContext = createContext(false)

export function usePageFullscreen() {
  return useContext(PageFullscreenContext)
}

export function PageFullscreenProvider({
  fullscreen,
  children,
}: {
  fullscreen: boolean
  children: ReactNode
}) {
  return (
    <PageFullscreenContext.Provider value={fullscreen}>
      {children}
    </PageFullscreenContext.Provider>
  )
}

export function PageFrame({
  children,
  className,
  fullscreen,
}: {
  children: ReactNode
  className?: string
  fullscreen?: boolean
}) {
  const isFullscreen = fullscreen ?? usePageFullscreen()

  return (
    <div
      className={cn(
        isFullscreen
          ? 'h-full min-h-0 w-full overflow-auto rounded-none border-0 bg-ink shadow-none max-h-none'
          : 'overflow-auto rounded-xl border border-line bg-ink shadow-plate max-h-[78vh]',
        className
      )}
    >
      {children}
    </div>
  )
}

export function AppPageShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const fullscreen = usePageFullscreen()

  return (
    <div
      className={cn(
        'w-full min-w-0',
        fullscreen ? 'min-h-screen h-screen' : 'h-[min(78vh,880px)]',
        className
      )}
    >
      {children}
    </div>
  )
}
