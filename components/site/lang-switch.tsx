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
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-3.5 text-sm font-semibold whitespace-nowrap sm:px-4 transition-colors hover:bg-white/10"
    >
      <Languages aria-hidden="true" className="size-4" />
      <span className="hidden sm:inline">{text}</span>
      <span aria-hidden="true" className="sm:hidden">{other === "ar" ? "ع" : "EN"}</span>
    </Link>
  )
}
