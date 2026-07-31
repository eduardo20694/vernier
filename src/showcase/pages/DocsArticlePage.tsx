import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BlogArticle } from '../../components/BlogArticle'
import { Link } from '../../components/Link'
import { DocsShell } from './DocsShell'

const TOC = (
  <ul className="space-y-2 text-sm text-vellum-muted">
    <li>
      <a href="#pre-requisitos" className="hover:text-brass-bright">
        Pré-requisitos
      </a>
    </li>
    <li>
      <a href="#instalacao" className="hover:text-brass-bright">
        Instalação
      </a>
    </li>
    <li>
      <a href="#primeiro-componente" className="hover:text-brass-bright">
        Primeiro componente
      </a>
    </li>
    <li>
      <a href="#temas" className="hover:text-brass-bright">
        Temas dia/noite
      </a>
    </li>
  </ul>
)

export function DocsArticlePage() {
  return (
    <DocsShell activeId="getting-started">
      <BlogArticle
        category="Começando"
        title="Primeiros passos com o Vernier"
        author="Equipe Vernier"
        date="31 jul 2026"
        readTime="6 min"
        coverSrc="https://picsum.photos/seed/vernier-docs-start/960/540"
        coverAlt="Mesa de trabalho com painel digital azul"
        toc={TOC}
      >
        <p id="pre-requisitos">
          Você precisa de um projeto React 18+ com TypeScript, Tailwind CSS configurado e suporte a
          variáveis CSS. O Vernier não é um pacote npm — os componentes são copiados para{' '}
          <code>src/components/</code> ou instalados via MCP.
        </p>
        <p id="instalacao">
          Clone ou abra a vitrine localmente com <code>npm install</code> e{' '}
          <code>npm run dev</code>. Para integrar em outro repositório, configure o servidor MCP
          apontando para esta pasta e use <code>install_component</code> no Cursor.
        </p>
        <p id="primeiro-componente">
          Comece por blocos fundamentais: <strong>Button</strong>, <strong>Card</strong> e{' '}
          <strong>Input</strong>. Copie também <code>lib/cn.ts</code> e garanta que{' '}
          <code>index.css</code> importa as variáveis de tema.
        </p>
        <p id="temas">
          Alterne entre dia e noite pela classe <code>.dark</code> ou <code>.light</code> no
          elemento raiz. Tokens em <code>tokens.json</code> documentam a paleta oceânica — ink,
          panel, brass e azure — sem precisar reescrever utilitários Tailwind.
        </p>
      </BlogArticle>

      <nav
        aria-label="Navegação entre artigos"
        className="mx-auto mt-12 grid max-w-5xl gap-4 border-t border-line pt-8 sm:grid-cols-2"
      >
        <Link
          href="#"
          underline={false}
          tone="muted"
          className="group flex items-start gap-3 rounded-xl border border-line bg-panel/60 p-4 no-underline transition-colors hover:border-brass-dim/50 hover:bg-panel"
        >
          <ChevronLeft
            className="mt-0.5 h-4 w-4 shrink-0 text-vellum-faint transition-colors group-hover:text-brass-bright"
            aria-hidden
          />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
              Anterior
            </p>
            <p className="mt-1 font-display text-base text-vellum group-hover:text-brass-bright">
              Visão geral da documentação
            </p>
          </div>
        </Link>
        <Link
          href="#"
          underline={false}
          tone="muted"
          className="group flex items-start justify-end gap-3 rounded-xl border border-line bg-panel/60 p-4 text-right no-underline transition-colors hover:border-brass-dim/50 hover:bg-panel sm:flex-row-reverse"
        >
          <ChevronRight
            className="mt-0.5 h-4 w-4 shrink-0 text-vellum-faint transition-colors group-hover:text-brass-bright"
            aria-hidden
          />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vellum-faint">
              Próximo
            </p>
            <p className="mt-1 font-display text-base text-vellum group-hover:text-brass-bright">
              Tokens dia e noite
            </p>
          </div>
        </Link>
      </nav>
    </DocsShell>
  )
}
