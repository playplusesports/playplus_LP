import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Play+" width={40} height={40} className="rounded-full" />
              <p className="text-xl font-bold text-foreground">Play+</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              eスポーツ大会プロデュース / Web制作 / デザイン制作
            </p>

            {/* SNS Links */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://x.com/PlayPlus_E"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-4">ページ</p>
            <nav className="flex flex-col gap-2">
              <a href="/#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">サービス</a>
              <a href="/#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">選ばれる理由</a>
              <a href="/works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">実績</a>
              <a href="/news" className="text-sm text-muted-foreground hover:text-foreground transition-colors">ニュース</a>
            </nav>
          </div>

          {/* Info */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-4">お問い合わせ</p>
            <nav className="flex flex-col gap-2">
              <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">お問い合わせフォーム</a>
              <a href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">料金</a>
              <a href="/#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Play+. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
