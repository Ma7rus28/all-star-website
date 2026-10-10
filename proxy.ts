import { NextResponse, type NextRequest } from "next/server"
import { defaultLocale, locales } from "@/lib/i18n"

// Sends requests without a language prefix to /en or /ar, based on the browser's language.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return

  const preferred = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
  const locale = preferred.find((p) => (locales as readonly string[]).includes(p)) ?? defaultLocale

  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
