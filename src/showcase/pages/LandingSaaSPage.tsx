import { BrowserFrame } from '../../components/BrowserFrame'
import { LandingPageSaaS } from '../../components/LandingPage'

export function LandingSaaSPage() {
  return (
    <BrowserFrame url="https://vernier.dev" contentClassName="max-h-none">
      <LandingPageSaaS />
    </BrowserFrame>
  )
}
