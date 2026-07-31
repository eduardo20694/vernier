import { useState } from 'react'
import {
  Activity,
  Box,
  ChevronDown,
  Gauge as GaugeIcon,
  Layers,
  Play,
  Power,
  RefreshCw,
  Server,
  Settings,
  Sparkles,
  Terminal,
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
} from '../components/DropdownMenu'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../components/Dialog'
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from '../components/Sheet'
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
  Lead,
  Text,
  Caption,
  Overline,
  InlineCode,
  Prose,
} from '../components/Typography'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../components/Collapsible'
import { Popover, PopoverTrigger, PopoverContent } from '../components/Popover'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../components/HoverCard'
import { ScrollArea } from '../components/ScrollArea'
import { FileDropzone } from '../components/FileDropzone'
import { Stepper } from '../components/Stepper'
import { Navbar, NavLink } from '../components/Navbar'
import { Stack } from '../components/Layout'
import { Link } from '../components/Link'
import { Blockquote } from '../components/Blockquote'
import { CodeBlock } from '../components/CodeBlock'
import { Banner } from '../components/Banner'
import { CopyButton } from '../components/CopyButton'
import { AspectRatio } from '../components/AspectRatio'
import { Fieldset, Field } from '../components/Field'

// Cada peça é apresentada dentro de um "quadro de ferramenta" (.shadow-board):
// o contorno tracejado atrás mostra "aqui é o lugar dela", como um pegboard
// de oficina. Isso é o elemento-assinatura da Vernier — usado só aqui na
// vitrine, nunca dentro do componente em uso real num app de verdade.
function Plate({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-xs text-vellum-faint">Prancha {number}</span>
        <h2 className="font-display text-xl text-vellum">{title}</h2>
      </div>
      <div className="shadow-board flex flex-wrap items-start gap-6 rounded-lg p-8">{children}</div>
    </section>
  )
}

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

  return (
    <div className="min-h-screen bg-ink px-10 py-12">
      <header className="mb-16 max-w-3xl">
        <Overline>Catálogo de instrumentos</Overline>
        <Display className="mt-3">Vernier</Display>
        <Lead className="mt-4">
          Biblioteca pessoal de componentes React — tipografia de site, peças de formulário,
          navegação e painéis, todos no mesmo metal.
        </Lead>
      </header>

      <Plate number="00" title="Tipografia">
        <Stack gap="lg" className="w-full max-w-2xl">
          <div>
            <Overline>Overline · Space Mono</Overline>
            <Display size="sm" className="mt-2">
              Display em Fraunces
            </Display>
            <Lead className="mt-3">
              Lead: o parágrafo que abre a página — largo, respirado, com tracking negativo suave.
            </Lead>
          </div>
          <div className="space-y-2">
            <Heading level={1}>Heading 1 — precisão tipográfica</Heading>
            <Heading level={2}>Heading 2 — hierarquia clara</Heading>
            <Heading level={3}>Heading 3 — seção</Heading>
            <Heading level={4}>Heading 4 — subtítulo</Heading>
          </div>
          <Text>
            Body: texto corrido com measure limitado (~65ch), line-height generoso e kerning ligado.
            Use <InlineCode>InlineCode</InlineCode> pra tokens e APIs.
          </Text>
          <Text size="sm" tone="muted">
            Body sm — legendas densas, helpers de formulário, metadados secundários.
          </Text>
          <Caption>Caption — rodapé, timestamps, notas de calibração.</Caption>
          <Blockquote cite="Manual do instrumentista">
            Cada peça tem seu lugar na bancada. Tipografia também.
          </Blockquote>
          <Prose>
            <h2>Prose</h2>
            <p>
              Bloco editorial com estilos herdados pra conteúdo longo — docs, changelogs, runbooks.
              Links em <Link href="#">latão</Link>, listas e ênfase já calibrados.
            </p>
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
          Latão fundido
        </Button>
        <Button variant="forged">
          <Terminal className="h-4 w-4" />
          Gravado
        </Button>
        <Button variant="glow">
          <Play className="h-4 w-4" />
          Aura de latão
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
                <span className="text-base">Dockwatch</span>
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
        <Avatar fallback="Dock Watch" tone="verdigris" size="lg" />
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
              Biblioteca pessoal de UI com identidade de bancada — latão, madeira e tipografia calibrada.
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
    </div>
  )
}

export default function Showcase() {
  return (
    <TooltipProvider>
      <ToastProvider>
        <ShowcaseBody />
      </ToastProvider>
    </TooltipProvider>
  )
}
