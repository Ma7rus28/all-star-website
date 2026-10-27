import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"
import { getDict } from "@/content"
import { landings } from "@/content/landings"
import { artById } from "@/components/site/illustrations"
import { Reveal } from "@/components/site/reveal"
import { CtaBand, PageHead, Process } from "@/components/site/sections"
import { hasLocale } from "@/lib/i18n"
import { pageMeta } from "@/lib/seo"
import { pillarPhotos } from "@/lib/photos"

const quoteParam = { events: "event", exhibitions: "stand", advertising: "advertising" } as const

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDict(lang).meta
  // The title already names the services and the city; skip the brand suffix to keep it short.
  return { ...pageMeta(lang, "/services", t.servicesTitle, t.servicesDescription), title: { absolute: t.servicesTitle } }
}

export default async function Services({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDict(lang)

  return (
    <>
      <PageHead title={t.servicesPage.title} sub={t.servicesPage.sub} />
      <div className="wrap grid gap-6 py-16 md:py-24">
        {t.pillars.items.map((item, i) => {
          const id = item.id as keyof typeof artById
          const Art = artById[id]
          const photo = pillarPhotos[item.id]
          return (
            <Reveal key={item.id}>
              <section
                id={item.id}
                aria-labelledby={`${item.id}-title`}
                className="grid gap-8 rounded-3xl border border-border bg-card p-6 md:grid-cols-2 md:items-center md:gap-14 md:p-12"
              >
                {photo ? (
                  <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-black ${i % 2 ? "md:order-2" : ""}`}>
                    <Image src={photo.src} alt={photo.alt[lang]} fill sizes="(min-width: 768px) 45vw, 90vw" className={photo.contain ? "object-contain" : "object-cover"} />
                  </div>
                ) : (
                  <Art label={item.art} className={`w-full text-foreground/85 ${i % 2 ? "md:order-2" : ""}`} />
                )}
                <div>
                  <p className="eyebrow">{item.tagline}</p>
                  <h2 id={`${item.id}-title`} className="mt-4 text-4xl font-extrabold md:text-6xl">
                    {item.name}
                  </h2>
                  <p className="mt-5 text-lg text-muted-foreground">{item.desc}</p>
                  <h3 className="mt-8 font-heading text-lg font-bold">{t.servicesPage.includes}</h3>
                  <ul className="mt-4 grid gap-2.5">
                    {item.points.map((p) => (
                      <li key={p} className="flex gap-3 text-muted-foreground">
                        <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${lang}/contact?service=${quoteParam[id]}`} className="btn btn-gold mt-8">
                    {t.pillars.cta} {item.name}
                    <ArrowRight aria-hidden="true" className="size-5 rtl:rotate-180" />
                  </Link>
                  {(() => {
                    const landing = landings.find((l) => l.pillar === item.id)
                    return landing ? (
                      <p className="mt-5">
                        <Link
                          href={`/${lang}/riyadh/${landing.slug}`}
                          className="inline-flex min-h-11 items-center font-semibold text-gold underline underline-offset-4"
                        >
                          {landing[lang].h1}
                        </Link>
                      </p>
                    ) : null
                  })()}
                </div>
              </section>
            </Reveal>
          )
        })}
      </div>
      <Process t={t.process} />
      <CtaBand t={t.cta} lang={lang} />
    </>
  )
}
