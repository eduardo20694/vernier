import {
  Children,
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '../lib/cn'

export interface ButtonGroupProps {
  children: ReactNode
  className?: string
  /** Orientação dos botões unidos */
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Grupo de botões com bordas compartilhadas (não é ToggleGroup).
 * Filhos devem ser `<button>` ou componentes que aceitem `className`.
 */
export function ButtonGroup({
  children,
  className,
  orientation = 'horizontal',
}: ButtonGroupProps) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<
    ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }
  >[]

  return (
    <div
      role="group"
      className={cn(
        'inline-flex overflow-hidden rounded border border-line bg-panel',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        className
      )}
    >
      {items.map((child, i) => {
        const isLast = i === items.length - 1
        return cloneElement(child, {
          className: cn(
            'rounded-none border-0 bg-transparent text-sm text-vellum-muted',
            'hover:bg-panel2 hover:text-vellum focus-ring',
            'disabled:opacity-40',
            orientation === 'horizontal' && !isLast && 'border-r border-line',
            orientation === 'vertical' && !isLast && 'border-b border-line',
            child.props.className
          ),
        })
      })}
    </div>
  )
}
