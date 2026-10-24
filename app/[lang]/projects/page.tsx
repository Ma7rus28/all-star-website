import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, MapPin } from "lucide-react"
import { getDict } from "@/content"
import { projects } from "@/content/projects"
import { PageHead } from "@/components/site/sections"
import { hasLocale } from "@/lib/i18n"
import { pageMeta, siteUrl } from "@/lib/seo"

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDict(lang).projectsPage
  return { ...pageMeta(lang, "/projects", t.metaTitle, t.metaDescription), title: { absolute: t.metaTitle } }
}

export default async function Projects({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDict(lang).projectsPage

  // Lets each project video appear in Google's video results.
  const videoLd = projects.map((p) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: p[lang].title,
    description: p[lang].summary,
    thumbnailUrl: `${siteUrl}${p.poster}`,
    contentUrl: `${siteUrl}${p.video}`,
    uploadDate: p.uploaded,
    duration: `PT${p.durationSeconds}S`,
    inLanguage: lang,
    publisher: { "@id": `${siteUrl}/#business` },
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd).replace(/</g, "\\u003c") }}
      />
      <PageHead title={t.title} sub={t.sub} />
      <div className="wrap grid gap-10 py-16 md:py-24">
        {projects.map((p) => {
          const c = p[lang]
          return (
            <article
              key={p.slug}
              id={p.slug}
              aria-labelledby={`${p.slug}-title`}
              className="grid gap-8 rounded-3xl border border-border bg-card p-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-14 md:p-10"
            >
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-black">
                <video
                  className="aspect-[9/16] w-full"
                  src={p.video}
                  poster={p.poster}
                  controls
                  playsInline
                  preload="none"
                  aria-label={`${t.video}: ${c.title}`}
                />
              </div>
              <div>
                <p className="eyebrow">
                  <MapPin aria-hidden="true" className="size-4" />
                  {c.location}
                </p>
                <h2 id={`${p.slug}-title`} className="mt-4 text-4xl font-extrabold md:text-5xl">
                  {c.title}
                </h2>
                <p className="mt-5 text-lg text-muted-foreground">{c.summary}</p>
                <h3 className="mt-8 font-heading text-lg font-bold">{t.scope}</h3>
                <ul className="mt-4 grid gap-2.5">
                  {c.scope.map((s) => (
                    <li key={s} className="flex gap-3 text-muted-foreground">
                      <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}

        <div className="rounded-3xl border border-gold/40 bg-gold/8 p-8 text-center md:p-12">
          <h2 className="text-3xl font-extrabold md:text-4xl">{t.cta}</h2>
          <Link href={`/${lang}/contact?service=event`} className="btn btn-gold mt-6">
            {t.ctaButton}
            <ArrowRight aria-hidden="true" className="size-5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </>
  )
}
