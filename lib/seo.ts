import type { Metadata } from "next"
import { landings } from "@/content/landings"
import { products } from "@/content/products"
import { locales, type Locale } from "@/lib/i18n"
import { site } from "@/lib/site"

/** Public address of the live site. Set SITE_URL on the host so links in Google point to the real domain. */
// Without SITE_URL, production builds use the real domain (never the .vercel.app address,
// which would point Google at the wrong site); previews use their own URL, local dev uses localhost.
const productionUrl = "https://www.allstar-production.com"
const vercelHost = process.env.VERCEL_URL
export const siteUrl = (
  process.env.SITE_URL ??
  (process.env.VERCEL_ENV === "production"
    ? productionUrl
    : vercelHost
      ? `https://${vercelHost}`
      : process.env.NODE_ENV === "production"
        ? productionUrl
        : "http://localhost:3000")
).replace(/\/$/, "")

/** Every indexable page, without the language prefix. */
export const indexablePaths = [
  "",
  "/services",
  "/contact",
  ...landings.map((l) => `/riyadh/${l.slug}`),
  ...products.map((p) => `/products/${p.slug}`),
  "/pay",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/cookies",
  "/data-request",
]

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
    "@type": ["LocalBusiness", "ProfessionalService"],
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
      addressRegion: lang === "ar" ? "منطقة الرياض" : "Riyadh Province",
      addressCountry: "SA",
    },
    areaServed: [
      { "@type": "City", name: lang === "ar" ? "الرياض" : "Riyadh" },
      { "@type": "Country", name: lang === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia" },
    ],
    priceRange: "SAR",
    currenciesAccepted: "SAR",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: site.phone,
      email: site.email,
      areaServed: "SA",
      availableLanguage: ["Arabic", "English"],
    },
    sameAs: [`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`],
    knowsLanguage: ["en", "ar"],
    makesOffer: services.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  }
}

/** FAQ structured data, so questions can appear directly in Google results. */
export const faqJsonLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
})
