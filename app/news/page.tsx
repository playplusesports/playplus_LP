import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getNews } from "@/lib/news"
import { Calendar } from "lucide-react"
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"

export const dynamic = "force-dynamic"

const categoryColors: Record<string, string> = {
  "お知らせ": "bg-accent/10 text-accent",
  "イベント": "bg-green-500/10 text-green-400",
  "メディア": "bg-amber-500/10 text-amber-400",
  "実績": "bg-blue-500/10 text-blue-400",
}

export default async function NewsPage() {
  const newsItems = await getNews()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <p className="text-sm text-accent font-medium mb-2">News</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                お知らせ
              </h1>
              <p className="text-lg text-muted-foreground">
                Play+の最新情報をお届けします。
              </p>
            </div>
          </ScrollAnimate>

          <StaggerContainer className="space-y-6">
            {newsItems.map((item) => (
              <StaggerItem key={item.id}>
                <article className="group rounded-xl border border-border bg-card p-6 hover:border-accent/50 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
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
                  <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h2>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full max-h-80 object-cover rounded-lg mb-3"
                    />
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Footer />
    </main>
  )
}
