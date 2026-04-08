import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const pricing = [
  {
    service: "イベントプロデュース",
    price: "50,000",
    unit: "円〜",
    href: null,
  },
  {
    service: "Web制作保守運用",
    price: "5,000",
    unit: "円〜／月",
    note: "※エントリープランは6ヶ月限定",
    href: "/services/web",
  },
  {
    service: "デザイン制作",
    price: "5,000",
    unit: "円〜",
    href: null,
  },
  {
    service: "ロゴ作成",
    price: "10,000",
    unit: "円〜",
    href: null,
  },
  {
    service: "Googleビジネスプロフィール設定",
    price: "9,800",
    unit: "円",
    href: null,
  },
  {
    service: "Instagram初期設定＋投稿5本",
    price: "14,800",
    unit: "円",
    href: null,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-accent font-medium mb-2">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            参考料金
          </h2>
          <p className="text-muted-foreground">
            ※内容によりお見積りいたします
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricing.map((item, index) => {
            const cardContent = (
              <Card className={`bg-card border-border text-center h-full ${item.href ? "hover:border-accent cursor-pointer transition-colors" : ""}`}>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    {item.service}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {item.price}
                    </span>
                    <span className="text-muted-foreground">{item.unit}</span>
                  </div>
                  {(item as Record<string, unknown>).note && (
                    <p className="text-xs text-muted-foreground mt-2">{(item as Record<string, unknown>).note as string}</p>
                  )}
                  {item.href && (
                    <p className="text-xs text-accent mt-3 font-medium">詳しく見る →</p>
                  )}
                </CardContent>
              </Card>
            )
            return item.href ? (
              <a key={index} href={item.href}>{cardContent}</a>
            ) : (
              <div key={index}>{cardContent}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
