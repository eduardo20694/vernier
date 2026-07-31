import { cn } from '../lib/cn'
import { SegmentedControl } from './SegmentedControl'

export type PricingPeriod = 'monthly' | 'yearly'

export interface PricingToggleProps {
  value: PricingPeriod
  onChange: (value: PricingPeriod) => void
  monthlyLabel?: string
  yearlyLabel?: string
  yearlyBadge?: string
  className?: string
}

export function PricingToggle({
  value,
  onChange,
  monthlyLabel = 'Mensal',
  yearlyLabel = 'Anual',
  yearlyBadge = '−20%',
  className,
}: PricingToggleProps) {
  return (
    <div className={cn('inline-flex flex-col items-center gap-2 sm:flex-row', className)}>
      <SegmentedControl<PricingPeriod>
        value={value}
        onChange={onChange}
        options={[
          { value: 'monthly', label: monthlyLabel },
          { value: 'yearly', label: yearlyLabel },
        ]}
      />
      {yearlyBadge && value === 'yearly' && (
        <span className="rounded-full border border-verdigris/40 bg-verdigris/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-verdigris">
          {yearlyBadge}
        </span>
      )}
      {yearlyBadge && value === 'monthly' && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-vellum-faint">
          Anual: {yearlyBadge}
        </span>
      )}
    </div>
  )
}
