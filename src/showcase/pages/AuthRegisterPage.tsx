import type { FormEvent } from 'react'
import { AuthSplit } from '../../components/AuthSplit'
import { FormCard } from '../../components/Forms'
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'
import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'

export function AuthRegisterPage() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <AuthSplit
      brandTitle="Vernier"
      brandDescription="Crie sua conta e comece a calibrar interfaces com precisão de instrumento."
    >
      <FormCard
        title="Criar conta"
        description="Preencha os dados para acessar a bancada."
        footer={
          <Button type="submit" form="vernier-register" variant="gradient" className="w-full">
            Cadastrar
          </Button>
        }
      >
        <form id="vernier-register" className="space-y-4" onSubmit={handleSubmit}>
          <Input name="name" label="Nome completo" placeholder="Marina Costa" required />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="voce@empresa.com"
            required
          />
          <PasswordInput name="password" label="Senha" required />
          <PasswordInput name="confirm" label="Confirmar senha" required />
          <Checkbox
            name="terms"
            id="terms"
            label="Aceito os termos de uso e a política de privacidade"
            required
          />
        </form>
      </FormCard>
    </AuthSplit>
  )
}
