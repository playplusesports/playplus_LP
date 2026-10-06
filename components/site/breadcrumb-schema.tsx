import { COMPANY_PROFILE } from "@/lib/site/company-profile"

// パンくずの構造化データ。path は "/services/web" のようなサイト内パス
export function BreadcrumbSchema({ items }: { items: readonly { name: string; path: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "ホーム", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${COMPANY_PROFILE.siteUrl}${item.path}`,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
