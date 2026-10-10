import "server-only"

// Moyasar Invoices API: https://docs.moyasar.com/api/invoices/01-create-invoice
// The customer pays on Moyasar's hosted page, so card data never reaches this site.
const API = "https://api.moyasar.com/v1"

export const INVOICE_COOKIE = "asp_inv"

export const moyasarEnabled = () => Boolean(process.env.MOYASAR_SECRET_KEY)

const auth = () =>
  `Basic ${Buffer.from(`${process.env.MOYASAR_SECRET_KEY}:`).toString("base64")}`

export type MoyasarInvoice = {
  id: string
  status: string
  amount: number
  currency: string
  amount_format?: string
  url: string
}

export async function createInvoice(input: {
  amountHalalas: number
  description: string
  successUrl: string
  backUrl: string
}): Promise<MoyasarInvoice | null> {
  const res = await fetch(`${API}/invoices`, {
    method: "POST",
    headers: { authorization: auth(), "content-type": "application/json" },
    body: JSON.stringify({
      amount: input.amountHalalas,
      currency: "SAR",
      description: input.description,
      success_url: input.successUrl,
      back_url: input.backUrl,
    }),
    signal: AbortSignal.timeout(15_000),
  }).catch(() => null)
  if (!res?.ok) return null
  return (await res.json()) as MoyasarInvoice
}

export async function fetchInvoice(id: string): Promise<MoyasarInvoice | null> {
  const res = await fetch(`${API}/invoices/${encodeURIComponent(id)}`, {
    headers: { authorization: auth() },
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  }).catch(() => null)
  if (!res?.ok) return null
  return (await res.json()) as MoyasarInvoice
}
