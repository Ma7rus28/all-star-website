import type { Metadata } from "next"
import { locales, type Locale } from "@/lib/i18n"
import { site } from "@/lib/site"

/** Public address of the live site. Set SITE_URL on the host so links in Google point to the real domain. */
// On Vercel the production domain is picked up automatically when SITE_URL is not set.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL
export const siteUrl = (
  process.env.SITE_URL ?? (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
).replace(/\/$/, "")

/** Every indexable page, without the language prefix. */
export const indexablePaths = ["", "/services", "/contact", "/pay", "/privacy", "/terms", "/refund-policy", "/cookies", "/data-request"]

const languageLinks = (path: string) => ({
  ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
  "x-default": `/en${path}`,
})

/** Title, description, canonical address and language alternates for one page. */
export function pageMeta(lang: Locale, path: string, title: string, description: string): Metadata {
  const brand = lang === "ar" ? site.nameAr : site.name
  return {
    title,
    description,
    alternates: { canonical: `/${lang}${path}`, languages: languageLinks(path) },
    openGraph: {
      title,
      description,
      url: `/${lang}${path}`,
      siteName: brand,
      locale: lang === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  }
}

/** Structured data that tells Google who the business is, where it is and what it offers. */
export function businessJsonLd(lang: Locale, description: string, services: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: lang === "ar" ? site.nameAr : site.name,
    alternateName: lang === "ar" ? site.name : site.nameAr,
    description,
    url: `${siteUrl}/${lang}`,
    logo: `${siteUrl}/logo-mark.svg`,
    image: `${siteUrl}/images/work/stand.webp`,
    telephone: site.phone,
    email: site.email,
    vatID: site.vat,
    address: {
      "@type": "PostalAddress",
      streetAddress: lang === "ar" ? site.addressAr : site.address,
      addressLocality: lang === "ar" ? "الرياض" : "Riyadh",
      addressCountry: "SA",
    },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    openingHours: "Su-Th 09:00-18:00",
    knowsLanguage: ["en", "ar"],
    makesOffer: services.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  }
}
