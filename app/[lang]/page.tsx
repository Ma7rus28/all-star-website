import { notFound } from "next/navigation"
import { getDict } from "@/content"
import { BriefBuilder } from "@/components/site/brief-builder"
import { Catalogue } from "@/components/site/catalogue"
import { Hero } from "@/components/site/hero"
import { Pillars } from "@/components/site/pillars"
import { CtaBand, Faq, Marquee, Pricing, Process, SectionHead } from "@/components/site/sections"
import { hasLocale } from "@/lib/i18n"

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDict(lang)

  return (
    <>
      <Hero t={t.hero} lang={lang} />
      <Marquee items={t.marquee} />

      <section id="services" className="py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow={t.pillars.eyebrow} title={t.pillars.title} sub={t.pillars.sub} />
          <Pillars t={t.pillars} lang={lang} />
        </div>
      </section>

      <Process t={t.process} />

      <section id="brief" className="border-y border-border bg-[#0b0a08] py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow={t.builder.eyebrow} title={t.builder.title} sub={t.builder.sub} />
          <BriefBuilder t={t.builder} lang={lang} />
        </div>
      </section>

      <section id="catalogue" className="paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow={t.catalogue.eyebrow} title={t.catalogue.title} sub={t.catalogue.sub} />
          <Catalogue t={t.catalogue} lang={lang} />
        </div>
      </section>

      <Pricing t={t.pricing} />
      <Faq t={t.faq} />
      <CtaBand t={t.cta} lang={lang} />
    </>
  )
}
