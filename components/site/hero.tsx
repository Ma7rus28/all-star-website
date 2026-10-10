"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import type { Dict } from "@/content"
import type { Locale } from "@/lib/i18n"

export function Hero({ t, lang }: { t: Dict["hero"]; lang: Locale }) {
  const hostRef = useRef<HTMLElement>(null)
  const [word, setWord] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(
      () => setWord((w) => (w + 1) % t.words.length),
      2600
    )
    return () => window.clearInterval(id)
  }, [t.words.length])

  // The pointer carries a pool of light behind the dot screen.
  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = host.getBoundingClientRect()
        host.style.setProperty("--mx", `${e.clientX - rect.left}px`)
        host.style.setProperty("--my", `${e.clientY - rect.top}px`)
        host.style.setProperty("--glow", "1")
      })
    }
    host.addEventListener("pointermove", onMove)
    return () => {
      cancelAnimationFrame(raf)
      host.removeEventListener("pointermove", onMove)
    }
  }, [])

  return (
    <section
      ref={hostRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24"
      style={{ "--mx": "70%", "--my": "30%", "--glow": "0" } as React.CSSProperties}
    >
      <div aria-hidden="true" className="halftone -z-10">
        <div className="halftone-blob -end-[12%] -top-[18%] h-[70%] w-[62%] opacity-90" />
        <div
          className="halftone-blob -start-[18%] bottom-[-22%] h-[62%] w-[58%] opacity-75"
          style={{ animationDuration: "23s", animationDirection: "alternate-reverse" }}
        />
        <div
          className="absolute size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-500"
          style={{
            left: "var(--mx)",
            top: "var(--my)",
            opacity: "var(--glow)",
            background:
              "radial-gradient(closest-side, #fff8e1, #d4af37 45%, transparent 100%)",
          }}
        />
      </div>
      <div aria-hidden="true" className="halftone-fade -z-10" />

      <div className="wrap">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1
          aria-label={`${t.before} ${t.words.join(" / ")} ${t.after}`}
          className="mt-6 max-w-5xl text-[clamp(2.75rem,9vw,7.5rem)] font-extrabold drop-shadow-[0_2px_24px_rgb(0_0_0/0.9)]"
        >
          <span aria-hidden="true" className="block">
            {t.before}
          </span>
          <span aria-hidden="true" className="block">
            <span
              key={word}
              className="gold-text inline-block pb-[0.08em]"
              style={{ animation: "word-in 0.55s cubic-bezier(0.2,0.7,0.2,1)" }}
            >
              {t.words[word]}
            </span>
          </span>
          <span aria-hidden="true" className="block">
            {t.after}
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-foreground/85 drop-shadow-[0_1px_12px_rgb(0_0_0)] md:text-xl">
          {t.sub}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href={`/${lang}/contact`} className="btn btn-gold">
            {t.cta}
            <ArrowRight aria-hidden="true" className="size-5 rtl:rotate-180" />
          </Link>
          <Link href={`/${lang}/services`} className="btn btn-line bg-ink/60 backdrop-blur-sm">
            {t.cta2}
          </Link>
        </div>
      </div>
    </section>
  )
}
