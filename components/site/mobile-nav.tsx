"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import type { Dict } from "@/content"
import type { Locale } from "@/lib/i18n"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNav({
  lang,
  t,
  links,
}: {
  lang: Locale
  t: Dict["nav"]
  links: { href: string; label: string }[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={t.menu}
        className="grid size-11 place-items-center rounded-full border border-border hover:bg-white/10 xl:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </SheetTrigger>
      <SheetContent
        side={lang === "ar" ? "left" : "right"}
        showCloseButton={false}
        className="w-[88%] gap-0 border-border bg-ink p-6"
      >
        <div className="flex items-center justify-between">
          <SheetTitle className="font-heading text-lg font-bold">
            {t.primary}
          </SheetTitle>
          <SheetDescription className="sr-only">{t.primary}</SheetDescription>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.close}
            className="grid size-11 place-items-center rounded-full border border-border hover:bg-white/10"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <nav aria-label={t.primary} className="mt-8">
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center border-b border-border font-heading text-2xl font-bold hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href={`/${lang}/contact`}
          onClick={() => setOpen(false)}
          className="btn btn-gold mt-8 w-full"
        >
          {t.quote}
        </Link>
      </SheetContent>
    </Sheet>
  )
}
