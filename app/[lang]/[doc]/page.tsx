import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getDict } from "@/content"
import { getLegal } from "@/content/legal"
import { PageHead } from "@/components/site/sections"
import { hasLocale, legalSlugs, locales, type LegalSlug } from "@/lib/i18n"
import { pageMeta } from "@/lib/seo"
import { site } from "@/lib/site"

export const dynamicParams = false

export const generateStaticParams = () =>
  locales.flatMap((lang) => legalSlugs.map((doc) => ({ lang, doc })))

const isLegal = (v: string): v is LegalSlug => (legalSlugs as readonly string[]).includes(v)

export async function generateMetadata({ params }: PageProps<"/[lang]/[doc]">): Promise<Metadata> {
  const { lang, doc } = await params
  if (!hasLocale(lang) || !isLegal(doc)) return {}
  const legal = getLegal(lang, doc)
  return pageMeta(lang, `/${doc}`, legal.title, legal.intro)
}

export default async function Legal({ params }: PageProps<"/[lang]/[doc]">) {
  const { lang, doc } = await params
  if (!hasLocale(lang) || !isLegal(doc)) notFound()
  const legal = getLegal(lang, doc)

  return (
    <>
      <PageHead title={legal.title} sub={legal.intro} />
      <article className="wrap prose-legal py-14 md:py-20">
        <p className="text-sm">
          {getDict(lang).legalNote}: <time dateTime={site.legalUpdated}>{site.legalUpdated}</time>
        </p>
        {legal.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-bold text-foreground">{s.h}</h2>
            {s.ul && (
              <ul>
                {s.ul.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
            {s.p?.map((p) => (
              <p key={p} className={s.ul ? "mt-3" : undefined}>
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>
    </>
  )
}
