import Image from "next/image"
import { Flag, Gift, Lightbulb, Printer, RectangleVertical, Shirt } from "lucide-react"
import type { Product } from "@/content/products"
import { cn } from "@/lib/utils"

export const catIcons = {
  custom: Shirt,
  print: Printer,
  signage: Lightbulb,
  display: RectangleVertical,
  outdoor: Flag,
  gifts: Gift,
} as const satisfies Record<Product["cat"], unknown>

/**
 * Fills a `relative` box with the product photo. Products without a photo of
 * our own work yet show their category icon on a dotted tile instead of a
 * stand-in picture that would misrepresent the product.
 */
export function ProductVisual({
  photo,
  cat,
  alt,
  sizes,
  hero,
  className,
  label,
  large,
}: {
  photo: Product["photo"]
  cat: Product["cat"]
  alt: string
  sizes: string
  /** Above-the-fold photo that is likely the page's largest paint: load it first. */
  hero?: boolean
  /** Classes for the photo (object-fit, zoom, hover effects). */
  className?: string
  /** Text under the icon when there is no photo (for example the category name). */
  label?: string
  large?: boolean
}) {
  if (photo) {
    return (
      <Image
        src={photo.src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        loading={hero ? "eager" : undefined}
        fetchPriority={hero ? "high" : undefined}
      />
    )
  }
  const Icon = catIcons[cat]
  return (
    <div className="dots absolute inset-0 flex flex-col items-center justify-center gap-4">
      <span
        className={cn(
          "grid place-items-center rounded-full border border-gold/40 bg-card shadow-lg shadow-black/30 transition-transform duration-500 group-hover:scale-105",
          large ? "size-32 md:size-40" : "size-20"
        )}
      >
        <Icon aria-hidden="true" strokeWidth={1.25} className={cn("text-gold", large ? "size-14 md:size-16" : "size-9")} />
      </span>
      {label && <span className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">{label}</span>}
    </div>
  )
}
