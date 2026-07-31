import { AuthSplit } from '../../components/AuthSplit'
import { LoginForm } from '../../components/Forms'

export function AuthLoginPage() {
  return (
    <AuthSplit
      brandTitle="Vernier"
      brandDescription="Entre no workspace e continue calibrando interfaces com precisão de instrumento."
    >
      <LoginForm onSubmit={() => undefined} />
    </AuthSplit>
  )
}
