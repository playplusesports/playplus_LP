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
        code="Services"
        title={
          <>
            5つの「つくる」を、
            <br className="hidden md:block" />
            ひとつの窓口で。
          </>
        }
        lead="分野ごとに別の会社を探す必要はありません。Webもアプリも、AIも動画もイベントも、Play+ がまとめて引き受けます。"
        crumbs={[{ label: "Services", href: "/services" }]}
      >
        <nav aria-label="事業一覧" className="mt-12 flex flex-wrap gap-2">
          {SERVICE_PILLARS.map((pillar) => (
            <a
              key={pillar.slug}
              href={`#${pillar.slug}`}
              className="rounded-full border border-line-strong bg-surface-1 px-5 py-2.5 font-display text-sm font-bold transition-colors hover:border-fg hover:bg-fg hover:text-surface-0"
            >
              {pillar.code}
            </a>
          ))}
        </nav>
      </PageIntro>

      <div className="site-container space-y-5 py-16 md:py-24">
        {SERVICE_PILLARS.map((pillar, position) => (
          <section
            key={pillar.slug}
            id={pillar.slug}
            className={`overflow-hidden rounded-[2rem] ${position % 2 === 1 ? "theme-ink" : "panel"}`}
          >
            <div className="grid gap-10 p-8 md:p-14 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
              <div>
                <p className="font-mono text-xs text-fg-dim">
                  {String(position + 1).padStart(2, "0")} / {String(SERVICE_PILLARS.length).padStart(2, "0")}
                </p>
                <p className="mt-3 font-display text-6xl font-extrabold tracking-tight text-play md:text-8xl">{pillar.code}</p>
                <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight md:text-4xl">{pillar.title}</h2>
                <p className="mt-4 text-lg font-bold">{pillar.lead}</p>
              </div>

              <div>
                <p className="leading-relaxed text-fg-dim md:text-lg md:leading-relaxed">{pillar.description}</p>

                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow mb-4">できること</p>
                    <ul className="space-y-3">
                      {pillar.offerings.map((offering) => (
                        <li key={offering} className="flex gap-3 text-sm">
                          <span className="font-display font-bold text-signal" aria-hidden="true">
                            +
                          </span>
                          {offering}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow mb-4">実績</p>
                    <ul className="space-y-3">
                      {pillar.proofs.map((proof) => (
                        <li key={proof} className="text-sm text-fg-dim">
                          {proof}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <p>
                    <span className="eyebrow mr-3">Price</span>
                    <span className="font-display text-xl font-bold">{pillar.priceLabel}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.detailLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="btn-secondary px-5 py-3">
                        {link.label}
                      </Link>
                    ))}
                    <Link href="/contact" className="btn-primary px-5 py-3">
                      相談する
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <ContactBand />
    </>
  )
}
