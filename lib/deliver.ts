import "server-only"

type Outcome = "sent" | "dev" | "unconfigured" | "failed"

/**
 * Forwards a form submission to FORMS_WEBHOOK_URL (an email service, CRM,
 * Zapier/Make hook, etc.). Nothing is stored on this server.
 * Without the variable, development logs the payload; production reports
 * "unconfigured" so the visitor is told to contact the business directly
 * instead of believing a message was delivered.
 */
export async function deliver(
  kind: "quote" | "data-request",
  payload: Record<string, unknown>
): Promise<Outcome> {
  const url = process.env.FORMS_WEBHOOK_URL
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[forms] ${kind} (no FORMS_WEBHOOK_URL set, not delivered)`, payload)
      return "dev"
    }
    return "unconfigured"
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind, receivedAt: new Date().toISOString(), ...payload }),
      signal: AbortSignal.timeout(10_000),
    })
    return res.ok ? "sent" : "failed"
  } catch {
    return "failed"
  }
}

export const statusFor = (outcome: Outcome) =>
  outcome === "sent" || outcome === "dev" ? 200 : outcome === "unconfigured" ? 503 : 502
