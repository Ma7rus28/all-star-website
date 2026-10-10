"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import type { Dict } from "@/content"
import type { Locale } from "@/lib/i18n"
import { pillarPhotos } from "@/lib/photos"
import { cn } from "@/lib/utils"
import { artById } from "./illustrations"

const quoteParam: Record<string, string> = {
  events: "event",
  exhibitions: "stand",
  advertising: "advertising",
}

export function Pillars({ t, lang }: { t: Dict["pillars"]; lang: Locale }) {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const item = t.items[active]
  const Art = artById[item.id as keyof typeof artById]
  const photo = pillarPhotos[item.id]

  const onKey = (e: React.KeyboardEvent) => {
    const rtl = lang === "ar"
    const next = e.key === (rtl ? "ArrowLeft" : "ArrowRight") || e.key === "ArrowDown"
    const prev = e.key === (rtl ? "ArrowRight" : "ArrowLeft") || e.key === "ArrowUp"
    let i = active
    if (next) i = (active + 1) % t.items.length
    else if (prev) i = (active - 1 + t.items.length) % t.items.length
    else if (e.key === "Home") i = 0
    else if (e.key === "End") i = t.items.length - 1
    else return
    e.preventDefault()
    setActive(i)
    tabs.current[i]?.focus()
  }

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
      <div role="tablist" aria-label={t.tablist} aria-orientation="vertical" className="grid content-start gap-3">
        {t.items.map((it, i) => {
          const selected = i === active
          return (
            <button
              key={it.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`pillar-tab-${it.id}`}
              aria-selected={selected}
              aria-controls={`pillar-panel-${it.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKey}
              className={cn(
                "group flex items-center gap-5 rounded-2xl border p-5 text-start transition-colors duration-300 md:p-6",
                selected
                  ? "border-gold gold-fill"
                  : "border-border bg-card hover:border-white/40"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "font-heading text-sm font-bold tabular-nums",
                  selected ? "text-[#0a0803]/70" : "text-muted-foreground"
                )}
              >
                0{i + 1}
              </span>
              <span className="grid gap-1">
                <span className="font-heading text-2xl font-extrabold md:text-3xl">
                  {it.name}
                </span>
                <span className={cn("text-[0.9375rem]", selected ? "text-[#0a0803]/80" : "text-muted-foreground")}>
                  {it.tagline}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className={cn(
                  "ms-auto size-6 shrink-0 transition-transform rtl:rotate-180",
                  selected ? "translate-x-0" : "opacity-40 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                )}
              />
            </button>
          )
        })}
      </div>

      <div
        key={item.id}
        role="tabpanel"
        id={`pillar-panel-${item.id}`}
        aria-labelledby={`pillar-tab-${item.id}`}
        tabIndex={0}
        className="rounded-3xl border border-border bg-card p-6 md:p-10"
        style={{ animation: "word-in 0.45s cubic-bezier(0.2,0.7,0.2,1)" }}
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          {photo ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black">
              <Image src={photo.src} alt={photo.alt[lang]} fill sizes="(min-width: 768px) 30vw, 90vw" className={photo.contain ? "object-contain" : "object-cover"} />
            </div>
          ) : (
            <Art label={item.art} className="w-full text-foreground/85" />
          )}
          <div>
            <p className="text-lg">{item.desc}</p>
            <ul className="mt-5 grid gap-2.5">
              {item.points.map((p) => (
                <li key={p} className="flex gap-3 text-muted-foreground">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href={`/${lang}/contact?service=${quoteParam[item.id]}`}
              className="btn btn-line mt-7"
            >
              {t.cta} {item.name}
              <ArrowRight aria-hidden="true" className="size-5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
