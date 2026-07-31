import { useState } from 'react'
import {
  CreditCard,
  Gauge,
  HelpCircle,
  KeyRound,
  Plug,
  UserCircle,
} from 'lucide-react'
import { BrowserFrame } from '../../components/BrowserFrame'
import { Button } from '../../components/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Card'
import { FAQ } from '../../components/FAQ'
import { Footer } from '../../components/Footer'
import { Navbar, NavLink } from '../../components/Navbar'
import { SearchInput } from '../../components/SearchInput'
import { Overline } from '../../components/Typography'

const HELP_CATEGORIES = [
  {
    id: 'conta',
    title: 'Conta',
    description: 'Perfil, login, convites e permissões de equipe.',
    icon: UserCircle,
    articles: 12,
  },
  {
    id: 'cobranca',
    title: 'Cobrança',
    description: 'Planos, faturas, upgrades e métodos de pagamento.',
    icon: CreditCard,
    articles: 8,
  },
  {
    id: 'api',
    title: 'API',
    description: 'Chaves, limites, webhooks e exemplos de integração.',
    icon: Plug,
    articles: 15,
  },
  {
    id: 'seguranca',
    title: 'Segurança',
    description: 'SSO, 2FA, tokens e boas práticas de acesso.',
    icon: KeyRound,
    articles: 6,
  },
  {
    id: 'componentes',
    title: 'Componentes',
    description: 'Instalação MCP, tokens, temas e troubleshooting.',
    icon: Gauge,
    articles: 22,
  },
  {
    id: 'geral',
    title: 'Geral',
    description: 'Status do serviço, SLA e contato com suporte.',
    icon: HelpCircle,
    articles: 5,
  },
]

const POPULAR_FAQ = [
  {
    id: 'faq-mcp',
    question: 'Como instalo um componente via MCP?',
    answer:
      'Configure o servidor Vernier no Cursor, use list_components para ver o catálogo e install_component com o nome do bloco. Os arquivos são copiados para o destino que você indicar.',
  },
  {
    id: 'faq-tema',
    question: 'Posso usar só o tema escuro?',
    answer:
      'Sim. Aplique a classe .dark no html ou body e importe index.css. Os tokens flipam automaticamente — não é necessário duplicar componentes.',
  },
  {
    id: 'faq-plano',
    question: 'Como faço upgrade do plano?',
    answer:
      'Em Configurações → Cobrança, escolha o plano desejado. A cobrança é proporcional ao ciclo restante e o acesso aos recursos é imediato.',
  },
  {
    id: 'faq-cancelar',
    question: 'O que acontece se eu cancelar?',
    answer:
      'Você mantém acesso até o fim do período pago. Projetos e componentes já copiados continuam no seu repositório — nada é removido localmente.',
  },
  {
    id: 'faq-suporte',
    question: 'Qual o tempo de resposta do suporte?',
    answer:
      'Plano gratuito: comunidade e docs. Pro: até 24h úteis. Equipe: SLA dedicado com canal prioritário.',
  },
]

const footerColumns = [
  {
    title: 'Ajuda',
    links: [
      { label: 'Central de ajuda', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Contato', href: '#' },
    ],
  },
  {
    title: 'Produto',
    links: [
      { label: 'Documentação', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
]

export function HelpCenterPage() {
  const [query, setQuery] = useState('')

  return (
    <BrowserFrame url="https://vernier.dev/ajuda" contentClassName="max-h-none">
      <div className="min-h-full bg-ink text-vellum">
        <Navbar
          brand={
            <>
              <Gauge className="h-4 w-4 text-brass-bright" aria-hidden />
              <span>Vernier</span>
            </>
          }
          links={
            <>
              <NavLink>Docs</NavLink>
              <NavLink active>
                Ajuda
              </NavLink>
              <NavLink>Status</NavLink>
            </>
          }
          actions={
            <Button variant="primary" size="sm">
              Falar com suporte
            </Button>
          }
        />

        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <header className="text-center">
            <Overline tone="brass">Central de ajuda</Overline>
            <h1 className="mt-3 font-display text-display-sm text-vellum sm:text-display">
              Como podemos ajudar?
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-vellum-muted">
              Busque respostas sobre conta, cobrança, API e componentes — ou navegue por categoria.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <SearchInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClear={() => setQuery('')}
                placeholder="Ex.: instalar componente, fatura, SSO…"
                aria-label="Buscar na central de ajuda"
              />
            </div>
          </header>

          <section aria-labelledby="help-categories-title" className="mt-12">
            <h2 id="help-categories-title" className="sr-only">
              Categorias de ajuda
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {HELP_CATEGORIES.map((cat) => {
                const Icon = cat.icon
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className="group h-full w-full text-left focus-ring"
                      onClick={() => undefined}
                    >
                      <Card className="h-full transition-colors duration-200 hover:border-brass-dim/50 hover:bg-panel2/40">
                        <CardHeader className="pb-2">
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-panel2 text-brass-bright transition-colors group-hover:border-brass-dim/40">
                            <Icon className="h-5 w-5" aria-hidden />
                          </div>
                          <CardTitle className="group-hover:text-brass-bright">
                            {cat.title}
                          </CardTitle>
                          <CardDescription>{cat.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-vellum-faint">
                            {cat.articles} artigos
                          </p>
                        </CardContent>
                      </Card>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          <section className="mt-14">
            <FAQ
              title="Perguntas populares"
              description="As dúvidas mais buscadas esta semana."
              items={POPULAR_FAQ}
            />
          </section>

          <div className="mt-12 rounded-2xl border border-line bg-panel/60 px-6 py-8 text-center">
            <p className="font-display text-xl text-vellum">Ainda precisa de ajuda?</p>
            <p className="mt-2 text-sm text-vellum-muted">
              Nossa equipe responde em até 24h no plano Pro.
            </p>
            <Button variant="gradient" size="lg" className="mt-5">
              Abrir ticket
            </Button>
          </div>
        </main>

        <Footer
          brand="Vernier"
          tagline="Suporte calibrado — documentação, status e SLA por plano."
          columns={footerColumns}
          legal="© 2026 Vernier"
        />
      </div>
    </BrowserFrame>
  )
}
