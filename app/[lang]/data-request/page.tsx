import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getDict } from "@/content"
import { DataRequestForm } from "@/components/site/data-request-form"
import { PageHead } from "@/components/site/sections"
import { hasLocale } from "@/lib/i18n"
import { pageMeta } from "@/lib/seo"

export async function generateMetadata({ params }: PageProps<"/[lang]/data-request">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDict(lang).dataRequest
  return pageMeta(lang, "/data-request", t.title, t.sub)
}

export default async function DataRequest({ params }: PageProps<"/[lang]/data-request">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDict(lang)

  return (
    <>
      <PageHead title={dict.dataRequest.title} sub={dict.dataRequest.sub} />
      <div className="wrap max-w-3xl py-16 md:py-24">
        <DataRequestForm t={dict.dataRequest} optional={dict.form.optional} honeypot={dict.form.honeypot} />
      </div>
    </>
  )
}
