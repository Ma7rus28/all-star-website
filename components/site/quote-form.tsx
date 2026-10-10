"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRef, useState } from "react"
import type { Dict } from "@/content"
import type { Locale } from "@/lib/i18n"
import { isSet, site, waHref } from "@/lib/site"
import { parseQuote, services, type QuoteField } from "@/lib/validate"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { describedBy, Field, Honeypot, Notice, selectClass } from "./form-bits"

type State = "idle" | "sending" | "done" | "failed" | "manual"

export function QuoteForm({ t, lang }: { t: Dict["form"]; lang: Locale }) {
  const params = useSearchParams()
  const presetService = params.get("service") ?? ""
  const needs = (params.get("needs") ?? "").slice(0, 400)

  const [state, setState] = useState<State>("idle")
  const [errors, setErrors] = useState<QuoteField[]>([])
  const [consent, setConsent] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [draft, setDraft] = useState("")
  const summaryRef = useRef<HTMLDivElement>(null)

  const err = (f: QuoteField) => (errors.includes(f) ? t.errors[f] : undefined)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const raw = {
      ...Object.fromEntries(new FormData(form)),
      consent,
      marketing,
    }
    const { data, errors: found } = parseQuote(raw)
    setErrors(found)
    if (found.length) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setState("sending")
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(raw),
      })
      if (res.ok) {
        setState("done")
        form.reset()
      } else if (res.status === 503) {
        // No delivery service is connected: hand the visitor a ready-to-send message instead.
        const service = t.serviceOptions.find((o) => o.v === data.service)?.l ?? data.service
        const lines: [string, string][] = [
          [t.name, data.name],
          [t.company, data.company],
          [t.email, data.email],
          [t.phone, data.phone],
          [t.service, service],
          [t.city, data.city],
          [t.date, data.date],
          [t.message, data.message],
        ]
        setDraft(
          [t.subject, "", ...lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join("\n")
        )
        setState("manual")
      } else {
        setState("failed")
      }
    } catch {
      setState("failed")
    }
  }

  if (state === "done") {
    return <Notice tone="success">{t.success}</Notice>
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-6">
      {errors.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-destructive/60 bg-destructive/10 p-4"
        >
          <p className="font-semibold">{t.errors.summary}</p>
          <ul className="mt-2 list-disc ps-5">
            {errors.map((f) => (
              <li key={f}>
                <a href={`#q-${f}`} className="underline underline-offset-4">
                  {t.errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="q-name" label={t.name} required error={err("name")}>
          <Input id="q-name" name="name" autoComplete="name" required aria-invalid={!!err("name")} aria-describedby={describedBy("q-name", undefined, err("name"))} className="field" />
        </Field>
        <Field id="q-company" label={t.company} optionalText={t.optional}>
          <Input id="q-company" name="company" autoComplete="organization" className="field" />
        </Field>
        <Field id="q-email" label={t.email} required error={err("email")}>
          <Input id="q-email" name="email" type="email" inputMode="email" autoComplete="email" dir="ltr" required aria-invalid={!!err("email")} aria-describedby={describedBy("q-email", undefined, err("email"))} className="field" />
        </Field>
        <Field id="q-phone" label={t.phone} optionalText={t.optional}>
          <Input id="q-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" className="field" />
        </Field>
        <Field id="q-service" label={t.service} required error={err("service")}>
          <select id="q-service" name="service" required defaultValue={(services as readonly string[]).includes(presetService) ? presetService : ""} aria-invalid={!!err("service")} aria-describedby={describedBy("q-service", undefined, err("service"))} className={selectClass}>
            <option value="" disabled>
              {t.choose}
            </option>
            {t.serviceOptions.map((o) => (
              <option key={o.v} value={o.v} className="bg-card text-foreground">
                {o.l}
              </option>
            ))}
          </select>
        </Field>
        <Field id="q-city" label={t.city} optionalText={t.optional}>
          <Input id="q-city" name="city" autoComplete="address-level2" className="field" />
        </Field>
        <Field id="q-date" label={t.date} optionalText={t.optional}>
          <Input id="q-date" name="date" type="date" className="field" />
        </Field>
      </div>

      <Field id="q-message" label={t.message} required hint={t.messageHint} error={err("message")}>
        <Textarea id="q-message" name="message" rows={6} required defaultValue={needs} aria-invalid={!!err("message")} aria-describedby={describedBy("q-message", t.messageHint, err("message"))} className="min-h-36 text-base" />
      </Field>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-start gap-3">
            <Checkbox id="q-consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)} aria-required="true" aria-invalid={!!err("consent")} aria-describedby={err("consent") ? "q-consent-error" : undefined} className="mt-1 size-5" />
            <label htmlFor="q-consent" className="text-[0.9375rem]">
              {t.consent}{" "}
              <Link href={`/${lang}/privacy`} className="text-gold underline underline-offset-4">
                {t.privacy}
              </Link>
              . <span aria-hidden="true" className="text-gold">*</span>
            </label>
          </div>
          {err("consent") && (
            <p id="q-consent-error" className="text-sm font-medium text-destructive">
              {err("consent")}
            </p>
          )}
        </div>
        <div className="flex items-start gap-3">
          <Checkbox id="q-marketing" checked={marketing} onCheckedChange={(v) => setMarketing(v === true)} className="mt-1 size-5" />
          <label htmlFor="q-marketing" className="text-[0.9375rem] text-muted-foreground">
            {t.marketing} ({t.optional})
          </label>
        </div>
      </div>

      <Honeypot label={t.honeypot} />

      {state === "failed" && <Notice tone="error">{t.error}</Notice>}
      {state === "manual" && (
        <Notice tone="success">
          <p>{t.manual}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {isSet(site.whatsapp) && (
              <a
                href={`${waHref(site.whatsapp)}?text=${encodeURIComponent(draft)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                {t.viaWhatsapp}
              </a>
            )}
            {isSet(site.email) && (
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(draft)}`}
                className="btn btn-line"
              >
                {t.viaEmail}
              </a>
            )}
          </div>
        </Notice>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn btn-gold">
          {state === "sending" ? t.sending : t.submit}
        </button>
        <p className="text-sm text-muted-foreground">
          <span aria-hidden="true" className="text-gold">*</span> {t.required}
        </p>
      </div>
    </form>
  )
}
