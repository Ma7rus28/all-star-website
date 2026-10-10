import Link from "next/link"
import type { Dict } from "@/content"
import type { Locale } from "@/lib/i18n"
import { isSet, site, telHref } from "@/lib/site"
import { CookieSettingsButton } from "./cookie-consent"
import { Logo, navLinks } from "./header"

const linkClass =
  "inline-flex min-h-11 items-center text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"

export function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  const t = dict.footer
  const legal = [
    { href: `/${lang}/privacy`, label: t.privacy },
    { href: `/${lang}/terms`, label: t.terms },
    { href: `/${lang}/refund-policy`, label: t.refund },
    { href: `/${lang}/cookies`, label: t.cookies },
    { href: `/${lang}/data-request`, label: t.dataRequest },
  ]

  return (
    <footer className="border-t border-border bg-ink">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo lang={lang} label={dict.nav.home} />
          <p className="mt-4 max-w-xs text-muted-foreground">{t.blurb}</p>
        </div>
        <nav aria-label={t.company}>
          <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
            {t.company}
          </h2>
          <ul className="mt-3">
            {navLinks(lang, dict.nav).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.legal}>
          <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
            {t.legal}
          </h2>
          <ul className="mt-3">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton label={dict.cookie.settings} className={linkClass} />
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
            {t.contact}
          </h2>
          <address className="mt-5 grid gap-2 text-muted-foreground not-italic">
            <span className="font-medium text-foreground">{site.name}</span>
            <span>{lang === "ar" ? site.addressAr : site.address}</span>
            <span>
              {t.cr}: <bdi dir="ltr">{site.cr}</bdi>
            </span>
            <span>
              {t.vat}: <bdi dir="ltr">{site.vat}</bdi>
            </span>
            {isSet(site.phone) ? (
              <a href={telHref(site.phone)} className={linkClass}>
                <bdi dir="ltr">{site.phone}</bdi>
              </a>
            ) : (
              <bdi dir="ltr">{site.phone}</bdi>
            )}
            {isSet(site.email) ? (
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            ) : (
              <bdi dir="ltr">{site.email}</bdi>
            )}
          </address>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="wrap flex flex-col gap-2 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {lang === "ar" ? site.nameAr : site.name}. {t.rights}
          </p>
          <p>{t.fonts}</p>
        </div>
      </div>
    </footer>
  )
}
