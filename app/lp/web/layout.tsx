import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Webサイト制作・運用 月額5,000円〜 | 制作から集客までまるごとおまかせ',
  description:
    'Webサイト制作・運用ならPlay+（プレイプラス）。企画・制作から公開後の更新・集客までワンストップ。月額5,000円〜、最短1週間で公開。初回相談・お見積り無料、全国オンライン対応。',
  alternates: { canonical: '/lp/web' },
  robots: { index: false, follow: true },
}

export default function WebLpLayout({ children }: { children: React.ReactNode }) {
  return children
}
