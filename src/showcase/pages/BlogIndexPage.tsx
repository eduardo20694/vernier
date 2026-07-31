import { BlogListing } from '../../components/BlogListing'
import { Button } from '../../components/Button'
import { MarketingShell } from './MarketingShell'
import { DEMO_POSTS } from './demoData'

export function BlogIndexPage() {
  return (
    <MarketingShell>
      <div className="px-5 py-10 sm:px-8">
        <BlogListing
          title="Notas da oficina"
          description="Atualizações sobre tokens, vitrine e novos blocos."
          posts={DEMO_POSTS}
          footer={
            <Button variant="secondary" size="sm">
              Ver arquivo completo
            </Button>
          }
        />
      </div>
    </MarketingShell>
  )
}
