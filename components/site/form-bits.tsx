import type { ReactNode } from "react"
import { CircleAlert, CircleCheck } from "lucide-react"
import { Label } from "@/components/ui/label"

export const selectClass =
  "field w-full rounded-lg border border-input bg-transparent px-3 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"

export function Field({
  id,
  label,
  hint,
  error,
  required,
  optionalText,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  optionalText?: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[0.9375rem] font-semibold">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-gold">
            *
          </span>
        ) : (
          optionalText && (
            <span className="font-normal text-muted-foreground">({optionalText})</span>
          )
        )}
      </Label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm font-medium text-destructive">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

export const describedBy = (id: string, hint?: string, error?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined

export function Notice({
  tone,
  children,
}: {
  tone: "success" | "error"
  children: ReactNode
}) {
  const Icon = tone === "success" ? CircleCheck : CircleAlert
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={
        tone === "success"
          ? "flex gap-3 rounded-xl border border-gold/60 bg-gold/10 p-4"
          : "flex gap-3 rounded-xl border border-destructive/60 bg-destructive/10 p-4"
      }
    >
      <Icon
        aria-hidden="true"
        className={tone === "success" ? "mt-0.5 size-5 shrink-0 text-gold" : "mt-0.5 size-5 shrink-0 text-destructive"}
      />
      <div>{children}</div>
    </div>
  )
}

export function Honeypot({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="absolute -start-[9999px] size-px overflow-hidden">
      <label>
        {label}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}
