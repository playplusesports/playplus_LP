import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '実績',
  description: 'Play+のイベント企画・運営・Web制作・デザイン制作の実績をご紹介します。',
}

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return children
}
