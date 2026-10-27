import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"
import { getDict } from "@/content"
import { getProduct, products } from "@/content/products"
import { ProductVisual } from "@/components/site/product-visual"
import { CtaBand } from "@/components/site/sections"
import { hasLocale, locales } from "@/lib/i18n"
import { pageMeta, siteUrl } from "@/lib/seo"
import { site } from "@/lib/site"

export const dynamicParams = false

export const generateStaticParams = () =>
  locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })))

export async function generateMetadata({ params }: PageProps<"/[lang]/products/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params
  const product = getProduct(slug)
  if (!hasLocale(lang) || !product) return {}
  const c = product[lang]
  return {
    ...pageMeta(lang, `/products/${slug}`, c.title, c.description),
    // The title already names the product and place; skip the brand suffix to keep it short.
    title: { absolute: c.title },
  }
}

export default async function ProductPage({ params }: PageProps<"/[lang]/products/[slug]">) {
  const { lang, slug } = await params
  const product = getProduct(slug)
  if (!hasLocale(lang) || !product) notFound()
  const t = getDict(lang)
  const c = product[lang]
  const brand = lang === "ar" ? site.nameAr : site.name
  const url = `${siteUrl}/${lang}/products/${slug}`
  // Hand-picked related products first, then the rest of the same category.
  const related = [
    ...(product.related ?? []).map(getProduct),
    ...products.filter((p) => p.cat === product.cat),
  ]
    .filter((p, i, all): p is NonNullable<typeof p> => !!p && p.slug !== slug && all.indexOf(p) === i)
    .slice(0, 3)
  const catLabel = t.catalogue.filters.find((f) => f.id === product.cat)?.label
  const quoteHref = `/${lang}/contact?service=advertising&needs=${encodeURIComponent(c.name)}`

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: c.h1,
      description: c.description,
      serviceType: c.name,
      url,
      ...(product.photo && { image: `${siteUrl}${product.photo.src}` }),
      provider: { "@id": `${siteUrl}/#business` },
      areaServed: { "@type": "Country", name: "Saudi Arabia" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: brand, item: `${siteUrl}/${lang}` },
        { "@type": "ListItem", position: 2, name: t.nav.catalogue, item: `${siteUrl}/${lang}#catalogue` },
        { "@type": "ListItem", position: 3, name: c.name, item: url },
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
                  <Link href={`/${lang}#catalogue`} className="underline-offset-4 hover:text-foreground hover:underline">
                    {t.nav.catalogue}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-foreground">
                  {c.name}
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 text-4xl font-extrabold md:text-6xl">{c.h1}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{c.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={quoteHref} className="btn btn-gold">
                {t.catalogue.quoteFor} {c.name}
                <ArrowRight aria-hidden="true" className="size-5 shrink-0 rtl:rotate-180" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-muted">
            <ProductVisual
              photo={product.photo}
              cat={product.cat}
              alt={c.h1}
              hero
              large
              label={catLabel}
              sizes="(min-width: 1024px) 45vw, 92vw"
              className={product.photo?.zoom ? "scale-[1.45] object-cover" : "object-cover"}
            />
          </div>
        </div>
      </header>

      <div className="wrap grid gap-6 py-16 md:grid-cols-2 md:py-24">
        <section aria-labelledby="features" className="rounded-3xl border border-border bg-card p-6 md:p-10">
          <h2 id="features" className="text-2xl font-extrabold md:text-3xl">
            {t.catalogue.features}
          </h2>
          <ul className="mt-6 grid gap-3">
            {c.features.map((f) => (
              <li key={f} className="flex gap-3">
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold" />
                {f}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="uses" className="rounded-3xl border border-border bg-card p-6 md:p-10">
          <h2 id="uses" className="text-2xl font-extrabold md:text-3xl">
            {t.catalogue.uses}
          </h2>
          <ul className="mt-6 grid gap-3">
            {c.uses.map((u) => (
              <li key={u} className="flex gap-3">
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold" />
                {u}
              </li>
            ))}
          </ul>
        </section>
        <p className="text-lg text-muted-foreground md:col-span-2">{t.catalogue.area}</p>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="paper border-t border-border py-16 md:py-24">
          <div className="wrap">
            <h2 id="related" className="text-3xl font-extrabold md:text-4xl">
              {t.catalogue.related}
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug} className="group overflow-hidden rounded-2xl border border-border bg-card">
                  <Link href={`/${lang}/products/${p.slug}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <ProductVisual
                        photo={p.photo}
                        cat={p.cat}
                        alt=""
                        sizes="(min-width: 640px) 30vw, 92vw"
                        className={
                          p.photo?.zoom
                            ? "scale-[1.45] object-cover"
                            : "object-cover transition-transform duration-500 group-hover:scale-105"
                        }
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-bold">{p[lang].name}</h3>
                      <p className="mt-2 text-[0.9375rem] text-muted-foreground">{p[lang].card}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand t={t.cta} lang={lang} />
    </>
  )
}
