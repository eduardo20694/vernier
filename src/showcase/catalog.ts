export type CatalogCategory =
  | 'all'
  | 'tipo'
  | 'acoes'
  | 'forms'
  | 'nav'
  | 'feedback'
  | 'dados'
  | 'overlay'
  | 'layout'
  | 'instrumento'

export const CATEGORIES: { id: CatalogCategory; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'tipo', label: 'Tipografia' },
  { id: 'acoes', label: 'Ações' },
  { id: 'forms', label: 'Formulários' },
  { id: 'nav', label: 'Navegação' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'dados', label: 'Dados' },
  { id: 'overlay', label: 'Overlays' },
  { id: 'layout', label: 'Layout' },
  { id: 'instrumento', label: 'Instrumentos' },
]

export interface PlateMeta {
  number: string
  title: string
  category: Exclude<CatalogCategory, 'all'>
  keywords: string
}

export const PLATES: PlateMeta[] = [
  { number: '00', title: 'Tipografia', category: 'tipo', keywords: 'display heading lead prose blockquote link fonte' },
  { number: '01', title: 'Botão', category: 'acoes', keywords: 'button primary secondary ghost danger' },
  { number: '01b', title: 'Botões fundidos', category: 'acoes', keywords: 'gradient forged glow latão cta' },
  { number: '02', title: 'Campo de texto', category: 'forms', keywords: 'input email senha erro' },
  { number: '03', title: 'Área de texto', category: 'forms', keywords: 'textarea multilinha' },
  { number: '04', title: 'Cartão', category: 'layout', keywords: 'card' },
  { number: '05', title: 'Selo de status', category: 'feedback', keywords: 'badge' },
  { number: '06', title: 'Interruptor & Caixa de seleção', category: 'forms', keywords: 'switch checkbox' },
  { number: '07', title: 'Seletor', category: 'forms', keywords: 'select' },
  { number: '08', title: 'Abas', category: 'nav', keywords: 'tabs' },
  { number: '09', title: 'Menu suspenso', category: 'overlay', keywords: 'dropdown menu' },
  { number: '10', title: 'Dica flutuante', category: 'overlay', keywords: 'tooltip' },
  { number: '11', title: 'Diálogo', category: 'overlay', keywords: 'dialog modal' },
  { number: '12', title: 'Tabela', category: 'dados', keywords: 'table' },
  { number: '13', title: 'Navegação lateral', category: 'nav', keywords: 'sidebar' },
  { number: '14', title: 'Alerta', category: 'feedback', keywords: 'alert' },
  { number: '15', title: 'Medição', category: 'dados', keywords: 'progress' },
  { number: '16', title: 'Esqueleto', category: 'feedback', keywords: 'skeleton loading' },
  { number: '17', title: 'Notificação', category: 'feedback', keywords: 'toast' },
  { number: '18', title: 'Paginação', category: 'nav', keywords: 'pagination' },
  { number: '19', title: 'Estado vazio', category: 'feedback', keywords: 'empty' },
  { number: '20', title: 'Tecla', category: 'tipo', keywords: 'kbd atalho' },
  { number: '21', title: 'Botão de ícone', category: 'acoes', keywords: 'icon button' },
  { number: '22', title: 'Manômetro', category: 'instrumento', keywords: 'gauge' },
  { number: '23', title: 'Estatística', category: 'instrumento', keywords: 'stat métrica' },
  { number: '24', title: 'Controle segmentado', category: 'acoes', keywords: 'segmented' },
  { number: '25', title: 'Callout', category: 'feedback', keywords: 'callout' },
  { number: '26', title: 'Avatar', category: 'layout', keywords: 'avatar' },
  { number: '27', title: 'Chip', category: 'acoes', keywords: 'chip tag' },
  { number: '28', title: 'Status LED', category: 'feedback', keywords: 'status dot led' },
  { number: '29', title: 'Divisor', category: 'layout', keywords: 'divider separator' },
  { number: '30', title: 'Slider', category: 'forms', keywords: 'slider range' },
  { number: '31', title: 'Breadcrumb', category: 'nav', keywords: 'breadcrumb' },
  { number: '32', title: 'Linha do tempo', category: 'dados', keywords: 'timeline' },
  { number: '33', title: 'Cartão instrumento', category: 'instrumento', keywords: 'instrument card' },
  { number: '34', title: 'Busca & Senha', category: 'forms', keywords: 'search password' },
  { number: '35', title: 'Número & Rádio', category: 'forms', keywords: 'number radio' },
  { number: '36', title: 'Accordion', category: 'overlay', keywords: 'accordion' },
  { number: '37', title: 'Collapsible & Popover', category: 'overlay', keywords: 'collapsible popover' },
  { number: '38', title: 'Sheet', category: 'overlay', keywords: 'sheet drawer' },
  { number: '39', title: 'Spinner & Banner', category: 'feedback', keywords: 'spinner banner' },
  { number: '40', title: 'Dropzone & Stepper', category: 'forms', keywords: 'dropzone stepper upload' },
  { number: '41', title: 'Navbar', category: 'nav', keywords: 'navbar header' },
  { number: '42', title: 'Código & Hover', category: 'dados', keywords: 'code hover' },
  { number: '43', title: 'Scroll & Aspect', category: 'layout', keywords: 'scroll aspect' },
  { number: '44', title: 'Fieldset', category: 'forms', keywords: 'fieldset field' },
  { number: '45', title: 'Modais avançados', category: 'overlay', keywords: 'dialog alert form modal confirm' },
  { number: '46', title: 'Command palette', category: 'overlay', keywords: 'command palette cmdk busca' },
  { number: '47', title: 'Context menu', category: 'overlay', keywords: 'context menu botão direito' },
  { number: '48', title: 'App shell', category: 'nav', keywords: 'appshell sidebar topnav layout' },
  { number: '49', title: 'Formulário login', category: 'forms', keywords: 'login form auth' },
  { number: '50', title: 'Formulário settings', category: 'forms', keywords: 'settings preferências form' },
  { number: '51', title: 'Sheet formulário', category: 'overlay', keywords: 'sheet drawer form lateral' },
]

export const TOTAL_PLATES = PLATES.length

export function plateMatches(
  number: string,
  title: string,
  query: string,
  category: CatalogCategory
): boolean {
  const meta = PLATES.find((p) => p.number === number)
  if (category !== 'all' && meta?.category !== category) return false
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = [number, title, meta?.category ?? '', meta?.keywords ?? ''].join(' ').toLowerCase()
  return q.split(/\s+/).every((token) => haystack.includes(token))
}

export function countVisible(query: string, category: CatalogCategory): number {
  return PLATES.filter((p) => plateMatches(p.number, p.title, query, category)).length
}
