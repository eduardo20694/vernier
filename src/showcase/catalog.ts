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
  { number: '00', title: 'Tipografia', category: 'tipo', keywords: 'display heading subtitle lead text caption overline strong em mark mono gradient truncate lineclamp list definition small balance prose blockquote link fonte tipografia' },
  { number: '01', title: 'Botão', category: 'acoes', keywords: 'button primary secondary ghost danger' },
  { number: '01b', title: 'Botões fundidos', category: 'acoes', keywords: 'gradient forged glow azure aço cta' },
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
  { number: '52', title: 'Footer', category: 'layout', keywords: 'footer rodapé' },
  { number: '53', title: 'Hero', category: 'layout', keywords: 'hero landing' },
  { number: '54', title: 'Pricing', category: 'layout', keywords: 'pricing planos cards' },
  { number: '55', title: 'Combobox', category: 'forms', keywords: 'combobox autocomplete busca' },
  { number: '56', title: 'Calendário', category: 'forms', keywords: 'calendar date picker data' },
  { number: '57', title: 'Data table', category: 'dados', keywords: 'datatable sort filter select' },
  { number: '58', title: 'Mobile nav', category: 'nav', keywords: 'mobile menu hamburger' },
  { number: '59', title: 'Menubar', category: 'nav', keywords: 'menubar menu barra' },
  { number: '60', title: 'OTP', category: 'forms', keywords: 'otp pin 2fa verificação' },
  { number: '61', title: 'Toggle group', category: 'acoes', keywords: 'toggle group ícone' },
  { number: '62', title: 'Carousel', category: 'layout', keywords: 'carousel slider' },
  { number: '63', title: 'Cookie banner', category: 'feedback', keywords: 'cookie consent lgpd' },
  { number: '64', title: 'Error page', category: 'feedback', keywords: '404 500 error' },
  { number: '65', title: 'Wizard', category: 'forms', keywords: 'wizard multi-step fluxo' },
  { number: '66', title: 'Date picker', category: 'forms', keywords: 'datepicker date picker calendário data formulário' },
  { number: '67', title: 'Testimonial', category: 'layout', keywords: 'testimonial depoimento quote grid marketing' },
  { number: '68', title: 'Logo cloud', category: 'layout', keywords: 'logo cloud marcas parceiros' },
  { number: '69', title: 'Newsletter', category: 'forms', keywords: 'newsletter inscrição email marketing form' },
  { number: '70', title: 'Blog article', category: 'layout', keywords: 'blog article artigo prose tipografia marketing' },
  { number: '71', title: 'Gallery', category: 'layout', keywords: 'gallery galeria imagens lightbox' },
  { number: '72', title: 'Video embed', category: 'layout', keywords: 'video embed youtube iframe' },
  { number: '73', title: 'Sticky CTA', category: 'feedback', keywords: 'sticky cta banner chamada ação' },
  { number: '74', title: 'Navigation menu', category: 'nav', keywords: 'navigation menu mega menu navbar' },
  { number: '75', title: 'Charts', category: 'dados', keywords: 'charts gráficos line bar area donut combo funnel radar sparkline recharts' },
  { number: '76', title: 'Tree view', category: 'dados', keywords: 'tree view árvore pasta arquivo hierarquia' },
  { number: '77', title: 'Color picker', category: 'forms', keywords: 'color picker cor seletor presets' },
  { number: '78', title: 'Tag input', category: 'forms', keywords: 'tag input tags chips enter' },
  { number: '79', title: 'Multi select', category: 'forms', keywords: 'multiselect multi select múltipla seleção' },
  { number: '80', title: 'Date range', category: 'forms', keywords: 'daterange date range período calendário' },
  { number: '81', title: 'Time picker', category: 'forms', keywords: 'timepicker time picker horário hora' },
  { number: '82', title: 'Masked input', category: 'forms', keywords: 'masked mask cpf cnpj cep telefone' },
  { number: '83', title: 'Currency input', category: 'forms', keywords: 'currency moeda brl real dinheiro' },
  { number: '84', title: 'Rating', category: 'forms', keywords: 'rating estrelas avaliação score' },
  { number: '85', title: 'Kanban', category: 'dados', keywords: 'kanban board colunas cards fluxo' },
  { number: '86', title: 'Notification center', category: 'feedback', keywords: 'notification center sino alertas' },
  { number: '87', title: 'Filter bar', category: 'dados', keywords: 'filter bar filtros chips limpar' },
  { number: '88', title: 'Activity feed', category: 'dados', keywords: 'activity feed feed atividade timeline' },
  { number: '89', title: 'Chat thread', category: 'feedback', keywords: 'chat thread mensagem conversa' },
  { number: '90', title: 'User menu', category: 'nav', keywords: 'user menu conta avatar logout' },
  { number: '91', title: 'FAQ', category: 'layout', keywords: 'faq perguntas frequentes accordion marketing' },
  { number: '92', title: 'Feature bento', category: 'layout', keywords: 'feature bento grade features marketing' },
  { number: '93', title: 'Comparison table', category: 'layout', keywords: 'comparison table comparação planos pricing' },
  { number: '94', title: 'Section CTA', category: 'layout', keywords: 'section cta chamada ação marketing' },
  { number: '95', title: 'Announcement bar', category: 'feedback', keywords: 'announcement bar anúncio faixa dismiss' },
  { number: '96', title: 'Team grid', category: 'layout', keywords: 'team grid equipe time membros marketing' },
  { number: '97', title: 'Changelog', category: 'dados', keywords: 'changelog versões release notas' },
  { number: '98', title: 'Rich text editor', category: 'forms', keywords: 'rich text editor wysiwyg toolbar negrito' },
  { number: '99', title: 'Avatar group', category: 'layout', keywords: 'avatar group avatares overflow stack' },
  { number: '100', title: 'Fab', category: 'acoes', keywords: 'fab floating action button flutuante' },
  { number: '101', title: 'Split button', category: 'acoes', keywords: 'split button dropdown ações' },
  { number: '102', title: 'Button group', category: 'acoes', keywords: 'button group grupo botões unidos' },
  { number: '103', title: 'Quantity input', category: 'forms', keywords: 'quantity quantidade stepper número' },
  { number: '104', title: 'Range slider', category: 'forms', keywords: 'range slider intervalo min max' },
  { number: '105', title: 'Phone input', category: 'forms', keywords: 'phone telefone ddi país' },
  { number: '106', title: 'Credit card', category: 'forms', keywords: 'credit card cartão cvc validade pagamento' },
  { number: '107', title: 'Signature pad', category: 'forms', keywords: 'signature pad assinatura canvas' },
  { number: '108', title: 'Transfer list', category: 'forms', keywords: 'transfer list dual list transferência' },
  { number: '109', title: 'Sortable list', category: 'dados', keywords: 'sortable list ordenar reordenar' },
  { number: '110', title: 'Copy field', category: 'forms', keywords: 'copy field copiar clipboard' },
  { number: '111', title: 'Json viewer', category: 'dados', keywords: 'json viewer árvore objeto' },
  { number: '112', title: 'Diff view', category: 'dados', keywords: 'diff view diferença código unified split' },
  { number: '113', title: 'Terminal', category: 'dados', keywords: 'terminal console prompt cli' },
  { number: '114', title: 'Circular progress', category: 'feedback', keywords: 'circular progress anel progresso' },
  { number: '115', title: 'Animated number', category: 'instrumento', keywords: 'animated number contador métrica' },
  { number: '116', title: 'Presence', category: 'feedback', keywords: 'presence status online away busy' },
  { number: '117', title: 'Bulk actions', category: 'acoes', keywords: 'bulk actions barra seleção lote' },
  { number: '118', title: 'Page header', category: 'layout', keywords: 'page header cabeçalho breadcrumbs' },
  { number: '119', title: 'Resizable panels', category: 'layout', keywords: 'resizable panels painéis divisor' },
  { number: '120', title: 'Marquee', category: 'layout', keywords: 'marquee scroll texto animado' },
  { number: '121', title: 'Skip link', category: 'nav', keywords: 'skip link acessibilidade pular conteúdo' },
  { number: '122', title: 'Visually hidden', category: 'tipo', keywords: 'visually hidden sr-only acessibilidade' },
  { number: '123', title: 'Heatmap', category: 'dados', keywords: 'heatmap mapa calor grade' },
  { number: '124', title: 'Scatter', category: 'dados', keywords: 'scatter chart dispersão recharts' },
  { number: '125', title: 'Spark stat', category: 'instrumento', keywords: 'sparkstat sparkline métrica delta' },
  { number: '126', title: 'Metric row', category: 'instrumento', keywords: 'metric row métricas linha kpis' },
  { number: '127', title: 'Data card', category: 'instrumento', keywords: 'data card cartão métrica delta' },
  { number: '128', title: 'Logo marquee', category: 'layout', keywords: 'logo marquee marcas parceiros scroll' },
  { number: '129', title: 'Browser frame', category: 'layout', keywords: 'browser frame janela url mock' },
  { number: '130', title: 'Stats strip', category: 'instrumento', keywords: 'stats strip estatísticas faixa' },
  { number: '131', title: 'Countdown', category: 'feedback', keywords: 'countdown timer contagem regressiva' },
  { number: '132', title: 'Social share', category: 'acoes', keywords: 'social share compartilhar twitter linkedin' },
  { number: '133', title: 'Author card', category: 'layout', keywords: 'author card autor bio links' },
  { number: '134', title: 'Table of contents', category: 'nav', keywords: 'toc table of contents sumário âncoras' },
  { number: '135', title: 'Reading progress', category: 'feedback', keywords: 'reading progress barra leitura scroll' },
  { number: '136', title: 'Waitlist form', category: 'forms', keywords: 'waitlist form lista espera email' },
  { number: '137', title: 'Pricing toggle', category: 'acoes', keywords: 'pricing toggle mensal anual planos' },
  { number: '138', title: 'Hero split', category: 'layout', keywords: 'hero split landing marketing' },
  { number: '139', title: 'Site map', category: 'nav', keywords: 'sitemap mapa site links colunas' },
  { number: '140', title: 'Maintenance page', category: 'feedback', keywords: 'maintenance manutenção 503' },
  { number: '141', title: 'Auth split', category: 'layout', keywords: 'auth split login brand painel' },
  { number: '142', title: 'Profile header', category: 'layout', keywords: 'profile header capa avatar perfil' },
  { number: '143', title: 'Settings section', category: 'forms', keywords: 'settings section preferências seção' },
  { number: '144', title: 'Comment list', category: 'feedback', keywords: 'comment list comentários replies' },
  { number: '145', title: 'Mention list', category: 'overlay', keywords: 'mention list menções @ autocomplete' },
  { number: '146', title: 'Image upload', category: 'forms', keywords: 'image upload imagens dropzone' },
  { number: '147', title: 'File list', category: 'forms', keywords: 'file list arquivos progresso upload' },
  { number: '148', title: 'Empty search', category: 'feedback', keywords: 'empty search sem resultados busca' },
  { number: '149', title: 'Offline banner', category: 'feedback', keywords: 'offline banner rede wifi' },
  { number: '150', title: 'Language switcher', category: 'nav', keywords: 'language switcher idioma locale' },
  { number: '151', title: 'Theme toggle', category: 'acoes', keywords: 'theme toggle dia noite dark light' },
  { number: '152', title: 'Confirm delete', category: 'overlay', keywords: 'confirm delete excluir alerta dialog' },
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
