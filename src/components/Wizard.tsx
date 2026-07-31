import { useState } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Stepper, type StepperStep } from './Stepper'
import { Input } from './Input'
import { Textarea } from './Textarea'

export function Wizard({
  steps,
  className,
  onFinish,
}: {
  steps?: StepperStep[]
  className?: string
  onFinish?: (data: { name: string; region: string; notes: string }) => void
}) {
  const wizardSteps = steps ?? [
    { title: 'Identidade', description: 'Nome do serviço' },
    { title: 'Região', description: 'Onde sobe' },
    { title: 'Revisão', description: 'Confirmar' },
  ]

  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [region, setRegion] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  const next = () => {
    if (step === 0 && name.trim().length < 2) {
      setError('Nome precisa ter pelo menos 2 caracteres.')
      return
    }
    if (step === 1 && region.trim().length < 2) {
      setError('Informe a região.')
      return
    }
    setError('')
    if (step >= wizardSteps.length - 1) {
      onFinish?.({ name, region, notes })
      return
    }
    setStep((s) => s + 1)
  }

  return (
    <div className={cn('w-full max-w-lg rounded-xl border border-line bg-panel p-6 shadow-plate', className)}>
      <Stepper steps={wizardSteps} current={step} />
      <div className="mt-8 space-y-4">
        {step === 0 && (
          <Input
            label="Nome do serviço"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error || undefined}
            placeholder="api-gateway"
          />
        )}
        {step === 1 && (
          <Input
            label="Região"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            error={error || undefined}
            placeholder="sa-east-1"
          />
        )}
        {step === 2 && (
          <>
            <div className="rounded-lg border border-line bg-panel2/50 p-4 text-sm text-vellum-muted">
              <p>
                <span className="text-vellum-faint">Nome:</span> {name}
              </p>
              <p className="mt-1">
                <span className="text-vellum-faint">Região:</span> {region}
              </p>
            </div>
            <Textarea
              label="Notas (opcional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Observações do deploy…"
            />
          </>
        )}
      </div>
      <div className="mt-6 flex justify-between gap-2">
        <Button variant="ghost" disabled={step === 0} onClick={() => { setError(''); setStep((s) => s - 1) }}>
          Voltar
        </Button>
        <Button variant="gradient" onClick={next}>
          {step >= wizardSteps.length - 1 ? 'Concluir' : 'Continuar'}
        </Button>
      </div>
    </div>
  )
}
