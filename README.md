# Vernier

Biblioteca pessoal de componentes React — construída pra ser reaproveitada no Dockwatch, no Rowkeeper e em qualquer projeto futuro seu.

[![License: MIT](https://img.shields.io/badge/License-MIT-C9A66B.svg)](./LICENSE)

## A ideia

Cada um dos seus projetos de infra tem sua própria identidade visual: o Dockwatch é "control room" (grafite + âmbar), o Rowkeeper é "livro-razão" (tinta + carmesim). A Vernier é a terceira identidade da família — a bancada de um **instrumentista de precisão**: latão envelhecido, madeira escura, pátina de cobre. É onde seus componentes reutilizáveis moram, sem carregar a marca de nenhum produto específico.

**Elemento-assinatura:** cada componente na vitrine (`npm run dev`) aparece dentro de um "quadro de ferramenta" — o contorno tracejado atrás, como um pegboard de oficina que mostra "aqui é o lugar desta peça".

## O que já tem (~55 peças)

**Tipografia de site:** Display, Heading 1–4, Lead, Text, Caption, Overline, InlineCode, Prose, Blockquote, Link — escala completa em `tokens.json` (Fraunces + General Sans + Space Mono, optical sizing, measure ~65ch).

**UI completa:** botões (gradient/forged/glow), formulários (Input, Textarea, Password, Search, Number, Radio, Fieldset), overlays (Dialog, Sheet, Popover, HoverCard, Toast), navegação (Navbar, Sidebar, Tabs, Breadcrumb, Stepper, Pagination), dados (Table, Stat, Gauge, Timeline, CodeBlock), feedback (Alert, Banner, Spinner, Skeleton, EmptyState, Progress) e mais.

Radix UI onde faz sentido; Tailwind com tokens, glows e metal fundido.

## Rodando a vitrine

```bash
npm install
npm run dev
```

Abre em `localhost:5174` — mostra todas as peças no formato de catálogo.

## Usando num projeto (Dockwatch, Rowkeeper, ou novo)

Já que é uso pessoal (não vai virar pacote publicado), o caminho mais simples é copiar a pasta `src/components/` + `src/lib/cn.ts` + o `tailwind.config.js` (mesclando com o do projeto de destino) direto pra dentro do projeto que for usar — do jeito que o shadcn/ui também funciona. Não precisa de versionamento de pacote pra isso.

## Próximas pranchas (ainda não construídas)

- Combobox / Command palette
- Date / Calendar
- Menubar / Context menu
- Data table com sort/filter

## Servidor MCP

A Vernier tem um servidor MCP (`mcp/`) que expõe o catálogo pro Claude Desktop/Cursor:

| Ferramenta | O que faz |
|---|---|
| `list_components` | lista as pranchas com descrição |
| `get_component` | devolve o código-fonte real de um componente + dependências |
| `get_tokens` | devolve a paleta/tipografia — use antes de gerar UI nova que deva seguir a identidade da Vernier |
| `install_component` | **escreve o componente + dependências locais direto num projeto de destino** — não roda `npm install` sozinho, só avisa quais pacotes faltam |

### Rodando

```bash
cd mcp
npm install
npm run build
```

Registra no `claude_desktop_config.json` (ou na config de MCP do Cursor):

```json
{
  "mcpServers": {
    "vernier": {
      "command": "node",
      "args": ["/caminho/completo/para/vernier/mcp/dist/index.js"]
    }
  }
}
```

Depois é só pedir, de dentro de qualquer projeto: *"instala o componente Dialog da Vernier aqui"* — o Claude chama `install_component` com o caminho do projeto atual, e os arquivos aparecem prontos.

Testei os 4 tools manualmente simulando o handshake MCP (incluindo escrita real de arquivo via `install_component`) antes de considerar pronto.

## Fontes usadas

- **Fraunces** (display, título) — Google Fonts
- **General Sans** (corpo/UI) — via Fontshare
- **Space Mono** (dado/número/código) — Google Fonts
