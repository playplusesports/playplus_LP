import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getNews } from "@/lib/news"
import { Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

const categoryColors: Record<string, string> = {
  "お知らせ": "bg-accent/10 text-accent",
  "イベント": "bg-green-500/10 text-green-400",
  "メディア": "bg-amber-500/10 text-amber-400",
  "実績": "bg-blue-500/10 text-blue-400",
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const news = await getNews()
  const item = news.find((n) => n.id === id)

  if (!item) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <article className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild className="mb-8">
            <a href="/news">
              <ArrowLeft className="h-4 w-4 mr-2" />
              ニュース一覧に戻る
            </a>
          </Button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {item.date}
            </span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[item.category] ?? "bg-secondary text-muted-foreground"}`}
            >
              {item.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            {item.title}
          </h1>

          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full rounded-xl mb-8"
            />
          )}

          <div className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {item.content}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
