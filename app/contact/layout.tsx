import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'Play+へのお問い合わせはこちら。イベントの企画・Web制作・デザインのご相談を無料で承ります。',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
