// Single source of truth for business details shown in the footer, contact page
// and legal pages. A value in [square brackets] is treated as a placeholder
// and is shown without a link.
export const site = {
  name: "All Star Productions",
  nameAr: "أول ستار للإنتاج",
  cr: "7037719726",
  vat: "311984630800003",
  address: "Muzzamah, As Salihiya, Ar Riyadh, Saudi Arabia",
  addressAr: "الصالحية، الرياض، المملكة العربية السعودية",
  phone: "+966 55 037 5791",
  whatsapp: "+966 57 895 2076",
  email: "mahrus0murshed@gmail.com",
  privacyEmail: "mahrus0murshed@gmail.com",
  hours: "Sun–Thu, 9:00–18:00 (AST)",
  hoursAr: "الأحد – الخميس، 9:00 – 18:00",
  legalUpdated: "2026-10-10",
} as const

export const isSet = (value: string) => !value.startsWith("[")

export const telHref = (value: string) => `tel:${value.replace(/[^\d+]/g, "")}`
export const waHref = (value: string) =>
  `https://wa.me/${value.replace(/\D/g, "")}`
