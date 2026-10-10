import type { Locale } from "@/lib/i18n"

// Photos supplied by the owner from the Admark Prints catalogue (same ownership).
// `zoom` crops away the round frame those catalogue tiles were exported with.
export type Photo = { src: string; zoom?: boolean }

const p = (name: string, zoom = false): Photo => ({ src: `/images/work/${name}`, zoom })

/** Same order as `catalogue.items` in the content files; null keeps the icon tile. */
export const cataloguePhotos: (Photo | null)[] = [
  p("banner.jpg"),
  p("backdrop.jpg"),
  p("stationery.webp"),
  p("install.jpg"),
  p("corporate.jpg"),
  p("safety.jpg"),
  p("wayfinding.jpg"),
  p("neon.jpg"),
  p("lama.jpg"),
  p("cubes.jpg"),
  p("acrylic.png", true),
  p("vehicle.jpg"),
  p("coated.jpg"),
  p("flags.jpg"),
  p("gifts.png", true),
  p("lanyard.jpg"),
]

export const pillarPhotos: Record<string, { src: string; alt: Record<Locale, string>; contain?: boolean } | undefined> = {
  events: {
    src: "/images/work/event-mall.webp",
    alt: {
      en: "Brand activation in a shopping mall atrium, seen from above, with a seated audience, a stage, screens and product displays",
      ar: "فعالية ترويجية في بهو مركز تجاري من الأعلى، فيها جمهور جالس ومسرح وشاشات ومنصات لعرض المنتجات",
    },
  },
  exhibitions: {
    src: "/images/work/stand.webp",
    // Wide render on a black backdrop: show it whole instead of cropping the ends.
    contain: true,
    alt: {
      en: "Black and gold double-deck exhibition stand with a virtual reality zone, a control room screen wall and a meeting area",
      ar: "جناح معرض من طابقين باللونين الأسود والذهبي يضم منطقة للواقع الافتراضي وجدار شاشات لغرفة التحكم ومنطقة اجتماعات",
    },
  },
  advertising: {
    src: "/images/work/banner.jpg",
    alt: {
      en: "Large printed banner covering the front of a commercial building above a busy street",
      ar: "بنر مطبوع كبير يغطي واجهة مبنى تجاري فوق شارع مزدحم",
    },
  },
}
