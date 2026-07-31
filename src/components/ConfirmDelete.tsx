import type { ReactNode } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog'
import { Button } from './Button'

export interface ConfirmDeleteProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  /** Trigger element (button, etc.) */
  trigger?: ReactNode
  children?: ReactNode
  loading?: boolean
}

export function ConfirmDelete({
  open,
  onOpenChange,
  title = 'Excluir permanentemente?',
  description = 'Essa ação não pode ser desfeita. O item será removido da bancada.',
  confirmLabel = 'Excluir',
  cancelLabel = 'Cancelar',
  onConfirm,
  trigger,
  children,
  loading,
}: ConfirmDeleteProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {(trigger || children) && (
        <AlertDialogTrigger asChild>{trigger ?? children}</AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="secondary" disabled={loading}>
              {cancelLabel}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="danger" loading={loading} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
