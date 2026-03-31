import { Button } from "@/components/ui/button"
import { ArrowRight, Monitor, Palette, Trophy } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary via-background to-background" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm text-muted-foreground">
            企業・団体のための制作支援サービス
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
          eスポーツ大会の企画・運営から
          <br />
          <span className="text-accent">Web制作・デザイン</span>まで
          <br />
          ワンストップで対応
        </h1>

        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-12 text-pretty">
          「何から始めればいいかわからない」
          <br className="sm:hidden" />
          そんな企業・団体様をサポートします
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" asChild className="text-base px-8 py-6">
            <a href="#contact">
              無料相談はこちら
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-base px-8 py-6">
            <a href="#services">サービスを見る</a>
          </Button>
        </div>

        {/* Service Tags */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="h-5 w-5 text-accent" />
            <span>大会プロデュース</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Monitor className="h-5 w-5 text-accent" />
            <span>Web制作</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Palette className="h-5 w-5 text-accent" />
            <span>デザイン制作</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  )
}
