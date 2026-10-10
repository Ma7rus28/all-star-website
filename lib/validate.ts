// Shared by the client forms and the API routes so both apply the same rules.
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const isEmail = (v: unknown): v is string =>
  typeof v === "string" && v.length <= 254 && emailRe.test(v)

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : ""

export const services = ["event", "stand", "advertising", "other"] as const
export const requestTypes = ["delete", "access", "correct", "unsubscribe"] as const

export type QuoteInput = ReturnType<typeof parseQuote>["data"]
export type QuoteField = "name" | "email" | "service" | "message" | "consent"

export function parseQuote(raw: Record<string, unknown>) {
  const data = {
    name: str(raw.name, 120),
    company: str(raw.company, 160),
    email: str(raw.email, 254),
    phone: str(raw.phone, 40),
    service: str(raw.service, 20),
    date: str(raw.date, 10),
    city: str(raw.city, 80),
    needs: str(raw.needs, 400),
    message: str(raw.message, 4000),
    consent: raw.consent === true,
    marketing: raw.marketing === true,
  }
  const errors: QuoteField[] = []
  if (data.name.length < 2) errors.push("name")
  if (!isEmail(data.email)) errors.push("email")
  if (!(services as readonly string[]).includes(data.service)) errors.push("service")
  if (data.message.length < 10) errors.push("message")
  if (!data.consent) errors.push("consent")
  return { data, errors }
}

export type DataRequestField = "type" | "email"

export function parseDataRequest(raw: Record<string, unknown>) {
  const data = {
    type: str(raw.type, 20),
    email: str(raw.email, 254),
    details: str(raw.details, 2000),
  }
  const errors: DataRequestField[] = []
  if (!(requestTypes as readonly string[]).includes(data.type)) errors.push("type")
  if (!isEmail(data.email)) errors.push("email")
  return { data, errors }
}

export type PayField = "reference" | "amount" | "agree"
export const PAY_MIN = 1
export const PAY_MAX = 500_000

export function parsePay(raw: Record<string, unknown>) {
  const amount = typeof raw.amount === "number" ? raw.amount : Number(raw.amount)
  const data = {
    reference: str(raw.reference, 40),
    amount: Math.round(amount * 100) / 100,
    agree: raw.agree === true,
  }
  const errors: PayField[] = []
  if (!/^[A-Za-z0-9][A-Za-z0-9-]{2,39}$/.test(data.reference)) errors.push("reference")
  if (!Number.isFinite(amount) || data.amount < PAY_MIN || data.amount > PAY_MAX) errors.push("amount")
  if (!data.agree) errors.push("agree")
  return { data, errors }
}
