import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            プライバシーポリシー
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            最終更新日: 2026年3月31日
          </p>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                1. はじめに
              </h2>
              <p>
                Play+（以下「当団体」）は、お客様の個人情報の保護を重要な責務と考え、以下のとおりプライバシーポリシーを定め、個人情報の適切な取り扱いに努めます。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                2. 収集する情報
              </h2>
              <p>当団体は、以下の場合に個人情報を収集することがあります。</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>お問い合わせフォームからのご連絡時（お名前、メールアドレス、電話番号、ご相談内容）</li>
                <li>eスポーツ大会・イベントへのお申し込み時（お名前、ご所属、連絡先）</li>
                <li>サービスのご契約時（会社名・団体名、担当者名、連絡先、請求先情報）</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                3. 利用目的
              </h2>
              <p>収集した個人情報は、以下の目的で利用いたします。</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>お問い合わせへの回答・対応</li>
                <li>サービスの提供・運営</li>
                <li>大会・イベントの運営および連絡</li>
                <li>見積書・請求書等の送付</li>
                <li>サービスに関するご案内・お知らせの送信</li>
                <li>サービスの改善・新サービスの開発</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                4. 第三者への提供
              </h2>
              <p>
                当団体は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません。
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>お客様の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命・身体・財産の保護に必要な場合</li>
                <li>サービス提供に必要な範囲で業務委託先に提供する場合（適切な管理を義務付けます）</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                5. アクセス解析ツール
              </h2>
              <p>
                当サイトでは、サービス向上のためにVercel Analyticsを使用しています。これらのツールはCookieを使用してアクセス情報を収集しますが、個人を特定する情報は含まれません。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                6. 個人情報の管理
              </h2>
              <p>
                当団体は、お客様の個人情報を正確かつ最新の状態に保ち、不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、適切なセキュリティ対策を講じます。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                7. 個人情報の開示・訂正・削除
              </h2>
              <p>
                お客様ご自身の個人情報について、開示・訂正・削除をご希望の場合は、下記のお問い合わせ先までご連絡ください。本人確認のうえ、速やかに対応いたします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                8. ポリシーの変更
              </h2>
              <p>
                当団体は、必要に応じて本ポリシーの内容を変更することがあります。変更後のポリシーは、本ページに掲載した時点から効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                9. お問い合わせ
              </h2>
              <p>個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。</p>
              <div className="mt-3 p-4 rounded-lg bg-secondary/50">
                <p className="font-medium text-foreground">Play+</p>
                <p className="mt-1">メール: company@playplus.jp</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
