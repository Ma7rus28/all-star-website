// Real reviews from the All Star Productions Google Business Profile, checked 2026-11-22.
// Shown without reviewer names. Quoted in the customer's own words (shortened, never reworded); Arabic is a translation, except the review written in Arabic (English is Google's translation).
// Admark Creative and Mahbub Murshed are included because the owner confirmed (2026-11-22)
// they ordered printing from All Star as clients. Do not add AggregateRating schema: Google treats it as self-serving for a business's own reviews.
// When the count changes, update `reviewStats` and the FAQ answers in en.ts and ar.ts.

export const reviewStats = { rating: "5.0", count: 24, checked: "2026-11-22" }

export type Review = {
  en: { service: string; text: string }
  ar: { service: string; text: string }
}

export const reviews: Review[] = [
  {
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
    en: { service: "Exhibition booths", text: "My go to exhibitions booth builders." },
    ar: { service: "أجنحة المعارض", text: "الشركة التي أعتمد عليها دائماً لبناء أجنحة المعارض." },
  },
  {
    en: { service: "Printing", text: "I print here for all my school needs!" },
    ar: { service: "الطباعة", text: "أطبع هنا كل ما أحتاجه للمدرسة!" },
  },
  {
    en: { service: "Printing for a business", text: "They are the company I rely on for printing services for my business. I highly recommend them." },
    ar: { service: "طباعة لشركة", text: "هي الجهة التي أعتمد عليها في خدمات الطباعة لشركتي. أوصي بها بشدة." },
  },
  {
    en: { service: "Printing", text: "Very Good People" },
    ar: { service: "الطباعة", text: "أشخاص طيبون جداً." },
  },
]
