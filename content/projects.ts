// Project showcase entries, newest first. Each has its own card on /{lang}/projects.
// Only describe what the project really involved; ask the owner before adding details.

export type ProjectCopy = {
  title: string
  location: string
  summary: string
  scope: string[]
}

export type Project = {
  slug: string
  /** ISO date the video was published, for Google's video results. */
  uploaded: string
  durationSeconds: number
  video: string
  poster: string
  en: ProjectCopy
  ar: ProjectCopy
}

export const projects: Project[] = [
  {
    slug: "riyadh-season-concert",
    uploaded: "2026-10-24",
    durationSeconds: 33,
    video: "/videos/riyadh-season-concert.mp4",
    poster: "/images/projects/riyadh-season-concert.jpg",
    en: {
      title: "Riyadh Season concert",
      location: "Riyadh",
      summary: "Event production for a Riyadh Season concert night: guest arrival and registration, wristband entry, branded lounge and hospitality areas, and venue branding through to the main stage.",
      scope: ["Guest registration and entry", "Wristbands and access control", "Branded lounge and bar areas", "Venue and stage branding"],
    },
    ar: {
      title: "حفل موسم الرياض",
      location: "الرياض",
      summary: "إنتاج فعالية ليلة حفل ضمن موسم الرياض: استقبال الضيوف وتسجيلهم، والدخول بالأساور، وصالات الضيافة التي تحمل الهوية، وهوية الموقع وصولاً إلى المسرح الرئيسي.",
      scope: ["تسجيل الضيوف والدخول", "الأساور وتنظيم الدخول", "صالات وأركان ضيافة بالهوية", "هوية الموقع والمسرح"],
    },
  },
]
