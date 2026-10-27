import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, MapPin } from "lucide-react"
import { getDict } from "@/content"
import { getLanding } from "@/content/landings"
import { getProduct } from "@/content/products"
import { projects, type Project } from "@/content/projects"
import { PageHead } from "@/components/site/sections"
import { hasLocale, type Locale } from "@/lib/i18n"
import { pageMeta, siteUrl } from "@/lib/seo"

// Anchor text for a project's related page: the service or product page's own heading.
function linkLabel(link: string, lang: Locale) {
  const [, section, slug] = link.split("/")
  if (section === "products") return getProduct(slug)?.[lang].h1
  if (section === "riyadh") return getLanding(slug)?.[lang].h1
}

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
  const videoLd = projects.flatMap(({ media: m, ...p }) =>
    m.kind === "video"
      ? [
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: p[lang].title,
            description: p[lang].summary,
            thumbnailUrl: `${siteUrl}${m.poster}`,
            contentUrl: `${siteUrl}${m.src}`,
            uploadDate: m.uploaded,
            duration: `PT${m.durationSeconds}S`,
            inLanguage: lang,
            publisher: { "@id": `${siteUrl}/#business` },
          },
        ]
      : [],
  )

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
          const portrait = p.media.height > p.media.width
          const related = p.link && linkLabel(p.link, lang)
          return (
            <article
              key={p.slug}
              id={p.slug}
              aria-labelledby={`${p.slug}-title`}
              className={`grid gap-8 rounded-3xl border border-border bg-card p-5 md:items-center md:gap-14 md:p-10 ${
                portrait ? "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" : "md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
              }`}
            >
              <ProjectMedia project={p} title={c.title} alt={c.alt} videoLabel={t.video} portrait={portrait} />
              <div>
                {c.location && (
                  <p className="eyebrow mb-4">
                    <MapPin aria-hidden="true" className="size-4" />
                    {c.location}
                  </p>
                )}
                <h2 id={`${p.slug}-title`} className="text-4xl font-extrabold md:text-5xl">
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
                {p.link && related && (
                  <Link
                    href={`/${lang}${p.link}`}
                    className="mt-8 inline-flex items-center gap-2 font-semibold text-gold underline-offset-4 hover:underline"
                  >
                    {related}
                    <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
                  </Link>
                )}
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

function ProjectMedia({
  project: { media: m },
  title,
  alt,
  videoLabel,
  portrait,
}: {
  project: Project
  title: string
  alt?: string
  videoLabel: string
  portrait: boolean
}) {
  const frame = `w-full overflow-hidden rounded-2xl border border-border bg-black ${portrait ? "mx-auto max-w-sm" : ""}`
  if (m.kind === "photo") {
    return (
      <div className={frame}>
        <Image
          src={m.src}
          alt={alt ?? title}
          width={m.width}
          height={m.height}
          sizes="(min-width: 1280px) 680px, (min-width: 768px) 56vw, 100vw"
          className="h-auto w-full"
        />
      </div>
    )
  }
  return (
    <div className={frame}>
      <video
        className="block w-full"
        style={{ aspectRatio: `${m.width} / ${m.height}` }}
        src={m.src}
        poster={m.poster}
        controls
        playsInline
        preload="none"
        aria-label={`${videoLabel}: ${title}`}
      />
    </div>
  )
}
