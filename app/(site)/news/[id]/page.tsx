import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageIntro } from "@/components/site/page-intro"
import { listPublicNews } from "@/lib/public-news"

export const dynamic = "force-dynamic"

type NewsDetailPageProps = { params: Promise<{ id: string }> }

const DESCRIPTION_LENGTH = 110

async function findNews(id: string) {
  const news = await listPublicNews()
  return news.find((item) => item.id === id)
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const item = await findNews((await params).id)
  if (!item) return { title: "お知らせ" }
  return {
    title: item.title,
    description: item.content.replace(/\s+/g, " ").slice(0, DESCRIPTION_LENGTH),
    alternates: { canonical: `/news/${item.id}` },
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const item = await findNews((await params).id)
  if (!item) notFound()

  return (
    <>
      <PageIntro
        title={<span className="text-3xl sm:text-4xl md:text-5xl">{item.title}</span>}
        lead={item.date}
        crumbs={[
          { label: "お知らせ", href: "/news" },
          { label: item.id, href: `/news/${item.id}` },
        ]}
      />
      <article className="site-container max-w-3xl py-16 md:py-24">
        {item.imageUrl && (
          // 管理画面からアップロードされた任意サイズの画像なので next/image の最適化は使わない
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt="" className="mb-10 w-full rounded-lg border border-line" />
        )}
        <div className="whitespace-pre-line leading-loose text-fg/90">{item.content}</div>
        <Link href="/news" className="btn-secondary mt-14">
          お知らせ一覧へ戻る
        </Link>
      </article>
    </>
  )
}
