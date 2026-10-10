"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Check, Plus } from "lucide-react"
import type { Dict } from "@/content"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type TypeId = "event" | "stand" | "advertising"

export function BriefBuilder({ t, lang }: { t: Dict["builder"]; lang: Locale }) {
  const [type, setType] = useState<TypeId>("stand")
  const [picked, setPicked] = useState<string[]>([])
  const needs = t.needs[type]

  const toggle = (need: string) =>
    setPicked((p) => (p.includes(need) ? p.filter((n) => n !== need) : [...p, need]))

  const href = `/${lang}/contact?service=${type}&needs=${encodeURIComponent(picked.join(", "))}`

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div className="grid gap-8 rounded-3xl border border-border bg-card p-6 md:p-8">
        <fieldset>
          <legend className="font-heading text-lg font-bold">{t.typeLegend}</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {t.types.map((ty) => (
              <label
                key={ty.id}
                className={cn(
                  "flex min-h-14 cursor-pointer items-center justify-center rounded-xl border px-4 text-center font-semibold transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-ring",
                  type === ty.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground/50"
                )}
              >
                <input
                  type="radio"
                  name="brief-type"
                  value={ty.id}
                  checked={type === ty.id}
                  onChange={() => {
                    setType(ty.id as TypeId)
                    setPicked([])
                  }}
                  className="sr-only"
                />
                {ty.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-heading text-lg font-bold">{t.needsLegend}</legend>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {needs.map((need) => {
              const on = picked.includes(need)
              return (
                <button
                  key={need}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(need)}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors",
                    on
                      ? "border-gold gold-fill"
                      : "border-border hover:border-foreground/50"
                  )}
                >
                  {on ? (
                    <Check aria-hidden="true" className="size-4" />
                  ) : (
                    <Plus aria-hidden="true" className="size-4" />
                  )}
                  {need}
                </button>
              )
            })}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col rounded-3xl border border-gold/50 bg-gold/8 p-6 md:p-8">
        <h3 className="font-heading text-xl font-bold">{t.summary}</h3>
        <p className="mt-1 text-muted-foreground" aria-live="polite">
          {picked.length} {t.selected}
        </p>
        {picked.length === 0 ? (
          <p className="mt-6 text-muted-foreground">{t.empty}</p>
        ) : (
          <ul className="mt-6 grid gap-2.5">
            {picked.map((p) => (
              <li key={p} className="flex gap-3">
                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                {p}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-8">
          {picked.length > 0 && (
            <Link href={href} className="btn btn-gold w-full">
              {t.cta}
              <ArrowRight aria-hidden="true" className="size-5 rtl:rotate-180" />
            </Link>
          )}
          <p className="mt-3 text-sm text-muted-foreground">{t.note}</p>
        </div>
      </div>
    </div>
  )
}
