import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { MetricRow, type MetricItem } from './MetricRow'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

export interface ResultPanelTab {
  id: string
  label: string
  content: ReactNode
}

export interface ResultPanelMetaItem {
  label: string
  value: ReactNode
}

export interface ResultPanelProps {
  /** Nome do cliente / titular exibido no cabeçalho */
  clientName: string
  /** Slot para CPF mascarado (ex.: componente SensitiveData) */
  cpfSlot?: ReactNode
  /** Slot para número de benefício mascarado */
  beneficioSlot?: ReactNode
  /** Metadados alternativos quando não há slots sensíveis */
  meta?: ResultPanelMetaItem[]
  metrics: MetricItem[]
  tabs: ResultPanelTab[]
  /** Banner opcional no topo (ex.: ProviderBanner, Alert) */
  banner?: ReactNode
  defaultTab?: string
  className?: string
  headerExtra?: ReactNode
}

export function ResultPanel({
  clientName,
  cpfSlot,
  beneficioSlot,
  meta,
  metrics,
  tabs,
  banner,
  defaultTab,
  className,
  headerExtra,
}: ResultPanelProps) {
  const initialTab = defaultTab ?? tabs[0]?.id

  return (
    <section
      className={cn(
        'overflow-hidden rounded-xl border border-line bg-panel shadow-plate',
        className
      )}
    >
      {banner && <div className="border-b border-line">{banner}</div>}

      <header className="border-b border-line bg-gradient-to-b from-panel2 to-panel px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
              Resultado da consulta
            </p>
            <h2 className="truncate font-display text-xl font-medium tracking-tight text-vellum">
              {clientName}
            </h2>

            {(cpfSlot || beneficioSlot || meta?.length) && (
              <dl className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm">
                {cpfSlot && (
                  <div className="flex items-baseline gap-2">
                    <dt className="text-vellum-faint">CPF</dt>
                    <dd className="font-mono text-vellum-muted">{cpfSlot}</dd>
                  </div>
                )}
                {beneficioSlot && (
                  <div className="flex items-baseline gap-2">
                    <dt className="text-vellum-faint">Benefício</dt>
                    <dd className="font-mono text-vellum-muted">{beneficioSlot}</dd>
                  </div>
                )}
                {meta?.map((item) => (
                  <div key={item.label} className="flex items-baseline gap-2">
                    <dt className="text-vellum-faint">{item.label}</dt>
                    <dd className="font-mono text-vellum-muted">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          {headerExtra && <div className="shrink-0">{headerExtra}</div>}
        </div>
      </header>

      <div className="border-b border-line px-5 py-4">
        <MetricRow metrics={metrics} />
      </div>

      {tabs.length > 0 && (
        <Tabs defaultValue={initialTab} className="px-5 pb-5 pt-3">
          <TabsList className="w-full justify-start">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </section>
  )
}
