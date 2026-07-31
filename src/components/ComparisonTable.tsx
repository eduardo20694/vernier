import { Check, Minus } from 'lucide-react'
import { cn } from '../lib/cn'

export type ComparisonValue = boolean | string

export interface ComparisonPlan {
  id: string
  name: string
  highlighted?: boolean
}

export interface ComparisonFeature {
  id: string
  name: string
  /** Map of planId → included or text value */
  values: Record<string, ComparisonValue>
}

export interface ComparisonTableProps {
  plans: ComparisonPlan[]
  features: ComparisonFeature[]
  className?: string
  caption?: string
}

export function ComparisonTable({ plans, features, className, caption }: ComparisonTableProps) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-xl border border-line', className)}>
      <table className="w-full min-w-[480px] border-collapse text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-line bg-panel2/80">
            <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-vellum-faint">
              Recurso
            </th>
            {plans.map((plan) => (
              <th
                key={plan.id}
                className={cn(
                  'px-4 py-3 text-center font-display text-base text-vellum',
                  plan.highlighted && 'bg-brass/10 text-brass-bright'
                )}
              >
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, i) => (
            <tr
              key={feature.id}
              className={cn('border-b border-line last:border-0', i % 2 === 1 && 'bg-panel/40')}
            >
              <td className="px-4 py-3 text-vellum-muted">{feature.name}</td>
              {plans.map((plan) => {
                const val = feature.values[plan.id]
                return (
                  <td
                    key={plan.id}
                    className={cn(
                      'px-4 py-3 text-center',
                      plan.highlighted && 'bg-brass/[0.04]'
                    )}
                  >
                    {typeof val === 'string' ? (
                      <span className="text-vellum">{val}</span>
                    ) : val ? (
                      <Check
                        className="mx-auto h-4 w-4 text-brass-bright"
                        strokeWidth={2.5}
                        aria-label="Incluído"
                      />
                    ) : (
                      <Minus
                        className="mx-auto h-4 w-4 text-vellum-faint"
                        aria-label="Não incluído"
                      />
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
