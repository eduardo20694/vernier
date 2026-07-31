import { Check } from 'lucide-react'
import { cn } from '../lib/cn'

export interface StepperStep {
  title: string
  description?: string
}

export interface StepperProps {
  steps: StepperStep[]
  current: number
  className?: string
}

export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <ol className={cn('flex w-full items-start gap-2', className)}>
      {steps.map((step, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={step.title} className="flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs',
                  done &&
                    'border-brass bg-gradient-to-b from-brass-bright to-brass text-ink shadow-[0_0_12px_rgb(var(--brass)/0.35)]',
                  active && 'border-brass text-brass-bright bg-brass/10',
                  !done && !active && 'border-line text-vellum-faint bg-panel2'
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    'h-px flex-1',
                    done ? 'bg-gradient-to-r from-brass to-brass-dim/40' : 'bg-line'
                  )}
                />
              )}
            </div>
            <div>
              <p className={cn('text-sm font-medium', active || done ? 'text-vellum' : 'text-vellum-faint')}>
                {step.title}
              </p>
              {step.description && (
                <p className="mt-0.5 text-xs text-vellum-faint">{step.description}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
