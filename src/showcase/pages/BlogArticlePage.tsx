import { BlogArticle } from '../../components/BlogArticle'
import { MarketingShell } from './MarketingShell'

export function BlogArticlePage() {
  return (
    <MarketingShell>
      <div className="px-5 py-10 sm:px-8">
        <BlogArticle
          category="Calibração"
          title="Como ler um painel sem perder o fio"
          author="Equipe Vernier"
          date="31 jul 2026"
          readTime="4 min"
          coverSrc="https://picsum.photos/seed/vernier-blog/960/540"
          coverAlt="Painel com luz azul sobre metal"
          toc={
            <ul className="space-y-2 text-sm text-vellum-muted">
              <li>
                <a href="#hierarquia" className="hover:text-brass-bright">
                  Hierarquia visual
                </a>
              </li>
              <li>
                <a href="#contraste" className="hover:text-brass-bright">
                  Contraste e escala
                </a>
              </li>
              <li>
                <a href="#acao" className="hover:text-brass-bright">
                  Pontos de ação
                </a>
              </li>
            </ul>
          }
        >
          <p id="hierarquia">
            Um bom instrumento não grita. Ele organiza escala, valor e estado para que o olho
            encontre o que importa em poucos segundos.
          </p>
          <p id="contraste">
            Na Vernier, tipografia e painéis blue-slate trabalham juntos: o display marca o
            título, o mono carrega metadados, e o azure aponta a ação.
          </p>
          <p id="acao">
            Páginas completas não são coleções de widgets — são composições onde cada peça
            reforça a narrativa do produto.
          </p>
        </BlogArticle>
      </div>
    </MarketingShell>
  )
}
