import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/services/web',
  },
}

export default function WebServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
