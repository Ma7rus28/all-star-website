"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Languages } from "lucide-react"
import type { Locale } from "@/lib/i18n"

export function LangSwitch({
  lang,
  label,
  text,
}: {
  lang: Locale
  label: string
  text: string
}) {
  const pathname = usePathname()
  const other: Locale = lang === "en" ? "ar" : "en"
  const rest = pathname.replace(/^\/(en|ar)(?=\/|$)/, "")

  return (
    <Link
      href={`/${other}${rest}`}
      hrefLang={other}
      lang={other}
      aria-label={label}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold whitespace-nowrap transition-colors hover:bg-white/10"
    >
      <Languages aria-hidden="true" className="size-4" />
      {text}
    </Link>
  )
}
