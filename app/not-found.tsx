import Link from "next/link"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

// サイト全体の404。ルートグループ外でも出るので、ヘッダー・フッターはここで描く

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="plus-pattern flex min-h-[80svh] items-center pt-24">
          <div className="site-container">
            <p className="font-pixel text-7xl text-signal-bright md:text-9xl">404</p>
            <h1 className="mt-6 text-3xl font-black md:text-4xl">GAME OVER… ではありません。</h1>
            <p className="mt-4 text-text-dim">お探しのページは見つかりませんでした。移動したか、削除された可能性があります。</p>
            <Link href="/" className="btn-signal mt-10">
              CONTINUE → トップへ
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
