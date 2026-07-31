import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/cn'

export const NavigationMenu = NavigationMenuPrimitive.Root
export const NavigationMenuList = NavigationMenuPrimitive.List
export const NavigationMenuItem = NavigationMenuPrimitive.Item
export const NavigationMenuTrigger = NavigationMenuPrimitive.Trigger
export const NavigationMenuContent = NavigationMenuPrimitive.Content
export const NavigationMenuLink = NavigationMenuPrimitive.Link
export const NavigationMenuIndicator = NavigationMenuPrimitive.Indicator
export const NavigationMenuViewport = NavigationMenuPrimitive.Viewport

export function NavigationMenuBar({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      className={cn('relative z-40 flex max-w-max flex-1 items-center justify-center', className)}
      {...props}
    >
      {children}
      <div className="absolute left-0 top-full flex w-full justify-center">
        <NavigationMenuPrimitive.Viewport
          className={cn(
            'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)]',
            'w-full overflow-hidden rounded-xl border border-line bg-panel2 shadow-plate',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90',
            'md:w-[var(--radix-navigation-menu-viewport-width)]'
          )}
        />
      </div>
    </NavigationMenuPrimitive.Root>
  )
}

export function NavigationMenuListBar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      className={cn(
        'group flex flex-1 list-none items-center justify-center gap-1 rounded-lg border border-line bg-panel px-1.5 py-1',
        className
      )}
      {...props}
    />
  )
}

export function NavigationMenuTriggerBtn({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(
        'group inline-flex h-9 items-center justify-center gap-1 rounded-md px-3 text-sm text-vellum-muted outline-none',
        'transition-colors hover:bg-panel2 hover:text-vellum',
        'focus-ring data-[state=open]:bg-panel2 data-[state=open]:text-brass-bright',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className="relative top-px h-3.5 w-3.5 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

export function NavigationMenuContentPanel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        'left-0 top-0 w-full md:absolute md:w-auto',
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out',
        'data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out',
        'data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52',
        'data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52',
        className
      )}
      {...props}
    />
  )
}

export function NavigationMenuLinkItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      className={cn(
        'block select-none rounded-lg border border-transparent p-3 outline-none transition-colors',
        'hover:border-brass-dim/40 hover:bg-gradient-to-br hover:from-brass/10 hover:via-panel hover:to-panel',
        'focus:border-brass-dim/50 focus:bg-brass/10',
        '[&_p]:text-sm [&_p]:text-vellum-muted',
        '[&_h3]:font-display [&_h3]:text-sm [&_h3]:text-vellum',
        className
      )}
      {...props}
    />
  )
}
