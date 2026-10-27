import "server-only"
import { getDict } from "@/content"
import { landings } from "@/content/landings"
import { products } from "@/content/products"
import { projects } from "@/content/projects"
import type { Locale } from "@/lib/i18n"

export type SearchKind = "page" | "service" | "product" | "project"

export type SearchEntry = {
  kind: SearchKind
  title: string
  /** Short line shown under the title. */
  snippet: string
  /** Extra words that should match but are not displayed. */
  terms: string
  href: string
}

/** Everything a visitor can search for, built from the same content files the pages use. */
export function buildSearchIndex(lang: Locale): SearchEntry[] {
  const t = getDict(lang)
  const base = `/${lang}`

  const pages: SearchEntry[] = [
    { kind: "page", title: t.servicesPage.title, snippet: t.servicesPage.sub, terms: t.marquee.join(" "), href: `${base}/services` },
    { kind: "page", title: t.projectsPage.title, snippet: t.projectsPage.sub, terms: "", href: `${base}/projects` },
    { kind: "page", title: t.contact.title, snippet: t.contact.sub, terms: `${t.nav.quote} ${t.nav.contact} WhatsApp`, href: `${base}/contact` },
    { kind: "page", title: t.catalogue.title.replace(/\.$/, ""), snippet: t.catalogue.sub, terms: t.nav.catalogue, href: `${base}#catalogue` },
    { kind: "page", title: t.process.title.replace(/\.$/, ""), snippet: t.process.sub, terms: t.nav.process, href: `${base}#process` },
    { kind: "page", title: t.faq.title.replace(/\.$/, ""), snippet: t.faq.items.map((i) => i.q).join(" · "), terms: t.faq.items.map((i) => i.a).join(" "), href: `${base}#faq` },
  ]

  const services: SearchEntry[] = [
    ...t.pillars.items.map((p) => ({
      kind: "service" as const,
      title: p.name,
      snippet: p.desc,
      terms: `${p.tagline} ${p.points.join(" ")}`,
      href: `${base}/services#${p.id}`,
    })),
    ...landings.map((l) => ({
      kind: "service" as const,
      title: l[lang].h1,
      snippet: l[lang].description,
      terms: l[lang].services.join(" "),
      href: `${base}/riyadh/${l.slug}`,
    })),
  ]

  const productEntries: SearchEntry[] = products.map((p) => ({
    kind: "product",
    title: p[lang].name,
    snippet: p[lang].card,
    terms: `${p[lang].h1} ${p[lang].features.join(" ")} ${p[lang].uses.join(" ")}`,
    href: `${base}/products/${p.slug}`,
  }))

  const projectEntries: SearchEntry[] = projects.map((p) => ({
    kind: "project",
    title: p[lang].title,
    snippet: p[lang].summary,
    terms: p[lang].scope.join(" "),
    href: `${base}/projects#${p.slug}`,
  }))

  return [...services, ...productEntries, ...projectEntries, ...pages]
}
