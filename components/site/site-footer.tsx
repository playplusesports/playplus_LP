import Link from "next/link"
import { BrandMark } from "@/components/site/brand-mark"
import { COMPANY_PROFILE, CONTACT_CHANNELS } from "@/lib/site/company-profile"
import { PRIMARY_NAVIGATION } from "@/lib/site/navigation"
import { SERVICE_PILLARS } from "@/lib/site/service-pillars"

export function SiteFooter() {
  return (
    <footer className="theme-ink overflow-hidden">
      <div className="site-container grid gap-12 pt-20 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <BrandMark />
          <p className="mt-6 text-2xl font-black tracking-tight">{COMPANY_PROFILE.concept}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-dim">
            大阪を拠点に、Webサイト・アプリ・動画の制作と、イベントの運営をしています。
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            無料で相談する
          </Link>
        </div>

        <FooterColumn title="ページ">
          {PRIMARY_NAVIGATION.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
          <FooterLink href="/contact">お問い合わせ</FooterLink>
        </FooterColumn>

        <FooterColumn title="事業">
          {SERVICE_PILLARS.map((pillar) => (
            <FooterLink key={pillar.slug} href={`/services#${pillar.slug}`}>
              {pillar.title}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="連絡先・SNS">
          <FooterLink href={CONTACT_CHANNELS.line} isExternal>
            LINE
          </FooterLink>
          <FooterLink href={CONTACT_CHANNELS.x} isExternal>
            X（旧Twitter）
          </FooterLink>
          <FooterLink href={CONTACT_CHANNELS.instagram} isExternal>
            Instagram
          </FooterLink>
          <FooterLink href={CONTACT_CHANNELS.note} isExternal>
            note
          </FooterLink>
        </FooterColumn>
      </div>

      <div className="border-t border-line">
        <div className="site-container flex flex-col gap-3 py-6 text-xs text-fg-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY_PROFILE.name}
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-fg">
              プライバシーポリシー
            </Link>
            <Link href="/legal" className="hover:text-fg">
              特定商取引法に基づく表記
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-5 text-sm font-bold">{title}</p>
      <ul className="space-y-3">{children}</ul>
    </div>
  )
}

function FooterLink({ href, isExternal = false, children }: { href: string; isExternal?: boolean; children: React.ReactNode }) {
  const className = "text-sm text-fg-dim transition-colors hover:text-fg"
  return (
    <li>
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </li>
  )
}
