import { BrowserFrame } from '../../components/BrowserFrame'
import { LandingPageStudio } from '../../components/LandingPage'

export function LandingStudioPage() {
  return (
    <BrowserFrame url="https://vernier.dev/estudio" contentClassName="max-h-none">
      <LandingPageStudio />
    </BrowserFrame>
  )
}
