import { deliver, statusFor } from "@/lib/deliver"
import { parseDataRequest } from "@/lib/validate"

export async function POST(request: Request) {
  const raw = (await request.json().catch(() => null)) as Record<string, unknown> | null
  if (!raw) return Response.json({ ok: false }, { status: 400 })

  if (typeof raw.website === "string" && raw.website !== "") {
    return Response.json({ ok: true })
  }

  const { data, errors } = parseDataRequest(raw)
  if (errors.length) return Response.json({ ok: false, errors }, { status: 422 })

  const outcome = await deliver("data-request", data)
  const status = statusFor(outcome)
  return Response.json({ ok: status === 200 }, { status })
}
