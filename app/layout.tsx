import type { Metadata, Viewport } from 'next'
import { DotGothic16, Inter_Tight, JetBrains_Mono, Zen_Kaku_Gothic_New } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { COMPANY_PROFILE, CONTACT_CHANNELS } from '@/lib/site/company-profile'
import './globals.css'

const bodyFont = Zen_Kaku_Gothic_New({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dotFont = DotGothic16({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dot',
  display: 'swap',
})

const latinFont = Inter_Tight({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-latin',
  display: 'swap',
})

const codeFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-code',
  display: 'swap',
})

const SITE_TITLE = 'Play+ | Webサイト・アプリ・動画制作とイベント運営（大阪）'
const SITE_DESCRIPTION =
  'Play+（プレイプラス）は大阪を拠点に、Webサイト制作、Webアプリ開発、業務の自動化、動画制作、eスポーツ大会などのイベント運営を手がけています。'

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: '%s | Play+',
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(COMPANY_PROFILE.siteUrl),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: COMPANY_PROFILE.siteUrl,
    siteName: COMPANY_PROFILE.name,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: '@PlayPlus_E',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: '/',
  },
  // Google AdSense のサイト所有権確認用メタタグ（広告は表示しない）
  other: {
    'google-adsense-account': 'ca-pub-5484969216234278',
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f4ee',
}

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${COMPANY_PROFILE.siteUrl}/#organization`,
      name: COMPANY_PROFILE.name,
      alternateName: COMPANY_PROFILE.alternateName,
      url: COMPANY_PROFILE.siteUrl,
      logo: `${COMPANY_PROFILE.siteUrl}/logo.png`,
      description: SITE_DESCRIPTION,
      email: COMPANY_PROFILE.email,
      telephone: COMPANY_PROFILE.telephone,
      founder: { '@type': 'Person', name: COMPANY_PROFILE.representative },
      sameAs: [CONTACT_CHANNELS.x, CONTACT_CHANNELS.instagram],
      address: { '@type': 'PostalAddress', addressRegion: COMPANY_PROFILE.area, addressCountry: 'JP' },
    },
    {
      '@type': 'WebSite',
      '@id': `${COMPANY_PROFILE.siteUrl}/#website`,
      url: COMPANY_PROFILE.siteUrl,
      name: COMPANY_PROFILE.name,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${COMPANY_PROFILE.siteUrl}/#organization` },
      inLanguage: 'ja',
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${bodyFont.variable} ${latinFont.variable} ${dotFont.variable} ${codeFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
