import { useState } from 'react'
import { GraduationCap, Home } from 'lucide-react'
import { Plate } from './CatalogShell'
import { CourseCard, CourseGrid } from '../components/CourseCard'
import { FeedPost, FeedList } from '../components/FeedPost'
import { PropertyCard, PropertyGrid } from '../components/PropertyCard'
import { EventCard, EventGrid } from '../components/EventCard'

export function Plates165to168() {
  const [liked, setLiked] = useState(false)

  return (
    <>
      <Plate number="165" title="Course card">
        <CourseGrid>
          <CourseCard
            title="Design system na prática"
            instructor="Marina Costa"
            level="Intermediário"
            duration="6h 20min"
            lessons={24}
            icon={<GraduationCap className="h-12 w-12" strokeWidth={1.25} />}
          />
          <CourseCard
            title="Tokens e temas dia/noite"
            instructor="Rafael Mendes"
            progress={62}
            duration="3h 45min"
            lessons={12}
          />
          <CourseCard
            title="Showcase como catálogo"
            instructor="Ana Souza"
            level="Iniciante"
            duration="2h 10min"
            lessons={8}
          />
        </CourseGrid>
      </Plate>

      <Plate number="166" title="Feed post">
        <FeedList className="max-w-lg">
          <FeedPost
            author="Marina Costa"
            time="há 2 h"
            body="Publicamos as placas 165–168: cards de curso, feed social, imóveis e eventos — tudo no mesmo tom oceânico da vitrine."
            likes={12}
            comments={3}
            liked={liked}
            onLike={() => setLiked((v) => !v)}
          />
          <FeedPost
            author="Equipe Vernier"
            time="ontem"
            body="Modo Pages no catálogo: ~42 telas completas para landing, auth, commerce, docs e mais."
            likes={28}
            comments={7}
          />
        </FeedList>
      </Plate>

      <Plate number="167" title="Property card">
        <PropertyGrid>
          <PropertyCard
            title="Loft com vista para o cais"
            address="Rua do Observatório, 128 — Santos, SP"
            price="R$ 890.000"
            bedrooms={2}
            bathrooms={2}
            area={94}
            badge="Destaque"
            icon={<Home className="h-14 w-14 text-brass/50" strokeWidth={1.25} />}
            onView={() => undefined}
          />
          <PropertyCard
            title="Apartamento instrumento"
            address="Av. Vernier, 42 — Florianópolis, SC"
            price="R$ 1.240.000"
            bedrooms={3}
            bathrooms={3}
            area={128}
            onView={() => undefined}
          />
        </PropertyGrid>
      </Plate>

      <Plate number="168" title="Event card">
        <EventGrid>
          <EventCard
            title="Meetup Design Systems BR"
            date="15 ago 2026 · 19:00"
            venue="Centro de Convenções — São Paulo"
            price="Gratuito"
            category="Comunidade"
            onView={() => undefined}
          />
          <EventCard
            title="Workshop Vernier Showcase"
            date="22 set 2026 · 14:00"
            venue="Online · Zoom"
            price="R$ 120"
            category="Workshop"
            onView={() => undefined}
          />
          <EventCard
            title="Conferência Instrument UI"
            date="10 out 2026 · 09:00"
            venue="Porto Digital — Recife"
            price="R$ 350"
            category="Conferência"
            onView={() => undefined}
          />
        </EventGrid>
      </Plate>
    </>
  )
}
