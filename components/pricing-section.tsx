import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const pricing = [
  {
    service: "イベントプロデュース",
    price: "50,000",
    unit: "円〜",
  },
  {
    service: "ランディングページ制作",
    price: "30,000",
    unit: "円〜",
  },
  {
    service: "Webサイト制作（複数ページ）",
    price: "80,000",
    unit: "円〜",
  },
  {
    service: "デザイン制作",
    price: "5,000",
    unit: "円〜",
  },
  {
    service: "ロゴ制作",
    price: "10,000",
    unit: "円〜",
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
          {pricing.map((item, index) => (
            <Card key={index} className="bg-card border-border text-center">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
