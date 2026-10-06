import type { MetadataRoute } from 'next'
import { COMPANY_PROFILE } from '@/lib/site/company-profile'

const LAST_RENEWED = '2026-10-06'

const PAGES: readonly { path: string; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/web', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/meo', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/works', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/news', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/legal', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: `${COMPANY_PROFILE.siteUrl}${page.path}`,
    lastModified: LAST_RENEWED,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
