import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ShieldCheck } from "lucide-react"
import { getDict } from "@/content"
import { PayForm } from "@/components/site/pay-form"
import { PageHead } from "@/components/site/sections"
import { hasLocale } from "@/lib/i18n"
import { pageMeta } from "@/lib/seo"

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
