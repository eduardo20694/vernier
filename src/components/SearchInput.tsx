import { forwardRef, type InputHTMLAttributes } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../lib/cn'

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, value, ...props }, ref) => {
    const showClear = onClear && String(value ?? '').length > 0

    return (
      <div className={cn('relative', className)}>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-vellum-faint" />
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            'h-10 w-full rounded border border-line bg-panel py-2 pl-9 pr-9 text-sm text-vellum',
            'placeholder:text-vellum-faint transition-colors duration-150',
            'focus-ring focus:border-brass-dim',
            'disabled:cursor-not-allowed disabled:opacity-50',
            '[&::-webkit-search-cancel-button]:hidden'
          )}
          {...props}
        />
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Limpar busca"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-vellum-faint hover:text-vellum focus-ring"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    )
  }
)
SearchInput.displayName = 'SearchInput'
