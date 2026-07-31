# Vernier

Biblioteca pessoal de componentes React — um instrumento de precisão pra montar UI em qualquer projeto.

[![License: MIT](https://img.shields.io/badge/License-MIT-4B8CFF.svg)](./LICENSE)

## A ideia

A Vernier é um design system autônomo com a identidade de um **instrumento de precisão / aço oceano**: navy profundo, painéis blue-slate, acento azure luminoso — com modos dia e noite. É onde seus componentes reutilizáveis moram — tipografia, forms, overlays, shells e instrumentos de painel — sem carregar a marca de nenhum produto externo.

**Elemento-assinatura:** cada componente na vitrine (`npm run dev`) aparece dentro de um "quadro de instrumento" — o contorno tracejado atrás, como um painel usinado que mostra "aqui é o lugar desta peça". Alterna dia/noite pelo Sol/Lua no topo (persistido em `localStorage`).

## O que já tem (~152 pranchas)

Kit expansivo pra app + site: tipografia, forms densos (Combobox, Calendar, DatePicker, DateRange, TimePicker, OTP, Wizard, TagInput, MultiSelect, MaskedInput, CurrencyInput, Phone, CreditCard, Quantity, RangeSlider, SignaturePad, TransferList, Waitlist, ImageUpload, RichTextEditor…), overlays (modais, sheet, command, context, MentionList, ConfirmDelete), navegação (navbar, mobile nav, menubar, navigation menu, app shell, UserMenu, TOC, SiteMap, SkipLink, LanguageSwitcher), marketing (Hero/HeroSplit, Pricing/PricingToggle, Footer, Carousel, Testimonial, LogoCloud/LogoMarquee, BlogArticle, Gallery, VideoEmbed, StickyCTA, FAQ, FeatureBento, ComparisonTable, SectionCTA, AnnouncementBar, TeamGrid, AuthorCard, Countdown, SocialShare, BrowserFrame, Error/Maintenance, Cookie), dados (DataTable, Charts, Heatmap, Scatter, TreeView, Kanban, FilterBar, ActivityFeed, Changelog, JsonViewer, DiffView, Terminal, SortableList), app (NotificationCenter, ChatThread, BulkActionsBar, PageHeader, ResizablePanels, ProfileHeader, SettingsSection, CommentList, FileList, OfflineBanner, ThemeToggle) e instrumentos (Gauge, Stat, SparkStat, MetricRow, DataCard, StatsStrip, AnimatedNumber, CircularProgress, Presence).

## Rodando a vitrine

```bash
npm install
npm run dev
```

Abre em `localhost:5174` — mostra todas as peças no formato de catálogo.

## Usando num projeto React

Caminho shadcn-style (copiar arquivos — sem pacote npm). Checklist pra o destino ficar com a cara da Vernier:

1. **Componentes** — copie `src/components/` (ou use MCP `install_component` peça a peça)
2. **Utilitário** — copie `src/lib/cn.ts` (`clsx` + `tailwind-merge`)
3. **Tokens + Tailwind** — copie/mescle `src/tokens.json` e, no `tailwind.config.js` do destino, as seções de `colors`, `fontSize`, `fontFamily` e `boxShadow` (e o plugin `tailwindcss-animate` se usar overlays)
4. **CSS** — traga de `src/index.css` o que for relevante: `.focus-ring`, `.vernier-slider`, `::selection`, `prefers-reduced-motion`; se o tema usar variáveis CSS no `:root`/`.dark`, copie/mescle também
5. **Fontes** — no `index.html`: Fraunces + Space Mono (Google Fonts) e General Sans (Fontshare)
6. **Tema** — `class="dark"` (ou light) no `<html>`; se usar toasts, envolva a app com `ToastProvider`

MCP `install_component` continua disponível pra puxar um componente + deps locais sem copiar o kit inteiro.

### Sync checklist (nova prancha)

Ao adicionar componente: `catalog.ts` + demo no `Showcase.tsx` + export em `src/index.ts` + entrada em `mcp/src/manifest.ts`.

## Próximas pranchas (ainda não construídas)

_(nenhuma no backlog por agora)_

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

## Licença

MIT — veja [LICENSE](./LICENSE).
