import type { OnboardingChecklistItem } from '../../components/OnboardingChecklist'
import type { PostCardProps } from '../../components/PostCard'
import type { BookingTimeSlot } from '../../components/BookingAgenda'
import type { ActiveFilter } from '../../components/FilterBar'
import type { CartItem } from '../../components/CartDrawer'
import type { NotificationItem } from '../../components/NotificationCenter'

export const DEMO_POSTS: PostCardProps[] = [
  {
    title: 'Tokens dia/noite sem remendos',
    excerpt: 'Como calibrar variáveis CSS para que Tailwind e Radix compartilhem a mesma paleta oceânica.',
    category: 'Design system',
    author: 'Marina Costa',
    date: '2026-07-12',
    href: '#',
  },
  {
    title: 'Showcase como catálogo vivo',
    excerpt: 'Placas numeradas, busca por categoria e instalação via MCP — o fluxo completo da biblioteca.',
    category: 'Produto',
    author: 'Rafael Mendes',
    date: '2026-06-28',
    href: '#',
  },
  {
    title: 'Formulários com RHF + Zod',
    excerpt: 'Padrão ValidatedForm para leads: validação acessível, mensagens em PT-BR e submit tipado.',
    category: 'Engenharia',
    author: 'Ana Souza',
    date: '2026-06-05',
    href: '#',
  },
]

export const SEARCH_RESULTS = [
  {
    id: 'r1',
    title: 'Gauge — medidor circular',
    description: 'Indicador analógico com arco em latão, ideal para KPIs de instrumentação.',
    category: 'Instrumento',
    meta: 'Placa 48',
  },
  {
    id: 'r2',
    title: 'FilterBar — filtros ativos',
    description: 'Barra com chips removíveis e slot para controles adicionais.',
    category: 'Dados',
    meta: 'Placa 87',
  },
  {
    id: 'r3',
    title: 'LandingPageSaaS — receita completa',
    description: 'Hero, logos, features, preços, FAQ e CTA final em um único bloco.',
    category: 'Layout',
    meta: 'Placa 153',
  },
]

export const INITIAL_ONBOARDING: OnboardingChecklistItem[] = [
  {
    id: 'profile',
    title: 'Complete seu perfil',
    description: 'Nome, avatar e cargo visíveis para a equipe.',
    done: true,
  },
  {
    id: 'theme',
    title: 'Escolha o tema',
    description: 'Dia ou noite — tokens sincronizados em toda a interface.',
    done: true,
  },
  {
    id: 'invite',
    title: 'Convide colegas',
    description: 'Adicione até 3 membros no plano gratuito.',
    done: false,
    actionLabel: 'Convidar',
    onAction: () => undefined,
  },
  {
    id: 'project',
    title: 'Crie o primeiro projeto',
    description: 'Importe componentes da vitrine ou comece do zero.',
    done: false,
    actionLabel: 'Novo projeto',
    onAction: () => undefined,
  },
]

export function buildBookingSlots(): BookingTimeSlot[] {
  return [
    { id: '09:00', time: '09:00', available: true },
    { id: '10:00', time: '10:00', available: true },
    { id: '11:00', time: '11:00', available: false },
    { id: '14:00', time: '14:00', available: true },
    { id: '15:00', time: '15:00', available: true },
    { id: '16:00', time: '16:00', available: false },
  ]
}

export const DEFAULT_CART_ITEMS: CartItem[] = [
  { id: 'p1', name: 'Calibrador de tokens', price: 89.9, quantity: 1 },
  { id: 'p2', name: 'Kit showcase', price: 149, quantity: 1 },
]

export const DEFAULT_SEARCH_FILTERS: ActiveFilter[] = [
  { id: 'cat-layout', label: 'Layout', tone: 'brass' },
]

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Novo membro no workspace',
    description: 'Pedro Lima aceitou o convite.',
    time: 'há 8 min',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Limite de API atingido',
    description: '80% do quota mensal consumido.',
    time: 'há 1 h',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Fatura disponível',
    description: 'Julho 2026 — R$ 149,00',
    time: 'ontem',
    unread: false,
  },
  {
    id: 'n4',
    title: 'Sistema — backup concluído',
    description: 'Backup diário finalizado com sucesso.',
    time: 'há 2 h',
    unread: false,
  },
  {
    id: 'n5',
    title: 'Sistema — manutenção programada',
    description: 'Janela de manutenção domingo, 03:00–05:00 UTC.',
    time: 'há 3 d',
    unread: false,
  },
]
