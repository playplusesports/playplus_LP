"use client"

import { Layers, Gamepad2, Users, Wallet, Zap } from "lucide-react"
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"

const benefits = [
  {
    icon: Layers,
    title: "ワンストップ対応",
    description: "企画から制作まで一括対応で手間を削減",
  },
  {
    icon: Gamepad2,
    title: "eスポーツ特化",
    description: "大会運営の実務経験をもとに設計",
  },
  {
    icon: Users,
    title: "柔軟な対応",
    description: "企業・団体・個人すべて対応可能",
  },
  {
    icon: Wallet,
    title: "相談しやすい価格帯",
    description: "小規模案件から対応",
  },
  {
    icon: Zap,
    title: "スピード対応",
    description: "最短1週間でLP制作可能",
  },
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimate>
          <div className="text-center mb-16">
            <p className="text-sm text-accent font-medium mb-2">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              選ばれる理由
            </h2>
          </div>
        </ScrollAnimate>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <StaggerItem key={index}>
              <div className="group p-8 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors h-full">
                <div className="w-14 h-14 rounded-xl bg-secondary group-hover:bg-accent/20 flex items-center justify-center mb-6 transition-colors">
                  <benefit.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
