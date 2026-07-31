import { useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'

export interface CarouselSlide {
  id: string
  content: ReactNode
}

export function Carousel({
  slides,
  className,
}: {
  slides: CarouselSlide[]
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const count = slides.length
  if (count === 0) return null

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  return (
    <div className={cn('relative w-full max-w-xl overflow-hidden rounded-xl border border-line bg-panel', className)}>
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full p-8">
            {slide.content}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-3">
        <Button variant="secondary" size="icon" className="h-8 w-8" onClick={prev} aria-label="Anterior">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-colors',
                i === index ? 'bg-brass' : 'bg-line'
              )}
            />
          ))}
        </div>
        <Button variant="secondary" size="icon" className="h-8 w-8" onClick={next} aria-label="Próximo">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
