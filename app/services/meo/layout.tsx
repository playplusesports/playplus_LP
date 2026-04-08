import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/services/meo',
  },
}

export default function MeoServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
