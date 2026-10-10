import { deliver, statusFor } from "@/lib/deliver"
import { parseQuote } from "@/lib/validate"

export async function POST(request: Request) {
  const raw = (await request.json().catch(() => null)) as Record<string, unknown> | null
  if (!raw) return Response.json({ ok: false }, { status: 400 })

  // Honeypot: bots fill the hidden field. Answer OK without delivering anything.
  if (typeof raw.website === "string" && raw.website !== "") {
    return Response.json({ ok: true })
  }

  const { data, errors } = parseQuote(raw)
  if (errors.length) return Response.json({ ok: false, errors }, { status: 422 })

  const outcome = await deliver("quote", data)
  const status = statusFor(outcome)
  return Response.json({ ok: status === 200 }, { status })
}
