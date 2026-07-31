import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '../lib/cn'

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2.5">
      <CheckboxPrimitive.Root
        id={id}
        className={cn(
          'h-4 w-4 rounded-sm border border-line bg-panel',
          'data-[state=checked]:bg-brass data-[state=checked]:border-brass',
          'focus-ring transition-colors duration-150',
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-ink">
          <Check className="h-3 w-3" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label htmlFor={id} className="text-sm text-vellum-muted">
          {label}
        </label>
      )}
    </div>
  )
}
