import { NextResponse } from "next/server"
import { hasLocale } from "@/lib/i18n"
import { createInvoice, INVOICE_COOKIE, moyasarEnabled } from "@/lib/moyasar"
import { site } from "@/lib/site"
import { parsePay } from "@/lib/validate"

export async function POST(request: Request) {
  const raw = (await request.json().catch(() => null)) as Record<string, unknown> | null
  if (!raw) return NextResponse.json({ ok: false }, { status: 400 })

  const { data, errors } = parsePay(raw)
  if (errors.length) return NextResponse.json({ ok: false, errors }, { status: 422 })

  if (!moyasarEnabled()) {
    return NextResponse.json({ ok: false, code: "not_enabled" }, { status: 503 })
  }

  const lang = typeof raw.lang === "string" && hasLocale(raw.lang) ? raw.lang : "en"
  const origin = process.env.SITE_URL ?? new URL(request.url).origin

  const invoice = await createInvoice({
    amountHalalas: Math.round(data.amount * 100),
    description: `${site.name} — ${data.reference}`,
    successUrl: `${origin}/${lang}/pay/result`,
    backUrl: `${origin}/${lang}/pay`,
  })
  if (!invoice) return NextResponse.json({ ok: false, code: "gateway" }, { status: 502 })

  const res = NextResponse.json({ ok: true, url: invoice.url })
  // Strictly necessary cookie: lets the result page look up this payment. Listed in the Cookie Policy.
  res.cookies.set(INVOICE_COOKIE, `${invoice.id}|${data.reference}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 2,
    path: "/",
  })
  return res
}
