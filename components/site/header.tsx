import Link from "next/link"
import type { Dict } from "@/content"
import type { Locale } from "@/lib/i18n"
import { SparkMark, Wordmark } from "./illustrations"
import { LangSwitch } from "./lang-switch"
import { MobileNav } from "./mobile-nav"

export const navLinks = (lang: Locale, t: Dict["nav"]) => [
  { href: `/${lang}/services`, label: t.services },
  { href: `/${lang}/projects`, label: t.projects },
  { href: `/${lang}#process`, label: t.process },
  { href: `/${lang}#catalogue`, label: t.catalogue },
  { href: `/${lang}/pay`, label: t.pay },
  { href: `/${lang}/contact`, label: t.contact },
]

export function Logo({ lang, label }: { lang: Locale; label: string }) {
  return (
    <Link
      href={`/${lang}`}
      aria-label={label}
      className="group inline-flex min-h-11 items-start gap-1.5 whitespace-nowrap"
    >
      {lang === "ar" ? (
        <span aria-hidden="true" className="self-center font-heading text-2xl leading-none font-bold">
          أول <span className="gold-text">ستار</span>
        </span>
      ) : (
        <Wordmark className="h-3 w-auto self-center sm:h-4" />
      )}
      <SparkMark className="mt-0.5 size-5 shrink-0 transition-transform duration-700 group-hover:rotate-90" />
    </Link>
  )
}

export function Header({ lang, t }: { lang: Locale; t: Dict["nav"] }) {
  const links = navLinks(lang, t)
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-ink/75 backdrop-blur-md">
      <div className="wrap flex h-18 items-center justify-between gap-4">
        <Logo lang={lang} label={t.home} />
        <nav aria-label={t.primary} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} label={t.switchLabel} text={t.switchTo} />
          <Link
            href={`/${lang}/contact`}
            className="btn btn-gold hidden min-h-11 px-5 py-2 text-[0.9375rem] whitespace-nowrap sm:inline-flex"
          >
            {t.quote}
          </Link>
          <MobileNav lang={lang} t={t} links={links} />
        </div>
      </div>
    </header>
  )
}
