import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { cn } from '../lib/cn'

export const Menubar = MenubarPrimitive.Root
export const MenubarMenu = MenubarPrimitive.Menu
export const MenubarTrigger = MenubarPrimitive.Trigger
export const MenubarPortal = MenubarPrimitive.Portal
export const MenubarSub = MenubarPrimitive.Sub
export const MenubarRadioGroup = MenubarPrimitive.RadioGroup

export function MenubarContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        align="start"
        sideOffset={6}
        className={cn(
          'z-50 min-w-[180px] rounded-lg border border-line bg-panel2 p-1 shadow-plate',
          'animate-in fade-in-0 zoom-in-95',
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
}

export function MenubarItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item>) {
  return (
    <MenubarPrimitive.Item
      className={cn(
        'flex cursor-pointer items-center rounded-sm px-2.5 py-1.5 text-sm text-vellum-muted outline-none',
        'focus:bg-panel focus:text-vellum data-[disabled]:opacity-40',
        className
      )}
      {...props}
    />
  )
}

export function MenubarSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>) {
  return <MenubarPrimitive.Separator className={cn('my-1 h-px bg-line', className)} {...props} />
}

export function MenubarLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label>) {
  return (
    <MenubarPrimitive.Label
      className={cn('px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint', className)}
      {...props}
    />
  )
}

export function MenubarBar({ className, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      className={cn(
        'flex h-10 items-center gap-1 rounded-lg border border-line bg-panel px-1.5',
        className
      )}
      {...props}
    />
  )
}

export function MenubarTriggerBtn({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      className={cn(
        'rounded-md px-3 py-1.5 text-sm text-vellum-muted outline-none',
        'hover:bg-panel2 hover:text-vellum data-[state=open]:bg-panel2 data-[state=open]:text-brass-bright',
        className
      )}
      {...props}
    />
  )
}
