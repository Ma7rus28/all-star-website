// Single source of truth for business details shown in the footer, contact page
// and legal pages. A value in [square brackets] is treated as a placeholder
// and is shown without a link.
export const site = {
  name: "All Star Productions",
  nameAr: "أول ستار للإنتاج",
  cr: "7037719726",
  vat: "311984630800003",
  // Matches the Google Business Profile exactly (see seo/BRIEF.md). Change both together.
  address: "As Sanabel Street, As Salhiyah, Riyadh 12662, Saudi Arabia",
  addressAr: "شارع السنابل، حي الصالحية، الرياض 12662، المملكة العربية السعودية",
  street: "As Sanabel Street, As Salhiyah",
  streetAr: "شارع السنابل، حي الصالحية",
  city: "Riyadh",
  cityAr: "الرياض",
  postalCode: "12662",
  countryCode: "SA",
  /** Google Business Profile share link. */
  googleProfile: "https://share.google/jsYogD8vO5lHHy6s2",
  phone: "+966 55 037 5791",
  whatsapp: "+966 57 895 2076",
  email: "mahrus0murshed@gmail.com",
  privacyEmail: "mahrus0murshed@gmail.com",
  hours: "Sun–Thu, 9:00–18:00 (AST)",
  hoursAr: "الأحد – الخميس، 9:00 – 18:00",
  legalUpdated: "2026-10-27",
} as const

export const isSet = (value: string) => !value.startsWith("[")

export const telHref = (value: string) => `tel:${value.replace(/[^\d+]/g, "")}`
export const waHref = (value: string) =>
  `https://wa.me/${value.replace(/\D/g, "")}`
