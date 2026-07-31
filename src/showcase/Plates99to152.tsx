import { useState } from 'react'
import { Activity, Plus, Trash2 } from 'lucide-react'
import { Plate } from './CatalogShell'
import { Button } from '../components/Button'
import { AvatarGroup } from '../components/AvatarGroup'
import { Fab } from '../components/Fab'
import { SplitButton } from '../components/SplitButton'
import { ButtonGroup } from '../components/ButtonGroup'
import { QuantityInput } from '../components/QuantityInput'
import { RangeSlider } from '../components/RangeSlider'
import { PhoneInput } from '../components/PhoneInput'
import { CreditCardInput, type CreditCardValue } from '../components/CreditCardInput'
import { SignaturePad } from '../components/SignaturePad'
import { TransferList, type TransferListItem } from '../components/TransferList'
import { SortableList, type SortableListItem } from '../components/SortableList'
import { CopyField } from '../components/CopyField'
import { JsonViewer } from '../components/JsonViewer'
import { DiffView } from '../components/DiffView'
import { Terminal } from '../components/Terminal'
import { CircularProgress } from '../components/CircularProgress'
import { AnimatedNumber } from '../components/AnimatedNumber'
import { Presence } from '../components/Presence'
import { BulkActionsBar, BulkActionButton } from '../components/BulkActionsBar'
import { PageHeader } from '../components/PageHeader'
import { ResizablePanels } from '../components/ResizablePanels'
import { Marquee } from '../components/Marquee'
import { SkipLink } from '../components/SkipLink'
import { VisuallyHidden } from '../components/VisuallyHidden'
import { Heatmap } from '../components/Heatmap'
import { VernierScatterChart } from '../components/ScatterChart'
import { SparkStat } from '../components/SparkStat'
import { MetricRow } from '../components/MetricRow'
import { DataCard } from '../components/DataCard'
import { LogoMarquee } from '../components/LogoMarquee'
import { BrowserFrame } from '../components/BrowserFrame'
import { StatsStrip } from '../components/StatsStrip'
import { Countdown } from '../components/Countdown'
import { SocialShare } from '../components/SocialShare'
import { AuthorCard } from '../components/AuthorCard'
import { TableOfContents } from '../components/TableOfContents'
import { ReadingProgress } from '../components/ReadingProgress'
import { WaitlistForm } from '../components/WaitlistForm'
import { PricingToggle, type PricingPeriod } from '../components/PricingToggle'
import { HeroSplit } from '../components/HeroSplit'
import { SiteMap } from '../components/SiteMap'
import { MaintenancePage } from '../components/MaintenancePage'
import { AuthSplit } from '../components/AuthSplit'
import { ProfileHeader } from '../components/ProfileHeader'
import { SettingsSection } from '../components/SettingsSection'
import { CommentList } from '../components/CommentList'
import { MentionList } from '../components/MentionList'
import { ImageUpload } from '../components/ImageUpload'
import { FileList, type FileListItem } from '../components/FileList'
import { EmptySearch } from '../components/EmptySearch'
import { OfflineBanner } from '../components/OfflineBanner'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { ThemeToggle } from '../components/ThemeToggle'
import { ConfirmDelete } from '../components/ConfirmDelete'
import { Breadcrumb } from '../components/Breadcrumb'
import { Switch } from '../components/Switch'
import { LoginForm } from '../components/Forms'
import { Caption, Text } from '../components/Typography'
import { CHART_COLORS } from '../components/Charts'

const HEAT_ROWS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
const HEAT_COLS = ['09', '11', '13', '15', '17']
const HEAT_CELLS = HEAT_ROWS.flatMap((row, ri) =>
  HEAT_COLS.map((col, ci) => ({
    row,
    col,
    value: ((ri * 3 + ci * 5) % 10) + 1,
  }))
)

const SPARK_DATA = [
  { t: 'a', v: 12 },
  { t: 'b', v: 18 },
  { t: 'c', v: 15 },
  { t: 'd', v: 22 },
  { t: 'e', v: 28 },
  { t: 'f', v: 24 },
]

export function Plates99to152() {
  const [qty, setQty] = useState(2)
  const [range, setRange] = useState<[number, number]>([20, 72])
  const [phoneVal, setPhoneVal] = useState('11987654321')
  const [phoneCountry, setPhoneCountry] = useState('BR')
  const [card, setCard] = useState<CreditCardValue>({
    number: '',
    expiry: '',
    cvc: '',
  })
  const [transfer, setTransfer] = useState<{
    available: TransferListItem[]
    selected: TransferListItem[]
  }>({
    available: [
      { id: 'a', label: 'Gauge' },
      { id: 'b', label: 'Stat' },
      { id: 'c', label: 'Charts' },
      { id: 'd', label: 'Kanban' },
    ],
    selected: [{ id: 'e', label: 'Button' }],
  })
  const [sortable, setSortable] = useState<SortableListItem[]>([
    { id: '1', content: 'Calibrar tokens' },
    { id: '2', content: 'Revisar MCP' },
    { id: '3', content: 'Publicar vitrine' },
  ])
  const [bulkCount, setBulkCount] = useState(3)
  const [pricing, setPricing] = useState<PricingPeriod>('yearly')
  const [locale, setLocale] = useState('pt-BR')
  const [showOffline, setShowOffline] = useState(false)
  const [showReading, setShowReading] = useState(true)
  const [notifOn, setNotifOn] = useState(true)
  const [files, setFiles] = useState<FileListItem[]>([
    { id: 'f1', name: 'tokens.json', size: 4200, status: 'done' },
    { id: 'f2', name: 'calibração.png', size: '1.2 MB', progress: 62, status: 'uploading' },
  ])
  const [animVal, setAnimVal] = useState(1284)
  const [readEl, setReadEl] = useState<HTMLDivElement | null>(null)

  return (
    <>
      <Plate number="99" title="Avatar group">
        <AvatarGroup
          items={[
            { fallback: 'MC', tone: 'brass' },
            { fallback: 'RN', tone: 'verdigris' },
            { fallback: 'LP', tone: 'neutral' },
            { fallback: 'AK', tone: 'brass' },
            { fallback: 'JV', tone: 'verdigris' },
          ]}
          max={3}
        />
      </Plate>

      <Plate number="100" title="Fab">
        <div className="relative h-40 w-full overflow-hidden rounded border border-line bg-panel2">
          <Caption className="absolute left-3 top-3 text-vellum-faint">
            Container relativo (Fab absoluto)
          </Caption>
          <Fab
            icon={<Plus />}
            label="Nova leitura"
            className="!absolute !bottom-4 !right-4"
          />
        </div>
      </Plate>

      <Plate number="101" title="Split button">
        <SplitButton
          onClick={() => undefined}
          actions={[
            { label: 'Salvar rascunho', onSelect: () => undefined },
            { label: 'Exportar JSON', onSelect: () => undefined },
            { label: 'Descartar', onSelect: () => undefined, destructive: true },
          ]}
        >
          Publicar
        </SplitButton>
      </Plate>

      <Plate number="102" title="Button group">
        <ButtonGroup>
          <button type="button" className="px-3 py-2">
            Dia
          </button>
          <button type="button" className="px-3 py-2">
            Semana
          </button>
          <button type="button" className="px-3 py-2">
            Mês
          </button>
        </ButtonGroup>
      </Plate>

      <Plate number="103" title="Quantity input">
        <QuantityInput label="Réplicas" value={qty} onChange={setQty} min={1} max={12} />
      </Plate>

      <Plate number="104" title="Range slider">
        <RangeSlider
          className="max-w-md"
          label="Faixa de latência"
          unit="ms"
          value={range}
          onChange={setRange}
          min={0}
          max={100}
        />
      </Plate>

      <Plate number="105" title="Phone input">
        <PhoneInput
          className="max-w-sm"
          label="Telefone"
          value={phoneVal}
          country={phoneCountry}
          onChange={(p, c) => {
            setPhoneVal(p)
            setPhoneCountry(c)
          }}
        />
      </Plate>

      <Plate number="106" title="Credit card">
        <CreditCardInput className="max-w-md" value={card} onChange={setCard} />
      </Plate>

      <Plate number="107" title="Signature pad">
        <SignaturePad width={360} height={140} label="Assinatura do técnico" />
      </Plate>

      <Plate number="108" title="Transfer list">
        <TransferList
          className="w-full"
          available={transfer.available}
          selected={transfer.selected}
          onChange={setTransfer}
          availableTitle="Disponíveis"
          selectedTitle="No painel"
        />
      </Plate>

      <Plate number="109" title="Sortable list">
        <SortableList className="w-full max-w-md" items={sortable} onChange={setSortable} />
      </Plate>

      <Plate number="110" title="Copy field">
        <CopyField
          className="w-full max-w-md"
          label="API token"
          value="vrn_live_4b8cff_calibração"
        />
      </Plate>

      <Plate number="111" title="Json viewer">
        <JsonViewer
          className="w-full max-w-lg"
          data={{
            instrument: 'vernier',
            plates: 152,
            modes: ['day', 'night'],
            meta: { accent: 'azure', ok: true },
          }}
        />
      </Plate>

      <Plate number="112" title="Diff view">
        <DiffView
          className="w-full max-w-xl text-xs"
          oldText={'const plates = 98\nexport const kit = "app"'}
          newText={'const plates = 152\nexport const kit = "expansivo"'}
        />
      </Plate>

      <Plate number="113" title="Terminal">
        <Terminal
          className="w-full max-w-lg"
          title="vernier — shell"
          lines={[
            { kind: 'comment', content: '# calibrar catálogo' },
            { kind: 'prompt', content: 'npm run build', prompt: 'vernier$' },
            { kind: 'output', content: '✓ 152 pranchas compiladas' },
            { kind: 'error', content: 'warn: backlog vazio' },
          ]}
        />
      </Plate>

      <Plate number="114" title="Circular progress">
        <div className="flex flex-wrap items-center gap-6">
          <CircularProgress value={68} label="CPU" />
          <CircularProgress value={42} max={50} label="Disco" size={88} />
        </div>
      </Plate>

      <Plate number="115" title="Animated number">
        <div className="flex flex-wrap items-center gap-4">
          <AnimatedNumber
            className="font-display text-4xl text-vellum"
            value={animVal}
            prefix=""
            suffix=" leituras"
          />
          <Button variant="secondary" size="sm" onClick={() => setAnimVal((n) => n + 37)}>
            +37
          </Button>
        </div>
      </Plate>

      <Plate number="116" title="Presence">
        <div className="flex flex-wrap gap-6">
          <Presence fallback="MC" status="online" showLabel />
          <Presence fallback="RN" status="away" showLabel />
          <Presence fallback="LP" status="busy" showLabel />
          <Presence fallback="AK" status="offline" showLabel />
        </div>
      </Plate>

      <Plate number="117" title="Bulk actions">
        <div className="relative flex min-h-[100px] w-full flex-col gap-3">
          <Button variant="secondary" size="sm" onClick={() => setBulkCount(3)}>
            Selecionar 3
          </Button>
          <BulkActionsBar
            count={bulkCount}
            onClear={() => setBulkCount(0)}
            className="static mx-0 w-full max-w-none"
            actions={
              <>
                <BulkActionButton>Arquivar</BulkActionButton>
                <BulkActionButton variant="danger">
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                  Excluir
                </BulkActionButton>
              </>
            }
          />
        </div>
      </Plate>

      <Plate number="118" title="Page header">
        <PageHeader
          className="w-full"
          breadcrumbs={
            <Breadcrumb items={[{ label: 'Painel', href: '#' }, { label: 'Instrumentos' }]} />
          }
          title="Instrumentos ativos"
          description="Calibração e leituras da bancada oceânica."
          actions={
            <Button size="sm" variant="glow">
              Nova leitura
            </Button>
          }
        />
      </Plate>

      <Plate number="119" title="Resizable panels">
        <ResizablePanels
          className="h-40 w-full rounded border border-line"
          left={
            <div className="flex h-full items-center justify-center bg-panel2 p-3 text-sm text-vellum-muted">
              Esquerda
            </div>
          }
          right={
            <div className="flex h-full items-center justify-center bg-panel p-3 text-sm text-vellum-muted">
              Direita
            </div>
          }
        />
      </Plate>

      <Plate number="120" title="Marquee">
        <Marquee className="w-full rounded border border-line bg-panel2 py-3" duration={20}>
          <span className="font-mono text-xs text-brass-bright">azure</span>
          <span className="font-mono text-xs text-vellum-muted">· precisão ·</span>
          <span className="font-mono text-xs text-verdigris">aço oceano</span>
          <span className="font-mono text-xs text-vellum-muted">· 152 pranchas ·</span>
          <span className="font-mono text-xs text-brass">Vernier</span>
        </Marquee>
      </Plate>

      <Plate number="121" title="Skip link">
        <div className="relative w-full rounded border border-line bg-panel2 p-4">
          <Caption className="mb-2 text-vellum-faint">
            Tab aqui — o link fica visível no foco
          </Caption>
          <SkipLink href="#plate-122" className="!relative !translate-y-0" />
        </div>
      </Plate>

      <Plate number="122" title="Visually hidden">
        <Button>
          Baixar relatório
          <VisuallyHidden> — PDF, 240 KB</VisuallyHidden>
        </Button>
      </Plate>

      <Plate number="123" title="Heatmap">
        <Heatmap
          className="w-full max-w-md"
          rows={HEAT_ROWS}
          cols={HEAT_COLS}
          cells={HEAT_CELLS}
          aria-label="Leituras por hora"
        />
      </Plate>

      <Plate number="124" title="Scatter">
        <VernierScatterChart
          className="w-full"
          height={220}
          xLabel="Latência"
          yLabel="Precisão"
          series={[
            {
              key: 'a',
              label: 'Dia',
              color: CHART_COLORS.azureBright,
              data: [
                { x: 12, y: 88, name: 'A1' },
                { x: 28, y: 76, name: 'A2' },
                { x: 45, y: 91, name: 'A3' },
                { x: 60, y: 70, name: 'A4' },
              ],
            },
            {
              key: 'b',
              label: 'Noite',
              color: CHART_COLORS.verdigris,
              data: [
                { x: 18, y: 82, name: 'B1' },
                { x: 35, y: 94, name: 'B2' },
                { x: 52, y: 68, name: 'B3' },
              ],
            },
          ]}
        />
      </Plate>

      <Plate number="125" title="Spark stat">
        <SparkStat
          className="w-56"
          label="Leituras / h"
          value="1.2k"
          delta="+8%"
          deltaTone="up"
          data={SPARK_DATA}
          dataKey="v"
          sparkColor={CHART_COLORS.azureBright}
        />
      </Plate>

      <Plate number="126" title="Metric row">
        <MetricRow
          className="w-full"
          metrics={[
            { label: 'Uptime', value: '99.9%', delta: '+0.1', deltaTone: 'up' },
            { label: 'Latência', value: '42ms', delta: '-6ms', deltaTone: 'up' },
            { label: 'Erros', value: '0.2%', delta: '+0.1', deltaTone: 'down' },
          ]}
        />
      </Plate>

      <Plate number="127" title="Data card">
        <DataCard
          className="w-64"
          label="Calibrações"
          value="384"
          delta="+12%"
          deltaTone="up"
          description="Últimos 30 dias na bancada."
          footerHref="#plate-00"
          icon={<Activity className="h-4 w-4" />}
        />
      </Plate>

      <Plate number="128" title="Logo marquee">
        <LogoMarquee
          className="w-full"
          title="Parceiros de precisão"
          logos={[
            { name: 'Azure Steel' },
            { name: 'Deep Gauge' },
            { name: 'Ocean Lab' },
            { name: 'Nautilus UI' },
            { name: 'Calibra' },
          ]}
          duration={22}
        />
      </Plate>

      <Plate number="129" title="Browser frame">
        <BrowserFrame className="w-full max-w-lg" url="https://vernier.dev/catalog">
          <div className="space-y-2 p-4">
            <Text className="text-sm text-vellum">Vitrine Vernier</Text>
            <Caption>152 pranchas no aço oceano.</Caption>
          </div>
        </BrowserFrame>
      </Plate>

      <Plate number="130" title="Stats strip">
        <StatsStrip
          className="w-full"
          stats={[
            { value: '152', label: 'Pranchas' },
            { value: '2', label: 'Temas' },
            { value: 'MCP', label: 'Instalação' },
            { value: '0', label: 'Backlog' },
          ]}
        />
      </Plate>

      <Plate number="131" title="Countdown">
        <Countdown
          target={Date.now() + 1000 * 60 * 60 * 26 + 1000 * 45}
          labels={{ days: 'dias', hours: 'horas', minutes: 'min', seconds: 'seg' }}
        />
      </Plate>

      <Plate number="132" title="Social share">
        <SocialShare url="https://vernier.dev" title="Vernier — instrumento de UI" />
      </Plate>

      <Plate number="133" title="Author card">
        <AuthorCard
          className="w-full max-w-md"
          name="Marina Costa"
          role="Design systems"
          bio="Tokens, tipografia e atmosfera oceano."
          links={[
            { label: 'Site', href: '#' },
            { label: 'GitHub', href: '#' },
          ]}
        />
      </Plate>

      <Plate number="134" title="Table of contents">
        <TableOfContents
          className="w-56"
          activeId="inst"
          items={[
            { id: 'intro', title: 'Introdução', level: 2 },
            { id: 'inst', title: 'Instrumentos', level: 2 },
            { id: 'gauge', title: 'Gauge', level: 3 },
            { id: 'mcp', title: 'MCP', level: 2 },
          ]}
        />
      </Plate>

      <Plate number="135" title="Reading progress">
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center gap-3">
            <Switch checked={showReading} onCheckedChange={setShowReading} />
            <Caption>Mostrar barra</Caption>
          </div>
          {showReading && (
            <div className="relative overflow-hidden rounded border border-line">
              {readEl && (
                <ReadingProgress
                  fixed={false}
                  target={readEl}
                  className="!relative !top-0"
                />
              )}
              <div
                ref={setReadEl}
                className="max-h-32 overflow-y-auto p-4 text-sm text-vellum-muted"
              >
                <p className="mb-3">
                  Role este painel para ver a barra de progresso de leitura acompanhar o scroll
                  do container — não da página inteira.
                </p>
                <p className="mb-3">
                  A Vernier trata feedbacks longos com o mesmo aço oceano: navy, azure e painéis
                  blue-slate.
                </p>
                <p className="mb-3">
                  Mais texto de exemplo para alongar o conteúdo e permitir um deslocamento
                  perceptível na barra.
                </p>
                <p>Fim da nota de calibração.</p>
              </div>
            </div>
          )}
        </div>
      </Plate>

      <Plate number="136" title="Waitlist form">
        <WaitlistForm className="w-full max-w-md" count={842} onSubmit={async () => undefined} />
      </Plate>

      <Plate number="137" title="Pricing toggle">
        <div className="flex flex-col items-start gap-3">
          <PricingToggle value={pricing} onChange={setPricing} yearlyBadge="−20%" />
          <Caption>
            Plano {pricing === 'yearly' ? 'anual' : 'mensal'} selecionado
          </Caption>
        </div>
      </Plate>

      <Plate number="138" title="Hero split">
        <HeroSplit
          className="w-full"
          eyebrow="Instrumento"
          title="Calibre a interface"
          description="Hero em duas colunas — texto e mídia no aço oceano."
          primaryAction={{ label: 'Abrir catálogo' }}
          secondaryAction={{ label: 'Ver tokens' }}
          media={
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-brass/20 to-panel2 font-mono text-xs text-brass-bright">
              mídia
            </div>
          }
        />
      </Plate>

      <Plate number="139" title="Site map">
        <SiteMap
          className="w-full"
          title="Mapa do site"
          columns={[
            {
              title: 'Produto',
              links: [
                { label: 'Catálogo', href: '#topo' },
                { label: 'Tokens', href: '#' },
              ],
            },
            {
              title: 'Desenvolvedores',
              links: [
                { label: 'MCP', href: '#' },
                { label: 'README', href: '#' },
              ],
            },
            {
              title: 'Empresa',
              links: [
                { label: 'Sobre', href: '#' },
                { label: 'Changelog', href: '#plate-97' },
              ],
            },
          ]}
        />
      </Plate>

      <Plate number="140" title="Maintenance page">
        <MaintenancePage
          className="w-full !min-h-[280px] !py-10"
          action={
            <Button variant="secondary" size="sm">
              Status da bancada
            </Button>
          }
        />
      </Plate>

      <Plate number="141" title="Auth split">
        <AuthSplit
          className="w-full max-w-3xl overflow-hidden rounded-xl border border-line"
          brandTitle="Vernier"
          brandDescription="Entre para calibrar a bancada."
        >
          <div className="p-6">
            <LoginForm onSubmit={() => undefined} />
          </div>
        </AuthSplit>
      </Plate>

      <Plate number="142" title="Profile header">
        <ProfileHeader
          className="w-full max-w-xl"
          name="Lia Prado"
          subtitle="Produto · Vernier"
          cover={
            <div className="h-24 w-full bg-gradient-to-r from-brass/30 via-panel2 to-verdigris/20" />
          }
          actions={
            <Button size="sm" variant="secondary">
              Editar
            </Button>
          }
        />
      </Plate>

      <Plate number="143" title="Settings section">
        <SettingsSection
          className="w-full max-w-lg"
          title="Notificações"
          description="Quando a bancada deve te avisar."
          action={
            <Button size="sm" variant="ghost">
              Restaurar
            </Button>
          }
        >
          <div className="flex items-center justify-between gap-4">
            <Text className="text-sm">Alertas de calibração</Text>
            <Switch checked={notifOn} onCheckedChange={setNotifOn} />
          </div>
        </SettingsSection>
      </Plate>

      <Plate number="144" title="Comment list">
        <CommentList
          className="w-full max-w-lg"
          comments={[
            {
              id: '1',
              author: 'Marina',
              time: 'há 2 h',
              body: 'A placa do Heatmap ficou limpa.',
              replies: [
                {
                  id: '1a',
                  author: 'Rafael',
                  time: 'há 1 h',
                  body: 'Concordo — escala azure perfeita.',
                },
              ],
            },
            {
              id: '2',
              author: 'Lia',
              time: 'há 40 min',
              body: 'Próximo: wiring no MCP.',
            },
          ]}
        />
      </Plate>

      <Plate number="145" title="Mention list">
        <MentionList
          standalone
          className="w-64 rounded border border-line bg-panel"
          activeId="m2"
          options={[
            { id: 'm1', label: 'Marina Costa', handle: 'marina' },
            { id: 'm2', label: 'Rafael Nunes', handle: 'rafa' },
            { id: 'm3', label: 'Lia Prado', handle: 'lia' },
          ]}
        />
      </Plate>

      <Plate number="146" title="Image upload">
        <ImageUpload className="w-full max-w-md" maxFiles={4} />
      </Plate>

      <Plate number="147" title="File list">
        <FileList
          className="w-full max-w-md"
          files={files}
          onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
        />
      </Plate>

      <Plate number="148" title="Empty search">
        <EmptySearch
          className="w-full max-w-md"
          query="manômetro-xyz"
          action={
            <Button size="sm" variant="secondary">
              Limpar busca
            </Button>
          }
        />
      </Plate>

      <Plate number="149" title="Offline banner">
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center gap-3">
            <Switch checked={showOffline} onCheckedChange={setShowOffline} />
            <Caption>Simular offline</Caption>
          </div>
          <OfflineBanner offline={showOffline} message="Você está offline — leituras em fila." />
          {!showOffline && (
            <Caption className="text-vellum-faint">Banner oculto enquanto online.</Caption>
          )}
        </div>
      </Plate>

      <Plate number="150" title="Language switcher">
        <LanguageSwitcher value={locale} onChange={setLocale} />
      </Plate>

      <Plate number="151" title="Theme toggle">
        <ThemeToggle showLabel />
      </Plate>

      <Plate number="152" title="Confirm delete">
        <ConfirmDelete
          title="Excluir instrumento?"
          description="O Gauge #22 será removido da bancada. Essa ação não pode ser desfeita."
          trigger={<Button variant="danger">Excluir Gauge</Button>}
        />
      </Plate>
    </>
  )
}
