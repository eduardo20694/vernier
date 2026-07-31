import type { OrderSummaryLineItem } from '../../components/OrderSummary'

export interface CommerceProduct {
  id: string
  title: string
  description: string
  longDescription: string
  price: number
  badge?: string
  rating: number
  reviewCount: number
}

export const FEATURED_PRODUCT: CommerceProduct = {
  id: 'p1',
  title: 'Calibrador de tokens',
  description: 'Kit completo para sincronizar paletas dia/noite.',
  longDescription:
    'O Calibrador de tokens Vernier inclui placas de referência oceânica, cartela de contraste WCAG e guia de migração para CSS variables. Ideal para design systems que alternam entre modo dia e noite sem remendos visuais.',
  price: 89.9,
  badge: 'Novo',
  rating: 4.5,
  reviewCount: 24,
}

export const RELATED_PRODUCTS: CommerceProduct[] = [
  {
    id: 'p2',
    title: 'Kit showcase',
    description: 'Placas numeradas + MCP para instalar no seu app.',
    longDescription: '',
    price: 149,
    rating: 4.8,
    reviewCount: 12,
  },
  {
    id: 'p3',
    title: 'Medidor de contraste',
    description: 'Gauge analógico para validar legibilidade em painéis.',
    longDescription: '',
    price: 59.9,
    rating: 4.2,
    reviewCount: 8,
  },
  {
    id: 'p4',
    title: 'Pacote de ícones latão',
    description: '48 ícones stroke alinhados ao acento Vernier.',
    longDescription: '',
    price: 39.9,
    badge: 'Popular',
    rating: 4.6,
    reviewCount: 31,
  },
]

export const WISHLIST_INITIAL: CommerceProduct[] = [
  FEATURED_PRODUCT,
  RELATED_PRODUCTS[0],
  RELATED_PRODUCTS[2],
]

export const ORDER_LINE_ITEMS: OrderSummaryLineItem[] = [
  { id: '1', label: 'Calibrador de tokens', amount: 89.9, quantity: 1 },
  { id: '2', label: 'Kit showcase', amount: 149, quantity: 1 },
]

export const ORDER_SUBTOTAL = 238.9
export const ORDER_SHIPPING = 19.9
export const ORDER_TAX = 21.5
export const ORDER_TOTAL = ORDER_SUBTOTAL + ORDER_SHIPPING + ORDER_TAX

export function formatBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export const SHIPPING_METHODS = [
  {
    id: 'standard',
    label: 'Econômico',
    description: 'Entrega em 5–8 dias úteis',
    price: 19.9,
    eta: '8–12 jul',
  },
  {
    id: 'express',
    label: 'Expresso',
    description: 'Entrega em 2–3 dias úteis',
    price: 34.9,
    eta: '4–5 jul',
  },
  {
    id: 'pickup',
    label: 'Retirada',
    description: 'Depósito Vernier — São Paulo',
    price: 0,
    eta: 'A partir de amanhã',
  },
] as const
