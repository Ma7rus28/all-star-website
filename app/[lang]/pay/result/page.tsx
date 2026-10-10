import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getDict } from "@/content"
import { PayResult } from "@/components/site/pay-result"
import { hasLocale } from "@/lib/i18n"

export const metadata: Metadata = { robots: { index: false } }

export default async function Result({ params }: PageProps<"/[lang]/pay/result">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <div className="wrap min-h-[70vh] pt-44 pb-24">
      <PayResult t={getDict(lang).pay.result} lang={lang} />
    </div>
  )
}
