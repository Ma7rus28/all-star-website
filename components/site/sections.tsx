import Link from "next/link"
import { ArrowRight, FileText, Handshake, ReceiptText, ShieldCheck } from "lucide-react"
import type { Dict } from "@/content"
import type { Locale } from "@/lib/i18n"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Star } from "./illustrations"
import { Reveal } from "./reveal"

export function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string
  title: string
  sub?: string
}) {
  return (
    <Reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 max-w-3xl text-4xl font-extrabold md:text-6xl">{title}</h2>
      {sub && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{sub}</p>}
    </Reveal>
  )
}

export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 pe-8 font-heading text-2xl font-bold whitespace-nowrap md:text-4xl">
          {item}
          <Star className="size-5 text-[#0a0803]/70 md:size-7" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee-host overflow-hidden gold-fill py-5 md:py-7">
      <div className="marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

export function Process({ t }: { t: Dict["process"] }) {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-5">
          {t.steps.map((s, i) => (
            <li key={s.t} className="group bg-card p-6 transition-colors duration-300 hover:bg-secondary md:p-7">
              <Reveal delay={i * 90}>
                <span aria-hidden="true" className="font-heading text-5xl font-extrabold text-gold/40 transition-colors group-hover:text-gold">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-heading text-xl font-bold">{s.t}</h3>
                <p className="mt-3 text-[0.9375rem] text-muted-foreground">{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const pricingIcons = [ReceiptText, FileText, ShieldCheck, Handshake]

export function Pricing({ t }: { t: Dict["pricing"] }) {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {t.points.map((p, i) => {
            const Icon = pricingIcons[i]
            return (
              <li key={p.t}>
                <Reveal delay={i * 80} className="flex h-full gap-5 rounded-2xl border border-border bg-card p-6 md:p-8">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full gold-fill">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-bold">{p.t}</h3>
                    <p className="mt-2 text-muted-foreground">{p.d}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function Faq({ t }: { t: Dict["faq"] }) {
  return (
    <section id="faq" className="paper py-24 md:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <Accordion type="single" collapsible className="border-t border-border">
          {t.items.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="min-h-16 py-5 text-start font-heading text-lg font-bold md:text-xl">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export function CtaBand({ t, lang }: { t: Dict["cta"]; lang: Locale }) {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-36">
      <div aria-hidden="true" className="dots absolute inset-0 -z-10" style={{ maskImage: "radial-gradient(ellipse at center, black, transparent 70%)" }} />
      <div className="wrap text-center">
        <Reveal>
          <Star className="mx-auto size-12 text-gold" />
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold md:text-7xl">{t.title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">{t.sub}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href={`/${lang}/contact`} className="btn btn-gold">
              {t.button}
              <ArrowRight aria-hidden="true" className="size-5 rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function PageHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <header className="dots border-b border-border pt-40 pb-14 md:pt-48 md:pb-20">
      <div className="wrap">
        <h1 className="max-w-4xl text-5xl font-extrabold md:text-7xl">{title}</h1>
        {sub && <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{sub}</p>}
      </div>
    </header>
  )
}
