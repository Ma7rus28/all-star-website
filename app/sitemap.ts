import type { MetadataRoute } from "next"
import { projects } from "@/content/projects"
import { legalSlugs, locales, type Locale } from "@/lib/i18n"
import { contentUpdated, indexablePaths, siteUrl } from "@/lib/seo"
import { site } from "@/lib/site"

const legalPaths = new Set<string>([...legalSlugs.map((s) => `/${s}`), "/data-request"])

// Next.js writes video text into the XML as it is, so an "&" in a title would break the sitemap.
const xmlText = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

// The Projects page's videos and photos, so Google can find them without playing the page.
const projectMedia = (lang: Locale) => ({
  images: projects.map(({ media: m }) => `${siteUrl}${m.kind === "video" ? m.poster : m.src}`),
  videos: projects.flatMap(({ media: m, ...p }) =>
    m.kind === "video"
      ? [
          {
            title: xmlText(p[lang].title),
            description: xmlText(p[lang].summary),
            thumbnail_loc: `${siteUrl}${m.poster}`,
            content_loc: `${siteUrl}${m.src}`,
            duration: m.durationSeconds,
            publication_date: `${m.uploaded}T00:00:00+03:00`,
          },
        ]
      : [],
  ),
})

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
      ...(path === "/projects" && projectMedia(lang)),
    }))
  )
}
