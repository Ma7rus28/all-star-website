import type { MetadataRoute } from "next"
import { locales } from "@/lib/i18n"
import { indexablePaths, siteUrl } from "@/lib/seo"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified: site.legalUpdated,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority:
        path === "" ? 1 : path === "/services" || path === "/contact" ? 0.8 : path.startsWith("/products/") ? 0.7 : 0.4,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
      },
    }))
  )
}
