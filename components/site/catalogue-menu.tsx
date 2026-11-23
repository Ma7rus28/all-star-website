"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type CatalogueLink = { href: string; label: string }

/** Clicking the item that is already in the URL changes nothing, so no `hashchange` fires: send one. */
export function refireIfSameHash(href: string) {
  const u = new URL(href, window.location.href)
  if (u.pathname === window.location.pathname && u.hash === window.location.hash) {
    window.dispatchEvent(new HashChangeEvent("hashchange"))
  }
}

/** Header dropdown: each item opens the home-page catalogue with that category selected (`#catalogue-<id>`). */
export function CatalogueMenu({ label, items }: { label: string; items: CatalogueLink[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        // Hover already opened it for a mouse, so a click must not close it again; touch and keyboard toggle.
        onClick={(e) => setOpen((o) => (e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType === "mouse" ? true : !o))}
        className={cn(
          "inline-flex min-h-11 items-center gap-1 rounded-full px-3.5 text-[0.9375rem] font-medium whitespace-nowrap transition-colors hover:bg-white/10 hover:text-foreground",
          open ? "bg-white/10 text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
        <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      {/* pt-2 keeps the hover area continuous between the button and the panel. */}
      <div className={cn("absolute start-0 top-full z-50 pt-2", open ? "block" : "hidden")}>
        <ul className="min-w-56 rounded-2xl border border-border bg-ink p-2 shadow-xl shadow-black/40">
          {items.map((i) => (
            <li key={i.href}>
              {/* A plain <a>: on the home page only the hash changes, which fires `hashchange` for the catalogue. */}
              <a
                href={i.href}
                onClick={() => {
                  setOpen(false)
                  refireIfSameHash(i.href)
                }}
                className="flex min-h-11 items-center rounded-xl px-3.5 text-[0.9375rem] font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground focus-visible:bg-white/10 focus-visible:text-foreground"
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
