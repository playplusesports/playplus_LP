import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '制作・運営実績',
  description: 'Play+のイベント企画・大会運営・Webサイト制作・デザイン制作の実績をご紹介します。',
  alternates: { canonical: '/lp/works' },
  robots: { index: false, follow: true },
}

export default function LpWorksLayout({ children }: { children: React.ReactNode }) {
  return children
}
