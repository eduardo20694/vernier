// Servidor MCP da Vernier — roda via stdio, pra ser registrado no Claude
// Desktop ou no Cursor. Resolve dois problemas: (1) a IA parar de "chutar"
// como um componente da Vernier funciona e ler a definição real, e (2)
// automatizar o passo manual de copiar componente pra dentro de qualquer
// projeto React de destino.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { manifest, findComponent } from './manifest.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// A raiz da Vernier é uma pasta acima de mcp/ — é daqui que lemos os
// arquivos-fonte reais dos componentes e o tokens.json.
const VERNIER_ROOT = path.resolve(__dirname, '..', '..')

const server = new McpServer({ name: 'vernier', version: '0.1.0' })

server.tool(
  'list_components',
  'Lista todos os componentes do catálogo da Vernier, com número de prancha e descrição.',
  {},
  async () => {
    const text = manifest
      .map((c) => `Prancha ${c.plate} — ${c.name}: ${c.description}`)
      .join('\n')
    return { content: [{ type: 'text', text }] }
  }
)

server.tool(
  'get_component',
  'Devolve o código-fonte real de um componente da Vernier, mais a lista de dependências que ele precisa.',
  { name: z.string().describe('Nome do componente, ex: Button, DropdownMenu') },
  async ({ name }) => {
    const entry = findComponent(name)
    if (!entry) {
      return {
        content: [
          {
            type: 'text',
            text: `Componente "${name}" não existe no catálogo. Use list_components pra ver os disponíveis.`,
          },
        ],
        isError: true,
      }
    }
    const source = await readFile(path.join(VERNIER_ROOT, entry.file), 'utf-8')
    const text = [
      `# ${entry.name} (Prancha ${entry.plate})`,
      `Arquivo: ${entry.file}`,
      `Dependências npm: ${entry.npmDeps.join(', ')}`,
      `Dependências locais: ${entry.localDeps.join(', ')}`,
      '',
      '```tsx',
      source,
      '```',
    ].join('\n')
    return { content: [{ type: 'text', text }] }
  }
)

server.tool(
  'get_tokens',
  'Devolve os tokens de design da Vernier (cores, tipografia, raio de borda) — use antes de gerar qualquer UI nova que deva seguir a identidade da Vernier.',
  {},
  async () => {
    const tokens = await readFile(path.join(VERNIER_ROOT, 'src/tokens.json'), 'utf-8')
    return { content: [{ type: 'text', text: tokens }] }
  }
)

server.tool(
  'install_component',
  'Escreve um componente da Vernier (e suas dependências locais, tipo lib/cn.ts) dentro de um projeto de destino. Não roda "npm install" sozinho — só copia os arquivos e devolve quais pacotes npm faltam instalar.',
  {
    name: z.string().describe('Nome do componente a instalar, ex: Button'),
    targetProjectRoot: z
      .string()
      .describe('Caminho absoluto da raiz do projeto de destino (onde tem o package.json dele)'),
  },
  async ({ name, targetProjectRoot }) => {
    const entry = findComponent(name)
    if (!entry) {
      return {
        content: [{ type: 'text', text: `Componente "${name}" não existe no catálogo.` }],
        isError: true,
      }
    }

    try {
      await access(targetProjectRoot)
    } catch {
      return {
        content: [{ type: 'text', text: `Pasta de destino não encontrada: ${targetProjectRoot}` }],
        isError: true,
      }
    }

    const filesWritten: string[] = []

    // copia o componente em si, mais todos os arquivos locais (ex: cn.ts)
    // que ele lista como dependência.
    for (const relFile of [entry.file, ...entry.localDeps]) {
      const src = path.join(VERNIER_ROOT, relFile)
      const dest = path.join(targetProjectRoot, relFile)
      await mkdir(path.dirname(dest), { recursive: true })
      const content = await readFile(src, 'utf-8')
      await writeFile(dest, content, 'utf-8')
      filesWritten.push(relFile)
    }

    const text = [
      `Componente "${entry.name}" instalado em ${targetProjectRoot}.`,
      '',
      'Arquivos escritos:',
      ...filesWritten.map((f) => `  - ${f}`),
      '',
      'Faltando (rode manualmente, o servidor não executa instalação de pacote sozinho):',
      `  npm install ${entry.npmDeps.join(' ')}`,
      '',
      'Também confirme que o tailwind.config.js do projeto de destino inclui os tokens',
      '(use get_tokens pra ver a paleta/tipografia da Vernier e mesclar manualmente).',
    ].join('\n')

    return { content: [{ type: 'text', text }] }
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)
