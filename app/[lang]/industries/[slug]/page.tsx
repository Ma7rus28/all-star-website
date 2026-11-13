import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { getDict } from "@/content"
import { getIndustry, industries } from "@/content/industries"
import { getProduct } from "@/content/products"
import { ProductVisual } from "@/components/site/product-visual"
import { RelatedProjects } from "@/components/site/related-projects"
import { CtaBand } from "@/components/site/sections"
import { hasLocale, locales } from "@/lib/i18n"
import { faqJsonLd, pageMeta, siteUrl } from "@/lib/seo"
import { site } from "@/lib/site"

export const dynamicParams = false

export const generateStaticParams = () =>
  locales.flatMap((lang) => industries.map((i) => ({ lang, slug: i.slug })))

export async function generateMetadata({ params }: PageProps<"/[lang]/industries/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params
  const industry = getIndustry(slug)
  if (!hasLocale(lang) || !industry) return {}
  const c = industry[lang]
  return { ...pageMeta(lang, `/industries/${slug}`, c.title, c.description), title: { absolute: c.title } }
}

export default async function IndustryPage({ params }: PageProps<"/[lang]/industries/[slug]">) {
  const { lang, slug } = await params
  const industry = getIndustry(slug)
  if (!hasLocale(lang) || !industry) notFound()
  const t = getDict(lang)
  const c = industry[lang]
  const items = industry.products.map(getProduct).filter((p): p is NonNullable<typeof p> => !!p)
  const url = `${siteUrl}/${lang}/industries/${slug}`

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: c.h1,
      description: c.description,
      url,
      provider: { "@id": `${siteUrl}/#business` },
      areaServed: [
        { "@type": "City", name: lang === "ar" ? "الرياض" : "Riyadh" },
        { "@type": "Country", name: lang === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: t.industries.products,
        itemListElement: items.map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: p[lang].name, url: `${siteUrl}/${lang}/products/${p.slug}` },
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
        <div className="wrap max-w-4xl">
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
            <p key={p} className="mt-5 max-w-2xl text-lg text-muted-foreground">
              {p}
            </p>
          ))}
          <Link href={`/${lang}/contact`} className="btn btn-gold mt-8">
            {t.industries.quote}
            <ArrowRight aria-hidden="true" className="size-5 rtl:rotate-180" />
          </Link>
        </div>
      </header>

      <section aria-labelledby="products" className="py-16 md:py-24">
        <div className="wrap">
          <h2 id="products" className="text-3xl font-extrabold md:text-4xl">
            {t.industries.products}
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <li key={p.slug} className="group overflow-hidden rounded-2xl border border-border bg-card">
                <Link href={`/${lang}/products/${p.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <ProductVisual
                      photo={p.photo}
                      cat={p.cat}
                      alt={p[lang].name}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${p.photo?.zoom ? "scale-[1.45]" : ""}`}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold">{p[lang].name}</h3>
                    <p className="mt-2 text-muted-foreground">{p[lang].card}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedProjects path={`/industries/${slug}`} lang={lang} t={t.projectsPage} />

      <section aria-labelledby="faq" className="border-t border-border py-16 md:py-24">
        <div className="wrap max-w-4xl">
          <h2 id="faq" className="text-3xl font-extrabold md:text-4xl">
            {t.industries.faq}
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
