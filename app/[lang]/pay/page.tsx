import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Clock, ShieldCheck } from "lucide-react"
import { getDict } from "@/content"
import { PayForm } from "@/components/site/pay-form"
import { PageHead } from "@/components/site/sections"
import { hasLocale } from "@/lib/i18n"
import { moyasarEnabled } from "@/lib/moyasar"
import { pageMeta } from "@/lib/seo"
import { isSet, site, waHref } from "@/lib/site"

export async function generateMetadata({ params }: PageProps<"/[lang]/pay">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDict(lang).pay
  return pageMeta(lang, "/pay", t.title, t.sub)
}

export default async function Pay({ params }: PageProps<"/[lang]/pay">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDict(lang).pay

  // Without a Moyasar key the form could only fail, so offer a direct way to pay instead.
  // The key is read at build time: redeploy after adding or changing it.
  if (!moyasarEnabled()) {
    const subject = encodeURIComponent(t.offlineSubject)
    return (
      <>
        <PageHead title={t.title} sub={t.sub} />
        <div className="wrap py-16 md:py-24">
          <div className="max-w-2xl rounded-3xl border border-gold/40 bg-gold/8 p-6 md:p-10">
            <Clock aria-hidden="true" className="size-8 text-gold" />
            <h2 className="mt-5 text-2xl font-extrabold md:text-3xl">{t.offlineTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.offlineBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {isSet(site.whatsapp) && (
                <a
                  href={`${waHref(site.whatsapp)}?text=${subject}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  {t.offlineWhatsapp}
                </a>
              )}
              {isSet(site.email) && (
                <a href={`mailto:${site.email}?subject=${subject}`} className="btn btn-line">
                  {t.offlineEmail}
                </a>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHead title={t.title} sub={t.sub} />
      <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
          <PayForm t={t} lang={lang} />
        </div>
        <p className="flex h-fit gap-4 rounded-3xl border border-gold/40 bg-gold/8 p-6 md:p-8">
          <ShieldCheck aria-hidden="true" className="size-7 shrink-0 text-gold" />
          <span>{t.secure}</span>
        </p>
      </div>
    </>
  )
}
