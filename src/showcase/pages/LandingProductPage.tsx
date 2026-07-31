import { BrowserFrame } from '../../components/BrowserFrame'
import { LandingPageProduct } from '../../components/LandingPage'

export function LandingProductPage() {
  return (
    <BrowserFrame url="https://vernier.dev/produto" contentClassName="max-h-none">
      <LandingPageProduct />
    </BrowserFrame>
  )
}
