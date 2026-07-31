import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '../lib/cn'

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string
}

export function Switch({ className, label, id, ...props }: SwitchProps) {
  return (
    <div className="flex items-center gap-2.5">
      <SwitchPrimitive.Root
        id={id}
        className={cn(
          'relative h-5 w-9 rounded-full bg-panel2 border border-line',
          'data-[state=checked]:bg-brass-dim data-[state=checked]:border-brass',
          'transition-colors duration-150 focus-ring',
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'block h-3.5 w-3.5 translate-x-0.5 rounded-full bg-vellum-muted',
            'data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-brass-bright',
            'transition-transform duration-150'
          )}
        />
      </SwitchPrimitive.Root>
      {label && (
        <label htmlFor={id} className="text-sm text-vellum-muted">
          {label}
        </label>
      )}
    </div>
  )
}
