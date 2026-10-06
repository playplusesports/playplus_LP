import Link from "next/link"
import { BrandMark } from "@/components/site/brand-mark"
import { COMPANY_PROFILE, CONTACT_CHANNELS } from "@/lib/site/company-profile"
import { PRIMARY_NAVIGATION } from "@/lib/site/navigation"
import { SERVICE_PILLARS } from "@/lib/site/service-pillars"

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-1">
      <div className="site-container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <BrandMark />
          <p className="mt-5 text-2xl font-black tracking-tight">{COMPANY_PROFILE.concept}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-dim">
            Web・アプリ・AI・動画・イベント。つくる技術と、楽しませる発想で。
          </p>
        </div>

        <FooterColumn title="PAGES">
          {PRIMARY_NAVIGATION.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="SERVICES">
          {SERVICE_PILLARS.map((pillar) => (
            <FooterLink key={pillar.slug} href={`/services#${pillar.slug}`}>
              {pillar.title}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="CONTACT">
          <FooterLink href={CONTACT_CHANNELS.form}>お問い合わせフォーム</FooterLink>
          <FooterLink href={CONTACT_CHANNELS.line} isExternal>
            LINEで相談
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
        <div className="site-container flex flex-col gap-3 py-6 text-xs text-text-dim sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">
            © {new Date().getFullYear()} {COMPANY_PROFILE.name}
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">
              プライバシーポリシー
            </Link>
            <Link href="/legal" className="hover:text-white">
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
      <p className="pixel-label mb-4">{title}</p>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLink({ href, isExternal = false, children }: { href: string; isExternal?: boolean; children: React.ReactNode }) {
  const className = "text-sm text-text-dim transition-colors hover:text-white"
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
