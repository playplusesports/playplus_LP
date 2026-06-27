import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '無料相談・お問い合わせ',
  description: 'Play+（プレイプラス）への無料相談・お問い合わせ。Webサイト制作・運用、SEO/MEO/LLMO、デザイン、イベントのご相談を承ります。2営業日以内に返信、初回相談無料。',
  alternates: { canonical: '/lp/contact' },
  robots: { index: false, follow: true },
}

export default function LpContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
