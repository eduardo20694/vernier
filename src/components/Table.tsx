import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-line">
      <table className={cn('w-full text-sm', className)} {...props} />
    </div>
  )
}

export function TableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-panel2 text-xs uppercase tracking-wide text-vellum-muted" {...props} />
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('border-t border-line hover:bg-panel/60', className)} {...props} />
}

export function TableHead({ className, numeric, ...props }: ThHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return (
    <th
      className={cn('px-4 py-2.5 font-medium', numeric ? 'text-right font-mono' : 'text-left', className)}
      {...props}
    />
  )
}

// numeric=true alinha o dado à direita e usa a mono — a mesma convenção
// contábil que já usamos no Rowkeeper, mantida aqui porque é uma regra
// universal de legibilidade de número em tabela, não um capricho estético.
export function TableCell({ className, numeric, ...props }: TdHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return (
    <td
      className={cn('px-4 py-3', numeric ? 'text-right font-mono tabular-nums' : 'text-left', className)}
      {...props}
    />
  )
}
