import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"

export function CtaSection() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
          まずはお気軽にご相談ください
        </h2>
        <p className="text-lg text-muted-foreground mb-12 text-pretty">
          イベントの企画から
          <br className="sm:hidden" />
          Web制作・デザインまで
          <br />
          最適な形をご提案いたします
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="https://lin.ee/pYn3rVU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05B34C] text-white font-bold text-base px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="h-5 w-5" />
            LINEで相談する
          </a>
          <Button size="lg" asChild className="text-base px-8 py-6">
            <a href="/contact">
              お問い合わせフォーム
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">
          無料相談受付中
        </div>
      </div>
    </section>
  )
}
