import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ニュース',
  description: 'Play+の最新情報・お知らせ・イベントレポートをお届けします。',
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children
}
