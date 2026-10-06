import type { Metadata } from "next"
import Link from "next/link"
import { PageIntro } from "@/components/site/page-intro"
import { listPublicNews } from "@/lib/public-news"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "お知らせ",
  description: "Play+ からのお知らせ・イベント・メディア掲載・実績の情報です。",
  alternates: { canonical: "/news" },
}

export default async function NewsListPage() {
  const news = await listPublicNews()

  return (
    <>
      <PageIntro title="お知らせ" crumbs={[{ label: "お知らせ", href: "/news" }]} />
      <section className="py-16 md:py-24">
        <div className="site-container max-w-4xl">
          {news.length === 0 ? (
            <p className="text-fg-dim">お知らせはまだありません。</p>
          ) : (
            <ul className="border-t border-line">
              {news.map((item) => (
                <li key={item.id} className="border-b border-line">
                  <Link href={`/news/${item.id}`} className="group grid gap-1 py-6 sm:grid-cols-[7rem_6rem_1fr] sm:items-center sm:gap-4">
                    <span className="font-mono text-xs text-fg-dim">{item.date}</span>
                    <span className="w-fit rounded border border-line-strong px-2 py-0.5 text-[11px] text-fg-dim">{item.category}</span>
                    <span className="font-bold leading-snug group-hover:text-play">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
