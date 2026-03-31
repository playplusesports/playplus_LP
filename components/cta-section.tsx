import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
          まずはお気軽にご相談ください
        </h2>
        <p className="text-lg text-muted-foreground mb-12 text-pretty">
          eスポーツ大会の企画から
          <br className="sm:hidden" />
          Web制作・デザインまで
          <br />
          最適な形をご提案いたします
        </p>

        <Button size="lg" asChild className="text-base px-10 py-7">
          <a href="/contact">
            無料相談はこちら
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>

        <div className="mt-12 pt-12 border-t border-border">
          <p className="text-sm text-muted-foreground mb-6">
            お問い合わせは以下から
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="#"
              className="text-foreground hover:text-accent transition-colors"
            >
              お問い合わせフォーム
            </a>
            <span className="text-border">|</span>
            <a
              href="#"
              className="text-foreground hover:text-accent transition-colors"
            >
              X（旧Twitter）
            </a>
            <span className="text-border">|</span>
            <a
              href="#"
              className="text-foreground hover:text-accent transition-colors"
            >
              メール
            </a>
          </div>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">
          無料相談受付中
        </div>
      </div>
    </section>
  )
}
