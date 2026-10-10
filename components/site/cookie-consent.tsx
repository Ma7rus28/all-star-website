"use client"

import Link from "next/link"
import { useEffect, useState, useSyncExternalStore } from "react"
import type { Dict } from "@/content"
import type { Locale } from "@/lib/i18n"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

const KEY = "asp-consent"
const OPEN_EVENT = "asp:cookie-settings"
const CHANGE_EVENT = "asp:consent-change"

type Consent = { analytics: boolean; ts: string }

const subscribe = (cb: () => void) => {
  window.addEventListener(CHANGE_EVENT, cb)
  window.addEventListener("storage", cb)
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb)
    window.removeEventListener("storage", cb)
  }
}

const read = () => {
  try {
    return window.localStorage.getItem(KEY)
  } catch {
    return null
  }
}

const write = (analytics: boolean) => {
  const value: Consent = { analytics, ts: new Date().toISOString() }
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/** True only when the visitor has explicitly opted in to analytics. */
export const hasAnalyticsConsent = () => {
  try {
    return (JSON.parse(read() ?? "{}") as Partial<Consent>).analytics === true
  } catch {
    return false
  }
}

export function CookieSettingsButton({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      {label}
    </button>
  )
}

export function CookieConsent({ lang, t }: { lang: Locale; t: Dict["cookie"] }) {
  // "ssr" keeps the banner out of the server HTML so it never flashes for returning visitors.
  const stored = useSyncExternalStore(subscribe, read, () => "ssr")
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const open = () => {
      setAnalytics(hasAnalyticsConsent())
      setPrefsOpen(true)
    }
    window.addEventListener(OPEN_EVENT, open)
    return () => window.removeEventListener(OPEN_EVENT, open)
  }, [])

  const choose = (value: boolean) => {
    write(value)
    setPrefsOpen(false)
  }

  return (
    <>
      {stored === null && !prefsOpen && (
        <section
          aria-label={t.title}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-black/60 md:p-6"
        >
          <h2 className="font-heading text-lg font-bold">{t.title}</h2>
          <p className="mt-2 text-[0.9375rem] text-muted-foreground">
            {t.body}{" "}
            <Link
              href={`/${lang}/cookies`}
              className="text-gold underline underline-offset-4"
            >
              {t.policy}
            </Link>
          </p>
          {/* Accept and reject carry the same visual weight on purpose. */}
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <button type="button" className="btn btn-line" onClick={() => choose(false)}>
              {t.reject}
            </button>
            <button type="button" className="btn btn-line" onClick={() => choose(true)}>
              {t.accept}
            </button>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                setAnalytics(false)
                setPrefsOpen(true)
              }}
            >
              {t.manage}
            </button>
          </div>
        </section>
      )}

      <Dialog open={prefsOpen} onOpenChange={setPrefsOpen}>
        <DialogContent showCloseButton={false} className="border-border bg-card sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">{t.prefsTitle}</DialogTitle>
            <DialogDescription className="text-[0.9375rem]">
              {t.prefsDesc}
            </DialogDescription>
          </DialogHeader>
          <ul className="grid gap-3">
            <li className="flex items-start justify-between gap-4 rounded-xl border border-border p-4">
              <div>
                <p className="font-semibold">{t.necessary}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.necessaryDesc}</p>
              </div>
              <span className="shrink-0 text-sm font-medium text-gold">{t.alwaysOn}</span>
            </li>
            <li className="flex items-start justify-between gap-4 rounded-xl border border-border p-4">
              <div>
                <label htmlFor="consent-analytics" className="font-semibold">
                  {t.analytics}
                </label>
                <p id="consent-analytics-desc" className="mt-1 text-sm text-muted-foreground">
                  {t.analyticsDesc}
                </p>
              </div>
              <Switch
                id="consent-analytics"
                aria-describedby="consent-analytics-desc"
                checked={analytics}
                onCheckedChange={setAnalytics}
              />
            </li>
          </ul>
          <div className="grid gap-2 sm:grid-cols-2">
            <button type="button" className="btn btn-line" onClick={() => choose(false)}>
              {t.reject}
            </button>
            <button type="button" className="btn btn-gold" onClick={() => choose(analytics)}>
              {t.save}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
