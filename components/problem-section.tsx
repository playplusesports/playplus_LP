import { HelpCircle } from "lucide-react"

const problems = [
  "eスポーツ大会を開催したいがやり方がわからない",
  "Webサイトを作りたいが制作会社が多すぎて選べない",
  "デザインを頼みたいがイメージを言語化できない",
  "ITやSNSが必要だと感じているが手が回らない",
  "社内に詳しい人材がいない",
  "予算感がわからず相談しにくい",
]

export function ProblemSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            こんなお悩みありませんか？
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors"
            >
              <HelpCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
              <p className="text-foreground">{problem}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12 text-lg">
          多くの企業・団体が同じ悩みを抱えています。
        </p>
      </div>
    </section>
  )
}
