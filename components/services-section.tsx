import { Trophy, Monitor, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Trophy,
    title: "eスポーツ大会プロデュース",
    items: [
      "大会企画設計",
      "会場レイアウト設計",
      "運営導線設計",
      "進行台本作成",
      "参加者管理",
      "配信構成設計",
    ],
  },
  {
    icon: Monitor,
    title: "Webサイト制作",
    items: [
      "ランディングページ制作",
      "大会公式サイト制作",
      "ポートフォリオサイト制作",
      "申し込みフォーム設置",
      "スマホ対応",
    ],
  },
  {
    icon: Palette,
    title: "デザイン制作",
    items: [
      "大会ロゴ",
      "ポスター",
      "バナー",
      "配信オーバーレイ",
      "SNS投稿画像",
    ],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-accent font-medium mb-2">Services</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            提供サービス
          </h2>
          <p className="text-muted-foreground">
            必要な部分だけの依頼も可能です。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
