import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Webサイト制作・保守運用 月額5,000円〜',
  description: 'Play+のWebサイト制作・保守運用。初期費用¥0のプランから、制作・更新代行・SNS投稿・月次レポートまで月額で対応。LINEで気軽にやり取りできます。',
  alternates: { canonical: '/lp/services/web' },
  robots: { index: false, follow: true },
}

export default function LpWebServiceLayout({ children }: { children: React.ReactNode }) {
  return children
}
