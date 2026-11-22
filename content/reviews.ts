// Real reviews from the All Star Productions Google Business Profile, checked 2026-11-22.
// Quoted in the customer's own words (shortened, never reworded); Arabic is a translation.
// Do not add reviews from people linked to the business (e.g. Admark, family members),
// and do not add AggregateRating schema: Google treats it as self-serving for a business's own reviews.
// When the count changes, update `reviewStats` and the FAQ answers in en.ts and ar.ts.

export const reviewStats = { rating: "5.0", count: 24, checked: "2026-11-22" }

export type Review = {
  name: string
  en: { service: string; text: string }
  ar: { service: string; text: string }
}

export const reviews: Review[] = [
  {
    name: "Imam H.",
    en: {
      service: "Exhibitions and events",
      text: "We had an excellent experience with their exhibition and event services. The team was professional, helpful, and well-organized throughout the process.",
    },
    ar: {
      service: "المعارض والفعاليات",
      text: "كانت تجربتنا ممتازة مع خدماتهم في المعارض والفعاليات. كان الفريق محترفاً ومتعاوناً ومنظماً طوال العمل.",
    },
  },
  {
    name: "Emon K.",
    en: {
      service: "T-shirt printing",
      text: "Excellent T-shirt printing service! The print quality is great, the colors are vibrant, and the finishing looks professional.",
    },
    ar: {
      service: "طباعة التيشيرتات",
      text: "خدمة ممتازة لطباعة التيشيرتات! جودة الطباعة رائعة والألوان زاهية والتشطيب احترافي.",
    },
  },
  {
    name: "Sumaiya S.",
    en: { service: "Exhibition booths", text: "My go to exhibitions booth builders." },
    ar: { service: "أجنحة المعارض", text: "الشركة التي أعتمد عليها دائماً لبناء أجنحة المعارض." },
  },
  {
    name: "Latifa A.",
    en: { service: "Printing", text: "I print here for all my school needs!" },
    ar: { service: "الطباعة", text: "أطبع هنا كل ما أحتاجه للمدرسة!" },
  },
]
