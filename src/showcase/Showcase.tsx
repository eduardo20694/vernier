import { useState } from 'react'
import {
  Activity,
  AlignLeft,
  Bold,
  Box,
  ChevronDown,
  File,
  FileText,
  Folder,
  Gauge as GaugeIcon,
  Italic,
  Layers,
  Play,
  Power,
  RefreshCw,
  Search,
  Server,
  Settings,
  Sparkles,
  Terminal as TerminalIcon,
} from 'lucide-react'
import { Button } from '../components/Button'
import { IconButton } from '../components/IconButton'
import { Input } from '../components/Input'
import { Textarea } from '../components/Textarea'
import { PasswordInput } from '../components/PasswordInput'
import { SearchInput } from '../components/SearchInput'
import { NumberField } from '../components/NumberField'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card'
import { InstrumentCard } from '../components/InstrumentCard'
import { Badge } from '../components/Badge'
import { Switch } from '../components/Switch'
import { Checkbox } from '../components/Checkbox'
import { RadioGroup, RadioGroupItem } from '../components/RadioGroup'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs'
import { TooltipProvider, Tooltip } from '../components/Tooltip'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../components/DropdownMenu'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogClose } from '../components/Dialog'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '../components/AlertDialog'
import { FormDialog } from '../components/FormDialog'
import { CommandPalette } from '../components/CommandPalette'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
} from '../components/ContextMenu'
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from '../components/Sheet'
import { SidebarNav } from '../components/SidebarNav'
import { TopNav, AppShell } from '../components/AppShell'
import { LoginForm, SettingsForm } from '../components/Forms'
import { Navbar, NavLink } from '../components/Navbar'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/Table'
import { Sidebar } from '../components/Sidebar'
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from '../components/Select'
import { Alert } from '../components/Alert'
import { Progress } from '../components/Progress'
import { Skeleton } from '../components/Skeleton'
import { Spinner } from '../components/Spinner'
import { ToastProvider, useToast } from '../components/Toast'
import { Pagination } from '../components/Pagination'
import { EmptyState } from '../components/EmptyState'
import { Kbd } from '../components/Kbd'
import { Gauge } from '../components/Gauge'
import { Stat } from '../components/Stat'
import { SegmentedControl } from '../components/SegmentedControl'
import { Callout } from '../components/Callout'
import { Avatar } from '../components/Avatar'
import { Chip } from '../components/Chip'
import { StatusDot } from '../components/StatusDot'
import { Divider } from '../components/Divider'
import { Slider } from '../components/Slider'
import { Breadcrumb } from '../components/Breadcrumb'
import { Timeline } from '../components/Timeline'
import {
  Display,
  Heading,
  Subtitle,
  Lead,
  Text,
  Caption,
  Overline,
  Small,
  Strong,
  Em,
  Mark,
  InlineCode,
  Mono,
  GradientText,
  Truncate,
  LineClamp,
  Balance,
  List,
  OrderedList,
  DefinitionList,
  Prose,
} from '../components/Typography'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../components/Collapsible'
import { Popover, PopoverTrigger, PopoverContent } from '../components/Popover'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../components/HoverCard'
import { ScrollArea } from '../components/ScrollArea'
import { FileDropzone } from '../components/FileDropzone'
import { Stepper } from '../components/Stepper'
import { Stack } from '../components/Layout'
import { Link } from '../components/Link'
import { Blockquote } from '../components/Blockquote'
import { CodeBlock } from '../components/CodeBlock'
import { Banner } from '../components/Banner'
import { CopyButton } from '../components/CopyButton'
import { AspectRatio } from '../components/AspectRatio'
import { Fieldset, Field } from '../components/Field'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { PricingCards } from '../components/PricingCards'
import { ErrorPage } from '../components/ErrorPage'
import { CookieBanner } from '../components/CookieBanner'
import { MobileNav } from '../components/MobileNav'
import { Wizard } from '../components/Wizard'
import { Combobox } from '../components/Combobox'
import { Calendar } from '../components/Calendar'
import { DatePicker } from '../components/DatePicker'
import { DataTable } from '../components/DataTable'
import {
  MenubarMenu,
  MenubarBar,
  MenubarTriggerBtn,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
} from '../components/Menubar'
import { OtpInput } from '../components/OtpInput'
import { Toggle, ToggleGroupItem, ToggleGroupBar } from '../components/ToggleGroup'
import { Carousel } from '../components/Carousel'
import { Testimonial, TestimonialGrid } from '../components/Testimonial'
import { LogoCloud } from '../components/LogoCloud'
import { Newsletter } from '../components/Newsletter'
import { BlogArticle } from '../components/BlogArticle'
import { Gallery } from '../components/Gallery'
import { VideoEmbed } from '../components/VideoEmbed'
import { StickyCTA } from '../components/StickyCTA'
import {
  NavigationMenuBar,
  NavigationMenuListBar,
  NavigationMenuItem,
  NavigationMenuTriggerBtn,
  NavigationMenuContentPanel,
  NavigationMenuLinkItem,
} from '../components/NavigationMenu'
import {
  AreaChartCard,
  BarChartCard,
  ChartCardShell,
  ComboChartCard,
  DonutChartCard,
  FunnelChartCard,
  RadarChartCard,
  Sparkline,
  CHART_COLORS,
} from '../components/Charts'
import { TreeView, type TreeNode } from '../components/TreeView'
import { ColorPicker } from '../components/ColorPicker'
import { TagInput } from '../components/TagInput'
import { MultiSelect } from '../components/MultiSelect'
import { DateRangePicker, type DateRange } from '../components/DateRangePicker'
import { TimePicker } from '../components/TimePicker'
import { MaskedInput } from '../components/MaskedInput'
import { CurrencyInput } from '../components/CurrencyInput'
import { Rating } from '../components/Rating'
import { Kanban, type KanbanColumn } from '../components/Kanban'
import { NotificationCenter, type NotificationItem } from '../components/NotificationCenter'
import { FilterBar, type ActiveFilter } from '../components/FilterBar'
import { ActivityFeed } from '../components/ActivityFeed'
import { ChatThread, type ChatMessage } from '../components/ChatThread'
import { UserMenu } from '../components/UserMenu'
import { FAQ } from '../components/FAQ'
import { FeatureBento } from '../components/FeatureBento'
import { ComparisonTable } from '../components/ComparisonTable'
import { SectionCTA } from '../components/SectionCTA'
import { AnnouncementBar } from '../components/AnnouncementBar'
import { TeamGrid } from '../components/TeamGrid'
import { Changelog } from '../components/Changelog'
import { RichTextEditor } from '../components/RichTextEditor'
import { CatalogShell, Plate } from './CatalogShell'
import { Plates99to152 } from './Plates99to152'

const MONTHLY_CHART = [
  { mes: 'Jan', leituras: 42, alertas: 8, meta: 50 },
  { mes: 'Fev', leituras: 55, alertas: 6, meta: 52 },
  { mes: 'Mar', leituras: 48, alertas: 11, meta: 54 },
  { mes: 'Abr', leituras: 67, alertas: 5, meta: 56 },
  { mes: 'Mai', leituras: 72, alertas: 4, meta: 58 },
  { mes: 'Jun', leituras: 61, alertas: 7, meta: 60 },
  { mes: 'Jul', leituras: 78, alertas: 3, meta: 62 },
  { mes: 'Ago', leituras: 84, alertas: 5, meta: 64 },
  { mes: 'Set', leituras: 91, alertas: 4, meta: 66 },
  { mes: 'Out', leituras: 88, alertas: 6, meta: 68 },
  { mes: 'Nov', leituras: 96, alertas: 3, meta: 70 },
  { mes: 'Dez', leituras: 102, alertas: 2, meta: 72 },
]

const CHART_SERIES = [
  { key: 'leituras', label: 'Leituras', color: CHART_COLORS.azureBright },
  { key: 'alertas', label: 'Alertas', color: CHART_COLORS.verdigris },
]

const DONUT_SLICES = [
  { key: 'ok', label: 'Estável', value: 68, color: CHART_COLORS.azureBright },
  { key: 'attn', label: 'Atenção', value: 22, color: CHART_COLORS.verdigris },
  { key: 'crit', label: 'Crítico', value: 10, color: CHART_COLORS.rust },
]

const FUNNEL_STAGES = [
  { key: 'cap', label: 'Captura', value: 1240, color: CHART_COLORS.azureBright },
  { key: 'cal', label: 'Calibração', value: 890, color: CHART_COLORS.azure },
  { key: 'val', label: 'Validação', value: 610, color: CHART_COLORS.verdigris },
  { key: 'pub', label: 'Publicação', value: 420, color: CHART_COLORS.azureDim },
]

const RADAR_DATA = [
  { eixo: 'Precisão', atual: 92, alvo: 88 },
  { eixo: 'Latência', atual: 78, alvo: 85 },
  { eixo: 'Cobertura', atual: 86, alvo: 80 },
  { eixo: 'Estabilidade', atual: 90, alvo: 90 },
  { eixo: 'Ruído', atual: 72, alvo: 75 },
]

const SPARK_A = MONTHLY_CHART.map(({ mes, leituras }) => ({ mes, v: leituras }))
const SPARK_B = MONTHLY_CHART.map(({ mes, alertas }) => ({ mes, v: alertas }))
const SPARK_C = MONTHLY_CHART.map(({ mes, meta }) => ({ mes, v: meta }))

const FILE_TREE: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: <Folder className="h-3.5 w-3.5 text-brass-bright" />,
    children: [
      {
        id: 'components',
        label: 'components',
        icon: <Folder className="h-3.5 w-3.5 text-brass-bright" />,
        children: [
          {
            id: 'button',
            label: 'Button.tsx',
            icon: <File className="h-3.5 w-3.5 text-vellum-muted" />,
          },
          {
            id: 'charts',
            label: 'Charts.tsx',
            icon: <File className="h-3.5 w-3.5 text-vellum-muted" />,
          },
        ],
      },
      {
        id: 'tokens',
        label: 'tokens.json',
        icon: <File className="h-3.5 w-3.5 text-vellum-muted" />,
      },
    ],
  },
  {
    id: 'mcp',
    label: 'mcp',
    icon: <Folder className="h-3.5 w-3.5 text-brass-bright" />,
    children: [
      {
        id: 'manifest',
        label: 'manifest.ts',
        icon: <File className="h-3.5 w-3.5 text-vellum-muted" />,
      },
    ],
  },
]

const MULTI_OPTS = [
  { value: 'sa-east-1', label: 'São Paulo' },
  { value: 'us-east-1', label: 'N. Virginia' },
  { value: 'eu-west-1', label: 'Irlanda' },
  { value: 'ap-south-1', label: 'Mumbai' },
]

const INITIAL_KANBAN: KanbanColumn[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    cards: [
      { id: 'k1', title: 'Calibrar Gauge', description: 'Ajuste de arco 270°', tone: 'brass' },
      { id: 'k2', title: 'Tokens dia/noite', description: 'Revisar contraste', tone: 'neutral' },
    ],
  },
  {
    id: 'andamento',
    title: 'Em andamento',
    cards: [
      { id: 'k3', title: 'Kanban na vitrine', description: 'Demo com 3 colunas', tone: 'verdigris' },
    ],
  },
  {
    id: 'feito',
    title: 'Feito',
    cards: [
      { id: 'k4', title: 'Charts plate 75', description: 'Redesign instrumental', tone: 'verdigris' },
    ],
  },
]

const INITIAL_NOTIFS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Deploy concluído',
    description: 'vernier@latest publicado na vitrine.',
    time: 'há 2 min',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Calibração agendada',
    description: 'Manômetro #22 às 14:00.',
    time: 'há 1 h',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Backup noturno',
    description: 'Snapshot gravado com sucesso.',
    time: 'ontem',
    unread: false,
  },
]

const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'c1',
    from: 'them',
    author: 'Lia',
    body: 'A placa 75 dos Charts ficou impecável.',
    time: '09:12',
  },
  {
    id: 'c2',
    from: 'me',
    body: 'Valeu — agora vamos plugar as 21 peças novas.',
    time: '09:14',
  },
  {
    id: 'c3',
    from: 'them',
    author: 'Lia',
    body: 'Kanban com três colunas e FAQ em PT-BR, combinado?',
    time: '09:15',
  },
]

function ToastDemo() {
  const { toast } = useToast()

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Backup concluído',
            description: 'Snapshot gravado em /var/backups.',
            tone: 'verdigris',
          })
        }
      >
        Toast saudável
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Disco quase cheio',
            description: 'web-01 em 91% de uso.',
            tone: 'brass',
          })
        }
      >
        Toast atenção
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast({
            title: 'Falha no deploy',
            description: 'Healthcheck não respondeu em 30s.',
            tone: 'rust',
          })
        }
      >
        Toast crítico
      </Button>
    </div>
  )
}

function ShowcaseBody() {
  const [switchOn, setSwitchOn] = useState(true)
  const [page, setPage] = useState(3)
  const [region, setRegion] = useState('sa-east-1')
  const [view, setView] = useState<'lista' | 'grade' | 'mapa'>('grade')
  const [gain, setGain] = useState(42)
  const [tags, setTags] = useState(['produção', 'latência', 'ssd'])
  const [search, setSearch] = useState('')
  const [replicas, setReplicas] = useState(3)
  const [plan, setPlan] = useState('pro')
  const [nav, setNav] = useState('painel')
  const [cmdOpen, setCmdOpen] = useState(false)
  const [shellNav, setShellNav] = useState('painel')
  const [topSearch, setTopSearch] = useState('')
  const [combo, setCombo] = useState('sa-east-1')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [pickedDate, setPickedDate] = useState<Date | undefined>()
  const [otp, setOtp] = useState('')
  const [align, setAlign] = useState('left')
  const [showCookie, setShowCookie] = useState(false)
  const [showSticky, setShowSticky] = useState(false)
  const [stickyKey, setStickyKey] = useState(0)
  const [treeSelected, setTreeSelected] = useState('charts')
  const [accentColor, setAccentColor] = useState('#3E8AE8')
  const [inputTags, setInputTags] = useState(['produção', 'azure', 'vitrine'])
  const [multiRegions, setMultiRegions] = useState(['sa-east-1', 'eu-west-1'])
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2026, 6, 1),
    to: new Date(2026, 6, 31),
  })
  const [timeValue, setTimeValue] = useState('14:30')
  const [phone, setPhone] = useState('11987654321')
  const [cpf, setCpf] = useState('52998224725')
  const [amount, setAmount] = useState<number | null>(1290.5)
  const [rating, setRating] = useState(4)
  const [kanbanCols, setKanbanCols] = useState(INITIAL_KANBAN)
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS)
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([
    { id: 'reg', label: 'Região: SP', tone: 'brass' },
    { id: 'st', label: 'Status: ativo', tone: 'verdigris' },
  ])
  const [chatMsgs, setChatMsgs] = useState(INITIAL_CHAT)
  const [showAnnounce, setShowAnnounce] = useState(false)
  const [announceKey, setAnnounceKey] = useState(0)
  const [richHtml, setRichHtml] = useState(
    '<p>Calibre o <strong>instrumento</strong> e publique a nota.</p>'
  )

  return (
    <>
      <section
        id="topo"
        className="topo-hero relative mb-16 -mx-5 overflow-hidden border-y border-line/70 sm:-mx-8 lg:-mx-10"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 topo-metal" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-32 h-[28rem] w-[28rem] rounded-full bg-brass/[0.12] blur-3xl topo-bloom"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-verdigris/[0.08] blur-3xl topo-sweep"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/45 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line/80 to-transparent"
        />

        {/* Gauge como atmosfera — plano, não adesivo */}
        <div
          aria-hidden
          className="topo-gauge-atmosphere pointer-events-none absolute -right-6 bottom-[-10%] hidden md:block lg:right-[8%] lg:bottom-[-6%]"
        >
          <Gauge value={68} size="lg" tone="brass" />
        </div>

        <div className="relative z-[2] mx-auto flex min-h-[min(72vh,560px)] max-w-[1400px] flex-col justify-end px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Display className="vernier-mark text-[clamp(3.5rem,12vw,7.5rem)] leading-[0.88]">
            Vernier
          </Display>
          <Lead className="mt-5 max-w-md text-vellum-muted">
            Peças de precisão pra React — no aço oceano.
          </Lead>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              variant="glow"
              size="lg"
              onClick={() => document.getElementById('catalog-search')?.focus()}
            >
              <Search className="h-4 w-4" />
              Abrir o catálogo
            </Button>
            <Button
              variant="forged"
              size="lg"
              onClick={() => document.getElementById('plate-00')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver tipografia
            </Button>
            <Caption className="m-0 w-full text-vellum-faint sm:ml-1 sm:w-auto">
              <Kbd className="mx-0.5">/</Kbd> pra filtrar
            </Caption>
          </div>
        </div>
      </section>

      <Plate number="00" title="Tipografia">
        <Stack gap="lg" className="w-full max-w-2xl">
          <div>
            <Overline tone="brass">Hierarquia</Overline>
            <Balance as="div">
              <Display size="sm" className="mt-2">
                Display em <GradientText>Fraunces</GradientText>
              </Display>
            </Balance>
            <Subtitle className="mt-3">
              Subtitle — entre o título e o lead, mais contido que o parágrafo de abertura.
            </Subtitle>
            <Lead className="mt-2">
              Lead: o parágrafo que abre a página — largo, respirado, com tracking negativo suave.
            </Lead>
          </div>

          <div className="space-y-2">
            <Heading level={1}>Heading 1 — precisão tipográfica</Heading>
            <Heading level={2}>Heading 2 — hierarquia clara</Heading>
            <Heading level={3}>Heading 3 — seção</Heading>
            <Heading level={4}>Heading 4 — subtítulo</Heading>
            <Heading level={5}>Heading 5 — detalhe</Heading>
            <Heading level={6}>Heading 6 — mínimo display</Heading>
          </div>

          <div className="space-y-2">
            <Overline tone="brass">Corpo</Overline>
            <Text size="lg">
              Text lg — corpo largo, quase lead, pra trechos que pedem mais ar.
            </Text>
            <Text>
              Text md: texto corrido com measure (~65ch). Use{' '}
              <InlineCode>InlineCode</InlineCode> pra tokens e APIs.
            </Text>
            <Text size="sm" tone="muted">
              Text sm — helpers de formulário, metadados secundários.
            </Text>
            <Text size="xs" tone="faint">
              Text xs — corpo auxiliar adjacente à caption.
            </Text>
            <Caption>Caption — rodapé, timestamps, notas de calibração.</Caption>
            <Text>
              Também em <Small>Small</Small> — caption embutida no fluxo.
            </Text>
            <Text tone="verdigris">Tone verdigris — teal oceânico.</Text>
            <Text tone="rust">Tone rust — alerta em vermelho frio.</Text>
          </div>

          <div className="space-y-2">
            <Overline tone="brass">Inline</Overline>
            <Text>
              Ênfase com <Strong>Strong</Strong>, <Em>Em</Em> e destaque em{' '}
              <Mark>Mark</Mark> — wash azure, sem neon.
            </Text>
          </div>

          <div className="space-y-2">
            <Overline tone="brass">Mono + gradiente</Overline>
            <Text>
              IDs e números em <Mono>vrn-04a2</Mono> · <Mono size="md" tone="muted">128.0</Mono>
            </Text>
            <Heading level={3}>
              <GradientText>GradientText</GradientText> — metal azure no título
            </Heading>
          </div>

          <div className="space-y-3">
            <Overline tone="brass">Listas</Overline>
            <List>
              <li>Fraunces no display</li>
              <li>General Sans no corpo</li>
              <li>Space Mono nos dados</li>
            </List>
            <OrderedList>
              <li>Calibrar escala</li>
              <li>Marcar zero</li>
              <li>Ler o vernier</li>
            </OrderedList>
            <DefinitionList>
              <dt>passo</dt>
              <dd>Menor divisão da escala principal.</dd>
              <dt>nônio</dt>
              <dd>Escala auxiliar que subdivisão a leitura.</dd>
            </DefinitionList>
          </div>

          <div className="space-y-3">
            <Overline tone="brass">Clamp</Overline>
            <div className="max-w-xs rounded-md border border-line bg-panel2/60 px-3 py-2">
              <Truncate>
                Truncate: caminho longo demais pra caber numa linha — /bancada/instrumentos/vernier/calibração…
              </Truncate>
            </div>
            <LineClamp lines={3} className="max-w-md text-body text-vellum-muted">
              LineClamp (3 linhas): o instrumentista marca o zero, alinha a escala e lê o nônio
              sob a luz fria do aço. Cada traço conta — azure, oceano e precisão guardam a medida
              com a mesma clareza de um bom parágrafo tipográfico bem calibrado na vitrine.
            </LineClamp>
          </div>

          <Blockquote cite="Manual do instrumentista">
            Cada peça tem seu lugar no catálogo. Tipografia também.
          </Blockquote>

          <Prose>
            <h2>Prose</h2>
            <p>
              Bloco editorial com estilos herdados pra conteúdo longo — docs, changelogs, runbooks.
              Links em <Link href="#">azure</Link>, <code>code</code>, <mark>mark</mark> e ênfase
              já calibrados.
            </p>
            <blockquote>Prose também estiliza blockquote e o separador abaixo.</blockquote>
            <hr />
            <ul>
              <li>Fraunces no display (optical size)</li>
              <li>General Sans no corpo</li>
              <li>Space Mono nos dados</li>
            </ul>
          </Prose>
        </Stack>
      </Plate>

      <Plate number="01" title="Botão">
        <Button>Ação primária</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="ghost">Discreto</Button>
        <Button variant="danger">Remover</Button>
        <Button loading>Processando</Button>
        <Button disabled>Desabilitado</Button>
      </Plate>

      <Plate number="01b" title="Botões fundidos">
        <Button variant="gradient">
          <Sparkles className="h-4 w-4" />
          Azure fundido
        </Button>
        <Button variant="forged">
          <TerminalIcon className="h-4 w-4" />
          Gravado
        </Button>
        <Button variant="glow">
          <Play className="h-4 w-4" />
          Aura azure
        </Button>
        <Button variant="gradient" size="lg">
          Deploy agora
        </Button>
        <Button variant="forged" size="sm">
          Calibrar
        </Button>
      </Plate>

      <Plate number="02" title="Campo de texto">
        <Input placeholder="nome@exemplo.com" label="Email" hint="Usamos só pra login" />
        <Input placeholder="senha" label="Senha" error="Senha precisa ter 8+ caracteres" />
      </Plate>

      <Plate number="03" title="Área de texto">
        <Textarea
          className="w-80"
          label="Notas do incidente"
          placeholder="Descreva o que aconteceu…"
          hint="Fica no histórico do servidor"
        />
        <Textarea
          className="w-80"
          label="Comando"
          error="Comando precisa de confirmação explícita"
          defaultValue="rm -rf /"
        />
      </Plate>

      <Plate number="04" title="Cartão">
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Servidor de produção</CardTitle>
            <CardDescription>85.31.231.xx · online há 14 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge tone="verdigris">Saudável</Badge>
          </CardContent>
        </Card>
      </Plate>

      <Plate number="05" title="Selo de status">
        <Badge tone="neutral">Neutro</Badge>
        <Badge tone="brass">Atenção</Badge>
        <Badge tone="verdigris">Saudável</Badge>
        <Badge tone="rust">Crítico</Badge>
      </Plate>

      <Plate number="06" title="Interruptor & Caixa de seleção">
        <Switch checked={switchOn} onCheckedChange={setSwitchOn} label="Notificações" />
        <Checkbox defaultChecked label="Lembrar de mim" />
      </Plate>

      <Plate number="07" title="Seletor">
        <div className="w-64">
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha a região" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Américas</SelectLabel>
                <SelectItem value="sa-east-1">São Paulo</SelectItem>
                <SelectItem value="us-east-1">N. Virginia</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Europa</SelectLabel>
                <SelectItem value="eu-west-1">Irlanda</SelectItem>
                <SelectItem value="eu-central-1" disabled>
                  Frankfurt (indisponível)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="mt-2 font-mono text-xs text-vellum-faint">selecionado: {region}</p>
        </div>
      </Plate>

      <Plate number="08" title="Abas">
        <Tabs defaultValue="geral" className="w-80">
          <TabsList>
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="avancado">Avançado</TabsTrigger>
          </TabsList>
          <TabsContent value="geral">
            <p className="text-sm text-vellum-muted">Configurações gerais aparecem aqui.</p>
          </TabsContent>
          <TabsContent value="avancado">
            <p className="text-sm text-vellum-muted">Opções avançadas aparecem aqui.</p>
          </TabsContent>
        </Tabs>
      </Plate>

      <Plate number="09" title="Menu suspenso">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Ações ▾</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Duplicar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-rust">Remover</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Plate>

      <Plate number="10" title="Dica flutuante">
        <Tooltip content="Reinicia o container">
          <Button variant="ghost">Passe o mouse aqui</Button>
        </Tooltip>
      </Plate>

      <Plate number="11" title="Diálogo">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="danger">Excluir conta</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Excluir conta permanentemente?</DialogTitle>
            <DialogDescription>Essa ação não pode ser desfeita.</DialogDescription>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost">Cancelar</Button>
              <Button variant="danger">Excluir</Button>
            </div>
          </DialogContent>
        </Dialog>
      </Plate>

      <Plate number="12" title="Tabela">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Servidor</TableHead>
              <TableHead numeric>CPU %</TableHead>
              <TableHead numeric>Memória (GB)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>web-01</TableCell>
              <TableCell numeric>12.4</TableCell>
              <TableCell numeric>2.1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>db-01</TableCell>
              <TableCell numeric>68.9</TableCell>
              <TableCell numeric>7.8</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Plate>

      <Plate number="13" title="Navegação lateral">
        <div className="h-64 overflow-hidden rounded-lg border border-line">
          <Sidebar
            brand={
              <>
                <GaugeIcon className="h-4 w-4 text-brass" />
                <span className="text-base">Vernier</span>
              </>
            }
            items={[
              { label: 'Painel', icon: <Layers className="h-4 w-4" />, active: true },
              { label: 'Servidores', icon: <Server className="h-4 w-4" /> },
              { label: 'Containers', icon: <Box className="h-4 w-4" /> },
            ]}
            footer="v0.1.0 · local"
          />
        </div>
      </Plate>

      <Plate number="14" title="Alerta">
        <div className="flex w-full max-w-xl flex-col gap-3">
          <Alert tone="verdigris" title="Deploy publicado">
            A versão 1.4.2 está no ar em todos os nós.
          </Alert>
          <Alert tone="brass" title="Certificado expira em 12 dias">
            Renove antes de 11 ago pra evitar interrupção.
          </Alert>
          <Alert tone="rust" title="Replica fora de sync">
            db-02 não aplica writes há 47 minutos.
          </Alert>
        </div>
      </Plate>

      <Plate number="15" title="Medição">
        <div className="flex w-72 flex-col gap-5">
          <Progress label="CPU" value={34} />
          <Progress label="Memória" value={78} />
          <Progress label="Sincronizando…" indeterminate showValue={false} />
        </div>
      </Plate>

      <Plate number="16" title="Esqueleto">
        <div className="flex w-72 items-start gap-4">
          <Skeleton shape="circle" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="w-2/3" />
            <Skeleton className="w-full" />
            <Skeleton className="w-5/6" />
          </div>
        </div>
        <Skeleton shape="block" className="w-48" />
      </Plate>

      <Plate number="17" title="Notificação">
        <ToastDemo />
      </Plate>

      <Plate number="18" title="Paginação">
        <Pagination page={page} totalPages={12} onPageChange={setPage} />
      </Plate>

      <Plate number="19" title="Estado vazio">
        <EmptyState
          className="w-80 rounded-lg border border-line bg-panel"
          icon={<Server className="h-5 w-5" />}
          title="Nenhum servidor ainda"
          description="Conecte o primeiro host pra começar a monitorar a bancada."
          action={<Button size="sm">Adicionar servidor</Button>}
        />
      </Plate>

      <Plate number="20" title="Tecla">
        <div className="flex flex-wrap items-center gap-2 text-sm text-vellum-muted">
          <span>Salvar</span>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
          <span className="mx-2 text-line">·</span>
          <span>Buscar</span>
          <Kbd>/</Kbd>
          <span className="mx-2 text-line">·</span>
          <span>Paleta</span>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </div>
      </Plate>

      <Plate number="21" title="Botão de ícone">
        <IconButton label="Reiniciar" tone="brass">
          <RefreshCw />
        </IconButton>
        <IconButton label="Ligar" tone="verdigris">
          <Power />
        </IconButton>
        <IconButton label="Configurar" tone="neutral">
          <Settings />
        </IconButton>
        <IconButton label="Parar" tone="rust" size="lg">
          <Power />
        </IconButton>
      </Plate>

      <Plate number="22" title="Manômetro">
        <Gauge value={34} label="CPU" tone="brass" />
        <Gauge value={78} label="RAM" tone="verdigris" size="lg" />
        <Gauge value={91} label="Disco" tone="rust" size="sm" />
      </Plate>

      <Plate number="23" title="Estatística">
        <Stat label="Requests" value="12.4k" delta="+8.2%" deltaTone="up" hint="última hora" icon={<Activity className="h-4 w-4" />} />
        <Stat label="Latência p99" value="142ms" delta="-12ms" deltaTone="up" hint="melhor" />
        <Stat label="Erros 5xx" value="0.4%" delta="+0.1%" deltaTone="down" />
      </Plate>

      <Plate number="24" title="Controle segmentado">
        <SegmentedControl
          value={view}
          onChange={setView}
          options={[
            { value: 'lista', label: 'Lista' },
            { value: 'grade', label: 'Grade' },
            { value: 'mapa', label: 'Mapa' },
          ]}
        />
      </Plate>

      <Plate number="25" title="Callout">
        <div className="flex w-full max-w-xl flex-col gap-3">
          <Callout tone="brass" title="Calibração pendente" icon={<Sparkles className="h-4 w-4" />}>
            Rode o checklist de instrumentação antes do próximo deploy.
          </Callout>
          <Callout tone="verdigris" title="Réplica saudável">
            db-02 aplicou o último WAL há 3 segundos.
          </Callout>
        </div>
      </Plate>

      <Plate number="26" title="Avatar">
        <Avatar fallback="Eduardo Silva" tone="brass" />
        <Avatar fallback="Vernier Lab" tone="verdigris" size="lg" />
        <Avatar fallback="RK" tone="rust" size="sm" ring={false} />
        <div className="flex -space-x-2">
          <Avatar fallback="Ana Costa" tone="brass" />
          <Avatar fallback="Bruno Lima" tone="verdigris" />
          <Avatar fallback="Clara Nunes" tone="neutral" />
        </div>
      </Plate>

      <Plate number="27" title="Chip">
        {tags.map((tag) => (
          <Chip
            key={tag}
            tone="brass"
            selected
            onRemove={() => setTags((t) => t.filter((x) => x !== tag))}
          >
            {tag}
          </Chip>
        ))}
        <Chip tone="neutral">staging</Chip>
        <Chip tone="verdigris" selected>
          online
        </Chip>
        <Chip tone="rust">incidente</Chip>
      </Plate>

      <Plate number="28" title="Status LED">
        <StatusDot tone="verdigris" pulse label="Online" />
        <StatusDot tone="brass" label="Degradado" />
        <StatusDot tone="rust" pulse label="Crítico" />
        <StatusDot tone="neutral" label="Offline" />
      </Plate>

      <Plate number="29" title="Divisor">
        <div className="w-full max-w-md space-y-6">
          <Divider />
          <Divider label="telemetria" />
          <Divider label="instrumento" ornate />
        </div>
      </Plate>

      <Plate number="30" title="Slider">
        <Slider
          className="w-72"
          label="Ganho"
          unit=" dB"
          min={0}
          max={100}
          value={gain}
          onChange={(e) => setGain(Number(e.target.value))}
        />
      </Plate>

      <Plate number="31" title="Breadcrumb">
        <Breadcrumb
          items={[
            { label: 'Infra', href: '#' },
            { label: 'Clusters', href: '#' },
            { label: 'sa-east-1', current: true },
          ]}
        />
      </Plate>

      <Plate number="32" title="Linha do tempo">
        <Timeline
          className="w-80"
          items={[
            {
              title: 'Deploy 1.4.2',
              description: 'Rollout concluído em 3 nós.',
              meta: 'agora',
              tone: 'verdigris',
            },
            {
              title: 'Healthcheck falhou',
              description: 'web-02 sem resposta por 12s.',
              meta: '14:02',
              tone: 'brass',
            },
            {
              title: 'Snapshot criado',
              description: 'Backup noturno em /var/backups.',
              meta: '02:00',
              tone: 'neutral',
            },
          ]}
        />
      </Plate>

      <Plate number="33" title="Cartão instrumento">
        <InstrumentCard
          className="w-80"
          glow
          eyebrow="Cluster · sa-east-1"
          title="Bancada principal"
          action={<Badge tone="verdigris">saudável</Badge>}
        >
          <div className="flex items-end justify-between gap-4">
            <Gauge value={62} label="carga" size="sm" />
            <div className="flex flex-col gap-2 pb-1">
              <StatusDot tone="verdigris" pulse label="3 nós vivos" />
              <Button variant="gradient" size="sm">
                Abrir painel
              </Button>
            </div>
          </div>
        </InstrumentCard>
      </Plate>

      <Plate number="34" title="Busca & Senha">
        <SearchInput
          className="w-72"
          placeholder="Buscar servidores…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
        <PasswordInput className="w-72" label="Senha" hint="Mínimo 12 caracteres" />
      </Plate>

      <Plate number="35" title="Número & Rádio">
        <NumberField label="Réplicas" value={replicas} onChange={setReplicas} min={1} max={12} />
        <RadioGroup value={plan} onValueChange={setPlan} className="flex flex-col gap-2">
          <RadioGroupItem value="starter" id="starter" label="Starter" />
          <RadioGroupItem value="pro" id="pro" label="Pro" />
          <RadioGroupItem value="scale" id="scale" label="Scale" />
        </RadioGroup>
      </Plate>

      <Plate number="36" title="Accordion">
        <Accordion type="single" collapsible className="w-96">
          <AccordionItem value="a">
            <AccordionTrigger>O que é a Vernier?</AccordionTrigger>
            <AccordionContent>
              Biblioteca pessoal de UI com identidade de aço oceano — azure, navy e tipografia calibrada.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Como instalar num app?</AccordionTrigger>
            <AccordionContent>
              Copie `components/`, `lib/cn.ts` e mescle o `tailwind.config.js` — modelo shadcn.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Plate>

      <Plate number="37" title="Collapsible & Popover">
        <Collapsible className="w-72">
          <CollapsibleTrigger asChild>
            <Button variant="secondary">
              Detalhes <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="mt-3 text-sm text-vellum-muted">Conteúdo recolhível pra painéis densos.</p>
          </CollapsibleContent>
        </Collapsible>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="forged">Abrir popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="font-display text-sm text-vellum">Calibração</p>
            <p className="mt-1 text-xs text-vellum-muted">Ajuste fino sem sair da página.</p>
          </PopoverContent>
        </Popover>
      </Plate>

      <Plate number="38" title="Sheet">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="gradient">Abrir painel lateral</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle>Configuração do nó</SheetTitle>
            <SheetDescription>Parâmetros de web-01 sem sair do contexto.</SheetDescription>
            <div className="mt-6 space-y-4">
              <Input label="Hostname" defaultValue="web-01" />
              <Button variant="gradient" className="w-full">
                Salvar
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Plate>

      <Plate number="39" title="Spinner & Banner">
        <Spinner size="lg" />
        <Banner
          className="w-full max-w-xl"
          tone="brass"
          action={
            <Button size="sm" variant="forged">
              Ver
            </Button>
          }
        >
          Nova versão 0.2 disponível na bancada.
        </Banner>
      </Plate>

      <Plate number="40" title="Dropzone & Stepper">
        <FileDropzone
          className="w-80"
          onFiles={(files) => console.log(files)}
          label="Solte o manifesto"
          hint="YAML ou JSON · até 5 MB"
        />
        <Stepper
          className="w-full max-w-lg"
          current={1}
          steps={[
            { title: 'Conectar', description: 'SSH / API' },
            { title: 'Calibrar', description: 'Healthchecks' },
            { title: 'Publicar', description: 'Go live' },
          ]}
        />
      </Plate>

      <Plate number="41" title="Navbar">
        <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-line">
          <Navbar
            brand={
              <>
                <GaugeIcon className="h-4 w-4 text-brass" /> Vernier
              </>
            }
            links={
              <>
                <NavLink active={nav === 'painel'} onClick={() => setNav('painel')}>
                  Painel
                </NavLink>
                <NavLink active={nav === 'logs'} onClick={() => setNav('logs')}>
                  Logs
                </NavLink>
                <NavLink active={nav === 'billing'} onClick={() => setNav('billing')}>
                  Billing
                </NavLink>
              </>
            }
            actions={
              <>
                <Button size="sm" variant="ghost">
                  Docs
                </Button>
                <Button size="sm" variant="gradient">
                  Deploy
                </Button>
              </>
            }
          />
        </div>
      </Plate>

      <Plate number="42" title="Código & Hover">
        <CodeBlock className="w-full max-w-xl" language="bash" code={`npm run dev\n# vitrine em localhost:5174`} />
        <div className="flex items-center gap-3">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost">@eduardo</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex gap-3">
                <Avatar fallback="Eduardo" />
                <div>
                  <p className="font-medium text-vellum">Eduardo</p>
                  <p className="text-xs text-vellum-muted">Instrumentista · Vernier</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <CopyButton value="npm i vernier" />
        </div>
      </Plate>

      <Plate number="43" title="Scroll & Aspect">
        <ScrollArea className="h-40 w-64 rounded-lg border border-line bg-panel p-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <p key={i} className="py-1.5 text-sm text-vellum-muted border-b border-line/60 last:border-0">
              Evento #{i + 1} · health ok
            </p>
          ))}
        </ScrollArea>
        <AspectRatio ratio={16 / 9} className="w-72 rounded-lg border border-line bg-panel2">
          <div className="flex h-full items-center justify-center font-mono text-xs text-brass-dim">
            16:9 · mídia
          </div>
        </AspectRatio>
      </Plate>

      <Plate number="44" title="Fieldset">
        <Fieldset legend="credenciais" className="w-80">
          <Field label="Usuário" hint="sem espaços">
            <Input defaultValue="deploy" />
          </Field>
          <Field label="Token" error="Token expirado">
            <Input defaultValue="••••••••" />
          </Field>
        </Fieldset>
      </Plate>

      <Plate number="45" title="Modais avançados">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Modal grande</Button>
            </DialogTrigger>
            <DialogContent size="xl">
              <DialogHeader>
                <DialogTitle>Detalhes do incidente</DialogTitle>
                <DialogDescription>Timeline completa do último failover.</DialogDescription>
              </DialogHeader>
              <Text size="sm" tone="muted">
                O nó web-02 ficou sem healthcheck por 47s. O balancer removeu o target e o
                traffic voltou em 12s via web-01 e web-03.
              </Text>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Fechar</Button>
                </DialogClose>
                <Button variant="gradient">Abrir runbook</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="danger">Confirmar exclusão</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Apagar snapshot?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação remove o arquivo de /var/backups e não pode ser desfeita.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="ghost">Cancelar</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button variant="danger">Apagar agora</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <FormDialog
            trigger={<Button variant="gradient">Novo servidor</Button>}
            title="Adicionar servidor"
            description="Conecta um host SSH na bancada."
            confirmLabel="Conectar"
          >
            <Input label="Hostname" placeholder="web-04.prod.local" />
            <Input label="Usuário" defaultValue="deploy" />
            <Select defaultValue="sa-east-1">
              <SelectTrigger>
                <SelectValue placeholder="Região" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sa-east-1">São Paulo</SelectItem>
                <SelectItem value="us-east-1">N. Virginia</SelectItem>
              </SelectContent>
            </Select>
          </FormDialog>
        </div>
      </Plate>

      <Plate number="46" title="Command palette">
        <Button variant="forged" onClick={() => setCmdOpen(true)}>
          Abrir command <Kbd className="ml-1">⌘</Kbd>
          <Kbd>K</Kbd>
        </Button>
        <CommandPalette
          open={cmdOpen}
          onOpenChange={setCmdOpen}
          items={[
            {
              id: 'deploy',
              label: 'Deploy produção',
              group: 'Ações',
              hint: '⇧D',
              icon: <Play className="h-4 w-4" />,
            },
            {
              id: 'logs',
              label: 'Abrir logs',
              group: 'Ações',
              hint: 'L',
              icon: <FileText className="h-4 w-4" />,
            },
            {
              id: 'settings',
              label: 'Preferências',
              group: 'Navegação',
              icon: <Settings className="h-4 w-4" />,
            },
            {
              id: 'servers',
              label: 'Servidores',
              group: 'Navegação',
              icon: <Server className="h-4 w-4" />,
            },
          ]}
        />
      </Plate>

      <Plate number="47" title="Context menu">
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div className="flex h-28 w-72 cursor-context-menu items-center justify-center rounded-lg border border-dashed border-line bg-panel2/40 text-sm text-vellum-muted">
              Clique com o botão direito aqui
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Arquivo</ContextMenuLabel>
            <ContextMenuItem>Abrir</ContextMenuItem>
            <ContextMenuItem>Duplicar</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem className="text-rust">Remover</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Plate>

      <Plate number="48" title="App shell">
        <AppShell
          className="w-full max-w-4xl"
          sidebar={
            <SidebarNav
              brand={
                <>
                  <GaugeIcon className="h-4 w-4 shrink-0 text-brass-bright" />
                  <span data-sidebar-label className="truncate text-base">
                    Vernier
                  </span>
                </>
              }
              activeId={shellNav}
              onNavigate={setShellNav}
              sections={[
                {
                  title: 'Operação',
                  items: [
                    { id: 'painel', label: 'Painel', icon: <Layers /> },
                    { id: 'servidores', label: 'Servidores', icon: <Server />, badge: '12' },
                    { id: 'logs', label: 'Logs', icon: <FileText /> },
                  ],
                },
                {
                  title: 'Sistema',
                  items: [{ id: 'config', label: 'Config', icon: <Settings /> }],
                },
              ]}
              footer="v0.1 · local"
            />
          }
          topbar={
            <TopNav
              brand={<span className="text-sm text-vellum-muted">sa-east-1</span>}
              search={topSearch}
              onSearch={setTopSearch}
              actions={
                <>
                  <Button size="sm" variant="ghost">
                    Docs
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="secondary">
                        Conta ▾
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Sessão</DropdownMenuLabel>
                      <DropdownMenuItem>Perfil</DropdownMenuItem>
                      <DropdownMenuItem>API keys</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-rust">Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Avatar fallback="ER" size="sm" />
                </>
              }
            />
          }
        >
          <Overline>área de conteúdo</Overline>
          <Heading level={3} className="mt-2">
            {shellNav}
          </Heading>
          <Text size="sm" tone="muted" className="mt-2">
            Shell completo: sidebar recolhível + topnav com busca e menu de conta.
          </Text>
        </AppShell>
      </Plate>

      <Plate number="49" title="Formulário login">
        <LoginForm />
      </Plate>

      <Plate number="50" title="Formulário settings">
        <SettingsForm />
      </Plate>

      <Plate number="51" title="Sheet formulário">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="gradient">Editar no drawer</Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col">
            <SheetTitle>Editar serviço</SheetTitle>
            <SheetDescription>Alterações aplicadas no próximo rollout.</SheetDescription>
            <div className="mt-6 flex-1 space-y-4">
              <Input label="Nome" defaultValue="api-gateway" />
              <Input label="Imagem" defaultValue="ghcr.io/org/api:1.4.2" />
              <Textarea label="Notas" placeholder="Changelog do serviço…" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-vellum-muted">Autoscale</span>
                <Switch defaultChecked />
              </div>
            </div>
            <div className="mt-6 flex gap-2 border-t border-line pt-4">
              <SheetClose asChild>
                <Button variant="ghost" className="flex-1">
                  Cancelar
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="gradient" className="flex-1">
                  Salvar
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </Plate>

      <Plate number="52" title="Footer">
        <Footer
          className="w-full max-w-4xl overflow-hidden rounded-xl"
          brand="Vernier"
          tagline="Componentes de precisão pra qualquer React."
          columns={[
            {
              title: 'Produto',
              links: [
                { label: 'Catálogo', href: '#' },
                { label: 'Changelog', href: '#' },
              ],
            },
            {
              title: 'Empresa',
              links: [
                { label: 'Sobre', href: '#' },
                { label: 'Contato', href: '#' },
              ],
            },
            {
              title: 'Legal',
              links: [
                { label: 'Privacidade', href: '#' },
                { label: 'Termos', href: '#' },
              ],
            },
          ]}
          legal={`© ${new Date().getFullYear()} Vernier · MIT`}
        />
      </Plate>

      <Plate number="53" title="Hero">
        <Hero
          className="w-full max-w-4xl"
          eyebrow="Instrumentação visual"
          title={
            <>
              O catálogo pronto
              <br />
              pro seu próximo painel
            </>
          }
          description="Tipografia, forms, overlays e shells — tudo no mesmo aço oceano, pronto pra copiar pro seu projeto."
          primaryAction={{ label: 'Ver catálogo' }}
          secondaryAction={{ label: 'GitHub' }}
          media={
            <div className="relative flex h-full min-h-[240px] items-center justify-center overflow-hidden rounded-xl border border-line bg-panel-recess">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--brass)/0.14),transparent_65%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-3 rounded-lg border border-dashed border-line/80"
              />
              <div className="relative grid grid-cols-2 gap-6 p-6">
                <Gauge value={72} label="calibração" tone="brass" />
                <Gauge value={48} label="oceano" tone="verdigris" />
              </div>
            </div>
          }
        />
      </Plate>

      <Plate number="54" title="Pricing">
        <PricingCards
          className="w-full max-w-4xl"
          plans={[
            {
              id: 'starter',
              name: 'Starter',
              price: 'R$0',
              period: '/mês',
              description: 'Pra protótipos locais.',
              features: ['1 cluster', 'Logs 7 dias', 'Comunidade'],
              cta: 'Começar',
            },
            {
              id: 'pro',
              name: 'Pro',
              price: 'R$89',
              period: '/mês',
              description: 'Pra operação diária.',
              features: ['5 clusters', 'Alertas Slack', 'SSO'],
              cta: 'Assinar Pro',
              highlighted: true,
            },
            {
              id: 'scale',
              name: 'Scale',
              price: 'Custom',
              description: 'Pra frota grande.',
              features: ['Ilimitado', 'SLA 99.9%', 'Suporte dedicado'],
              cta: 'Falar com vendas',
            },
          ]}
        />
      </Plate>

      <Plate number="55" title="Combobox">
        <Combobox
          value={combo}
          onChange={setCombo}
          options={[
            { value: 'sa-east-1', label: 'São Paulo' },
            { value: 'us-east-1', label: 'N. Virginia' },
            { value: 'eu-west-1', label: 'Irlanda' },
            { value: 'ap-south-1', label: 'Mumbai' },
          ]}
        />
      </Plate>

      <Plate number="56" title="Calendário">
        <Calendar value={date} onChange={setDate} />
        <Caption>
          Selecionado:{' '}
          {date ? date.toLocaleDateString('pt-BR') : '—'}
        </Caption>
      </Plate>

      <Plate number="57" title="Data table">
        <DataTable
          className="w-full max-w-3xl"
          columns={[
            { key: 'name', header: 'Servidor' },
            { key: 'region', header: 'Região' },
            { key: 'cpu', header: 'CPU %', numeric: true },
          ]}
          rows={[
            { id: '1', name: 'web-01', region: 'sa-east-1', cpu: 12 },
            { id: '2', name: 'web-02', region: 'sa-east-1', cpu: 48 },
            { id: '3', name: 'db-01', region: 'us-east-1', cpu: 71 },
            { id: '4', name: 'cache-01', region: 'eu-west-1', cpu: 9 },
          ]}
        />
      </Plate>

      <Plate number="58" title="Mobile nav">
        <MobileNav
          className="w-full max-w-sm overflow-hidden rounded-xl"
          brand="Vernier"
          links={[
            { label: 'Catálogo', href: '#topo' },
            { label: 'Preços', href: '#plate-54' },
            { label: 'Docs', href: '#' },
          ]}
          actions={<Button variant="gradient" className="w-full">Entrar</Button>}
        />
      </Plate>

      <Plate number="59" title="Menubar">
        <MenubarBar>
          <MenubarMenu>
            <MenubarTriggerBtn>Arquivo</MenubarTriggerBtn>
            <MenubarContent>
              <MenubarItem>Novo</MenubarItem>
              <MenubarItem>Abrir…</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Sair</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTriggerBtn>Editar</MenubarTriggerBtn>
            <MenubarContent>
              <MenubarLabel>Área de transferência</MenubarLabel>
              <MenubarItem>Copiar</MenubarItem>
              <MenubarItem>Colar</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTriggerBtn>Ver</MenubarTriggerBtn>
            <MenubarContent>
              <MenubarItem>Zoom +</MenubarItem>
              <MenubarItem>Zoom −</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </MenubarBar>
      </Plate>

      <Plate number="60" title="OTP">
        <div>
          <Caption className="mb-3">Código de verificação</Caption>
          <OtpInput value={otp} onChange={setOtp} />
        </div>
      </Plate>

      <Plate number="61" title="Toggle group">
        <Toggle aria-label="Negrito">
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Itálico">
          <Italic className="h-4 w-4" />
        </Toggle>
        <ToggleGroupBar type="single" value={align} onValueChange={(v) => v && setAlign(v)}>
          <ToggleGroupItem value="left" aria-label="Esquerda">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Centro">
            Centro
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Direita">
            Direita
          </ToggleGroupItem>
        </ToggleGroupBar>
      </Plate>

      <Plate number="62" title="Carousel">
        <Carousel
          slides={[
            {
              id: '1',
              content: (
                <div className="pb-10 text-center">
                  <Heading level={3}>Deploy em um clique</Heading>
                  <Text tone="muted" className="mx-auto mt-2">
                    Publique nós com a mesma calibração visual da Vernier.
                  </Text>
                </div>
              ),
            },
            {
              id: '2',
              content: (
                <div className="pb-10 text-center">
                  <Heading level={3}>Observabilidade limpa</Heading>
                  <Text tone="muted" className="mx-auto mt-2">
                    Gauges, stats e timelines no mesmo metal.
                  </Text>
                </div>
              ),
            },
            {
              id: '3',
              content: (
                <div className="pb-10 text-center">
                  <Heading level={3}>Pronto pra copiar</Heading>
                  <Text tone="muted" className="mx-auto mt-2">
                    Leve as pranchas pro seu React e siga a bancada.
                  </Text>
                </div>
              ),
            },
          ]}
        />
      </Plate>

      <Plate number="63" title="Cookie banner">
        <Button variant="secondary" onClick={() => setShowCookie(true)}>
          Mostrar consentimento
        </Button>
        {showCookie && (
          <CookieBanner
            onAccept={() => setShowCookie(false)}
            onReject={() => setShowCookie(false)}
          />
        )}
      </Plate>

      <Plate number="64" title="Error page">
        <ErrorPage className="w-full max-w-xl" code="404" />
      </Plate>

      <Plate number="65" title="Wizard">
        <Wizard />
      </Plate>

      <Plate number="66" title="Date picker">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <DatePicker
            label="Data de medição"
            hint="Formato pt-BR"
            value={pickedDate}
            onChange={setPickedDate}
            placeholder="Escolher data…"
          />
          <DatePicker
            label="Com erro"
            error="Informe uma data válida."
            defaultValue={new Date()}
          />
          <DatePicker label="Desabilitado" disabled placeholder="Indisponível" />
        </div>
      </Plate>

      <Plate number="67" title="Testimonial">
        <TestimonialGrid className="w-full">
          <Testimonial
            quote="A Vernier deixou nosso painel com cara de instrumento de verdade — limpo, preciso, sem ruído visual."
            author="Ana Ribeiro"
            role="Design systems · Atlântico Lab"
          />
          <Testimonial
            quote="Copiamos as pranchas e em um dia o site já falava a mesma língua visual do produto."
            author="Diego Martins"
            role="Frontend · Norte Escala"
          />
          <Testimonial
            quote="Dia e noite calibrados. O acento azure corta o navy sem parecer SaaS genérico."
            author="Camila Souza"
            role="Product · Órbita"
          />
        </TestimonialGrid>
      </Plate>

      <Plate number="68" title="Logo cloud">
        <LogoCloud
          className="w-full py-4"
          title="Calibrado em equipes que medem com rigor"
          logos={[
            { name: 'Atlântico Lab' },
            { name: 'Norte Escala' },
            { name: 'Órbita' },
            { name: 'Meridiano' },
            { name: 'Baía Tech' },
            { name: 'Sextante' },
          ]}
        />
      </Plate>

      <Plate number="69" title="Newsletter">
        <Newsletter
          className="w-full max-w-lg"
          title="Boletim da bancada"
          description="Novas pranchas, tokens e notas de calibração — uma vez por mês."
          placeholder="voce@empresa.com"
          submitLabel="Inscrever"
          onSubmit={async () => {
            await new Promise((r) => setTimeout(r, 400))
          }}
        />
      </Plate>

      <Plate number="70" title="Blog article">
        <BlogArticle
          className="w-full"
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
                <a href="#topo" className="hover:text-brass-bright">
                  Hierarquia
                </a>
              </li>
              <li>
                <a href="#topo" className="hover:text-brass-bright">
                  Contraste
                </a>
              </li>
            </ul>
          }
        >
          <p>
            Um bom instrumento não grita. Ele organiza escala, valor e estado para que o olho
            encontre o que importa em poucos segundos.
          </p>
          <p>
            Na Vernier, tipografia e painéis blue-slate trabalham juntos: o display marca o
            título, o mono carrega metadados, e o azure aponta a ação.
          </p>
        </BlogArticle>
      </Plate>

      <Plate number="71" title="Gallery">
        <Gallery
          className="w-full"
          columns={3}
          items={[
            {
              src: 'https://picsum.photos/seed/vernier-g1/640/480',
              alt: 'Bancada com instrumentos',
              caption: 'Bancada',
            },
            {
              src: 'https://picsum.photos/seed/vernier-g2/640/480',
              alt: 'Detalhe de metal e azul',
              caption: 'Metal',
            },
            {
              src: 'https://picsum.photos/seed/vernier-g3/640/480',
              alt: 'Painel noturno',
              caption: 'Noite',
            },
            {
              src: 'https://picsum.photos/seed/vernier-g4/640/480',
              alt: 'Leitura em campo',
              caption: 'Campo',
            },
            {
              src: 'https://picsum.photos/seed/vernier-g5/640/480',
              alt: 'Calibração',
              caption: 'Calibração',
            },
            {
              src: 'https://picsum.photos/seed/vernier-g6/640/480',
              alt: 'Protótipo de UI',
              caption: 'Protótipo',
            },
          ]}
        />
      </Plate>

      <Plate number="72" title="Video embed">
        <VideoEmbed
          className="w-full max-w-2xl"
          title="Demonstração — Big Buck Bunny"
          src="https://www.youtube.com/embed/aqz-KE-bpKQ"
        />
      </Plate>

      <Plate number="73" title="Sticky CTA">
        <Button
          variant="secondary"
          onClick={() => {
            setStickyKey((k) => k + 1)
            setShowSticky(true)
          }}
        >
          Mostrar sticky CTA
        </Button>
        {showSticky && (
          <StickyCTA
            key={stickyKey}
            message="Leve a Vernier pro seu próximo layout — copie a prancha e calibra."
            actionLabel="Ver catálogo"
            onAction={() => setShowSticky(false)}
            onDismiss={() => setShowSticky(false)}
          />
        )}
      </Plate>

      <Plate number="74" title="Navigation menu">
        <NavigationMenuBar>
          <NavigationMenuListBar>
            <NavigationMenuItem>
              <NavigationMenuTriggerBtn>Produtos</NavigationMenuTriggerBtn>
              <NavigationMenuContentPanel className="grid gap-2 p-3 md:w-[420px] md:grid-cols-2">
                <NavigationMenuLinkItem href="#topo">
                  <h3>Instrumentos</h3>
                  <p>Gauge, Stat e cartões de medição.</p>
                </NavigationMenuLinkItem>
                <NavigationMenuLinkItem href="#topo">
                  <h3>Formulários</h3>
                  <p>Campos, OTP, wizard e date picker.</p>
                </NavigationMenuLinkItem>
                <NavigationMenuLinkItem href="#topo">
                  <h3>Overlays</h3>
                  <p>Dialog, sheet, command e context.</p>
                </NavigationMenuLinkItem>
                <NavigationMenuLinkItem href="#topo">
                  <h3>Marketing</h3>
                  <p>Hero, pricing, gallery e newsletter.</p>
                </NavigationMenuLinkItem>
              </NavigationMenuContentPanel>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTriggerBtn>Recursos</NavigationMenuTriggerBtn>
              <NavigationMenuContentPanel className="grid gap-2 p-3 md:w-[280px]">
                <NavigationMenuLinkItem href="#topo">
                  <h3>Tokens</h3>
                  <p>Paleta dia/noite e tipografia.</p>
                </NavigationMenuLinkItem>
                <NavigationMenuLinkItem href="#topo">
                  <h3>MCP</h3>
                  <p>Instale componentes no destino.</p>
                </NavigationMenuLinkItem>
              </NavigationMenuContentPanel>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLinkItem href="#topo" className="border-0 px-3 py-2">
                <h3 className="font-sans text-sm font-normal text-vellum-muted">Docs</h3>
              </NavigationMenuLinkItem>
            </NavigationMenuItem>
          </NavigationMenuListBar>
        </NavigationMenuBar>
      </Plate>

      <Plate number="75" title="Charts">
        <div className="flex w-full flex-col gap-5">
          <AreaChartCard
            overline="Telemetria · 12 meses"
            title="Leituras instrumentais"
            description="Volume capturado vs. alertas calibrados — série sintética de vitrine."
            delta="+18,4%"
            deltaTone="up"
            data={MONTHLY_CHART}
            xKey="mes"
            series={CHART_SERIES}
            height={300}
            showLegend
          />

          <div className="grid gap-5 lg:grid-cols-3">
            <DonutChartCard
              overline="Saúde"
              title="Estado da frota"
              delta="68% ok"
              deltaTone="up"
              data={DONUT_SLICES}
              centerValue="68%"
              centerCaption="estável"
              height={220}
            />
            <ComboChartCard
              overline="Combo"
              title="Leituras × meta"
              description="Barras + tendência."
              data={MONTHLY_CHART}
              xKey="mes"
              series={[
                { key: 'leituras', label: 'Leituras', color: CHART_COLORS.azureBright },
                { key: 'meta', label: 'Meta', color: CHART_COLORS.verdigris },
              ]}
              barKeys={['leituras']}
              lineKeys={['meta']}
              height={220}
            />
            <BarChartCard
              overline="Alertas"
              title="Incidências"
              delta="−42%"
              deltaTone="up"
              data={MONTHLY_CHART}
              xKey="mes"
              series={[{ key: 'alertas', label: 'Alertas', color: CHART_COLORS.verdigris }]}
              height={220}
              showLegend={false}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                label: 'Throughput',
                value: '102',
                unit: 'leit./mês',
                delta: '+12%',
                tone: 'up' as const,
                data: SPARK_A,
                color: CHART_COLORS.azureBright,
              },
              {
                label: 'Alertas',
                value: '2',
                unit: 'abertos',
                delta: '−75%',
                tone: 'up' as const,
                data: SPARK_B,
                color: CHART_COLORS.verdigris,
              },
              {
                label: 'Meta',
                value: '72',
                unit: 'alvo',
                delta: 'no eixo',
                tone: 'neutral' as const,
                data: SPARK_C,
                color: CHART_COLORS.azure,
              },
            ].map((spark) => (
              <ChartCardShell
                key={spark.label}
                overline="Sparkline"
                title={spark.label}
                delta={spark.delta}
                deltaTone={spark.tone}
              >
                <div className="flex items-end justify-between gap-3 px-2 pb-1">
                  <div>
                    <p className="font-mono text-2xl tabular-nums text-vellum">{spark.value}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-vellum-faint">
                      {spark.unit}
                    </p>
                  </div>
                  <Sparkline
                    data={spark.data}
                    dataKey="v"
                    color={spark.color}
                    height={44}
                    className="max-w-[140px] flex-1"
                  />
                </div>
              </ChartCardShell>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <FunnelChartCard
              overline="Pipeline"
              title="Funil de calibração"
              description="Da captura à publicação — retenção por estágio."
              delta="33,9%"
              deltaTone="neutral"
              stages={FUNNEL_STAGES}
            />
            <RadarChartCard
              overline="Radar"
              title="Perfil do instrumento"
              description="Atual vs. alvo em cinco eixos."
              data={RADAR_DATA}
              angleKey="eixo"
              series={[
                { key: 'atual', label: 'Atual', color: CHART_COLORS.azureBright },
                { key: 'alvo', label: 'Alvo', color: CHART_COLORS.verdigris },
              ]}
              height={280}
            />
          </div>
        </div>
      </Plate>

      <Plate number="76" title="Tree view">
        <div className="w-full max-w-sm rounded-lg border border-line bg-panel p-3 shadow-plate">
          <TreeView
            nodes={FILE_TREE}
            selectedId={treeSelected}
            onSelect={setTreeSelected}
            defaultExpandedIds={['src', 'components', 'mcp']}
          />
          <Caption className="mt-3">Selecionado: {treeSelected}</Caption>
        </div>
      </Plate>

      <Plate number="77" title="Color picker">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <ColorPicker
            label="Acento do painel"
            value={accentColor}
            onChange={setAccentColor}
          />
          <div className="flex items-center gap-3">
            <span
              className="h-10 w-10 rounded-md border border-line shadow-plate"
              style={{ backgroundColor: accentColor }}
            />
            <Caption>Valor atual: {accentColor}</Caption>
          </div>
        </div>
      </Plate>

      <Plate number="78" title="Tag input">
        <TagInput
          className="w-full max-w-md"
          label="Tags do instrumento"
          hint="Enter ou vírgula pra adicionar"
          value={inputTags}
          onChange={setInputTags}
          placeholder="ex.: telemetria…"
          maxTags={8}
        />
      </Plate>

      <Plate number="79" title="Multi select">
        <MultiSelect
          className="w-full max-w-md"
          label="Regiões ativas"
          options={MULTI_OPTS}
          value={multiRegions}
          onChange={setMultiRegions}
          placeholder="Escolher regiões…"
          hint={`${multiRegions.length} selecionada(s)`}
        />
      </Plate>

      <Plate number="80" title="Date range">
        <DateRangePicker
          className="w-full max-w-md"
          label="Período de leitura"
          value={dateRange}
          onChange={setDateRange}
          hint="Do primeiro ao último dia do intervalo"
        />
      </Plate>

      <Plate number="81" title="Time picker">
        <TimePicker
          className="w-full max-w-xs"
          label="Horário da calibração"
          value={timeValue}
          onChange={setTimeValue}
          minuteStep={15}
          hint="Passo de 15 minutos"
        />
      </Plate>

      <Plate number="82" title="Masked input">
        <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
          <MaskedInput
            mask="telefone"
            label="Telefone"
            value={phone}
            onChange={(v) => setPhone(v)}
          />
          <MaskedInput
            mask="cpf"
            label="CPF"
            value={cpf}
            onChange={(v) => setCpf(v)}
          />
          <MaskedInput mask="cnpj" label="CNPJ" defaultValue="11222333000181" />
          <MaskedInput mask="cep" label="CEP" defaultValue="01310100" />
        </div>
      </Plate>

      <Plate number="83" title="Currency input">
        <CurrencyInput
          className="w-full max-w-xs"
          label="Valor do plano"
          value={amount}
          onChange={(v) => setAmount(v)}
          hint="Formatação BRL automática"
        />
      </Plate>

      <Plate number="84" title="Rating">
        <div className="flex flex-col gap-4">
          <Rating label="Satisfação com a vitrine" value={rating} onChange={setRating} />
          <Rating label="Somente leitura" defaultValue={5} readOnly size="sm" />
          <Caption>{rating} de 5 estrelas</Caption>
        </div>
      </Plate>

      <Plate number="85" title="Kanban">
        <Kanban columns={kanbanCols} onChange={setKanbanCols} className="w-full" />
      </Plate>

      <Plate number="86" title="Notification center">
        <div className="flex items-center gap-4">
          <NotificationCenter
            items={notifs}
            onMarkAllRead={() =>
              setNotifs((list) => list.map((n) => ({ ...n, unread: false })))
            }
          />
          <Caption>
            {notifs.filter((n) => n.unread).length} não lida(s) — abra o sino
          </Caption>
        </div>
      </Plate>

      <Plate number="87" title="Filter bar">
        <FilterBar
          className="w-full max-w-xl"
          active={activeFilters}
          onRemove={(id) => setActiveFilters((f) => f.filter((x) => x.id !== id))}
          onClearAll={() => setActiveFilters([])}
        >
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Região" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sa-east-1">São Paulo</SelectItem>
              <SelectItem value="us-east-1">N. Virginia</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              setActiveFilters((f) =>
                f.some((x) => x.id === 'prio')
                  ? f
                  : [...f, { id: 'prio', label: 'Prioridade: alta', tone: 'rust' }]
              )
            }
          >
            + Prioridade
          </Button>
        </FilterBar>
      </Plate>

      <Plate number="88" title="Activity feed">
        <ActivityFeed
          className="w-full max-w-md"
          title="Atividade recente"
          items={[
            {
              id: 'a1',
              actor: 'Marina',
              title: 'publicou a prancha Charts',
              description: 'Redesign instrumental com sparklines.',
              time: 'há 12 min',
              tone: 'brass',
            },
            {
              id: 'a2',
              actor: 'Rafael',
              title: 'moveu card no Kanban',
              description: '“Tokens dia/noite” → Em andamento.',
              time: 'há 40 min',
              tone: 'verdigris',
            },
            {
              id: 'a3',
              actor: 'Lia',
              title: 'comentou no chat',
              description: 'Pediu FAQ e TeamGrid em PT-BR.',
              time: 'há 2 h',
              tone: 'neutral',
            },
          ]}
        />
      </Plate>

      <Plate number="89" title="Chat thread">
        <ChatThread
          className="w-full max-w-md"
          header="Suporte Vernier · Lia"
          messages={chatMsgs}
          onSend={(body) =>
            setChatMsgs((m) => [
              ...m,
              {
                id: `c${Date.now()}`,
                from: 'me',
                body,
                time: new Date().toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              },
            ])
          }
        />
      </Plate>

      <Plate number="90" title="User menu">
        <UserMenu
          name="Ana Calibragem"
          email="ana@vernier.dev"
          plan="Pro · instrumento"
          onSettings={() => undefined}
          onLogout={() => undefined}
        />
      </Plate>

      <Plate number="91" title="FAQ">
        <FAQ
          className="w-full"
          title="Perguntas frequentes"
          description="Como a Vernier entra no seu projeto."
          items={[
            {
              question: 'É um pacote npm?',
              answer:
                'Não — copie as peças (estilo shadcn) ou use o MCP install_component no destino.',
            },
            {
              question: 'Como alternar dia e noite?',
              answer:
                'Pelo Sol/Lua no topo da vitrine; a preferência fica em localStorage.',
            },
            {
              question: 'Os tokens mudam de nome no light?',
              answer:
                'Não. As chaves (ink, panel, brass…) ficam; os valores vêm das CSS variables.',
            },
          ]}
        />
      </Plate>

      <Plate number="92" title="Feature bento">
        <FeatureBento
          title="Instrumentos do kit"
          description="Peças que sustentam painel e site."
          items={[
            {
              title: 'Precisão tipográfica',
              description: 'Fraunces + General Sans + Space Mono alinhados ao aço oceano.',
              icon: <Sparkles className="h-4 w-4" />,
              span: 2,
            },
            {
              title: 'Formulários densos',
              description: 'Máscaras BR, moeda, tags e ranges sem fricção.',
              icon: <Layers className="h-4 w-4" />,
            },
            {
              title: 'Dados vivos',
              description: 'Charts, Kanban e feeds pro painel operacional.',
              icon: <Activity className="h-4 w-4" />,
            },
            {
              title: 'MCP embutido',
              description: 'Liste, leia e instale componentes direto no projeto.',
              icon: <Box className="h-4 w-4" />,
            },
          ]}
        />
      </Plate>

      <Plate number="93" title="Comparison table">
        <ComparisonTable
          className="w-full"
          caption="Planos Vernier"
          plans={[
            { id: 'starter', name: 'Starter' },
            { id: 'pro', name: 'Pro', highlighted: true },
            { id: 'scale', name: 'Scale' },
          ]}
          features={[
            {
              id: 'comp',
              name: 'Componentes',
              values: { starter: '40+', pro: '98', scale: 'Ilimitado' },
            },
            {
              id: 'mcp',
              name: 'Servidor MCP',
              values: { starter: false, pro: true, scale: true },
            },
            {
              id: 'tema',
              name: 'Dia + noite',
              values: { starter: true, pro: true, scale: true },
            },
            {
              id: 'suporte',
              name: 'Suporte',
              values: { starter: 'Comunidade', pro: 'Prioritário', scale: 'Dedicado' },
            },
          ]}
        />
      </Plate>

      <Plate number="94" title="Section CTA">
        <SectionCTA
          className="w-full"
          title="Leve a Vernier pro próximo layout"
          description="Copie a prancha, calibre os tokens e publique com a mesma voz instrumentada."
          primaryLabel="Abrir catálogo"
          onPrimary={() => document.getElementById('catalog-search')?.focus()}
          secondaryLabel="Ver tipografia"
          onSecondary={() =>
            document.getElementById('plate-00')?.scrollIntoView({ behavior: 'smooth' })
          }
        />
      </Plate>

      <Plate number="95" title="Announcement bar">
        <div className="flex w-full flex-col gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setAnnounceKey((k) => k + 1)
              setShowAnnounce(true)
            }}
          >
            Mostrar announcement bar
          </Button>
          {showAnnounce && (
            <AnnouncementBar
              key={announceKey}
              href="#topo"
              linkLabel="Ver catálogo"
              onDismiss={() => setShowAnnounce(false)}
            >
              Novidade: 21 pranchas novas no catálogo Vernier.
            </AnnouncementBar>
          )}
        </div>
      </Plate>

      <Plate number="96" title="Team grid">
        <TeamGrid
          title="Equipe de calibração"
          description="Quem mantém o instrumento afiado."
          members={[
            {
              name: 'Marina Costa',
              role: 'Design systems',
              bio: 'Tokens, tipografia e atmosfera oceano.',
              tone: 'brass',
            },
            {
              name: 'Rafael Nunes',
              role: 'Engenharia UI',
              bio: 'Forms densos, overlays e shells.',
              tone: 'verdigris',
            },
            {
              name: 'Lia Prado',
              role: 'Produto',
              bio: 'Vitrine, MCP e roadmap das pranchas.',
              tone: 'neutral',
            },
          ]}
        />
      </Plate>

      <Plate number="97" title="Changelog">
        <Changelog
          className="w-full"
          entries={[
            {
              version: '1.4.0',
              date: '31 jul 2026',
              title: 'Kit app + marketing',
              tone: 'brass',
              changes: [
                'TagInput, MultiSelect, DateRange e TimePicker',
                'Kanban, NotificationCenter e ChatThread',
                'FAQ, FeatureBento, ComparisonTable e RichTextEditor',
              ],
            },
            {
              version: '1.3.0',
              date: '20 jul 2026',
              title: 'Charts instrumentais',
              tone: 'verdigris',
              changes: ['Plate 75 redesenhada com sparklines e funnel'],
            },
            {
              version: '1.2.0',
              date: '05 jul 2026',
              title: 'Marketing pack',
              tone: 'neutral',
              changes: ['Gallery, VideoEmbed, StickyCTA e NavigationMenu'],
            },
          ]}
        />
      </Plate>

      <Plate number="98" title="Rich text editor">
        <RichTextEditor
          className="w-full max-w-xl"
          label="Nota de calibração"
          hint="Toolbar: negrito, itálico, título, lista e link"
          value={richHtml}
          onChange={setRichHtml}
          minHeight="140px"
        />
      </Plate>

      <Plates99to152 />
    </>
  )
}

export default function Showcase() {
  return (
    <TooltipProvider>
      <ToastProvider>
        <CatalogShell>
          <ShowcaseBody />
        </CatalogShell>
      </ToastProvider>
    </TooltipProvider>
  )
}
