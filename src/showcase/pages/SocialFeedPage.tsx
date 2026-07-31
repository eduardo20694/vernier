import { useState } from 'react'
import { Bell, Gauge, Home, Image, Search, User, Users } from 'lucide-react'
import { AppShell, TopNav } from '../../components/AppShell'
import { AvatarGroup } from '../../components/AvatarGroup'
import { BottomTabBar, type BottomTabItem } from '../../components/BottomTabBar'
import { Button } from '../../components/Button'
import { CommentList } from '../../components/CommentList'
import { FeedList, FeedPost } from '../../components/FeedPost'
import { Textarea } from '../../components/Textarea'
import { UserMenu } from '../../components/UserMenu'
import { cn } from '../../lib/cn'
import { AppPageShell } from './PageFrame'

const SOCIAL_TABS: BottomTabItem[] = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'search', label: 'Busca', icon: Search },
  { id: 'create', label: 'Criar', icon: Image },
  { id: 'alerts', label: 'Alertas', icon: Bell, badge: 2 },
  { id: 'account', label: 'Conta', icon: User },
]

const SUGGESTIONS = [
  { fallback: 'Marina Costa', tone: 'brass' as const },
  { fallback: 'Lucas Ferreira', tone: 'verdigris' as const },
  { fallback: 'Ana Ribeiro', tone: 'neutral' as const },
  { fallback: 'Pedro Alves', tone: 'rust' as const },
  { fallback: 'Julia Mendes', tone: 'brass' as const },
  { fallback: 'Rafael Souza', tone: 'neutral' as const },
]

const INITIAL_POSTS = [
  {
    id: '1',
    author: 'Marina Costa',
    time: 'há 12 min',
    body: 'Acabei de publicar o kit de tokens oceano v2 — brass mais luminoso e contraste revisado para modo dia. Feedback bem-vindo!',
    likes: 24,
    comments: 5,
    liked: false,
  },
  {
    id: '2',
    author: 'Lucas Ferreira',
    time: 'há 1 h',
    body: 'Alguém já testou o novo FilterBar com chips removíveis? Integração com a busca global ficou bem fluida no nosso dashboard.',
    likes: 18,
    comments: 3,
    liked: true,
  },
  {
    id: '3',
    author: 'Ana Ribeiro',
    time: 'há 3 h',
    body: 'Screenshot da vitrine Pages em fullscreen — 22 receitas prontas e contando.\n\n#vernier #designsystem',
    likes: 41,
    comments: 8,
    liked: false,
  },
]

const SAMPLE_COMMENTS = [
  {
    id: 'c1',
    author: 'Pedro Alves',
    body: 'Testei ontem — chips com tom brass ficaram ótimos no dark mode.',
    time: 'há 45 min',
  },
  {
    id: 'c2',
    author: 'Julia Mendes',
    body: 'Só faltou exportar os filtros ativos na URL. Fora isso, aprovado.',
    time: 'há 20 min',
  },
]

export function SocialFeedPage() {
  const [draft, setDraft] = useState('')
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [expandedComments, setExpandedComments] = useState<string | null>('2')
  const [tab, setTab] = useState('home')

  function toggleLike(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    )
  }

  function publishPost() {
    if (!draft.trim()) return
    setPosts((prev) => [
      {
        id: String(Date.now()),
        author: 'Você',
        time: 'agora',
        body: draft.trim(),
        likes: 0,
        comments: 0,
        liked: false,
      },
      ...prev,
    ])
    setDraft('')
  }

  return (
    <AppPageShell className="flex items-center justify-center bg-ink/50 p-4">
      <div
        className={cn(
          'relative flex h-full w-full max-w-[420px] flex-col overflow-hidden',
          'rounded-[2rem] border-[3px] border-line bg-ink shadow-plate'
        )}
      >
        <div className="mx-auto h-5 w-28 shrink-0 rounded-b-xl bg-line/80" aria-hidden />

        <AppShell
          className="min-h-0 flex-1 rounded-none border-0 shadow-none"
          topbar={
            <TopNav
              brand={
                <>
                  <Gauge className="h-4 w-4 text-brass-bright" aria-hidden />
                  <span className="text-sm font-medium text-vellum">Vernier Social</span>
                </>
              }
              actions={
                <UserMenu
                  name="Marina Costa"
                  email="marina@vernier.dev"
                  onSettings={() => undefined}
                  onLogout={() => undefined}
                />
              }
            />
          }
        >
          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            <div className="min-w-0 flex-1 overflow-y-auto px-4 pb-20 pt-4">
              <div className="rounded-xl border border-line bg-panel p-4 shadow-plate">
                <Textarea
                  placeholder="O que você está calibrando hoje?"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="min-h-[72px] border-0 bg-transparent p-0 focus:ring-0"
                  aria-label="Compor publicação"
                />
                <div className="mt-3 flex justify-end">
                  <Button variant="primary" size="sm" onClick={publishPost} disabled={!draft.trim()}>
                    Publicar
                  </Button>
                </div>
              </div>

              <FeedList className="mt-4">
                {posts.map((post) => (
                  <FeedPost
                    key={post.id}
                    author={post.author}
                    time={post.time}
                    body={post.body}
                    likes={post.likes}
                    comments={post.comments}
                    liked={post.liked}
                    onLike={() => toggleLike(post.id)}
                    onComment={() =>
                      setExpandedComments((cur) => (cur === post.id ? null : post.id))
                    }
                    onShare={() => undefined}
                  >
                    {expandedComments === post.id && post.comments > 0 && (
                      <CommentList comments={SAMPLE_COMMENTS} />
                    )}
                  </FeedPost>
                ))}
              </FeedList>
            </div>

            <aside className="hidden w-56 shrink-0 border-l border-line bg-panel/40 p-4 lg:block">
              <h2 className="flex items-center gap-2 font-display text-sm text-vellum">
                <Users className="h-4 w-4 text-brass" aria-hidden />
                Sugestões
              </h2>
              <p className="mt-1 text-xs text-vellum-faint">Criadores que você pode seguir</p>
              <div className="mt-4">
                <AvatarGroup items={SUGGESTIONS} max={5} size="sm" />
              </div>
              <ul className="mt-4 space-y-3">
                {SUGGESTIONS.slice(0, 4).map((s) => (
                  <li key={s.fallback} className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-vellum-muted">{s.fallback}</span>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px]">
                      Seguir
                    </Button>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </AppShell>

        <BottomTabBar
          items={SOCIAL_TABS}
          value={tab}
          onValueChange={setTab}
          className="absolute inset-x-0 bottom-0 rounded-none border-line/80 bg-panel/98"
        />
      </div>
    </AppPageShell>
  )
}
