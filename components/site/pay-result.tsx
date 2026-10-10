"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react"
import type { Dict } from "@/content"
import type { Locale } from "@/lib/i18n"

type Result = { status: "paid" | "pending" | "unknown"; amount?: string; reference?: string }

export function PayResult({ t, lang }: { t: Dict["pay"]["result"]; lang: Locale }) {
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    let live = true
    fetch("/api/pay/status", { cache: "no-store" })
      .then((r) => r.json() as Promise<Result>)
      .catch((): Result => ({ status: "unknown" }))
      .then((r) => {
        if (live) setResult(r)
      })
    return () => {
      live = false
    }
  }, [])

  if (!result) {
    return (
      <p role="status" className="flex items-center gap-3 text-lg">
        <LoaderCircle aria-hidden="true" className="size-6 animate-spin text-gold" />
        {t.checking}
      </p>
    )
  }

  const paid = result.status === "paid"
  const title = paid ? t.paidTitle : result.status === "pending" ? t.pendingTitle : t.unknownTitle
  const body = paid ? t.paid : result.status === "pending" ? t.pending : t.unknown
  const Icon = paid ? CircleCheck : CircleAlert

  return (
    <div role="status">
      <Icon aria-hidden="true" className={paid ? "size-14 text-gold" : "size-14 text-destructive"} />
      <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">{body}</p>
      {(result.reference || result.amount) && (
        <dl className="mt-8 grid max-w-md gap-3 rounded-2xl border border-border bg-card p-6">
          {result.reference && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{t.reference}</dt>
              <dd className="font-semibold"><bdi>{result.reference}</bdi></dd>
            </div>
          )}
          {result.amount && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{t.amount}</dt>
              <dd className="font-semibold"><bdi>{result.amount}</bdi></dd>
            </div>
          )}
        </dl>
      )}
      <div className="mt-8 flex flex-wrap gap-4">
        {!paid && (
          <Link href={`/${lang}/pay`} className="btn btn-gold">
            {t.again}
          </Link>
        )}
        <Link href={`/${lang}`} className="btn btn-line">
          {t.home}
        </Link>
      </div>
    </div>
  )
}
