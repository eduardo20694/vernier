import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button, type ButtonProps } from './Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './DropdownMenu'

export interface SplitButtonAction {
  label: string
  onSelect: () => void
  disabled?: boolean
  destructive?: boolean
}

export interface SplitButtonProps {
  children: ReactNode
  onClick?: () => void
  actions: SplitButtonAction[]
  variant?: ButtonProps['variant']
  size?: Exclude<ButtonProps['size'], 'icon'>
  disabled?: boolean
  loading?: boolean
  className?: string
}

export function SplitButton({
  children,
  onClick,
  actions,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  className,
}: SplitButtonProps) {
  const chevronSize = size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-10' : 'h-10 w-9'

  return (
    <div className={cn('inline-flex items-stretch', className)}>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        className="rounded-r-none border-r-0"
      >
        {children}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size="icon"
            disabled={disabled || loading}
            aria-label="Mais ações"
            className={cn('rounded-l-none border-l border-l-ink/15', chevronSize)}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.label}
              disabled={action.disabled}
              onSelect={action.onSelect}
              className={action.destructive ? 'text-rust focus:text-rust' : undefined}
            >
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
