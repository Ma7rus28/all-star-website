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
  /**
   * Service and product pages this job is proof for, as paths after /{lang}, closest match
   * first. Those pages show the project and its card links back. Only list a page whose
   * service the job really included.
   */
  links?: string[]
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
    links: [
      "/riyadh/event-management-company",
      "/products/acrylic-fabrication",
      "/products/event-giveaways-lanyards",
      "/riyadh/advertising-signage-printing",
    ],
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
    links: ["/riyadh/event-management-company"],
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
    media: { kind: "photo", src: "/images/projects/isuzu-3d-letter-signs.jpg", width: 1600, height: 492 },
    links: ["/products/3d-led-letter-signage", "/riyadh/advertising-signage-printing"],
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
  {
    slug: "cat-idea-exhibition-stand",
    media: { kind: "photo", src: "/images/projects/cat-idea-exhibition-stand.jpg", width: 1600, height: 1200 },
    links: ["/riyadh/exhibition-stand-builders"],
    en: {
      title: "Cat Idea exhibition stand",
      summary: "A two-bay exhibition stand for Cat Idea's veterinary diets and pet supplements: purple columns and frame, black fascia headers with the logo and stand number, printed back-wall graphics for its product lines, and branded counters at the front.",
      scope: ["Purple columns and frame", "Fascia headers with logo and stand number", "Printed back-wall graphics", "Branded counters"],
      alt: "Cat Idea exhibition stand D09 with purple columns, black logo headers, product graphics on the back walls and branded counters",
    },
    ar: {
      title: "جناح كات آيديا في المعرض",
      summary: "جناح معرض من قسمين لكات آيديا للأغذية البيطرية ومكملات الحيوانات الأليفة: أعمدة وإطار باللون البنفسجي، ولوحات علوية سوداء تحمل الشعار ورقم الجناح، وجرافيك مطبوع على الجدران الخلفية لخطوط منتجاتها، وكاونترات بهوية العلامة في الواجهة.",
      scope: ["أعمدة وإطار باللون البنفسجي", "لوحات علوية بالشعار ورقم الجناح", "جرافيك مطبوع للجدران الخلفية", "كاونترات بهوية العلامة"],
      alt: "جناح كات آيديا رقم D09 بأعمدة بنفسجية ولوحات علوية سوداء بالشعار وصور المنتجات على الجدران الخلفية وكاونترات بهوية العلامة",
    },
  },
  {
    slug: "namq-cafe-tabuk",
    // A 3D design visual, not a photo of the finished front; the copy says so.
    media: { kind: "photo", src: "/images/projects/namq-cafe-tabuk.jpg", width: 1010, height: 560 },
    links: ["/riyadh/advertising-signage-printing", "/products/3d-led-letter-signage", "/industries/restaurants-cafes"],
    en: {
      title: "Namq Coffee & Roastery signage and decoration",
      location: "Tabuk, Saudi Arabia",
      summary: "Signage and decoration for the front of Namq Coffee & Roastery in Tabuk: an illuminated acrylic sign, large Styrofoam pieces (a hot-air balloon carried by a turtle, clouds, butterflies and stacked coffee cups), outdoor lighting and the design of the café front and outdoor seating area. Shown in our 3D design visual.",
      scope: ["Illuminated acrylic signage", "Styrofoam balloon, turtle, clouds, butterflies and coffee cups", "Outdoor lighting", "Café front and outdoor area design"],
      alt: "3D design visual of the Namq Coffee & Roastery front in Tabuk, with a Styrofoam hot-air balloon and turtle, clouds, butterflies, giant coffee cups and an illuminated sign above outdoor seating",
    },
    ar: {
      title: "لوحات وديكور نمق قهوة ومحمصة",
      location: "تبوك، السعودية",
      summary: "لوحات وديكور لواجهة نمق قهوة ومحمصة في تبوك: لوحة أكريليك مضيئة، ومجسمات كبيرة من الفلين (منطاد تحمله سلحفاة وغيوم وفراشات وأكواب قهوة متراصّة)، وإضاءة خارجية، وتصميم الواجهة والجلسات الخارجية. الصورة من تصميمنا ثلاثي الأبعاد.",
      scope: ["لوحة أكريليك مضيئة", "مجسمات فلين: منطاد وسلحفاة وغيوم وفراشات وأكواب قهوة", "إضاءة خارجية", "تصميم الواجهة والجلسات الخارجية"],
      alt: "تصميم ثلاثي الأبعاد لواجهة نمق قهوة ومحمصة في تبوك، مع مجسمات فلين لمنطاد وسلحفاة وغيوم وفراشات وأكواب قهوة كبيرة ولوحة مضيئة فوق الجلسات الخارجية",
    },
  },
  {
    slug: "joint-clinic-van-branding",
    media: {
      kind: "video",
      src: "/videos/joint-clinic-van-branding.mp4",
      poster: "/images/projects/joint-clinic-van-branding.jpg",
      width: 720,
      height: 1280,
      uploaded: "2026-11-12",
      durationSeconds: 53,
    },
    links: ["/products/vehicle-wrapping-fleet-branding", "/riyadh/advertising-signage-printing", "/industries/hospitals-clinics"],
    en: {
      title: "Joint Clinic van branding",
      summary: "Vehicle branding for Joint Clinic on a Hyundai Staria van: a rear-window graphic with the logo, QR code, phone number and social accounts, and vinyl graphics on both sides with the logo, the clinic's services, its phone number and flowing line artwork, applied by our team.",
      scope: ["Rear-window graphic with logo and QR code", "Side vinyl graphics with logo and phone number", "Line artwork across the body", "Application on the vehicle"],
    },
    ar: {
      title: "هوية سيارة جوينت كلينك",
      summary: "هوية مركبة لجوينت كلينك على فان هيونداي ستاريا: ملصق للزجاج الخلفي بالشعار ورمز QR ورقم الهاتف وحسابات التواصل، وملصقات فينيل على الجانبين بالشعار وخدمات العيادة ورقم الهاتف وخطوط انسيابية، ركّبها فريقنا.",
      scope: ["ملصق الزجاج الخلفي بالشعار ورمز QR", "ملصقات فينيل جانبية بالشعار ورقم الهاتف", "خطوط انسيابية على هيكل السيارة", "التركيب على المركبة"],
    },
  },
]

/** Projects to show on a service or product page, given its path after /{lang}; closest match first. */
export function projectsFor(path: string) {
  const rank = (p: Project) => p.links?.indexOf(path) ?? -1
  return projects.filter((p) => rank(p) >= 0).sort((a, b) => rank(a) - rank(b))
}

/** Very wide photos are shown at their own shape, not cropped to the usual frame. */
export const isPanoramic = (m: ProjectMedia) => m.width / m.height >= 2.4
