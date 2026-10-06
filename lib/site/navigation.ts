export type NavigationLink = { label: string; code: string; href: string }

export const PRIMARY_NAVIGATION: readonly NavigationLink[] = [
  { label: "事業", code: "SERVICES", href: "/services" },
  { label: "実績", code: "WORKS", href: "/works" },
  { label: "料金", code: "PRICING", href: "/#pricing" },
  { label: "ニュース", code: "NEWS", href: "/news" },
  { label: "Play+について", code: "ABOUT", href: "/about" },
]
