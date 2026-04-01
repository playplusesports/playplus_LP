"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertTriangle } from "lucide-react"

type Tab = "monthly" | "onetime" | "options"

const monthlyPlans = [
  {
    name: "エントリープラン",
    initial: "¥0",
    price: "5,000",
    contract: "縛りなし",
    recommended: false,
    items: [
      "独自ドメイン・サーバー費用込み",
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
      "独自ドメイン・サーバー費用込み",
      "8ページ以内の静的サイト",
      "お問い合わせ＋LINE誘導",
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
      "独自ドメイン・サーバー費用込み",
      "ページ数無制限",
      "予約フォーム・ECカート連携",
      "月2回コンテンツ更新",
      "AI投稿文 月10本",
      "月次Googleアナリティクスレポート",
      "SEO基本対策",
    ],
  },
]

const options = [
  { name: "ロゴ作成 — シンプル", price: "¥10,000", desc: "テキスト＋アイコン。AI補助で制作。PNG・SVG納品。納期3〜5日", highlight: true },
  { name: "ロゴ作成 — フルオリジナル", price: "¥39,800", desc: "ヒアリング→複数案提案→修正2回込み。完全オリジナル。納期7〜10日", highlight: true },
  { name: "追加ページ制作（1ページ）", price: "¥8,000", desc: "スターターへの追加など。制作のみ・保守別途", highlight: false },
  { name: "Googleビジネスプロフィール設定", price: "¥9,800", desc: "マップ掲載・写真登録・初期SEO最適化を代行", highlight: false },
  { name: "Instagram初期設定＋投稿5本", price: "¥14,800", desc: "プロフィール整備＋開始投稿5本をAIで作成・代行投稿", highlight: false },
]

export function PricingSection() {
  const [tab, setTab] = useState<Tab>("monthly")

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-accent font-medium mb-2">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            料金プラン
          </h2>
          <p className="text-muted-foreground">
            お店の規模・ご要望に合わせてお選びいただけます
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {([
            { key: "monthly" as Tab, label: "月額プラン" },
            { key: "onetime" as Tab, label: "買い切り" },
            { key: "options" as Tab, label: "オプション" },
          ]).map((t) => (
            <Button
              key={t.key}
              variant={tab === t.key ? "default" : "outline"}
              onClick={() => setTab(t.key)}
              className="text-sm"
            >
              {t.label}
            </Button>
          ))}
        </div>

        {/* Monthly Plans */}
        {tab === "monthly" && (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {monthlyPlans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-card text-center relative overflow-hidden ${
                  plan.recommended ? "border-accent ring-2 ring-accent" : "border-border"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-0 right-0 bg-accent text-white text-xs font-bold py-1.5 text-center tracking-wider">
                    おすすめ
                  </div>
                )}
                <CardHeader className={plan.recommended ? "pt-10" : ""}>
                  <CardTitle className="text-lg text-foreground">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    初期費用 <span className="font-bold text-foreground">{plan.initial}</span>
                  </p>
                  <div className="flex items-baseline justify-center gap-1 mt-2">
                    <span className="text-4xl font-bold text-foreground">¥{plan.price}</span>
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
        )}

        {/* One-time Plan */}
        {tab === "onetime" && (
          <div className="max-w-xl mx-auto">
            <Card className="bg-card border-border overflow-hidden">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-foreground">スターターパック</CardTitle>
                <div className="flex items-baseline justify-center gap-1 mt-3">
                  <span className="text-4xl font-bold text-foreground">¥29,800</span>
                  <span className="text-muted-foreground">（一括）</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">縛りなし・一括払い</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {[
                    "5ページ以内の静的サイト",
                    "お問い合わせフォーム",
                    "Googleマップ埋め込み",
                    "修正1回無料",
                    "納品：ファイル一式を圧縮してお渡し",
                  ].map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-400">保守・更新は含まれません。ファイルの管理はお客様側となります。</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Options */}
        {tab === "options" && (
          <div className="max-w-3xl mx-auto space-y-4">
            {options.map((opt, index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-xl border bg-card ${
                  opt.highlight ? "border-accent/30 bg-accent/5" : "border-border"
                }`}
              >
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">{opt.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
                </div>
                <p className="text-xl font-bold text-foreground shrink-0">{opt.price}</p>
              </div>
            ))}
            <p className="text-xs text-muted-foreground text-center mt-6">
              ※ ロゴ作成のシンプルとフルオリジナルはどちらか1つのみ選択可能です。
            </p>
          </div>
        )}

        {/* Notes */}
        <div className="mt-10 text-center text-xs text-muted-foreground space-y-1">
          <p>※ 表示価格はすべて税込です。</p>
          <p>※ ドメイン・サーバー費用は別途年額 ¥3,000〜 かかります。</p>
          <p>※ 内容によってはお見積りとなる場合があります。</p>
        </div>
      </div>
    </section>
  )
}
