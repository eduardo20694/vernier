import { cn } from '../lib/cn'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion'

export interface FAQItem {
  id?: string
  question: string
  answer: string
}

export interface FAQProps {
  title?: string
  description?: string
  items: FAQItem[]
  className?: string
  type?: 'single' | 'multiple'
}

export function FAQ({
  title = 'Perguntas frequentes',
  description,
  items,
  className,
  type = 'single',
}: FAQProps) {
  return (
    <section className={cn('mx-auto w-full max-w-2xl', className)}>
      {(title || description) && (
        <header className="mb-6 text-center">
          {title && <h2 className="font-display text-3xl text-vellum">{title}</h2>}
          {description && (
            <p className="mt-2 text-sm text-vellum-muted">{description}</p>
          )}
        </header>
      )}
      {type === 'single' ? (
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={item.id ?? i} value={item.id ?? `faq-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Accordion type="multiple" className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={item.id ?? i} value={item.id ?? `faq-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </section>
  )
}
