import { ChevronDown, LogOut, Settings } from 'lucide-react'
import { cn } from '../lib/cn'
import { Avatar } from './Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu'

export interface UserMenuProps {
  name: string
  email?: string
  plan?: string
  avatarSrc?: string
  onSettings?: () => void
  onLogout?: () => void
  className?: string
}

export function UserMenu({
  name,
  email,
  plan,
  avatarSrc,
  onSettings,
  onLogout,
  className,
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex items-center gap-2 rounded-full border border-line bg-panel2 py-1 pl-1 pr-2.5',
            'text-sm text-vellum-muted transition-colors hover:border-brass-dim hover:text-vellum focus-ring',
            className
          )}
        >
          <Avatar size="sm" fallback={name} src={avatarSrc} ring={false} />
          <span className="hidden max-w-[8rem] truncate font-medium text-vellum sm:inline">
            {name}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-vellum-faint" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Conta</DropdownMenuLabel>
        <div className="px-2.5 pb-2">
          <p className="truncate text-sm font-medium text-vellum">{name}</p>
          {email && <p className="truncate text-xs text-vellum-faint">{email}</p>}
          {plan && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brass-bright">
              {plan}
            </p>
          )}
        </div>
        <DropdownMenuSeparator />
        {onSettings && (
          <DropdownMenuItem onSelect={onSettings}>
            <Settings className="mr-2 h-3.5 w-3.5" />
            Configurações
          </DropdownMenuItem>
        )}
        {onLogout && (
          <DropdownMenuItem onSelect={onLogout} className="text-rust focus:text-rust">
            <LogOut className="mr-2 h-3.5 w-3.5" />
            Sair
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
