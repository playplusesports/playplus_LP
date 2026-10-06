// 2026-10 のリニューアルで廃止したページの転送先。広告や外部リンクからの流入を落とさないため恒久転送にする
const RETIRED_PAGE_REDIRECTS = [
  { source: '/lp', destination: '/' },
  { source: '/lp/web', destination: '/services/web' },
  { source: '/lp/services/web', destination: '/services/web' },
  { source: '/lp/services/meo', destination: '/services/meo' },
  { source: '/lp/works', destination: '/works' },
  { source: '/lp/contact', destination: '/contact' },
  { source: '/lp/:path*', destination: '/' },
  { source: '/corporate', destination: '/about' },
  { source: '/classic', destination: '/' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return RETIRED_PAGE_REDIRECTS.map((redirect) => ({ ...redirect, permanent: true }))
  },
}

export default nextConfig
