import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { Eraser } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'

export interface SignaturePadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  onChange?: (dataUrl: string | null) => void
  width?: number
  height?: number
  label?: string
  disabled?: boolean
}

export function SignaturePad({
  className,
  onChange,
  width = 480,
  height = 180,
  label = 'Assinatura',
  disabled,
  ...props
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [empty, setEmpty] = useState(true)

  const getCtx = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    return { canvas, ctx }
  }, [])

  useEffect(() => {
    const pair = getCtx()
    if (!pair) return
    const { canvas, ctx } = pair
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgb(75, 143, 245)'
  }, [getCtx, width, height])

  const point = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const emitDrawn = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    setEmpty(false)
    onChange?.(canvas.toDataURL('image/png'))
  }

  const clear = () => {
    const pair = getCtx()
    if (!pair) return
    const { canvas, ctx } = pair
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const dpr = window.devicePixelRatio || 1
    ctx.scale(dpr, dpr)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgb(75, 143, 245)'
    setEmpty(true)
    onChange?.(null)
  }

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-vellum-muted">{label}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled || empty}
          onClick={clear}
        >
          <Eraser className="h-3.5 w-3.5" />
          Limpar
        </Button>
      </div>
      <canvas
        ref={canvasRef}
        className={cn(
          'max-w-full touch-none rounded border border-line bg-panel',
          'shadow-[inset_0_1px_0_rgb(var(--mist)/0.06)]',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-crosshair'
        )}
        onPointerDown={(e) => {
          if (disabled) return
          const pair = getCtx()
          if (!pair) return
          drawing.current = true
          canvasRef.current?.setPointerCapture(e.pointerId)
          const p = point(e)
          pair.ctx.beginPath()
          pair.ctx.moveTo(p.x, p.y)
        }}
        onPointerMove={(e) => {
          if (!drawing.current || disabled) return
          const pair = getCtx()
          if (!pair) return
          const p = point(e)
          pair.ctx.lineTo(p.x, p.y)
          pair.ctx.stroke()
        }}
        onPointerUp={() => {
          if (!drawing.current) return
          drawing.current = false
          emitDrawn()
        }}
        onPointerLeave={() => {
          if (drawing.current) {
            drawing.current = false
            emitDrawn()
          }
        }}
      />
    </div>
  )
}
