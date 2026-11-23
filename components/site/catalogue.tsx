"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import type { Dict } from "@/content"
import type { Product } from "@/content/products"
import { catIcons, ProductVisual } from "@/components/site/product-visual"
import type { Locale } from "@/lib/i18n"
import { isSet, site, waHref } from "@/lib/site"
import { cn } from "@/lib/utils"

export type CatalogueItem = {
  slug: string
  cat: Product["cat"]
  name: string
  desc: string
  photo: Product["photo"]
}

export function Catalogue({
  t,
  lang,
  items: all,
  quoteMessage,
  pageBase,
}: {
  t: Dict["catalogue"]
  lang: Locale
  items: CatalogueItem[]
  /** Opening of the WhatsApp quote message; the product name and its page link follow. */
  quoteMessage: string
  /** Absolute site URL with the language, for the product link in that message. */
  pageBase: string
}) {
  const [filter, setFilter] = useState("all")

  // The header's Catalogue dropdown links to `#catalogue-<filter id>`: select that filter and scroll here.
  // "instant" overrides the site's CSS smooth scrolling, which images loading above can cut short.
  useEffect(() => {
    const go = () => document.getElementById("catalogue")?.scrollIntoView({ behavior: "instant" })
    const apply = (initial: boolean) => {
      const m = window.location.hash.match(/^#catalogue-([a-z]+)$/)
      if (!m || !t.filters.some((f) => f.id === m[1])) return
      setFilter(m[1])
      if (!initial) return go()
      // Coming from another page: the router and images move the page after hydration, so jump again as it settles.
      const timers = [100, 500, 1200].map((ms) => setTimeout(go, ms))
      const cancel = () => timers.forEach(clearTimeout)
      window.addEventListener("wheel", cancel, { once: true, passive: true })
      window.addEventListener("touchstart", cancel, { once: true, passive: true })
    }
    apply(true)
    const onHash = () => apply(false)
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [t.filters])
  const items = all.filter((i) => filter === "all" || i.cat === filter)
  const labelOf = (cat: string) => t.filters.find((f) => f.id === cat)?.label ?? cat

  return (
    <div className="mt-10">
      <div role="group" aria-label={t.filterLabel} className="flex flex-wrap gap-2.5">
        {t.filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "min-h-11 rounded-full border px-5 text-[0.9375rem] font-semibold transition-colors",
              filter === f.id
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:border-foreground/60"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {items.length} {t.count}
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = catIcons[item.cat]
          return (
            <li
              key={item.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/15"
              style={{ animation: "word-in 0.4s ease-out" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <ProductVisual
                  photo={item.photo}
                  cat={item.cat}
                  alt={item.name}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className={cn(
                    "object-cover transition-transform duration-500",
                    item.photo?.zoom ? "scale-[1.45] group-hover:scale-[1.52]" : "group-hover:scale-105"
                  )}
                />
                <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                  <Icon aria-hidden="true" className="size-3.5 text-gold" />
                  {labelOf(item.cat)}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
              <h3 className="font-heading text-lg font-bold">
                <Link href={`/${lang}/products/${item.slug}`} className="underline-offset-4 hover:underline">
                  {item.name}
                </Link>
              </h3>
              <p className="mt-2 text-[0.9375rem] text-muted-foreground">{item.desc}</p>
              <div className="mt-auto flex flex-wrap gap-x-5 pt-4 text-[0.9375rem] font-semibold">
                <Link
                  href={`/${lang}/products/${item.slug}`}
                  aria-label={`${t.details}: ${item.name}`}
                  className="inline-flex min-h-11 items-center text-gold underline underline-offset-4"
                >
                  {t.details}
                </Link>
                {/* WhatsApp like the product page button: a contact link per product would give Google
                    about 70 near-identical contact URLs per language to crawl. */}
                <a
                  href={
                    isSet(site.whatsapp)
                      ? `${waHref(site.whatsapp)}?text=${encodeURIComponent(`${quoteMessage} ${item.name}.\n${pageBase}/products/${item.slug}`)}`
                      : `/${lang}/contact`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.ask}: ${item.name}`}
                  className="inline-flex min-h-11 items-center underline underline-offset-4"
                >
                  {t.ask}
                </a>
              </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
