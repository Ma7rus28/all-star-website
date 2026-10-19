import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"
import { getDict } from "@/content"
import { getLanding, landings } from "@/content/landings"
import { products } from "@/content/products"
import { CtaBand } from "@/components/site/sections"
import { hasLocale, locales } from "@/lib/i18n"
import { pillarPhotos } from "@/lib/photos"
import { faqJsonLd, pageMeta, siteUrl } from "@/lib/seo"
import { site } from "@/lib/site"

export const dynamicParams = false

export const generateStaticParams = () =>
  locales.flatMap((lang) => landings.map((l) => ({ lang, slug: l.slug })))

export async function generateMetadata({ params }: PageProps<"/[lang]/riyadh/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params
  const landing = getLanding(slug)
  if (!hasLocale(lang) || !landing) return {}
  const c = landing[lang]
  return { ...pageMeta(lang, `/riyadh/${slug}`, c.title, c.description), title: { absolute: c.title } }
}

export default async function RiyadhLanding({ params }: PageProps<"/[lang]/riyadh/[slug]">) {
  const { lang, slug } = await params
  const landing = getLanding(slug)
  if (!hasLocale(lang) || !landing) notFound()
  const t = getDict(lang)
  const c = landing[lang]
  const photo = pillarPhotos[landing.pillar]
  const related = products.filter((p) => landing.productCats.includes(p.cat)).slice(0, 8)
  const url = `${siteUrl}/${lang}/riyadh/${slug}`
  const quoteHref = `/${lang}/contact?service=${landing.quoteService}`

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: c.h1,
      description: c.description,
      url,
      provider: { "@id": `${siteUrl}/#business` },
      areaServed: { "@type": "City", name: lang === "ar" ? "الرياض" : "Riyadh" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: c.servicesTitle,
        itemListElement: c.services.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    faqJsonLd(c.faq),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: lang === "ar" ? site.nameAr : site.name, item: `${siteUrl}/${lang}` },
        { "@type": "ListItem", position: 2, name: t.nav.services, item: `${siteUrl}/${lang}/services` },
        { "@type": "ListItem", position: 3, name: c.h1, item: url },
      ],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <header className="dots border-b border-border pt-36 pb-14 md:pt-44 md:pb-20">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href={`/${lang}`} className="underline-offset-4 hover:text-foreground hover:underline">
                    {t.catalogue.home}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={`/${lang}/services`} className="underline-offset-4 hover:text-foreground hover:underline">
                    {t.nav.services}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-foreground">
                  {c.h1}
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 text-4xl font-extrabold md:text-6xl">{c.h1}</h1>
            {c.intro.map((p) => (
              <p key={p} className="mt-5 max-w-xl text-lg text-muted-foreground">
                {p}
              </p>
            ))}
            <Link href={quoteHref} className="btn btn-gold mt-8">
              {t.riyadh.quote}
              <ArrowRight aria-hidden="true" className="size-5 rtl:rotate-180" />
            </Link>
          </div>
          {photo && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-black">
              <Image
                src={photo.src}
                alt={photo.alt[lang]}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 92vw"
                className={photo.contain ? "object-contain" : "object-cover"}
              />
            </div>
          )}
        </div>
      </header>

      <div className="wrap grid gap-6 py-16 md:grid-cols-2 md:py-24">
        <section aria-labelledby="services" className="rounded-3xl border border-border bg-card p-6 md:p-10">
          <h2 id="services" className="text-2xl font-extrabold md:text-3xl">
            {c.servicesTitle}
          </h2>
          <ul className="mt-6 grid gap-3">
            {c.services.map((s) => (
              <li key={s} className="flex gap-3">
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold" />
                {s}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="why" className="rounded-3xl border border-border bg-card p-6 md:p-10">
          <h2 id="why" className="text-2xl font-extrabold md:text-3xl">
            {c.whyTitle}
          </h2>
          <ul className="mt-6 grid gap-5">
            {c.why.map((w) => (
              <li key={w.t}>
                <h3 className="font-heading text-lg font-bold">{w.t}</h3>
                <p className="mt-1 text-muted-foreground">{w.d}</p>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="area" className="md:col-span-2">
          <h2 id="area" className="text-2xl font-extrabold md:text-3xl">
            {c.areaTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{c.area}</p>
        </section>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="products" className="paper border-y border-border py-16 md:py-24">
          <div className="wrap">
            <h2 id="products" className="text-3xl font-extrabold md:text-4xl">
              {t.riyadh.products}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${lang}/products/${p.slug}`}
                    className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 font-semibold hover:border-gold"
                  >
                    {p[lang].name}
                    <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-gold rtl:rotate-180" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="faq" className="py-16 md:py-24">
        <div className="wrap max-w-4xl">
          <h2 id="faq" className="text-3xl font-extrabold md:text-4xl">
            {t.riyadh.faq}
          </h2>
          <dl className="mt-8 grid gap-6">
            {c.faq.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-card p-6">
                <dt className="font-heading text-lg font-bold">{f.q}</dt>
                <dd className="mt-2 text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand t={t.cta} lang={lang} />
    </>
  )
}
