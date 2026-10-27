import type { MetadataRoute } from "next"
import { legalSlugs, locales } from "@/lib/i18n"
import { contentUpdated, indexablePaths, siteUrl } from "@/lib/seo"
import { site } from "@/lib/site"

const legalPaths = new Set<string>([...legalSlugs.map((s) => `/${s}`), "/data-request"])

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified: legalPaths.has(path) ? site.legalUpdated : contentUpdated,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority:
        path === "" ? 1 : path === "/services" || path === "/projects" || path === "/contact" ? 0.8 : path.startsWith("/riyadh/") ? 0.9 : path.startsWith("/products/") ? 0.7 : 0.4,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
          "x-default": `${siteUrl}/en${path}`,
        },
      },
    }))
  )
}
