import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = 'https://playplus.jp'

export const metadata: Metadata = {
  title: {
    default: 'Play+ | イベントプロデュース・Web制作・デザイン支援',
    template: '%s | Play+',
  },
  description: 'Play+（PlayPlus）- イベントの企画・運営からWebサイト制作・デザインまでワンストップで対応。企業・団体のための制作支援サービス。',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Play+ | イベントプロデュース・Web制作・デザイン支援',
    description: 'イベントの企画・運営からWebサイト制作・デザインまでワンストップで対応。',
    url: siteUrl,
    siteName: 'Play+',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Play+ - イベントプロデュース・Web制作・デザイン支援',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Play+ | イベントプロデュース・Web制作・デザイン支援',
    description: 'イベントの企画・運営からWebサイト制作・デザインまでワンストップで対応。',
    site: '@PlayPlus_E',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://playplus.jp/#organization",
                  "name": "Play+",
                  "alternateName": "PlayPlus",
                  "url": "https://playplus.jp",
                  "logo": "https://playplus.jp/logo.png",
                  "image": "https://playplus.jp/logo.png",
                  "description": "イベントの企画・運営からWebサイト制作・デザインまでワンストップで対応。企業・団体のための制作支援サービス。",
                  "email": "company@playplus.jp",
                  "telephone": "090-3866-4176",
                  "founder": {
                    "@type": "Person",
                    "name": "杉原 大誠"
                  },
                  "sameAs": [
                    "https://x.com/PlayPlus_E",
                    "https://www.instagram.com/playplus_e"
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "JP"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://playplus.jp/#website",
                  "url": "https://playplus.jp",
                  "name": "Play+",
                  "description": "イベントプロデュース・Web制作・デザイン支援",
                  "publisher": { "@id": "https://playplus.jp/#organization" },
                  "inLanguage": "ja"
                },
                {
                  "@type": "Service",
                  "name": "イベントプロデュース",
                  "description": "イベント・大会の企画から当日の運営・配信まで一貫してサポート",
                  "provider": { "@id": "https://playplus.jp/#organization" },
                  "areaServed": { "@type": "Country", "name": "JP" },
                  "offers": {
                    "@type": "Offer",
                    "price": "50000",
                    "priceCurrency": "JPY",
                    "priceSpecification": { "@type": "UnitPriceSpecification", "price": "50000", "priceCurrency": "JPY", "unitText": "件〜" }
                  }
                },
                {
                  "@type": "Service",
                  "name": "Web制作保守運用",
                  "description": "サイトの制作から更新・管理まで月額プランで対応。LINEで気軽にやり取りできます。",
                  "provider": { "@id": "https://playplus.jp/#organization" },
                  "url": "https://playplus.jp/services/web",
                  "areaServed": { "@type": "Country", "name": "JP" },
                  "offers": {
                    "@type": "Offer",
                    "price": "5000",
                    "priceCurrency": "JPY",
                    "priceSpecification": { "@type": "UnitPriceSpecification", "price": "5000", "priceCurrency": "JPY", "unitText": "月〜" }
                  }
                },
                {
                  "@type": "Service",
                  "name": "MEO / LLMO対策",
                  "description": "Googleマップ上位表示とAI検索最適化で集客力を強化するサービス",
                  "provider": { "@id": "https://playplus.jp/#organization" },
                  "url": "https://playplus.jp/services/meo",
                  "areaServed": { "@type": "Country", "name": "JP" },
                  "offers": {
                    "@type": "Offer",
                    "price": "15000",
                    "priceCurrency": "JPY",
                    "priceSpecification": { "@type": "UnitPriceSpecification", "price": "15000", "priceCurrency": "JPY", "unitText": "月〜" }
                  }
                },
                {
                  "@type": "Service",
                  "name": "デザイン制作",
                  "description": "ロゴ・ポスター・バナー・配信オーバーレイ・SNS投稿画像の制作",
                  "provider": { "@id": "https://playplus.jp/#organization" },
                  "offers": {
                    "@type": "Offer",
                    "price": "5000",
                    "priceCurrency": "JPY",
                    "priceSpecification": { "@type": "UnitPriceSpecification", "price": "5000", "priceCurrency": "JPY", "unitText": "件〜" }
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
