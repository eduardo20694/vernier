import * as TogglePrimitive from '@radix-ui/react-toggle'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '../lib/cn'

export function Toggle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>) {
  return (
    <TogglePrimitive.Root
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-md border border-line bg-panel2 px-3 text-sm text-vellum-muted',
        'transition-colors hover:text-vellum focus-ring',
        'data-[state=on]:border-brass-dim data-[state=on]:bg-brass/15 data-[state=on]:text-brass-bright',
        className
      )}
      {...props}
    />
  )
}

export const ToggleGroup = ToggleGroupPrimitive.Root

export function ToggleGroupItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        'inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-transparent px-3 text-sm text-vellum-muted',
        'transition-colors hover:text-vellum focus-ring',
        'data-[state=on]:border-brass-dim/60 data-[state=on]:bg-brass/15 data-[state=on]:text-brass-bright',
        className
      )}
      {...props}
    />
  )
}

export function ToggleGroupBar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn('inline-flex gap-1 rounded-lg border border-line bg-panel p-1', className)}
      {...props}
    />
  )
}
