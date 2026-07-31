import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'gradient' | 'forged' | 'glow'
type Size = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brass text-ink hover:bg-brass-bright active:bg-brass-dim disabled:bg-brass-dim disabled:text-vellum-faint',
  secondary:
    'bg-panel2 text-vellum border border-line hover:border-brass-dim hover:text-brass-bright disabled:opacity-50',
  ghost:
    'bg-transparent text-vellum-muted hover:text-vellum hover:bg-panel2 disabled:opacity-40',
  danger:
    'bg-transparent border border-rust-dim text-rust hover:bg-rust-dim/20 disabled:opacity-40',
  // Latão fundido: gradiente vertical + brilho superior + sombra quente
  gradient:
    [
      'relative overflow-hidden text-ink border border-brass-bright/40',
      'bg-gradient-to-b from-brass-bright via-brass to-brass-dim',
      'shadow-[inset_0_1px_0_rgba(255,240,210,0.45),0_1px_0_rgba(0,0,0,0.35),0_8px_18px_-6px_rgba(201,166,107,0.45)]',
      'hover:from-[#E8CFA0] hover:via-brass-bright hover:to-brass',
      'active:from-brass active:via-brass-dim active:to-[#6F5836]',
      'active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)]',
      'disabled:from-brass-dim disabled:via-brass-dim disabled:to-[#6B5535] disabled:text-ink/50 disabled:shadow-none',
      'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1/2',
      'before:bg-gradient-to-b before:from-white/25 before:to-transparent',
    ].join(' '),
  // Metal escuro com filete de latão — botão "gravado"
  forged:
    [
      'text-brass-bright border border-brass-dim/70',
      'bg-gradient-to-b from-panel2 via-panel to-ink',
      'shadow-[inset_0_1px_0_rgba(201,166,107,0.18),0_1px_0_rgba(0,0,0,0.5)]',
      'hover:border-brass hover:text-brass-bright hover:shadow-[inset_0_1px_0_rgba(224,192,138,0.28),0_0_0_1px_rgba(201,166,107,0.12)]',
      'active:bg-ink active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.55)]',
      'disabled:opacity-40',
    ].join(' '),
  // Primário com aura — uso pontual em CTA hero
  glow:
    [
      'relative overflow-hidden text-ink border border-brass-bright/50',
      'bg-gradient-to-br from-brass-bright via-brass to-[#9A7340]',
      'shadow-[0_0_0_1px_rgba(201,166,107,0.25),0_0_24px_-4px_rgba(201,166,107,0.55),inset_0_1px_0_rgba(255,240,210,0.4)]',
      'hover:shadow-[0_0_0_1px_rgba(224,192,138,0.4),0_0_32px_-2px_rgba(224,192,138,0.65),inset_0_1px_0_rgba(255,240,210,0.5)]',
      'hover:from-[#F0D7A8] hover:via-brass-bright hover:to-brass',
      'active:shadow-[0_0_0_1px_rgba(138,112,71,0.4),inset_0_2px_6px_rgba(0,0,0,0.35)]',
      'disabled:opacity-40 disabled:shadow-none',
      'before:pointer-events-none before:absolute before:-left-1/2 before:top-0 before:h-full before:w-1/2',
      'before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent',
      'before:transition-transform before:duration-700 hover:before:translate-x-[220%]',
    ].join(' '),
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
  icon: 'h-10 w-10 p-0',
}

// Button é a peça fundacional. Variantes gradient/forged/glow são a camada
// "instrumentada" — metal fundido, filete gravado, CTA com aura de latão.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const premium = variant === 'gradient' || variant === 'forged' || variant === 'glow'

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded font-medium',
          premium ? 'transition-all duration-200 ease-out' : 'transition-colors duration-150 ease-out',
          'focus-ring disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && (
          <span
            className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-current border-t-transparent"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
