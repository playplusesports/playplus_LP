import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'サービス案内 | 法人・ご検討中の方へ',
  description:
    'Play+（プレイプラス）の法人・営業向けサービス案内。イベントプロデュース・Web制作・デザイン・SEO/MEO・eスポーツ運営をワンストップで提供。料金・実績・会社概要をまとめてご覧いただけます。',
  alternates: { canonical: '/corporate' },
}

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return children
}
