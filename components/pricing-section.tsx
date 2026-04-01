import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const pricing = [
  {
    name: "エントリープラン",
    initial: "無料",
    price: "5,000",
    contract: "6ヶ月契約",
    recommended: false,
    items: [
      "5ページ以内の静的サイト",
      "お問い合わせフォーム",
      "Googleマップ埋め込み",
      "サイト死活監視",
    ],
  },
  {
    name: "ライトプラン",
    initial: "¥9,800",
    price: "8,000",
    contract: "6ヶ月契約",
    recommended: true,
    items: [
      "8ページ以内の静的サイト",
      "お問い合わせフォーム＋LINE誘導",
      "Instagram・Googleマップ埋め込み",
      "月1回コンテンツ更新代行",
      "AI投稿文 月3本プレゼント",
      "月次アクセスレポート（LINE送付）",
    ],
  },
  {
    name: "スタンダードプラン",
    initial: "¥19,800",
    price: "15,000",
    contract: "3ヶ月契約",
    recommended: false,
    items: [
      "ページ数無制限",
      "予約フォーム・カート連携",
      "月2回コンテンツ更新",
      "AI投稿文 月10本",
      "月次Googleアナリティクスレポート",
      "SEO基本対策",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-accent font-medium mb-2">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            料金プラン
          </h2>
          <p className="text-muted-foreground">
            お店の規模に合わせて選べる3プラン
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {pricing.map((plan, index) => (
            <Card
              key={index}
              className={`bg-card text-center relative overflow-hidden ${
                plan.recommended
                  ? "border-accent ring-2 ring-accent"
                  : "border-border"
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-0 right-0 bg-accent text-white text-xs font-bold py-1.5 text-center tracking-wider">
                  おすすめ
                </div>
              )}
              <CardHeader className={plan.recommended ? "pt-10" : ""}>
                <CardTitle className="text-lg text-foreground">
                  {plan.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  初期費用 <span className="font-bold text-foreground">{plan.initial}</span>
                </p>
                <div className="flex items-baseline justify-center gap-1 mt-2">
                  <span className="text-4xl font-bold text-foreground">
                    ¥{plan.price}
                  </span>
                  <span className="text-muted-foreground">／月</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{plan.contract}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-left">
                  {plan.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground space-y-1">
          <p>※ 表示価格はすべて税込です。</p>
          <p>※ ドメイン・サーバー費用は含まれません（年額約3,000円〜別途）。</p>
          <p>※ 内容によってはお見積りいたします。</p>
        </div>
      </div>
    </section>
  )
}
