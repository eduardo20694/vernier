import * as RadioPrimitive from '@radix-ui/react-radio-group'
import { cn } from '../lib/cn'

export const RadioGroup = RadioPrimitive.Root

export function RadioGroupItem({
  className,
  label,
  id,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioPrimitive.Item> & { label?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <RadioPrimitive.Item
        id={id}
        className={cn(
          'h-4 w-4 rounded-full border border-line bg-panel',
          'data-[state=checked]:border-brass data-[state=checked]:bg-brass/15',
          'focus-ring transition-colors duration-150',
          className
        )}
        {...props}
      >
        <RadioPrimitive.Indicator className="flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-brass-bright shadow-[0_0_8px_rgb(var(--brass)/0.6)]" />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Item>
      {label && (
        <label htmlFor={id} className="text-sm text-vellum-muted">
          {label}
        </label>
      )}
    </div>
  )
}
