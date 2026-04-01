import { CheckCircle2 } from "lucide-react"

const solutions = [
  "イベントの企画・運営支援",
  "集客用Webサイト制作",
  "バナー・ポスター・ロゴ制作",
  "参加者管理・導線設計",
  "SNS活用支援",
]

export function SolutionSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              その課題、
              <br />
              <span className="text-accent">すべて解決</span>できます。
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              企画段階から伴走し、目的に合わせた最適な形をご提案します。
            </p>

            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span className="text-foreground">{solution}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-secondary/50 border border-border overflow-hidden flex items-center justify-center relative">
              <img
                src="/logo.png"
                alt=""
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500%] h-[500%] object-contain opacity-25"
              />
              <div className="text-center p-8 relative z-10">
                <p className="text-7xl sm:text-9xl font-bold text-accent mb-4">1</p>
                <p className="text-2xl sm:text-4xl font-bold text-foreground">
                  ワンストップ対応
                </p>
                <p className="text-lg sm:text-xl text-muted-foreground mt-3">
                  「やりたい」を形にするまで
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
