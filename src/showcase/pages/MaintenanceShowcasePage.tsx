import { MaintenancePage as MaintenancePageBlock } from '../../components/MaintenancePage'
import { Button } from '../../components/Button'
import { usePageFullscreen } from './PageFrame'

export function MaintenanceShowcasePage() {
  const fullscreen = usePageFullscreen()

  return (
    <div
      className={
        fullscreen
          ? 'flex min-h-screen items-center justify-center bg-ink px-4 py-16'
          : 'flex min-h-[480px] items-center justify-center bg-ink px-4 py-12'
      }
    >
      <MaintenancePageBlock
        className="w-full max-w-xl"
        action={
          <Button variant="secondary" size="sm">
            Status da bancada
          </Button>
        }
      />
    </div>
  )
}
