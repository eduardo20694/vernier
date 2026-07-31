import type { HTMLAttributes, IframeHTMLAttributes } from 'react'
import { cn } from '../lib/cn'
import { AspectRatio } from './AspectRatio'

export interface VideoEmbedProps extends HTMLAttributes<HTMLDivElement> {
  /** YouTube, Vimeo ou qualquer URL de iframe */
  src: string
  title: string
  ratio?: number
  allow?: IframeHTMLAttributes<HTMLIFrameElement>['allow']
}

export function VideoEmbed({
  src,
  title,
  ratio = 16 / 9,
  allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
  className,
  ...props
}: VideoEmbedProps) {
  return (
    <div
      className={cn('overflow-hidden rounded-xl border border-line bg-panel shadow-plate', className)}
      {...props}
    >
      <AspectRatio ratio={ratio}>
        <iframe
          src={src}
          title={title}
          allow={allow}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full border-0"
        />
      </AspectRatio>
    </div>
  )
}
