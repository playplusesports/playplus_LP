import type { Metadata } from "next"
import Link from "next/link"
import { ContactBand } from "@/components/site/contact-band"
import { PageIntro } from "@/components/site/page-intro"
import { SERVICE_PILLARS } from "@/lib/site/service-pillars"

export const metadata: Metadata = {
  title: "事業内容",
  description:
    "Play+ の事業内容。Webサイト制作・集客、Webアプリ・サービス開発、AI活用・業務の自動化、動画・コンテンツ制作、イベント・eスポーツ・デザインの5つをひとつの窓口で手がけます。",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        code="SERVICES"
        title="5つの「つくる」"
        lead="分野ごとに別の会社を探す必要はありません。Webもアプリも、AIも動画もイベントも、Play+ がひとつの窓口でまとめて引き受けます。"
        crumbs={[{ label: "services", href: "/services" }]}
      >
        <nav aria-label="事業一覧" className="mt-10 flex flex-wrap gap-2">
          {SERVICE_PILLARS.map((pillar) => (
            <a
              key={pillar.slug}
              href={`#${pillar.slug}`}
              className="rounded-md border border-line-strong px-4 py-2 font-pixel text-xs tracking-[0.16em] text-text-dim transition-colors hover:border-play hover:text-white"
            >
              {pillar.code}
            </a>
          ))}
        </nav>
      </PageIntro>

      {SERVICE_PILLARS.map((pillar, position) => (
        <section key={pillar.slug} id={pillar.slug} className="border-b border-line py-20 md:py-28">
          <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <p className="font-mono text-sm text-text-dim">{String(position + 1).padStart(2, "0")} / 05</p>
              <p className="mt-3 font-pixel text-5xl tracking-[0.1em] text-play md:text-6xl">{pillar.code}</p>
              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight md:text-4xl">{pillar.title}</h2>
              <p className="mt-4 text-lg font-bold text-white/90">{pillar.lead}</p>
            </div>

            <div>
              <p className="leading-relaxed text-text-dim md:text-lg md:leading-relaxed">{pillar.description}</p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="pixel-label mb-4">できること</p>
                  <ul className="space-y-2.5">
                    {pillar.offerings.map((offering) => (
                      <li key={offering} className="flex gap-3 text-sm">
                        <span className="font-pixel text-signal-bright" aria-hidden="true">
                          +
                        </span>
                        {offering}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="pixel-label mb-4">実績</p>
                  <ul className="space-y-2.5">
                    {pillar.proofs.map((proof) => (
                      <li key={proof} className="text-sm text-text-dim">
                        {proof}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-sm">
                  <span className="text-text-dim">料金 </span>
                  {pillar.priceLabel}
                </p>
                <div className="flex flex-wrap gap-3">
                  {pillar.detailLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="btn-outline px-4 py-2.5">
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/contact" className="btn-signal px-4 py-2.5">
                    相談する
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <ContactBand />
    </>
  )
}
