export type PageKind =
  | 'landing'
  | 'saas'
  | 'auth'
  | 'blog'
  | 'commerce'
  | 'settings'
  | 'utility'
  | 'docs'
  | 'portfolio'
  | 'marketplace'
  | 'social'
  | 'lms'
  | 'realestate'
  | 'restaurant'
  | 'events'
  | 'healthcare'
  | 'finance'

export interface PageMeta {
  id: string
  title: string
  kind: PageKind
  description: string
  keywords: string
}

export const PAGE_KINDS: { id: PageKind | 'all'; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'landing', label: 'Landing' },
  { id: 'saas', label: 'SaaS' },
  { id: 'auth', label: 'Auth' },
  { id: 'blog', label: 'Blog' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'settings', label: 'Configurações' },
  { id: 'utility', label: 'Utilitário' },
  { id: 'docs', label: 'Documentação' },
  { id: 'portfolio', label: 'Portfólio' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'social', label: 'Social' },
  { id: 'lms', label: 'LMS' },
  { id: 'realestate', label: 'Imóveis' },
  { id: 'restaurant', label: 'Restaurante' },
  { id: 'events', label: 'Eventos' },
  { id: 'healthcare', label: 'Saúde' },
  { id: 'finance', label: 'Financeiro' },
]

export const PAGES: PageMeta[] = [
  {
    id: 'landing-saas',
    title: 'Landing SaaS',
    kind: 'landing',
    description: 'Hero, logos, features, preços, FAQ e CTA — receita completa para produto B2B.',
    keywords: 'landing saas marketing hero pricing faq cta',
  },
  {
    id: 'landing-product',
    title: 'Landing produto',
    kind: 'landing',
    description: 'Vitrine de produto físico ou kit com comparativo, galeria e prova social.',
    keywords: 'landing product hardware kit comparativo galeria',
  },
  {
    id: 'landing-studio',
    title: 'Landing estúdio',
    kind: 'landing',
    description: 'Portfólio criativo com hero split, cases e convite para conversa.',
    keywords: 'landing studio portfolio creative agency',
  },
  {
    id: 'landing-waitlist',
    title: 'Waitlist / em breve',
    kind: 'landing',
    description: 'AnnouncementBar, hero, formulário de lista de espera, logos e rodapé.',
    keywords: 'landing waitlist coming soon lista espera lancamento',
  },
  {
    id: 'pricing',
    title: 'Página de preços',
    kind: 'landing',
    description: 'Toggle mensal/anual, cards, tabela comparativa, FAQ e CTA dedicados.',
    keywords: 'pricing precos planos comparativo faq cta',
  },
  {
    id: 'contact',
    title: 'Contato',
    kind: 'landing',
    description: 'Formulário de contato completo com navbar, mapa placeholder e rodapé.',
    keywords: 'contact contato formulario navbar footer',
  },
  {
    id: 'auth-login',
    title: 'Login / auth split',
    kind: 'auth',
    description: 'Painel de marca + formulário de login em layout dividido responsivo.',
    keywords: 'auth login split formulario sessao',
  },
  {
    id: 'auth-register',
    title: 'Cadastro',
    kind: 'auth',
    description: 'AuthSplit com formulário de registro — nome, email, senha e termos.',
    keywords: 'auth register cadastro signup formulario',
  },
  {
    id: 'saas-admin',
    title: 'Painel admin completo',
    kind: 'saas',
    description: 'Console operacional com sidebar, métricas, gráficos, tabela e feed de atividade.',
    keywords: 'saas admin dashboard painel metricas grafico tabela',
  },
  {
    id: 'saas-onboarding',
    title: 'Onboarding first-run',
    kind: 'saas',
    description: 'Checklist de primeiros passos dentro de um shell de aplicativo.',
    keywords: 'onboarding checklist workspace first-run setup',
  },
  {
    id: 'saas-empty',
    title: 'Dashboard vazio',
    kind: 'saas',
    description: 'AppShell com empty state e checklist de onboarding como CTA inicial.',
    keywords: 'saas empty dashboard vazio projetos onboarding',
  },
  {
    id: 'saas-notifications',
    title: 'Central de notificações',
    kind: 'saas',
    description: 'Lista completa de notificações com filtros por status e tipo.',
    keywords: 'saas notifications notificacoes alertas filtros',
  },
  {
    id: 'blog-index',
    title: 'Blog — listagem',
    kind: 'blog',
    description: 'Índice de publicações com navbar, grid de posts e rodapé editorial.',
    keywords: 'blog listing posts artigos publicacoes',
  },
  {
    id: 'blog-article',
    title: 'Blog — artigo',
    kind: 'blog',
    description: 'Artigo longo com capa, metadados, sumário lateral e tipografia editorial.',
    keywords: 'blog article artigo toc sumario editorial',
  },
  {
    id: 'commerce-shop',
    title: 'Loja leve',
    kind: 'commerce',
    description: 'Grid de produtos, carrinho lateral e navegação de vitrine.',
    keywords: 'commerce shop loja produtos carrinho ecommerce',
  },
  {
    id: 'commerce-checkout',
    title: 'Checkout',
    kind: 'commerce',
    description: 'Resumo do pedido e formulário de cartão lado a lado com header simples.',
    keywords: 'commerce checkout pagamento cartao pedido',
  },
  {
    id: 'settings-billing',
    title: 'Billing / plano',
    kind: 'settings',
    description: 'Painel de assinatura, cartão e faturas dentro do shell de configurações.',
    keywords: 'settings billing plano fatura pagamento assinatura',
  },
  {
    id: 'settings-profile',
    title: 'Perfil',
    kind: 'settings',
    description: 'ProfileHeader e seções de configuração para dados pessoais e contato.',
    keywords: 'settings profile perfil conta avatar',
  },
  {
    id: 'booking',
    title: 'Agendamento',
    kind: 'commerce',
    description: 'Calendário de slots com confirmação e cabeçalho de serviço.',
    keywords: 'booking agendamento calendario slots consultoria',
  },
  {
    id: 'search',
    title: 'Resultados de busca',
    kind: 'saas',
    description: 'Busca com filtros ativos, chips e lista de resultados no app shell.',
    keywords: 'search busca resultados filtros app',
  },
  {
    id: 'error-404',
    title: 'Página 404',
    kind: 'utility',
    description: 'ErrorPage em tela cheia com navbar opcional e ação de retorno.',
    keywords: 'error 404 not found pagina nao encontrada',
  },
  {
    id: 'maintenance',
    title: 'Manutenção',
    kind: 'utility',
    description: 'Tela de manutenção programada com código 503 e link de status.',
    keywords: 'maintenance manutencao 503 indisponivel',
  },
  {
    id: 'commerce-pdp',
    title: 'Detalhe do produto',
    kind: 'commerce',
    description: 'PDP com galeria, variantes, avaliações, abas de especificação e produtos relacionados.',
    keywords: 'commerce pdp produto detalhe galeria avaliacoes carrinho',
  },
  {
    id: 'commerce-wishlist',
    title: 'Lista de desejos',
    kind: 'commerce',
    description: 'Grid de favoritos com ações de mover ao carrinho, compartilhar e remover itens.',
    keywords: 'commerce wishlist favoritos lista desejos salvos',
  },
  {
    id: 'commerce-checkout-steps',
    title: 'Checkout em etapas',
    kind: 'commerce',
    description: 'Wizard de checkout com endereço, frete, pagamento e confirmação em passos sequenciais.',
    keywords: 'commerce checkout wizard etapas stepper pagamento frete',
  },
  {
    id: 'commerce-shipping',
    title: 'Frete e endereço',
    kind: 'commerce',
    description: 'Seleção de endereço de entrega, métodos de frete e resumo parcial do pedido.',
    keywords: 'commerce shipping frete endereco entrega cep',
  },
  {
    id: 'docs-home',
    title: 'Documentação — início',
    kind: 'docs',
    description: 'Hub de docs com busca, categorias, artigos em destaque e navegação lateral.',
    keywords: 'docs documentacao hub busca artigos guias',
  },
  {
    id: 'docs-article',
    title: 'Documentação — artigo',
    kind: 'docs',
    description: 'Artigo técnico com sumário lateral, blocos de código, callouts e navegação prev/next.',
    keywords: 'docs article artigo tecnico toc codigo guia',
  },
  {
    id: 'help-center',
    title: 'Central de ajuda',
    kind: 'docs',
    description: 'FAQ por categorias, busca de artigos, contato e links para suporte.',
    keywords: 'help center ajuda faq suporte busca categorias',
  },
  {
    id: 'portfolio-editorial',
    title: 'Portfólio editorial',
    kind: 'portfolio',
    description: 'Showcase criativo com hero, grid de cases, depoimentos e CTA de contato.',
    keywords: 'portfolio editorial cases projetos criativo showcase',
  },
  {
    id: 'marketplace-home',
    title: 'Marketplace — vitrine',
    kind: 'marketplace',
    description: 'Home de marketplace com categorias, filtros, grid de produtos e vendedores em destaque.',
    keywords: 'marketplace home vitrine categorias filtros produtos vendedores',
  },
  {
    id: 'marketplace-vendor',
    title: 'Marketplace — loja do vendedor',
    kind: 'marketplace',
    description: 'Página de perfil do vendedor com banner, métricas, catálogo e avaliações.',
    keywords: 'marketplace vendor vendedor loja perfil avaliacoes',
  },
  {
    id: 'social-feed',
    title: 'Feed social',
    kind: 'social',
    description: 'Timeline com posts, composer, sugestões de seguir e navegação mobile por abas.',
    keywords: 'social feed timeline posts composer seguir mobile',
  },
  {
    id: 'lms-catalog',
    title: 'LMS — catálogo de cursos',
    kind: 'lms',
    description: 'Catálogo de cursos com filtros por nível, cards de progresso e sidebar de categorias.',
    keywords: 'lms catalog cursos ead treinamento filtros progresso',
  },
  {
    id: 'lms-player',
    title: 'LMS — player de aula',
    kind: 'lms',
    description: 'Player de vídeo com módulos, notas, materiais complementares e barra de progresso.',
    keywords: 'lms player aula video modulos progresso materiais',
  },
  {
    id: 'realestate-listing',
    title: 'Imóveis — listagem',
    kind: 'realestate',
    description: 'Grid de imóveis com filtros de preço, quartos, mapa e cards de propriedade.',
    keywords: 'realestate imoveis listagem filtros mapa propriedade',
  },
  {
    id: 'realestate-detail',
    title: 'Imóveis — detalhe',
    kind: 'realestate',
    description: 'Ficha do imóvel com galeria, características, localização e formulário de contato.',
    keywords: 'realestate imovel detalhe galeria caracteristicas contato',
  },
  {
    id: 'restaurant-menu',
    title: 'Cardápio digital',
    kind: 'restaurant',
    description: 'Menu por categorias com pratos, preços, badges dietéticos e carrinho flutuante.',
    keywords: 'restaurant menu cardapio pratos categorias pedido',
  },
  {
    id: 'events-list',
    title: 'Eventos — listagem',
    kind: 'events',
    description: 'Calendário e grid de eventos com filtros por data, tipo e local.',
    keywords: 'events eventos listagem calendario filtros ingressos',
  },
  {
    id: 'event-detail',
    title: 'Eventos — detalhe',
    kind: 'events',
    description: 'Página do evento com banner, agenda, palestrantes, mapa e CTA de inscrição.',
    keywords: 'events evento detalhe agenda palestrantes inscricao',
  },
  {
    id: 'clinic-portal',
    title: 'Portal do paciente',
    kind: 'healthcare',
    description: 'Portal clínico com consultas agendadas, exames, receitas e agenda de retorno.',
    keywords: 'healthcare clinic portal paciente consultas exames receitas',
  },
  {
    id: 'bank-account',
    title: 'Conta bancária',
    kind: 'finance',
    description: 'Dashboard financeiro com saldo, extrato, cartões e ações rápidas de transferência.',
    keywords: 'finance bank conta saldo extrato cartoes transferencia',
  },
]

export const TOTAL_PAGES = PAGES.length

export function pageMatches(meta: PageMeta, query: string, kind: PageKind | 'all'): boolean {
  if (kind !== 'all' && meta.kind !== kind) return false
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = [meta.title, meta.description, meta.keywords, meta.kind].join(' ').toLowerCase()
  return q.split(/\s+/).every((token) => haystack.includes(token))
}

export function countVisiblePages(query: string, kind: PageKind | 'all'): number {
  return PAGES.filter((p) => pageMatches(p, query, kind)).length
}

export function kindLabel(kind: PageKind): string {
  return PAGE_KINDS.find((k) => k.id === kind)?.label ?? kind
}
