import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog'

/** Modal de formulário pronto — trigger + título + slot de campos + ações. */
export function FormDialog({
  trigger,
  title,
  description,
  children,
  confirmLabel = 'Salvar',
  onConfirm,
  size = 'md',
}: {
  trigger: ReactNode
  title: string
  description?: string
  children: ReactNode
  confirmLabel?: string
  onConfirm?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent size={size}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="space-y-4">{children}</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="gradient" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function ModalDemoCard({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>{children}</div>
  )
}
