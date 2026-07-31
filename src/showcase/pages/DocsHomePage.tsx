import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../../components/Button'
import { Overline } from '../../components/Typography'
import { PostGrid, type PostCardProps } from '../../components/PostCard'
import { SearchInput } from '../../components/SearchInput'
import { DocsShell } from './DocsShell'

const DOC_ARTICLES: PostCardProps[] = [
  {
    title: 'Instalar componentes via MCP',
    excerpt:
      'Configure o servidor Vernier no Cursor, liste blocos disponíveis e copie só o que seu projeto precisa.',
    category: 'Começando',
    author: 'Equipe Vernier',
    date: '2026-07-28',
    href: '#',
    coverSrc: 'https://picsum.photos/seed/vernier-docs-mcp/640/360',
    coverAlt: 'Terminal com saída MCP',
  },
  {
    title: 'Tokens dia e noite',
    excerpt:
      'Variáveis CSS, tokens.json e classes Tailwind — como manter a paleta oceânica sincronizada.',
    category: 'Design system',
    author: 'Marina Costa',
    date: '2026-07-15',
    href: '#',
    coverSrc: 'https://picsum.photos/seed/vernier-docs-tokens/640/360',
    coverAlt: 'Painel com gradiente azul-escuro',
  },
  {
    title: 'Compor páginas completas',
    excerpt:
      'MarketingShell, AppPageShell e BrowserFrame — quando usar cada receita na vitrine.',
    category: 'Guias',
    author: 'Rafael Mendes',
    date: '2026-07-02',
    href: '#',
    coverSrc: 'https://picsum.photos/seed/vernier-docs-pages/640/360',
    coverAlt: 'Layout de página em grade',
  },
  {
    title: 'Formulários acessíveis',
    excerpt:
      'ValidatedForm com RHF + Zod: mensagens em PT-BR, estados de erro e submit tipado.',
    category: 'Componentes',
    author: 'Ana Souza',
    date: '2026-06-20',
    href: '#',
  },
  {
    title: 'AppShell e navegação lateral',
    excerpt:
      'SidebarNav colapsável, TopNav com busca e padrões para dashboards SaaS.',
    category: 'Layout',
    author: 'Equipe Vernier',
    date: '2026-06-08',
    href: '#',
  },
  {
    title: 'Publicar a vitrine',
    excerpt:
      'Build Vite, preview estático e dicas para hospedar o catálogo de componentes.',
    category: 'Deploy',
    author: 'Rafael Mendes',
    date: '2026-05-30',
    href: '#',
  },
]

export function DocsHomePage() {
  return (
    <DocsShell activeId="docs-home">
      <section
        className="relative overflow-hidden rounded-2xl border border-brass-dim/30 bg-gradient-to-br from-panel2 via-panel to-ink px-6 py-10 sm:px-10"
        aria-labelledby="docs-hero-title"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(var(--brass)/0.16),transparent_50%)]"
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <Overline tone="brass">Começando</Overline>
            <h1
              id="docs-hero-title"
              className="mt-3 font-display text-display-sm leading-[0.98] text-vellum sm:text-display"
            >
              Calibre sua interface em minutos
            </h1>
            <p className="mt-4 text-lead text-vellum-muted">
              Instale blocos, ajuste tokens e monte páginas completas — tudo com a estética
              Vernier de aço oceano e azure luminoso.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="gradient" size="lg">
                Guia rápido
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
              </Button>
              <Button variant="forged" size="lg">
                Ver exemplos
              </Button>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-line bg-ink/40 px-5 py-4 backdrop-blur-sm">
            <Sparkles className="h-8 w-8 text-brass-bright" aria-hidden />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
                Atualizado
              </p>
              <p className="font-display text-lg text-vellum">Jul 2026</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 lg:hidden">
        <SearchInput
          placeholder="Buscar artigos…"
          aria-label="Buscar artigos"
          onClear={() => undefined}
        />
      </div>

      <header className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl text-vellum">Artigos recentes</h2>
          <p className="mt-1 text-sm text-vellum-muted">
            Guias, referências e receitas para usar a biblioteca no dia a dia.
          </p>
        </div>
        <Button variant="ghost" size="sm" className="self-start sm:self-auto">
          Ver todos
        </Button>
      </header>

      <PostGrid posts={DOC_ARTICLES} className="mt-6" />
    </DocsShell>
  )
}
