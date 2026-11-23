import { ArrowUpRight, Star as StarIcon } from "lucide-react"
import type { Dict } from "@/content"
import { reviews } from "@/content/reviews"
import type { Locale } from "@/lib/i18n"
import { site } from "@/lib/site"
import { SectionHead } from "./sections"
import { Reveal } from "./reveal"

function Stars({ label }: { label: string }) {
  return (
    <span role="img" aria-label={label} className="flex gap-0.5 text-gold">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} aria-hidden="true" className="size-4 fill-current" />
      ))}
    </span>
  )
}

// Real Google reviews, quoted with a link to the full list on the Google Business Profile.
export function Reviews({ t, lang }: { t: Dict["reviews"]; lang: Locale }) {
  return (
    <section id="reviews" className="py-24 md:py-32">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={r.en.text}>
              <Reveal delay={i * 80} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <Stars label={t.stars} />
                <blockquote className="mt-4 flex-1 text-[0.9375rem]">
                  <p>{lang === "ar" ? `«${r.ar.text}»` : `“${r.en.text}”`}</p>
                </blockquote>
                <p className="mt-5 text-sm">
                  <span className="text-muted-foreground">{r[lang].service}</span>
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        <a href={site.mapsUrl} target="_blank" rel="noopener" className="btn btn-gold mt-10 w-fit">
          {t.cta}
          <ArrowUpRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
        </a>
      </div>
    </section>
  )
}
