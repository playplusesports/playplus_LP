import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO / MEO / LLMO対策 月額15,000円〜',
  description: 'Play+のSEO / MEO / LLMO対策。検索エンジン・Googleマップ・AI検索（ChatGPT/Gemini）での集客を強化。初期費用¥0・最低契約期間なしで導入できます。',
  alternates: { canonical: '/lp/services/meo' },
  robots: { index: false, follow: true },
}

export default function LpMeoServiceLayout({ children }: { children: React.ReactNode }) {
  return children
}
