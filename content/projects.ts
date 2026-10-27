// Project showcase entries, in display order. Each has its own card on /{lang}/projects.
// Only describe what the project really involved; ask the owner before adding details.

export type ProjectCopy = {
  title: string
  /** Leave out until the owner confirms where the job was. */
  location?: string
  summary: string
  scope: string[]
  /** Describes the photo for screen readers (photo projects only). */
  alt?: string
}

export type ProjectMedia =
  | {
      kind: "video"
      src: string
      poster: string
      width: number
      height: number
      /** ISO date the video was published, for Google's video results. */
      uploaded: string
      durationSeconds: number
    }
  | { kind: "photo"; src: string; width: number; height: number }

export type Project = {
  slug: string
  media: ProjectMedia
  /** Related service or product page, as a path after /{lang}. */
  link?: string
  en: ProjectCopy
  ar: ProjectCopy
}

export const projects: Project[] = [
  {
    slug: "riyadh-season-concert",
    media: {
      kind: "video",
      src: "/videos/riyadh-season-concert.mp4",
      poster: "/images/projects/riyadh-season-concert.jpg",
      width: 720,
      height: 1280,
      uploaded: "2026-10-24",
      durationSeconds: 33,
    },
    link: "/riyadh/event-management-company",
    en: {
      title: "Riyadh Season concert",
      location: "Riyadh",
      summary: "Event production for a Riyadh Season concert night: wristband entry and access control, branded lounge and bar areas, acrylic signage and posters, and venue branding through to the main stage.",
      scope: ["Wristbands and access control", "Branded lounge and bar areas", "Venue and stage branding", "Acrylic signage", "Posters"],
    },
    ar: {
      title: "حفل موسم الرياض",
      location: "الرياض",
      summary: "إنتاج فعالية ليلة حفل ضمن موسم الرياض: الدخول بالأساور وتنظيمه، وصالات وأركان ضيافة تحمل الهوية، ولوحات أكريليك وبوسترات، وهوية الموقع وصولاً إلى المسرح الرئيسي.",
      scope: ["الأساور وتنظيم الدخول", "صالات وأركان ضيافة بالهوية", "هوية الموقع والمسرح", "لوحات أكريليك", "بوسترات"],
    },
  },
  {
    slug: "haier-product-launch",
    media: {
      kind: "video",
      src: "/videos/haier-product-launch.mp4",
      poster: "/images/projects/haier-product-launch.jpg",
      width: 1280,
      height: 720,
      uploaded: "2026-10-27",
      durationSeconds: 10,
    },
    link: "/riyadh/event-management-company",
    en: {
      title: "Haier product launch event",
      location: "Granada Mall, Riyadh",
      summary: "A product launch for Haier in the atrium of Granada Mall: a branded stage with a screen, audience seating, and display zones for TVs, air conditioners and home appliances, set in a football theme with player cut-outs and pitch-style checkered flooring.",
      scope: ["Branded stage and screen", "Audience seating", "Product display walls for TVs and air conditioners", "Branded perimeter panels and signage", "Football-themed cut-outs and flooring"],
    },
    ar: {
      title: "فعالية إطلاق منتجات هاير",
      location: "غرناطة مول، الرياض",
      summary: "فعالية إطلاق منتجات لهاير في ساحة غرناطة مول: مسرح بهوية العلامة وشاشة، ومقاعد للجمهور، وأركان لعرض الشاشات والمكيفات والأجهزة المنزلية، بطابع كرة القدم مع مجسمات اللاعبين وأرضيات بنقش الملعب.",
      scope: ["مسرح بهوية العلامة وشاشة", "منطقة جلوس للجمهور", "جدران عرض للشاشات والمكيفات", "جدران محيطة ولوحات إرشادية بالهوية", "مجسمات وأرضيات بطابع كرة القدم"],
    },
  },
  {
    slug: "isuzu-3d-letter-signs",
    media: { kind: "photo", src: "/images/projects/isuzu-3d-letter-signs.jpg", width: 1600, height: 782 },
    link: "/products/3d-led-letter-signage",
    en: {
      title: "ISUZU 3D letter signs",
      summary: "Red 3D letter signs with the ISUZU name in English and Arabic, built on white backing panels and wired for lighting, ready to go out for installation.",
      scope: ["Red 3D letters", "English and Arabic lettering", "White backing panels", "Wiring for illumination"],
      alt: "Red ISUZU 3D letter signs in English and Arabic on white panels, loaded on a truck",
    },
    ar: {
      title: "لوحات ISUZU بحروف بارزة",
      summary: "لوحات بحروف بارزة ثلاثية الأبعاد باللون الأحمر تحمل اسم ISUZU بالإنجليزية والعربية، مثبّتة على ألواح خلفية بيضاء ومجهّزة بتمديدات الإضاءة، وجاهزة للنقل والتركيب.",
      scope: ["حروف بارزة باللون الأحمر", "كتابة بالإنجليزية والعربية", "ألواح خلفية بيضاء", "تمديدات الإضاءة"],
      alt: "لوحات ISUZU بحروف بارزة حمراء بالإنجليزية والعربية على ألواح بيضاء، محمّلة على شاحنة",
    },
  },
]
