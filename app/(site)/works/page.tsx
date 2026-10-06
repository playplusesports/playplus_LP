import type { Metadata } from "next"
import { ContactBand } from "@/components/site/contact-band"
import { PageIntro } from "@/components/site/page-intro"
import { WorksGallery } from "@/components/site/works-gallery"
import { listPublicWorks } from "@/lib/public-works"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "実績",
  description:
    "Play+ の実績。Webサイト制作、Webアプリ・サービス開発、業務の自動化、動画制作、イベント・eスポーツ・デザインの事例を紹介します。",
  alternates: { canonical: "/works" },
}

type WorksPageProps = { searchParams: Promise<{ id?: string }> }

export default async function WorksPage({ searchParams }: WorksPageProps) {
  const [{ id = "" }, works] = await Promise.all([searchParams, listPublicWorks()])

  return (
    <>
      <PageIntro
        title="実績"
        lead="お客様の案件と、自社で開発・運営しているサービスです。カードを押すと詳しい内容を表示します。"
        crumbs={[{ label: "実績", href: "/works" }]}
      />
      <section className="py-16 md:py-24">
        <div className="site-container">
          <WorksGallery works={works} initialOpenId={id} />
          <p className="mt-12 text-sm text-fg-dim">ここに載せていない実績もあります。お気軽にお問い合わせください。</p>
        </div>
      </section>
      <ContactBand />
    </>
  )
}
