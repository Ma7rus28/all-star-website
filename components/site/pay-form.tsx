"use client"

import Link from "next/link"
import { useState } from "react"
import { Lock } from "lucide-react"
import type { Dict } from "@/content"
import type { Locale } from "@/lib/i18n"
import { parsePay, PAY_MAX, PAY_MIN, type PayField } from "@/lib/validate"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { describedBy, Field, Notice } from "./form-bits"

export function PayForm({ t, lang }: { t: Dict["pay"]; lang: Locale }) {
  const [state, setState] = useState<"idle" | "sending" | "not_enabled" | "failed">("idle")
  const [errors, setErrors] = useState<PayField[]>([])
  const [agree, setAgree] = useState(false)
  const err = (f: PayField) => (errors.includes(f) ? t.errors[f] : undefined)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const raw = { ...Object.fromEntries(new FormData(e.currentTarget)), agree, lang }
    const { errors: found } = parsePay(raw)
    setErrors(found)
    if (found.length) return
    setState("sending")
    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(raw),
      })
      const body = (await res.json().catch(() => ({}))) as { url?: string; code?: string }
      if (res.ok && body.url) {
        window.location.assign(body.url)
        return
      }
      setState(body.code === "not_enabled" ? "not_enabled" : "failed")
    } catch {
      setState("failed")
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <Field id="p-reference" label={t.reference} required hint={t.referenceHint} error={err("reference")}>
        <Input id="p-reference" name="reference" dir="ltr" autoComplete="off" required maxLength={40} aria-invalid={!!err("reference")} aria-describedby={describedBy("p-reference", t.referenceHint, err("reference"))} className="field" />
      </Field>
      <Field id="p-amount" label={t.amount} required hint={t.amountHint} error={err("amount")}>
        <Input id="p-amount" name="amount" type="number" inputMode="decimal" dir="ltr" min={PAY_MIN} max={PAY_MAX} step="0.01" required aria-invalid={!!err("amount")} aria-describedby={describedBy("p-amount", t.amountHint, err("amount"))} className="field" />
      </Field>

      <div className="grid gap-2">
        <div className="flex items-start gap-3">
          <Checkbox id="p-agree" checked={agree} onCheckedChange={(v) => setAgree(v === true)} aria-required="true" aria-invalid={!!err("agree")} aria-describedby={err("agree") ? "p-agree-error" : undefined} className="mt-1 size-5" />
          <label htmlFor="p-agree" className="text-[0.9375rem]">
            {t.agree}{" "}
            <Link href={`/${lang}/terms`} className="text-gold underline underline-offset-4">
              {t.terms}
            </Link>{" "}
            {t.and}{" "}
            <Link href={`/${lang}/refund-policy`} className="text-gold underline underline-offset-4">
              {t.refund}
            </Link>
            . <span aria-hidden="true" className="text-gold">*</span>
          </label>
        </div>
        {err("agree") && (
          <p id="p-agree-error" role="alert" className="text-sm font-medium text-destructive">
            {err("agree")}
          </p>
        )}
      </div>

      {state === "not_enabled" && <Notice tone="error">{t.notEnabled}</Notice>}
      {state === "failed" && <Notice tone="error">{t.error}</Notice>}

      <div>
        <button type="submit" disabled={state === "sending"} className="btn btn-gold w-full sm:w-auto">
          <Lock aria-hidden="true" className="size-4" />
          {state === "sending" ? t.sending : t.submit}
        </button>
        <p className="mt-3 text-sm text-muted-foreground">{t.methods}</p>
      </div>
    </form>
  )
}
