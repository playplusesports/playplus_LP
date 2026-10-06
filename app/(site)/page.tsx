import Link from "next/link"
import { ContactBand } from "@/components/site/contact-band"
import { DpadHero } from "@/components/site/dpad-hero"
import { FaqList, FaqSchema } from "@/components/site/faq-list"
import { LiveOperations } from "@/components/site/live-operations"
import { PlusField } from "@/components/site/plus-field"
import { ProjectMarquee } from "@/components/site/project-marquee"
import { SectionHeading } from "@/components/site/section-heading"
import { WorksGallery } from "@/components/site/works-gallery"
import { listPublicNews } from "@/lib/public-news"
import { listPublicWorks } from "@/lib/public-works"
import { STUDIO_FACTS } from "@/lib/site/daily-operations"
import { GENERAL_FAQS } from "@/lib/site/faqs"
import { PRICE_GUIDE } from "@/lib/site/pricing"
import { SERVICE_PILLARS } from "@/lib/site/service-pillars"
import { WORKFLOW_STEPS } from "@/lib/site/workflow"

export const dynamic = "force-dynamic"

const FEATURED_WORKS_COUNT = 5
const LATEST_NEWS_COUNT = 3

export default async function HomePage() {
  const [works, news] = await Promise.all([listPublicWorks(), listPublicNews()])

  return (
    <>
      <FaqSchema faqs={GENERAL_FAQS} />
      <DpadHero />
      <ProjectMarquee />
      <Statement />

      <section id="services" className="py-28 md:py-40">
        <div className="site-container grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              index="01"
              code="Services"
              title={
                <>
                  5つの「つくる」を、
                  <br />
                  ひとつの窓口で。
                </>
              }
              lead="Webサイトから、アプリ、AIの自動化、動画、イベントまで。分野ごとに別の会社を探さなくても、Play+ がまとめて引き受けます。"
            />
            <Link href="/services" className="btn-secondary -mt-6 md:-mt-10">
              事業内容をくわしく見る
            </Link>
          </div>

          <ol className="space-y-5">
            {SERVICE_PILLARS.map((pillar, position) => (
              <li key={pillar.slug}>
                <Link
                  href={`/services#${pillar.slug}`}
                  className="panel group relative block overflow-hidden p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-fg/30 hover:shadow-[0_30px_60px_-30px_rgba(13,13,51,0.45)] md:p-10"
                >
                  <div className="flex items-start justify-between gap-6">
                    <p className="font-mono text-xs text-fg-dim">
                      {String(position + 1).padStart(2, "0")} / {String(SERVICE_PILLARS.length).padStart(2, "0")}
                    </p>
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-2 font-display text-2xl transition-[transform,background-color,color] duration-300 group-hover:rotate-90 group-hover:bg-signal group-hover:text-white"
                    >
                      +
                    </span>
                  </div>
                  <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-brand md:text-7xl">{pillar.code}</p>
                  <h3 className="mt-5 text-2xl font-black md:text-3xl">{pillar.title}</h3>
                  <p className="mt-3 leading-relaxed text-fg-dim">{pillar.lead}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {pillar.offerings.map((offering) => (
                      <li key={offering} className="rounded-full bg-surface-2 px-3 py-1.5 text-xs">
                        {offering}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-line pt-5 font-mono text-xs text-fg-dim">
                    <span className="text-fg">{pillar.priceLabel}</span>
                    <span className="mx-3">—</span>
                    {pillar.proofs.slice(0, 2).join(" / ")}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="works" className="border-t border-line py-28 md:py-40">
        <div className="site-container">
          <SectionHeading
            index="02"
            code="Works"
            align="split"
            title="つくってきたもの"
            lead="お客様の案件と、自社で開発・運用しているサービスの一部です。どれも、実際に動いています。"
          />
          <WorksGallery works={works.slice(0, FEATURED_WORKS_COUNT)} showFilters={false} />
          <div className="mt-16 flex justify-center">
            <Link href="/works" className="btn-secondary">
              すべての実績を見る（{works.length}件）
            </Link>
          </div>
        </div>
      </section>

      <section id="running" className="px-3 md:px-5">
        <div className="theme-ink relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
          <PlusField />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--surface-0)_30%,transparent)]"
            aria-hidden="true"
          />
          <div className="site-container pointer-events-none relative grid gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <SectionHeading
              index="03"
              code="Now running"
              title={
                <>
                  いまも、
                  <br />
                  毎日動いている。
                </>
              }
              lead="動画の制作と投稿、サイトの更新、ニュースの要約。Play+ では自社の仕組みが毎日決まった時刻に自動で動いています。同じ技術で、お客様のくり返し作業も仕組みに置き換えます。"
            />
            <div className="pointer-events-auto">
              <LiveOperations />
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-28 md:py-40">
        <div className="site-container grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            index="04"
            code="Pricing"
            title="料金の目安"
            lead="内容に合わせてお見積りします。予算が固まっていない段階でもご相談ください。"
          />
          <div className="panel overflow-hidden">
            <ul className="divide-y divide-line">
              {PRICE_GUIDE.map((row) => (
                <li key={row.service}>
                  <Link
                    href={row.href}
                    className="group flex items-center justify-between gap-4 px-6 py-6 transition-colors hover:bg-surface-2 md:px-8"
                  >
                    <span className="font-bold md:text-lg">{row.service}</span>
                    <span className="flex items-center gap-4 text-right">
                      <span className="font-display text-lg font-bold md:text-xl">{row.price}</span>
                      <span
                        aria-hidden="true"
                        className="text-fg-dim transition-transform group-hover:translate-x-1 group-hover:text-signal"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="border-t border-line bg-surface-2/60 px-6 py-4 text-xs text-fg-dim md:px-8">
              ※ 税込・税別の区分は各サービスページの表記に準じます。
            </p>
          </div>
        </div>
      </section>

      <section id="process" className="border-t border-line py-28 md:py-40">
        <div className="site-container">
          <SectionHeading
            index="05"
            code="Process"
            align="split"
            title="ご相談から公開まで"
            lead="各ステップで進み具合を共有し、判断を一緒に行います。"
          />
          <ol className="grid gap-5 md:grid-cols-4">
            {WORKFLOW_STEPS.map((step, position) => (
              <li key={step.title} className="panel relative p-7 md:p-8">
                <p className="font-display text-6xl font-extrabold tracking-tight text-surface-2 md:text-7xl" aria-hidden="true">
                  {String(position + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-dim">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="faq" className="border-t border-line py-28 md:py-40">
        <div className="site-container grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <SectionHeading index="06" code="FAQ" title="よくある質問" />
            {news.length > 0 && (
              <div className="-mt-4 md:-mt-8">
                <p className="eyebrow mb-4">Latest news</p>
                <ul className="divide-y divide-line border-y border-line">
                  {news.slice(0, LATEST_NEWS_COUNT).map((item) => (
                    <li key={item.id}>
                      <Link href={`/news/${item.id}`} className="group block py-4">
                        <span className="font-mono text-[11px] text-fg-dim">
                          {item.date} · {item.category}
                        </span>
                        <span className="mt-1 block font-bold leading-snug group-hover:text-play">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/news" className="text-link mt-4 inline-block text-sm">
                  お知らせ一覧 →
                </Link>
              </div>
            )}
          </div>
          <FaqList faqs={GENERAL_FAQS} />
        </div>
      </section>

      <ContactBand />
    </>
  )
}

function Statement() {
  return (
    <section className="py-28 md:py-40">
      <div className="site-container">
        <p className="eyebrow flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
          About Play+
        </p>
        <p className="mt-8 max-w-5xl text-3xl font-black leading-[1.45] tracking-tight md:text-5xl md:leading-[1.4]">
          Play+ は、ゲーム大会の会場から始まりました。人が夢中になる瞬間をつくってきた経験を、
          <span className="text-play">Web</span>にも、<span className="text-play">アプリ</span>にも、
          <span className="text-play">AI</span>にも。
          <span className="text-fg-dim">「便利」に「楽しい」をひとつ足して、成果につながる形に仕上げます。</span>
        </p>
        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-12 md:grid-cols-4">
          {STUDIO_FACTS.map((fact) => (
            <div key={fact.label}>
              <dd className="font-display text-6xl font-extrabold tracking-tight md:text-7xl">
                {fact.value}
                <span className="ml-1 text-2xl text-signal md:text-3xl">{fact.unit}</span>
              </dd>
              <dt className="mt-3 text-sm leading-relaxed text-fg-dim">{fact.label}</dt>
            </div>
          ))}
        </dl>
        <Link href="/about" className="text-link mt-12 inline-block">
          Play+ について →
        </Link>
      </div>
    </section>
  )
}
