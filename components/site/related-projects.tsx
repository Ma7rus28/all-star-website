import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import type { Dict } from "@/content"
import { isPanoramic, projectsFor } from "@/content/projects"
import type { Locale } from "@/lib/i18n"

/** Real jobs behind a service or product page, linking to their cards on the Projects page. */
export function RelatedProjects({
  path,
  lang,
  t,
}: {
  path: string
  lang: Locale
  t: Dict["projectsPage"]
}) {
  const items = projectsFor(path)
  if (!items.length) return null
  return (
    <section aria-labelledby="related-projects" className="border-t border-border py-16 md:py-24">
      <div className="wrap">
        <h2 id="related-projects" className="text-3xl font-extrabold md:text-4xl">
          {t.related}
        </h2>
        <ul className={`mt-8 grid gap-6 ${items.length > 1 ? "md:grid-cols-2" : "max-w-2xl"}`}>
          {items.map(({ slug, media, ...p }) => {
            const c = p[lang]
            return (
              <li key={slug} className="group overflow-hidden rounded-2xl border border-border bg-card">
                <Link href={`/${lang}/projects#${slug}`} className="block">
                  <div
                    className="relative overflow-hidden bg-black"
                    style={{ aspectRatio: isPanoramic(media) ? `${media.width} / ${media.height}` : "16 / 9" }}
                  >
                    <Image
                      src={media.kind === "video" ? media.poster : media.src}
                      alt={c.alt ?? c.title}
                      fill
                      sizes="(min-width: 768px) 45vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    {c.location && (
                      <p className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin aria-hidden="true" className="size-4 shrink-0" />
                        {c.location}
                      </p>
                    )}
                    <h3 className="font-heading text-xl font-bold">{c.title}</h3>
                    <p className="mt-2 line-clamp-3 text-[0.9375rem] text-muted-foreground">{c.summary}</p>
                    <p className="mt-4 inline-flex items-center gap-2 font-semibold text-gold group-hover:underline">
                      {t.viewProject}
                      <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
