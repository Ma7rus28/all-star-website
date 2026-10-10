import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getDict } from "@/content"
import { QuoteForm } from "@/components/site/quote-form"
import { PageHead } from "@/components/site/sections"
import { hasLocale } from "@/lib/i18n"
import { pageMeta } from "@/lib/seo"
import { isSet, site, telHref, waHref } from "@/lib/site"

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDict(lang).meta
  return pageMeta(lang, "/contact", t.contactTitle, t.contactDescription)
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDict(lang)
  const t = dict.contact
  const link = "text-gold underline underline-offset-4"

  const rows: { label: string; value: string; href?: string; ltr?: boolean }[] = [
    { label: t.legalName, value: site.name },
    { label: t.cr, value: site.cr, ltr: true },
    { label: t.vat, value: site.vat, ltr: true },
    { label: t.address, value: lang === "ar" ? site.addressAr : site.address },
    { label: t.phone, value: site.phone, href: isSet(site.phone) ? telHref(site.phone) : undefined, ltr: true },
    { label: t.whatsapp, value: site.whatsapp, href: isSet(site.whatsapp) ? waHref(site.whatsapp) : undefined, ltr: true },
    { label: t.email, value: site.email, href: isSet(site.email) ? `mailto:${site.email}` : undefined, ltr: true },
    { label: t.hours, value: lang === "ar" ? site.hoursAr : site.hours },
  ]

  return (
    <>
      <PageHead title={t.title} sub={t.sub} />
      <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <Suspense fallback={null}>
          <QuoteForm t={dict.form} lang={lang} />
        </Suspense>
        <aside aria-labelledby="business-details" className="h-fit rounded-3xl border border-border bg-card p-6 md:p-8">
          <h2 id="business-details" className="font-heading text-2xl font-bold">
            {t.detailsTitle}
          </h2>
          <dl className="mt-6 grid gap-4">
            {rows.map((r) => (
              <div key={r.label}>
                <dt className="text-sm text-muted-foreground">{r.label}</dt>
                <dd className="mt-0.5 font-medium">
                  {r.href ? (
                    <a href={r.href} className={link}>
                      <bdi dir="ltr">{r.value}</bdi>
                    </a>
                  ) : r.ltr ? (
                    <bdi dir="ltr">{r.value}</bdi>
                  ) : (
                    r.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </>
  )
}
