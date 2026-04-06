import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
  description: 'Play+の特定商取引法に基づく表記。',
}

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            特定商取引法に基づく表記
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            最終更新日: 2026年4月6日
          </p>

          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                <tr>
                  <th className="bg-secondary/50 px-6 py-4 text-left font-semibold text-foreground w-1/3 align-top">事業者名</th>
                  <td className="px-6 py-4 text-muted-foreground">Play+</td>
                </tr>
                <tr>
                  <th className="bg-secondary/50 px-6 py-4 text-left font-semibold text-foreground align-top">代表者名</th>
                  <td className="px-6 py-4 text-muted-foreground">杉原 大誠</td>
                </tr>
                <tr>
                  <th className="bg-secondary/50 px-6 py-4 text-left font-semibold text-foreground align-top">所在地</th>
                  <td className="px-6 py-4 text-muted-foreground">請求があった場合には速やかに開示いたします。</td>
                </tr>
                <tr>
                  <th className="bg-secondary/50 px-6 py-4 text-left font-semibold text-foreground align-top">電話番号</th>
                  <td className="px-6 py-4 text-muted-foreground">090-3866-4176</td>
                </tr>
                <tr>
                  <th className="bg-secondary/50 px-6 py-4 text-left font-semibold text-foreground align-top">メールアドレス</th>
                  <td className="px-6 py-4 text-muted-foreground">company@playplus.jp</td>
                </tr>
                <tr>
                  <th className="bg-secondary/50 px-6 py-4 text-left font-semibold text-foreground align-top">販売価格</th>
                  <td className="px-6 py-4 text-muted-foreground">各サービスページに記載の価格に準じます。表示価格はすべて税込です。</td>
                </tr>
                <tr>
                  <th className="bg-secondary/50 px-6 py-4 text-left font-semibold text-foreground align-top">販売価格以外の必要料金</th>
                  <td className="px-6 py-4 text-muted-foreground">プランによりドメイン・サーバー費用が別途発生する場合があります。詳細は各プランの説明をご確認ください。</td>
                </tr>
                <tr>
                  <th className="bg-secondary/50 px-6 py-4 text-left font-semibold text-foreground align-top">支払方法</th>
                  <td className="px-6 py-4 text-muted-foreground">クレジットカード、銀行振込</td>
                </tr>
                <tr>
                  <th className="bg-secondary/50 px-6 py-4 text-left font-semibold text-foreground align-top">支払時期</th>
                  <td className="px-6 py-4 text-muted-foreground">月額プラン：毎月の契約日に請求<br />買い切りプラン・オプション：ご注文確定時</td>
                </tr>
                <tr>
                  <th className="bg-secondary/50 px-6 py-4 text-left font-semibold text-foreground align-top">サービス提供時期</th>
                  <td className="px-6 py-4 text-muted-foreground">ご入金確認後、制作に着手いたします。制作期間は内容により異なりますが、通常3〜10営業日程度です。</td>
                </tr>
                <tr>
                  <th className="bg-secondary/50 px-6 py-4 text-left font-semibold text-foreground align-top">キャンセル・返金について</th>
                  <td className="px-6 py-4 text-muted-foreground">
                    サービスの性質上、制作着手後のキャンセル・返金は原則としてお受けしておりません。<br />
                    月額プランの解約は各プランの契約期間に準じます。契約期間内の解約には違約金（¥19,800）が発生する場合があります。<br />
                    エントリープランは契約期間の縛りがなく、いつでも解約可能です。
                  </td>
                </tr>
                <tr>
                  <th className="bg-secondary/50 px-6 py-4 text-left font-semibold text-foreground align-top">動作環境</th>
                  <td className="px-6 py-4 text-muted-foreground">最新版のGoogle Chrome、Safari、Microsoft Edge、Firefoxでの動作を推奨いたします。</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
