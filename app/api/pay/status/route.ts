import { NextResponse, type NextRequest } from "next/server"
import { fetchInvoice, INVOICE_COOKIE, moyasarEnabled } from "@/lib/moyasar"

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(INVOICE_COOKIE)?.value
  if (!cookie || !moyasarEnabled()) {
    return NextResponse.json({ status: "unknown" })
  }
  const [id, reference] = cookie.split("|")
  // The status always comes from Moyasar, never from the redirect URL, so it cannot be spoofed.
  const invoice = await fetchInvoice(id)
  if (!invoice) return NextResponse.json({ status: "unknown" })

  return NextResponse.json({
    status: invoice.status === "paid" ? "paid" : "pending",
    amount: invoice.amount_format ?? `${(invoice.amount / 100).toFixed(2)} ${invoice.currency}`,
    reference,
  })
}
