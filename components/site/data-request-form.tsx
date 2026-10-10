"use client"

import { useState } from "react"
import type { Dict } from "@/content"
import { isSet, site } from "@/lib/site"
import { parseDataRequest, type DataRequestField } from "@/lib/validate"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { describedBy, Field, Honeypot, Notice } from "./form-bits"

export function DataRequestForm({
  t,
  optional,
  honeypot,
}: {
  t: Dict["dataRequest"]
  optional: string
  honeypot: string
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed" | "manual">("idle")
  const [errors, setErrors] = useState<DataRequestField[]>([])
  const [draft, setDraft] = useState("")
  const err = (f: DataRequestField) => (errors.includes(f) ? t.errors[f] : undefined)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const raw = Object.fromEntries(new FormData(e.currentTarget))
    const { data, errors: found } = parseDataRequest(raw)
    setErrors(found)
    if (found.length) return
    setState("sending")
    try {
      const res = await fetch("/api/data-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(raw),
      })
      if (res.status === 503 && isSet(site.privacyEmail)) {
        const type = t.types.find((o) => o.v === data.type)?.l ?? data.type
        setDraft([type, "", `${t.email}: ${data.email}`, data.details].filter(Boolean).join("\n"))
        setState("manual")
      } else {
        setState(res.ok ? "done" : "failed")
      }
    } catch {
      setState("failed")
    }
  }

  if (state === "done") return <Notice tone="success">{t.success}</Notice>

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-6">
      <fieldset aria-describedby={err("type") ? "d-type-error" : undefined}>
        <legend className="text-[0.9375rem] font-semibold">
          {t.type} <span aria-hidden="true" className="text-gold">*</span>
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {t.types.map((o, i) => (
            <label
              key={o.v}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-input px-4 has-checked:border-gold has-checked:bg-gold/10"
            >
              <input type="radio" name="type" value={o.v} defaultChecked={i === 0} required className="size-4 accent-[#d4af37]" />
              {o.l}
            </label>
          ))}
        </div>
        {err("type") && (
          <p id="d-type-error" role="alert" className="mt-2 text-sm font-medium text-destructive">
            {err("type")}
          </p>
        )}
      </fieldset>

      <Field id="d-email" label={t.email} required hint={t.emailHint} error={err("email")}>
        <Input id="d-email" name="email" type="email" inputMode="email" autoComplete="email" dir="ltr" required aria-invalid={!!err("email")} aria-describedby={describedBy("d-email", t.emailHint, err("email"))} className="field" />
      </Field>

      <Field id="d-details" label={t.details} optionalText={optional}>
        <Textarea id="d-details" name="details" rows={4} className="min-h-28 text-base" />
      </Field>

      <Honeypot label={honeypot} />
      <p className="text-sm text-muted-foreground">{t.verify}</p>
      {state === "failed" && <Notice tone="error">{t.error}</Notice>}
      {state === "manual" && (
        <Notice tone="success">
          <p>{t.manual}</p>
          <a
            href={`mailto:${site.privacyEmail}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(draft)}`}
            className="btn btn-gold mt-4"
          >
            {t.viaEmail}
          </a>
        </Notice>
      )}

      <div>
        <button type="submit" disabled={state === "sending"} className="btn btn-gold">
          {state === "sending" ? t.sending : t.submit}
        </button>
      </div>
    </form>
  )
}
