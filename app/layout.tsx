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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
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
