import type { Metadata, Viewport } from "next"
import {
  Alexandria,
  Bricolage_Grotesque,
  IBM_Plex_Sans_Arabic,
  Instrument_Sans,
} from "next/font/google"
import { notFound } from "next/navigation"
import { getDict } from "@/content"
import { ConsentedAnalytics, CookieConsent } from "@/components/site/cookie-consent"
import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { Providers } from "@/components/site/providers"
import { dirOf, hasLocale, locales } from "@/lib/i18n"
import { businessJsonLd, pageMeta, siteUrl } from "@/lib/seo"
import "../globals.css"

// Open-licensed (SIL OFL) typefaces, downloaded at build time and served from
// this site's own domain: no visitor request goes to a font provider.
const enDisplay = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-en-display" })
const enBody = Instrument_Sans({ subsets: ["latin"], variable: "--font-en-body" })
const arDisplay = Alexandria({ subsets: ["arabic"], variable: "--font-ar-display", preload: false })
const arBody = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ar-body",
  preload: false,
})

export const generateStaticParams = () => locales.map((lang) => ({ lang }))

export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark" }

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDict(lang).meta
  return {
    ...pageMeta(lang, "", t.title, t.description),
    metadataBase: new URL(siteUrl),
    title: { default: t.title, template: `%s | ${lang === "ar" ? "أول ستار للإنتاج" : "All Star Productions"}` },
    // Paste the code from Google Search Console into GOOGLE_SITE_VERIFICATION to prove ownership.
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
  }
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDict(lang)
  const dir = dirOf(lang)

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${enDisplay.variable} ${enBody.variable} ${arDisplay.variable} ${arBody.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              businessJsonLd(lang, dict.meta.description, dict.pillars.items.flatMap((i) => i.points))
            ).replace(/</g, "\\u003c"),
          }}
        />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="btn btn-gold fixed start-4 top-4 z-[60] -translate-y-24 focus-visible:translate-y-0"
        >
          {dict.nav.skip}
        </a>
        <Providers dir={dir}>
          <Header lang={lang} t={dict.nav} />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer lang={lang} dict={dict} />
          <CookieConsent lang={lang} t={dict.cookie} />
          <ConsentedAnalytics />
        </Providers>
      </body>
    </html>
  )
}
