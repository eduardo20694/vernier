import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { cn } from '../lib/cn'

export const ContextMenu = ContextMenuPrimitive.Root
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger

export function ContextMenuContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={cn(
          'z-50 min-w-[180px] overflow-hidden rounded-lg border border-line bg-panel2 p-1 shadow-plate',
          'animate-in fade-in-0 zoom-in-95',
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

export function ContextMenuItem({
  className,
  inset,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean }) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        'flex cursor-pointer items-center rounded-sm px-2.5 py-1.5 text-sm text-vellum-muted outline-none',
        'focus:bg-panel focus:text-vellum data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
}

export function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>) {
  return <ContextMenuPrimitive.Separator className={cn('my-1 h-px bg-line', className)} {...props} />
}

export function ContextMenuLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>) {
  return (
    <ContextMenuPrimitive.Label
      className={cn('px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint', className)}
      {...props}
    />
  )
}
