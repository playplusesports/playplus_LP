import type { Metadata } from "next"
import Link from "next/link"
import { ContactBand } from "@/components/site/contact-band"
import { PageIntro } from "@/components/site/page-intro"
import { SERVICE_PILLARS } from "@/lib/site/service-pillars"

export const metadata: Metadata = {
  title: "事業内容",
  description:
    "Play+ の事業内容。Webサイト制作・集客、Webアプリ・サービス開発、業務の仕組み化・自動化、動画制作、イベント・eスポーツ・デザインを、ひとつの窓口で受けています。",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="事業内容"
        lead="Webサイト、アプリ、自動化、動画、イベント。分野をまたぐご相談も、ひとつの窓口で受けています。"
        crumbs={[{ label: "事業内容", href: "/services" }]}
      >
        <nav aria-label="事業一覧" className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          {SERVICE_PILLARS.map((pillar) => (
            <a key={pillar.slug} href={`#${pillar.slug}`} className="text-link text-sm font-bold">
              {pillar.title}
            </a>
          ))}
        </nav>
      </PageIntro>

      <div className="site-container">
        {SERVICE_PILLARS.map((pillar) => (
          <section key={pillar.slug} id={pillar.slug} className="border-b border-line py-16 last:border-b-0 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
              <div>
                <h2 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">{pillar.title}</h2>
                <p className="mt-4 text-lg font-bold">{pillar.lead}</p>
              </div>

              <div>
                <p className="leading-[1.9] text-fg-dim md:text-lg md:leading-[1.9]">{pillar.description}</p>

                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-sm font-bold">できること</h3>
                    <ul className="list-disc space-y-2 pl-5 text-sm marker:text-signal">
                      {pillar.offerings.map((offering) => (
                        <li key={offering}>{offering}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-3 text-sm font-bold">実績</h3>
                    <ul className="space-y-2 text-sm text-fg-dim">
                      {pillar.proofs.map((proof) => (
                        <li key={proof}>{proof}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-bold">
                    <span className="mr-3 text-sm text-fg-dim">料金</span>
                    {pillar.priceLabel}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.detailLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="btn-secondary px-4 py-2.5">
                        {link.label}
                      </Link>
                    ))}
                    <Link href="/contact" className="btn-primary px-4 py-2.5">
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
