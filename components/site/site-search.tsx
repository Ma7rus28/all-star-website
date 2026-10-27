"use client"

import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight, Search } from "lucide-react"
import type { Dict } from "@/content"
import type { SearchEntry } from "@/lib/search"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

// Folds case, Arabic diacritics and letter variants so "اعلان" finds "إعلان".
const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[ً-ٰٟـ̀-ͯ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")

type Prepared = SearchEntry & { t: string; body: string }

function rank(items: Prepared[], query: string) {
  const words = fold(query).split(/\s+/).filter(Boolean)
  if (!words.length) return []
  return items
    .map((it) => {
      let score = 0
      for (const w of words) {
        if (it.t.includes(w)) score += it.t.startsWith(w) ? 6 : 4
        else if (it.body.includes(w)) score += 1
        else return null
      }
      if (it.kind === "service") score += 1
      return { it, score }
    })
    .filter((r): r is { it: Prepared; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.it)
}

export function SiteSearch({ t, index }: { t: Dict["search"]; index: SearchEntry[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const prepared = useMemo<Prepared[]>(
    () => index.map((e) => ({ ...e, t: fold(e.title), body: fold(`${e.snippet} ${e.terms}`) })),
    [index]
  )
  const suggested = useMemo(() => prepared.filter((e) => e.kind === "service").slice(0, 6), [prepared])
  const results = query.trim() ? rank(prepared, query) : suggested

  // "/" or Ctrl/Cmd+K opens search from anywhere except while typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea, select, [contenteditable]")
      if ((e.key === "/" && !typing) || (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    setQuery("")
    router.push(href)
  }

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => (a + 1) % results.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => (a - 1 + results.length) % results.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      go(results[Math.min(active, results.length - 1)].href)
    }
  }

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" })
  }, [active])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.open}
        title={t.shortcut}
        className="grid size-11 shrink-0 place-items-center rounded-full border border-border transition-colors hover:bg-white/10"
      >
        <Search aria-hidden="true" className="size-5" />
      </button>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v)
          if (!v) setQuery("")
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="top-[12vh] max-h-[76vh] translate-y-0 gap-0 overflow-hidden border border-border bg-card p-0 sm:max-w-2xl"
        >
          <DialogTitle className="sr-only">{t.title}</DialogTitle>
          <DialogDescription className="sr-only">{t.placeholder}</DialogDescription>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search aria-hidden="true" className="size-5 shrink-0 text-gold" />
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActive(0)
              }}
              onKeyDown={onInputKey}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls="site-search-results"
              aria-activedescendant={results.length ? `site-search-${active}` : undefined}
              className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="overflow-y-auto p-2" style={{ maxHeight: "calc(76vh - 3.5rem)" }}>
            {!query.trim() && (
              <p className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {t.suggested}
              </p>
            )}
            {query.trim() && (
              <p className="sr-only" aria-live="polite">
                {results.length} {t.results}
              </p>
            )}
            {results.length === 0 ? (
              <div className="px-3 py-8 text-center">
                <p className="font-semibold">
                  {t.empty} “{query}”
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{t.emptyHint}</p>
              </div>
            ) : (
              <ul id="site-search-results" role="listbox" ref={listRef} className="grid gap-1">
                {results.map((r, i) => (
                  <li
                    key={r.href}
                    id={`site-search-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.href)}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-xl px-3 py-3 transition-colors",
                      i === active ? "bg-gold/12" : "hover:bg-white/5"
                    )}
                  >
                    <span className="mt-0.5 shrink-0 rounded-full border border-border px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-gold uppercase">
                      {t.kinds[r.kind]}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{r.title}</span>
                      <span className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{r.snippet}</span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className={cn("mt-1 size-4 shrink-0 rtl:rotate-180", i === active ? "text-gold" : "text-transparent")}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
