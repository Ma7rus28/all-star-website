// Industry pages at /{lang}/industries/{slug}: what we make for one kind of business, linking
// to the matching product pages. Owner asked for them 2026-11-12 (seo/admark-gap.md).
// Only claim projects that exist in projects.ts.

export type IndustryCopy = {
  title: string
  description: string
  h1: string
  intro: string[]
  faq: { q: string; a: string }[]
}

export type Industry = {
  slug: string
  /** Product slugs shown on the page, most relevant first. */
  products: string[]
  en: IndustryCopy
  ar: IndustryCopy
}

export const industries: Industry[] = [
  {
    slug: "restaurants-cafes",
    products: ["3d-led-letter-signage", "halo-lit-arabic-illuminated-letters", "led-neon-signs", "acp-cladding-facades", "cups-food-packaging", "booklet-catalogue-printing", "sticker-label-printing", "a-frame-signs", "custom-wallpaper", "polo-shirts-uniforms", "landscaping", "digital-marketing"],
    en: {
      title: "Restaurant & Café Branding and Signage in Riyadh",
      description: "Restaurant and café branding in Riyadh, Saudi Arabia: shop signs, façades, menus, cups and food packaging, interiors and staff uniforms from one supplier.",
      h1: "Branding and signage for restaurants and cafés",
      intro: [
        "Opening or refreshing a restaurant or café means signs, a façade, menus, packaging, uniforms and décor, all in the same identity and all ready on the same day. We make all of it, so you deal with one team instead of six suppliers.",
        "We work for cafés, restaurants, bakeries and coffee roasters in Riyadh and across Saudi Arabia, from a single shop front to chains with many branches.",
      ],
      faq: [
        { q: "Can you do the whole shop front, from façade to sign?", a: "Yes. We clad the front in ACP, make and install the illuminated sign, and add window graphics and an A-frame for the pavement. You approve a 3D visual first." },
        { q: "Do you print cups and packaging in small quantities?", a: "Tell us the items and quantities and we will quote; the minimum quantity depends on the item and the print method." },
      ],
    },
    ar: {
      title: "هوية ولوحات المطاعم والكافيهات في الرياض",
      description: "هوية المطاعم والكافيهات في الرياض: لوحات محلات وواجهات وقوائم طعام وأكواب وتغليف أطعمة وديكور وزي موحّد للموظفين من مورد واحد في أنحاء السعودية.",
      h1: "الهوية واللوحات للمطاعم والكافيهات",
      intro: [
        "افتتاح مطعم أو كافيه أو تجديده يعني لوحات وواجهة وقوائم طعام وتغليفاً وزياً موحّداً وديكوراً، كلها بالهوية نفسها وجاهزة في اليوم نفسه. ننفّذها كلها، فتتعامل مع فريق واحد بدلاً من ستة موردين.",
        "نعمل مع الكافيهات والمطاعم والمخابز ومحامص القهوة في الرياض وأنحاء السعودية، من واجهة محل واحد إلى السلاسل متعددة الفروع.",
      ],
      faq: [
        { q: "هل تنفّذون الواجهة كاملة من الكلادينج إلى اللوحة؟", a: "نعم. نكسو الواجهة بألواح ACP، ونصنع اللوحة المضيئة ونركّبها، ونضيف ملصقات الزجاج ولوحة A-frame للرصيف. وتعتمد تصميماً ثلاثي الأبعاد أولاً." },
        { q: "هل تطبعون الأكواب والتغليف بكميات صغيرة؟", a: "أخبرنا بالمنتجات والكميات ونرسل لك عرض السعر؛ الحد الأدنى للكمية يختلف حسب المنتج وطريقة الطباعة." },
      ],
    },
  },
  {
    slug: "hospitals-clinics",
    products: ["wayfinding-safety-signage", "3d-led-letter-signage", "stainless-steel-signage", "sticker-label-printing", "glass-partitions", "custom-wallpaper", "vehicle-wrapping-fleet-branding", "polo-shirts-uniforms", "name-badges-name-tags", "booklet-catalogue-printing", "invoice-books-receipts", "road-parking-signs"],
    en: {
      title: "Hospital & Clinic Signage and Branding in Riyadh",
      description: "Hospital and clinic branding in Riyadh, Saudi Arabia: bilingual wayfinding, façade signs, glass frosting, van branding, uniforms, badges and printed forms.",
      h1: "Signage and branding for hospitals and clinics",
      intro: [
        "Patients arrive anxious and in a hurry, so a clinic has to be easy to find and easy to move around. We make façade signs, bilingual wayfinding, room and door plates, glass frosting for privacy, parking signs, branded vehicles, staff uniforms and badges, and printed forms.",
        "We work for hospitals, medical centres, dental and physiotherapy clinics, labs and pharmacies in Riyadh and across Saudi Arabia.",
      ],
      faq: [
        { q: "Can you plan the wayfinding for a whole building?", a: "Yes. We walk the building with your team, list every sign from the entrance to each room, and give you a schedule and visuals to approve before production." },
        { q: "Do you brand patient transport and service vans?", a: "Yes. We design and apply vehicle graphics on vans and minibuses, as in our Joint Clinic project." },
      ],
    },
    ar: {
      title: "لوحات وهوية المستشفيات والعيادات في الرياض",
      description: "هوية المستشفيات والعيادات في الرياض: لوحات إرشادية باللغتين ولوحات واجهات وتغشية زجاج وهوية سيارات وزي موحّد وبطاقات ونماذج مطبوعة في السعودية.",
      h1: "اللوحات والهوية للمستشفيات والعيادات",
      intro: [
        "يصل المرضى قلقين ومستعجلين، فيجب أن يكون الوصول إلى العيادة والتنقل داخلها سهلاً. نصنع لوحات الواجهات واللوحات الإرشادية باللغتين ولوحات الغرف والأبواب وتغشية الزجاج للخصوصية ولوحات المواقف، ونغلّف السيارات، ونجهّز الزي الموحّد وبطاقات الأسماء والنماذج المطبوعة.",
        "نعمل مع المستشفيات والمراكز الطبية وعيادات الأسنان والعلاج الطبيعي والمختبرات والصيدليات في الرياض وأنحاء السعودية.",
      ],
      faq: [
        { q: "هل تخططون اللوحات الإرشادية لمبنى كامل؟", a: "نعم. نتجوّل في المبنى مع فريقك، ونحصر كل لوحة من المدخل إلى كل غرفة، ونرسل لك جدولاً وتصاميم للاعتماد قبل التنفيذ." },
        { q: "هل تغلّفون سيارات نقل المرضى وسيارات الخدمة؟", a: "نعم. نصمّم ملصقات المركبات ونركّبها على الفانات والحافلات الصغيرة، كما في مشروع جوينت كلينك." },
      ],
    },
  },
  {
    slug: "schools-universities",
    products: ["wayfinding-safety-signage", "large-format-banner-printing", "backdrop-printing-media-walls", "stage-venue-branding", "certificates-vouchers-tickets", "polo-shirts-uniforms", "sports-jerseys", "booklet-catalogue-printing", "name-badges-name-tags", "custom-wallpaper", "calendars", "roll-up-pop-up-banner-stands"],
    en: {
      title: "School & University Signage and Printing in Riyadh",
      description: "School and university branding in Riyadh, Saudi Arabia: campus signs and wayfinding, graduation stages, certificates, uniforms, sports kits and printing.",
      h1: "Signage, events and printing for schools and universities",
      intro: [
        "A school needs signs on the gate and in the corridors, banners for open days, a stage for graduation, certificates, uniforms, sports kits and a steady stream of printing. We handle all of it, in time for the start of term.",
        "We work for private and international schools, nurseries, training institutes and universities in Riyadh and across Saudi Arabia.",
      ],
      faq: [
        { q: "Can you set up a graduation ceremony?", a: "Yes. We build and brand the stage and backdrop, print certificates and programmes, and supply photo walls and banners for the day." },
        { q: "Can you deliver before the new term?", a: "Send us the list early and we will agree the production schedule with you, so signs, uniforms and printing are ready before the first day." },
      ],
    },
    ar: {
      title: "لوحات ومطبوعات المدارس والجامعات في الرياض",
      description: "هوية المدارس والجامعات في الرياض: لوحات وإرشاد الحرم، ومسارح التخرج، والشهادات، والزي الموحّد، والأطقم الرياضية، والمطبوعات في أنحاء السعودية.",
      h1: "اللوحات والفعاليات والمطبوعات للمدارس والجامعات",
      intro: [
        "تحتاج المدرسة إلى لوحات على البوابة وفي الممرات، وبنرات للأيام المفتوحة، ومسرح للتخرج، وشهادات، وزي موحّد، وأطقم رياضية، ومطبوعات لا تتوقف. ننفّذها كلها قبل بداية الفصل الدراسي.",
        "نعمل مع المدارس الأهلية والعالمية ورياض الأطفال ومعاهد التدريب والجامعات في الرياض وأنحاء السعودية.",
      ],
      faq: [
        { q: "هل تجهّزون حفل التخرج؟", a: "نعم. نصنع المسرح والخلفية بالهوية، ونطبع الشهادات والبرامج، ونوفّر جدران التصوير والبنرات ليوم الحفل." },
        { q: "هل يمكن التسليم قبل بداية الفصل؟", a: "أرسل لنا القائمة مبكراً ونتفق معك على جدول التنفيذ، لتكون اللوحات والزي والمطبوعات جاهزة قبل اليوم الأول." },
      ],
    },
  },
  {
    slug: "real-estate-construction",
    products: ["building-wraps-hoarding-graphics", "unipoles-billboards", "road-parking-signs", "custom-branded-safety-sets", "large-format-banner-printing", "flags-pole-banners", "3d-design-visuals", "acp-cladding-facades", "stainless-steel-signage", "booklet-catalogue-printing", "kiosks", "vehicle-wrapping-fleet-branding"],
    en: {
      title: "Real Estate & Construction Site Branding in Riyadh",
      description: "Real estate and construction branding in Riyadh, Saudi Arabia: site hoardings, project billboards, safety signs and sets, sales-centre branding and brochures.",
      h1: "Branding for real estate and construction projects",
      intro: [
        "A project is marketed from the day the hoarding goes up. We print and install site hoardings and building wraps, build billboards and unipoles, supply safety signs and branded safety sets for the site, and fit out sales centres with signage, kiosks and brochures.",
        "We work for developers, contractors and real-estate agencies in Riyadh and across Saudi Arabia.",
      ],
      faq: [
        { q: "Can you install hoardings on a live construction site?", a: "Yes. Our team installs hoarding graphics and banners with the access equipment needed, coordinated with your site safety rules." },
        { q: "Do you make brochures and sales-centre displays for launches?", a: "Yes. We print brochures and booklets, and build kiosks, counters and signage for sales centres and launch events." },
      ],
    },
    ar: {
      title: "هوية المشاريع العقارية ومواقع الإنشاء في الرياض",
      description: "هوية المشاريع العقارية والإنشائية في الرياض: أسوار المواقع ولوحات المشاريع واليونيبول ولوحات وأطقم السلامة وتجهيز مراكز البيع والبروشورات في السعودية.",
      h1: "الهوية للمشاريع العقارية والإنشائية",
      intro: [
        "يبدأ تسويق المشروع منذ يوم تركيب السور. نطبع ونركّب أسوار المواقع وتغليف المباني، وننفّذ اللوحات الإعلانية واليونيبول، ونوفّر لوحات السلامة وأطقم السلامة بالهوية للموقع، ونجهّز مراكز البيع باللوحات والأكشاك والبروشورات.",
        "نعمل مع المطوّرين والمقاولين ومكاتب العقار في الرياض وأنحاء السعودية.",
      ],
      faq: [
        { q: "هل تركّبون الأسوار في موقع إنشاء قائم؟", a: "نعم. يركّب فريقنا جرافيك الأسوار والبنرات بمعدات الوصول اللازمة، بالتنسيق مع قواعد السلامة في موقعك." },
        { q: "هل تطبعون البروشورات وتجهّزون مراكز البيع للإطلاق؟", a: "نعم. نطبع البروشورات والكتيّبات، وننفّذ الأكشاك والكاونترات واللوحات لمراكز البيع وفعاليات الإطلاق." },
      ],
    },
  },
  {
    slug: "gyms-sports-clubs",
    products: ["3d-led-letter-signage", "led-neon-signs", "custom-wallpaper", "sticker-label-printing", "sports-jerseys", "polo-shirts-uniforms", "custom-t-shirt-printing", "flags-pole-banners", "large-format-banner-printing", "stage-venue-branding", "promotional-umbrellas", "digital-marketing"],
    en: {
      title: "Gym & Sports Club Branding in Riyadh, Saudi Arabia",
      description: "Gym and sports club branding in Riyadh, Saudi Arabia: signs, neon, wall graphics and murals, team kits, staff uniforms, banners and event branding.",
      h1: "Branding for gyms and sports clubs",
      intro: [
        "A gym sells energy, and its walls should show it. We make the outside sign and neon, motivational wall graphics and murals, mirror and glass stickers, staff uniforms and team kits, and banners and stages for tournaments and events.",
        "We work for gyms, fitness studios, academies and sports clubs in Riyadh and across Saudi Arabia.",
      ],
      faq: [
        { q: "Can you cover a whole gym wall with graphics?", a: "Yes. We measure the wall, design or adapt the artwork, print it as wallpaper or vinyl, and install it." },
        { q: "Do you make team kits with names and numbers?", a: "Yes. We make sublimated jerseys and shorts with names, numbers, crests and sponsor logos for clubs and tournaments." },
      ],
    },
    ar: {
      title: "هوية الأندية الرياضية والجيم في الرياض",
      description: "هوية الأندية الرياضية والجيم في الرياض: لوحات ونيون وجرافيك جدران وجداريات وأطقم رياضية وزي موحّد للموظفين وبنرات وتجهيز البطولات في السعودية.",
      h1: "الهوية للنوادي الرياضية والجيم",
      intro: [
        "النادي الرياضي يبيع الطاقة، ويجب أن تُظهرها جدرانه. نصنع اللوحة الخارجية والنيون، وجرافيك الجدران التحفيزي والجداريات، وملصقات المرايا والزجاج، والزي الموحّد للموظفين والأطقم الرياضية، والبنرات والمسارح للبطولات والفعاليات.",
        "نعمل مع الأندية الرياضية واستوديوهات اللياقة والأكاديميات في الرياض وأنحاء السعودية.",
      ],
      faq: [
        { q: "هل تغطّون جداراً كاملاً في النادي بالجرافيك؟", a: "نعم. نقيس الجدار، ونصمّم أو نعدّل التصميم، ونطبعه ورق جدران أو فينيل، ونركّبه." },
        { q: "هل تصنعون أطقماً رياضية بالأسماء والأرقام؟", a: "نعم. نصنع فانيلات وشورتات بالطباعة الحرارية مع الأسماء والأرقام والشعارات وشعارات الرعاة للأندية والبطولات." },
      ],
    },
  },
  {
    slug: "retail-shops-malls",
    products: ["3d-led-letter-signage", "light-box-signage", "acp-cladding-facades", "sticker-label-printing", "danglers-pos-displays", "kiosks", "promotion-counters-display-cubes", "poster-stands-posters", "a-frame-signs", "installation-removal", "signage-maintenance", "gift-boxes-packaging"],
    en: {
      title: "Retail Shop & Mall Branding in Riyadh, Saudi Arabia",
      description: "Retail branding in Riyadh, Saudi Arabia: shop signs and façades, window graphics, in-store displays, mall kiosks and promotions, installation and maintenance.",
      h1: "Branding for shops and malls",
      intro: [
        "Shoppers decide in seconds whether to walk in. We make the shop sign and façade, window graphics, in-store displays, danglers and shelf talkers, mall kiosks and promotion counters, and we install and maintain them across your branches.",
        "We work for single shops, retail chains, brands and mall operators in Riyadh and across Saudi Arabia.",
      ],
      faq: [
        { q: "Can you roll out a campaign to many branches at once?", a: "Yes. We print and pack materials by branch and install them on a schedule you agree, outside opening hours when needed." },
        { q: "Do you maintain shop signs after installation?", a: "Yes. We replace LEDs and power supplies, repair letters and light boxes, and offer maintenance plans for chains." },
      ],
    },
    ar: {
      title: "هوية المحلات والمولات في الرياض | السعودية",
      description: "هوية المحلات في الرياض: لوحات وواجهات المحلات، وملصقات النوافذ، ومواد العرض داخل المتجر، وأكشاك المولات والعروض، والتركيب والصيانة في أنحاء السعودية.",
      h1: "الهوية للمحلات والمولات",
      intro: [
        "يقرر المتسوّق خلال ثوانٍ إن كان سيدخل. نصنع لوحة المحل والواجهة وملصقات النوافذ ومواد العرض داخل المتجر والدانقلر والشلف توكر وأكشاك المولات وكاونترات العروض، ونركّبها ونصونها في جميع فروعك.",
        "نعمل مع المحلات المستقلة وسلاسل التجزئة والعلامات التجارية وإدارات المولات في الرياض وأنحاء السعودية.",
      ],
      faq: [
        { q: "هل تنفّذون حملة في فروع كثيرة في وقت واحد؟", a: "نعم. نطبع المواد ونجهّزها لكل فرع ونركّبها حسب جدول تتفق عليه معنا، وخارج ساعات العمل عند الحاجة." },
        { q: "هل تصونون لوحات المحلات بعد التركيب؟", a: "نعم. نبدّل إضاءة LED والمحوّلات، ونصلح الحروف والصناديق المضيئة، ونقدّم عقود صيانة للسلاسل." },
      ],
    },
  },
]

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug)
