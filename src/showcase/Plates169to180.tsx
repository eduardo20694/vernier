import { useMemo, useState } from 'react'
import {
  ClipboardList,
  FileSearch,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react'
import { Plate } from './CatalogShell'
import { CpfCnpjInput } from '../components/CpfCnpjInput'
import { SensitiveData } from '../components/SensitiveData'
import { ClientCopyBlock } from '../components/ClientCopyBlock'
import { CreditOfferTable } from '../components/CreditOfferTable'
import { AuthorizationStatus } from '../components/AuthorizationStatus'
import { BankConvenioSelector, type BankConvenioItem } from '../components/BankConvenioSelector'
import { BankAccountFields } from '../components/BankAccountFields'
import { ResultPanel } from '../components/ResultPanel'
import { ProviderBanner } from '../components/ProviderBanner'
import { PdfEmbed } from '../components/PdfEmbed'
import { RoleNav } from '../components/RoleNav'
import { SimulationDiff } from '../components/SimulationDiff'
import { Button } from '../components/Button'
import { Caption } from '../components/Typography'
import { useToast } from '../components/Toast'
import { formatCpf } from '../lib/br'

const VALID_CPF = '52998224725'
const VALID_CPF_FMT = formatCpf(VALID_CPF)

const CREDIT_OFFERS = [
  {
    id: '48',
    prazoMeses: 48,
    parcela: 312.45,
    taxaAm: 1.89,
    cetAa: 28.4,
    valorLiberado: 12400,
    recommended: true,
  },
  {
    id: '60',
    prazoMeses: 60,
    parcela: 278.9,
    taxaAm: 1.79,
    cetAa: 26.1,
    valorLiberado: 12400,
  },
  {
    id: '72',
    prazoMeses: 72,
    parcela: 251.2,
    taxaAm: 1.69,
    cetAa: 24.8,
    valorLiberado: 12400,
  },
]

const BANK_ITEMS: BankConvenioItem[] = [
  {
    id: 'itau',
    name: 'Itaú Consignado',
    initials: 'IT',
    available: ['CLT', 'FGTS'],
    hint: 'Simulação em tempo real',
  },
  {
    id: 'bradesco',
    name: 'Bradesco',
    initials: 'BR',
    available: ['CLT', 'INSS'],
  },
  {
    id: 'caixa',
    name: 'Caixa Econômica',
    initials: 'CX',
    available: ['FGTS', 'INSS'],
    disabled: true,
    hint: 'Manutenção programada',
  },
]

function ProviderBannerWithToast() {
  const { toast } = useToast()

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <ProviderBanner
        variant="timeout"
        provider="Consig CLT"
        onRetry={() =>
          toast({
            title: 'Reconsultando Consig CLT',
            description: 'Nova tentativa iniciada — aguarde até 30s.',
            tone: 'brass',
            action: {
              label: 'Cancelar',
              onClick: () => undefined,
            },
          })
        }
        secondaryAction={{
          label: 'Ver status',
          onClick: () => undefined,
        }}
      />
      <Caption>
        Toast com ação (placa 17 estendida) — dispara ao clicar em &quot;Tentar novamente&quot;.
      </Caption>
    </div>
  )
}

export function Plates169to180() {
  const [cpfValue, setCpfValue] = useState(VALID_CPF_FMT)
  const [cpfValid, setCpfValid] = useState(true)
  const [selectedOffer, setSelectedOffer] = useState('48')
  const [authState, setAuthState] = useState<
    'pendente' | 'aguardando_cliente' | 'autorizado' | 'expirado'
  >('aguardando_cliente')
  const [selectedBank, setSelectedBank] = useState('itau')
  const [bankAccount, setBankAccount] = useState({
    agency: '1234',
    account: '567890',
    digit: '1',
  })
  const [roleNavActive, setRoleNavActive] = useState('consultas')
  const [currentRole, setCurrentRole] = useState('coordenador')
  const [chosenOffer, setChosenOffer] = useState<'A' | 'B' | null>(null)

  const authExpiresAt = useMemo(
    () => new Date(Date.now() + 4 * 60 * 1000 + 32 * 1000),
    [authState]
  )

  const roleItems = [
    { id: 'painel', label: 'Painel', icon: LayoutDashboard, badge: 'Admin', roles: ['admin'] },
    { id: 'consultas', label: 'Consultas', icon: FileSearch },
    { id: 'equipe', label: 'Equipe', icon: Users, roles: ['admin', 'coordenador'] },
    { id: 'relatorios', label: 'Relatórios', icon: ClipboardList, roles: ['admin', 'coordenador'] },
    { id: 'config', label: 'Configurações', icon: Settings, roles: ['admin'] },
  ]

  return (
    <>
      <Plate number="169" title="CPF/CNPJ">
        <div className="grid w-full max-w-lg gap-4">
          <CpfCnpjInput
            label="Documento do cliente"
            hint="Validação de dígitos verificadores em tempo real"
            mode="auto"
            value={cpfValue}
            onChange={(formatted, _raw, valid) => {
              setCpfValue(formatted)
              setCpfValid(valid)
            }}
          />
          <Caption>
            {cpfValid && cpfValue.includes('-')
              ? `✓ CPF válido — ${VALID_CPF_FMT}`
              : 'Digite um CPF completo para validar'}
          </Caption>
          <CpfCnpjInput
            label="Somente CNPJ"
            mode="cnpj"
            defaultValue="11222333000181"
            hint="Modo fixo cnpj"
          />
        </div>
      </Plate>

      <Plate number="170" title="Dado sensível">
        <div className="grid w-full max-w-md gap-4">
          <SensitiveData label="CPF" value={VALID_CPF_FMT} maskPattern="cpf" />
          <SensitiveData label="Telefone" value="(11) 98765-4321" maskPattern="phone" />
          <SensitiveData label="Benefício INSS" value="1234567890" maskPattern="beneficio" />
        </div>
      </Plate>

      <Plate number="171" title="Copiar cliente">
        <ClientCopyBlock
          className="w-full max-w-sm"
          nome="Maria Aparecida Silva"
          cpf={VALID_CPF_FMT}
          telefone="(11) 98765-4321"
          margem={1847.32}
          maskSensitive
          extras={[
            { label: 'Convênio', value: 'INSS · Aposentadoria' },
            { label: 'Matrícula', value: '987654321' },
          ]}
        />
      </Plate>

      <Plate number="172" title="Oferta crédito">
        <div className="w-full max-w-3xl">
          <CreditOfferTable
            rows={CREDIT_OFFERS}
            value={selectedOffer}
            onValueChange={setSelectedOffer}
            footerNote="Simulação Consig CLT · sujeita a análise de crédito"
          />
          <Caption className="mt-2">
            Oferta selecionada: {selectedOffer}x — clique na linha para alternar
          </Caption>
        </div>
      </Plate>

      <Plate number="173" title="Autorização">
        <div className="flex w-full max-w-2xl flex-col gap-4">
          <AuthorizationStatus
            state={authState}
            expiresAt={authState === 'aguardando_cliente' ? authExpiresAt : undefined}
            authorizationUrl="#"
            onResend={() => setAuthState('aguardando_cliente')}
          />
          <div className="flex flex-wrap gap-2">
            {(
              [
                ['pendente', 'Pendente'],
                ['aguardando_cliente', 'Aguardando'],
                ['autorizado', 'Autorizado'],
                ['expirado', 'Expirado'],
              ] as const
            ).map(([state, label]) => (
              <Button
                key={state}
                variant={authState === state ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setAuthState(state)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </Plate>

      <Plate number="174" title="Banco convênio">
        <div className="w-full max-w-2xl">
          <BankConvenioSelector
            items={BANK_ITEMS}
            value={selectedBank}
            onValueChange={setSelectedBank}
            variant="cards"
          />
          <Caption className="mt-2">Selecionado: {selectedBank}</Caption>
        </div>
      </Plate>

      <Plate number="175" title="Conta bancária">
        <div className="w-full max-w-lg rounded-lg border border-line bg-panel p-4">
          <BankAccountFields
            bankName="Itaú Unibanco"
            values={bankAccount}
            onChange={setBankAccount}
          />
        </div>
      </Plate>

      <Plate number="176" title="Result panel">
        <ResultPanel
          className="w-full max-w-3xl"
          clientName="Maria Aparecida Silva"
          cpfSlot={<SensitiveData value={VALID_CPF_FMT} maskPattern="cpf" />}
          beneficioSlot={<SensitiveData value="1234567890" maskPattern="beneficio" />}
          metrics={[
            { label: 'Margem consignável', value: 'R$ 1.847,32', delta: '+2,4%', deltaTone: 'up' },
            { label: 'Comprometimento', value: '28%', hint: 'dentro do limite' },
            { label: 'Prazo máx.', value: '72x' },
          ]}
          tabs={[
            {
              id: 'margem',
              label: 'Margem',
              content: (
                <p className="py-3 text-sm text-vellum-muted">
                  Margem livre R$ 1.847,32 · empréstimo ativo R$ 412,00 · cartão R$ 0,00.
                </p>
              ),
            },
            {
              id: 'historico',
              label: 'Histórico',
              content: (
                <ul className="space-y-2 py-3 text-sm text-vellum-muted">
                  <li>12 jun 2026 — Consulta margem INSS (autorizado)</li>
                  <li>03 mai 2026 — Simulação CLT 48x (rascunho)</li>
                </ul>
              ),
            },
            {
              id: 'contratos',
              label: 'Contratos',
              content: (
                <p className="py-3 text-sm text-vellum-muted">
                  Nenhum contrato digitado nesta sessão.
                </p>
              ),
            },
          ]}
        />
      </Plate>

      <Plate number="177" title="Provider banner">
        <ProviderBannerWithToast />
      </Plate>

      <Plate number="178" title="PDF embed">
        <div className="grid w-full max-w-2xl gap-4">
          <PdfEmbed title="Contrato de consignação — vazio" height={280} />
          <PdfEmbed
            title="CCB exemplo (externo)"
            src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            height={280}
          />
        </div>
      </Plate>

      <Plate number="179" title="Role nav">
        <div className="flex w-full max-w-md flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {(['admin', 'coordenador', 'operador'] as const).map((role) => (
              <Button
                key={role}
                size="sm"
                variant={currentRole === role ? 'primary' : 'secondary'}
                onClick={() => setCurrentRole(role)}
              >
                {role}
              </Button>
            ))}
          </div>
          <div className="rounded-lg border border-line bg-panel p-3">
            <RoleNav
              items={roleItems}
              currentRole={currentRole}
              activeId={roleNavActive}
              onNavigate={setRoleNavActive}
            />
          </div>
          <Caption>Perfil atual: {currentRole} · item ativo: {roleNavActive}</Caption>
        </div>
      </Plate>

      <Plate number="180" title="Diff simulação">
        <div className="w-full max-w-2xl">
          <SimulationDiff
            offerA={{
              parcela: 312.45,
              taxa: 1.89,
              cet: 28.4,
              prazo: 48,
              valor: 12400,
              total: 14997.6,
            }}
            offerB={{
              parcela: 278.9,
              taxa: 1.79,
              cet: 26.1,
              prazo: 60,
              valor: 12400,
              total: 16734,
            }}
            labels={{ offerA: 'Banco A · 48x', offerB: 'Banco B · 60x' }}
            onChooseA={() => setChosenOffer('A')}
            onChooseB={() => setChosenOffer('B')}
          />
          {chosenOffer && (
            <Caption className="mt-2">Oferta escolhida: {chosenOffer}</Caption>
          )}
        </div>
      </Plate>
    </>
  )
}
