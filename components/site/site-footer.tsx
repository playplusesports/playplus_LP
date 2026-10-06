import Link from "next/link"
import { COMPANY_PROFILE, CONTACT_CHANNELS } from "@/lib/site/company-profile"
import { PRIMARY_NAVIGATION } from "@/lib/site/navigation"
import { SERVICE_PILLARS } from "@/lib/site/service-pillars"

export function SiteFooter() {
  return (
    <footer className="theme-ink overflow-hidden">
      <div className="site-container grid gap-12 pt-20 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className="text-3xl font-black tracking-tight md:text-4xl">{COMPANY_PROFILE.concept}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-dim">
            Web・アプリ・AI・動画・イベント。つくる技術と、楽しませる発想で。
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            無料で相談する
          </Link>
        </div>

        <FooterColumn title="Pages">
          {PRIMARY_NAVIGATION.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
          <FooterLink href="/contact">お問い合わせ</FooterLink>
        </FooterColumn>

        <FooterColumn title="Services">
          {SERVICE_PILLARS.map((pillar) => (
            <FooterLink key={pillar.slug} href={`/services#${pillar.slug}`}>
              {pillar.title}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Follow">
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

      <p
        aria-hidden="true"
        className="site-container select-none font-display text-[clamp(5rem,24vw,22rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-fg/[0.07]"
      >
        Play<span className="text-signal/60">+</span>
      </p>

      <div className="border-t border-line">
        <div className="site-container flex flex-col gap-3 py-6 text-xs text-fg-dim sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">
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
      <p className="eyebrow mb-5">{title}</p>
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
