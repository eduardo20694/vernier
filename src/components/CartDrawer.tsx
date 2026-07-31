import { ShoppingBag, Trash2 } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Divider } from './Divider'
import { EmptyState } from './EmptyState'
import { IconButton } from './IconButton'
import { QuantityInput } from './QuantityInput'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from './Sheet'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageSrc?: string
}

export interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CartItem[]
  onUpdateQty: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onCheckout?: () => void
  currencyLabel?: string
  className?: string
}

function formatCurrency(value: number, currencyLabel = 'BRL') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currencyLabel,
  }).format(value)
}

export function CartDrawer({
  open,
  onOpenChange,
  items,
  onUpdateQty,
  onRemove,
  onCheckout,
  currencyLabel = 'BRL',
  className,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={cn('flex w-full max-w-md flex-col gap-0 p-0', className)}
      >
        <div className="border-b border-line px-6 pb-4 pt-6">
          <SheetTitle>Carrinho</SheetTitle>
          <SheetDescription>
            {itemCount > 0
              ? `${itemCount} ${itemCount === 1 ? 'item' : 'itens'} no carrinho`
              : 'Revise os itens antes de finalizar'}
          </SheetDescription>
        </div>

        {items.length === 0 ? (
          <EmptyState
            className="flex-1"
            icon={<ShoppingBag className="h-5 w-5" strokeWidth={1.75} />}
            title="Seu carrinho está vazio"
            description="Adicione produtos ou planos para continuar a compra."
          />
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-lg border border-line bg-panel2/40 p-3"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-panel">
                    {item.imageSrc ? (
                      <img src={item.imageSrc} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-vellum-faint">
                        <ShoppingBag className="h-5 w-5" aria-hidden />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-medium text-vellum">{item.name}</p>
                      <IconButton
                        label={`Remover ${item.name}`}
                        tone="rust"
                        size="sm"
                        onClick={() => onRemove(item.id)}
                      >
                        <Trash2 aria-hidden />
                      </IconButton>
                    </div>
                    <p className="mt-0.5 font-mono text-sm tabular-nums text-brass-bright">
                      {formatCurrency(item.price, currencyLabel)}
                    </p>
                    <div className="mt-2">
                      <QuantityInput
                        value={item.quantity}
                        onChange={(qty) => onUpdateQty(item.id, qty)}
                        min={1}
                        size="sm"
                        aria-label={`Quantidade de ${item.name}`}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-auto border-t border-line bg-panel px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-vellum-muted">Subtotal</span>
                <span className="font-mono text-base tabular-nums text-vellum">
                  {formatCurrency(subtotal, currencyLabel)}
                </span>
              </div>
              <Divider className="my-4" />
              <Button className="w-full" variant="gradient" onClick={onCheckout}>
                Finalizar compra
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
