export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl font-bold text-foreground">ESPORTS STUDIO</p>
            <p className="text-sm text-muted-foreground mt-1">
              eスポーツ大会プロデュース / Web制作 / デザイン制作
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="/#services"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              サービス
            </a>
            <a
              href="/#benefits"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              選ばれる理由
            </a>
            <a
              href="/portfolio"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              実績
            </a>
            <a
              href="/#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              料金
            </a>
            <a
              href="/#faq"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </a>
            <a
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              お問い合わせ
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ESPORTS STUDIO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
