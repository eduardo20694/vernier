import { Check } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Badge } from './Badge'

export interface PricingPlan {
  id: string
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  onSelect?: () => void
}

export function PricingCards({
  plans,
  className,
}: {
  plans: PricingPlan[]
  className?: string
}) {
  return (
    <div className={cn('grid gap-5 md:grid-cols-3', className)}>
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            'relative flex flex-col rounded-xl border p-6',
            plan.highlighted
              ? 'border-brass-dim/70 bg-gradient-to-b from-brass/10 via-panel to-panel shadow-plate'
              : 'border-line bg-panel'
          )}
        >
          {plan.highlighted && (
            <Badge tone="brass" className="absolute -top-2.5 left-6">
              Popular
            </Badge>
          )}
          <h3 className="font-display text-xl text-vellum">{plan.name}</h3>
          <p className="mt-1 text-sm text-vellum-muted">{plan.description}</p>
          <p className="mt-5 font-display text-4xl text-vellum">
            {plan.price}
            {plan.period && (
              <span className="ml-1 font-sans text-sm text-vellum-faint">{plan.period}</span>
            )}
          </p>
          <ul className="mt-6 flex-1 space-y-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-vellum-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={2.5} />
                {f}
              </li>
            ))}
          </ul>
          <Button
            className="mt-8 w-full"
            variant={plan.highlighted ? 'gradient' : 'secondary'}
            onClick={plan.onSelect}
          >
            {plan.cta}
          </Button>
        </div>
      ))}
    </div>
  )
}
