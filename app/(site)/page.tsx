import Link from "next/link"
import { ContactBand } from "@/components/site/contact-band"
import { DpadHero } from "@/components/site/dpad-hero"
import { FaqList, FaqSchema } from "@/components/site/faq-list"
import { LiveOperations } from "@/components/site/live-operations"
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
      <Introduction />

      <section id="services" className="border-t border-line py-24 md:py-32">
        <div className="site-container">
          <SectionHeading
            align="split"
            title="できること"
            lead="Webサイト、アプリ、自動化、動画、イベント。分野をまたぐご相談も、ひとつの窓口で受けています。"
          />
          <ul className="border-t border-line">
            {SERVICE_PILLARS.map((pillar) => (
              <li key={pillar.slug} className="border-b border-line">
                <Link
                  href={`/services#${pillar.slug}`}
                  className="group grid gap-3 py-8 md:grid-cols-[21rem_1fr_auto] md:items-baseline md:gap-10"
                >
                  <h3 className="text-xl font-black group-hover:text-signal md:text-2xl">{pillar.title}</h3>
                  <p className="leading-relaxed text-fg-dim">{pillar.lead}</p>
                  <p className="text-sm font-bold whitespace-nowrap">
                    {pillar.priceLabel}
                    <span aria-hidden="true" className="ml-3 text-fg-dim transition-colors group-hover:text-signal">
                      →
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="works" className="border-t border-line py-24 md:py-32">
        <div className="site-container">
          <SectionHeading align="split" title="実績" lead="お客様の案件と、自社で開発・運営しているサービスです。" />
          <WorksGallery works={works.slice(0, FEATURED_WORKS_COUNT)} showFilters={false} />
          <div className="mt-14">
            <Link href="/works" className="btn-secondary">
              実績をすべて見る（{works.length}件）
            </Link>
          </div>
        </div>
      </section>

      <section id="running" className="theme-ink">
        <div className="site-container grid gap-12 py-24 md:py-32 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <SectionHeading
            title="毎日、自動で動いているもの"
            lead="Play+ では、動画の投稿やサイトの更新を毎日決まった時刻に自動で行っています。右の表は、いまの日本時間で今日の進み具合を表示しています。"
          />
          <LiveOperations />
        </div>
      </section>

      <section id="pricing" className="py-24 md:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading title="料金の目安" lead="内容に合わせてお見積りします。予算が決まっていなくてもご相談ください。" />
          <div>
            <ul className="border-t border-line">
              {PRICE_GUIDE.map((row) => (
                <li key={row.service} className="border-b border-line">
                  <Link href={row.href} className="group flex items-center justify-between gap-4 py-5">
                    <span className="font-bold group-hover:text-signal">{row.service}</span>
                    <span className="text-right font-bold">{row.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-fg-dim">※ 税込・税別の区分は各サービスページの表記に準じます。</p>
          </div>
        </div>
      </section>

      <section id="process" className="border-t border-line py-24 md:py-32">
        <div className="site-container">
          <SectionHeading title="ご相談から公開まで" />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
            {WORKFLOW_STEPS.map((step, position) => (
              <li key={step.title} className="border-t-2 border-fg pt-5">
                <p className="text-sm font-bold text-signal">{position + 1}</p>
                <h3 className="mt-1 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-dim">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="faq" className="border-t border-line py-24 md:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <SectionHeading title="よくある質問" />
            {news.length > 0 && (
              <div className="-mt-4 md:-mt-6">
                <p className="mb-3 text-sm font-bold">お知らせ</p>
                <ul className="border-t border-line">
                  {news.slice(0, LATEST_NEWS_COUNT).map((item) => (
                    <li key={item.id} className="border-b border-line">
                      <Link href={`/news/${item.id}`} className="group block py-4">
                        <span className="text-xs text-fg-dim">
                          {item.date}　{item.category}
                        </span>
                        <span className="mt-1 block font-bold leading-snug group-hover:text-signal">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/news" className="text-link mt-4 inline-block text-sm">
                  お知らせ一覧
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

function Introduction() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <p className="eyebrow">Play+ について</p>
            <h2 className="mt-4 text-3xl font-black leading-snug tracking-tight md:text-4xl md:leading-snug">
              好きを、もっと面白く。
            </h2>
            <p className="mt-6 max-w-xl leading-[1.9] text-fg-dim md:text-lg md:leading-[1.9]">
              2023年に始めたeスポーツ大会の運営を、いまも毎月続けています。その傍らで、お店や会社のWebサイト、Webアプリ、YouTube向けの動画をつくるようになりました。
            </p>
            <p className="mt-4 max-w-xl leading-[1.9] text-fg-dim md:text-lg md:leading-[1.9]">
              自社でもWebサービスを公開・運営しているので、つくったあとの運用までまとめてご相談いただけます。
            </p>
            <Link href="/about" className="btn-secondary mt-8">
              Play+ について詳しく
            </Link>
          </div>
          <figure>
            {/* 実際の大会会場。スクリーンの大会名が映らない範囲で切り出している */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/works/event-venue.jpg"
              alt="毎月開いているeスポーツ大会の会場"
              className="aspect-[16/10] w-full rounded-lg border border-line object-cover"
            />
            <figcaption className="mt-3 text-xs text-fg-dim">毎月開いているeスポーツ大会の会場</figcaption>
          </figure>
        </div>

        <dl className="mt-16 grid grid-cols-2 border-t border-line md:mt-20 md:grid-cols-4">
          {STUDIO_FACTS.map((fact) => (
            <div
              key={fact.label}
              className="border-b border-line py-6 pr-4 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
            >
              <dd className="text-2xl font-black md:text-3xl">{fact.value}</dd>
              <dt className="mt-1 text-sm leading-snug text-fg-dim">{fact.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
