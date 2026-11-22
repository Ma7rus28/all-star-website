import type { Product } from "./products"

// Riyadh landing pages, one per service line, at /{lang}/riyadh/{slug}.
// Each targets the phrases people type when looking for a supplier in Riyadh.
// Venues are named as places clients exhibit, not as past projects.

export type LandingCopy = {
  title: string
  description: string
  h1: string
  intro: string[]
  servicesTitle: string
  services: string[]
  whyTitle: string
  why: { t: string; d: string }[]
  areaTitle: string
  area: string
  faq: { q: string; a: string }[]
}

export type Landing = {
  slug: string
  pillar: "events" | "exhibitions" | "advertising"
  /** Catalogue categories linked from this page. */
  productCats: Product["cat"][]
  /** Hand-picked product slugs to list instead of whole categories (pages for one kind of event). */
  productSlugs?: string[]
  quoteService: "event" | "stand" | "advertising"
  en: LandingCopy
  ar: LandingCopy
}

const whyEn = [
  { t: "One team, start to finish", d: "Design, production, installation and the day itself are handled by the same Riyadh team, so nothing is lost between suppliers." },
  { t: "Itemised quotes in SAR", d: "Every line is priced separately and 15% VAT is shown on its own line. Nothing is added after you approve." },
  { t: "Arabic and English", d: "Briefs, artwork, signage and on-site staff in both languages." },
]
const whyAr = [
  { t: "فريق واحد من البداية للنهاية", d: "التصميم والإنتاج والتركيب ويوم الحدث نفسه يتولاها فريق واحد في الرياض، فلا يضيع شيء بين الموردين." },
  { t: "عروض أسعار مفصّلة بالريال", d: "كل بند مسعّر على حدة والضريبة 15% في بند مستقل، ولا يُضاف شيء بعد موافقتك." },
  { t: "بالعربية والإنجليزية", d: "الطلبات والتصاميم واللوحات وفريق الموقع باللغتين." },
]

export const landings: Landing[] = [
  {
    slug: "event-management-company",
    pillar: "events",
    productCats: ["display", "print", "custom", "gifts"],
    quoteService: "event",
    en: {
      title: "Event Management Company in Riyadh | All Star Productions",
      description: "Event management company in Riyadh: corporate events, conferences, product launches, gala dinners and National Day activations, with stage, AV and branding.",
      h1: "Event management company in Riyadh",
      intro: [
        "All Star Productions plans and runs corporate and public events in Riyadh: conferences and forums, product launches and openings, gala dinners, award nights and National Day and Founding Day activations.",
        "We bring the stage, lighting, sound, LED screens, branding and print, registration and ushers together under one team, so you deal with one supplier and one itemised quote.",
      ],
      servicesTitle: "Event management services in Riyadh",
      services: [
        "Conference, forum and seminar production",
        "Product launches, openings and brand activations",
        "Gala dinners, award ceremonies and private occasions",
        "National Day and Founding Day events",
        "Stage, truss, lighting, sound and LED screens",
        "Backdrops, media walls, signage and event print",
        "Registration desks, ushers, badges and crowd flow",
        "Photo and video coverage",
      ],
      whyTitle: "Why work with us",
      why: whyEn,
      areaTitle: "Where we work",
      area: "We set up events in hotels, halls, malls and outdoor venues across Riyadh, including Olaya, King Abdullah Financial District (KAFD), Al Malqa, Hittin and Diriyah, and travel to other Saudi cities on request.",
      faq: [
        { q: "What kinds of events do you manage in Riyadh?", a: "Corporate conferences and forums, product launches, openings, gala dinners, award ceremonies, mall activations and National Day or Founding Day events, for audiences from a meeting room to a full hall." },
        { q: "Can you handle the stage, sound and screens as well as the branding?", a: "Yes. Staging, lighting, sound, LED screens, backdrops, signage and printed material can all be in one quote, so one team is responsible for how the event looks and runs." },
        { q: "How do I get a price for an event in Riyadh?", a: "Send the quote form with the date, venue, expected guests and what you need. We reply with questions if anything is unclear, then send an itemised quote in SAR with VAT shown separately." },
        { q: "Do you work outside Riyadh?", a: "Yes. Tell us the city in the form; transport and accommodation for events outside Riyadh appear as separate lines in the quote." },
        { q: "What makes All Star Productions different from other event management companies in Riyadh?", a: "We design, build and run the event with our own Riyadh team, make the branding, print and signage ourselves, and quote every item separately in SAR, so one company is responsible from the first 3D visual to the last guest leaving." },
      ],
    },
    ar: {
      title: "شركة تنظيم فعاليات في الرياض | أول ستار للإنتاج",
      description: "شركة تنظيم فعاليات في الرياض لفعاليات الشركات والمؤتمرات وحفلات التدشين والعشاء واليوم الوطني. مسرح وصوت وشاشات وهوية وفريق موقع مع عروض أسعار مفصّلة.",
      h1: "شركة تنظيم فعاليات في الرياض",
      intro: [
        "تخطّط أول ستار للإنتاج لفعاليات الشركات والفعاليات العامة في الرياض وتديرها: المؤتمرات والمنتديات، وحفلات التدشين والافتتاح، وحفلات العشاء وتوزيع الجوائز، وفعاليات اليوم الوطني ويوم التأسيس.",
        "نجمع المسرح والإضاءة والصوت وشاشات LED والهوية والمطبوعات والتسجيل والمنظّمين تحت فريق واحد، فتتعامل مع مورّد واحد وعرض سعر واحد مفصّل.",
      ],
      servicesTitle: "خدمات تنظيم الفعاليات في الرياض",
      services: [
        "تنظيم المؤتمرات والمنتديات والندوات",
        "حفلات التدشين والافتتاح والحملات الميدانية",
        "حفلات العشاء وتوزيع الجوائز والمناسبات الخاصة",
        "فعاليات اليوم الوطني ويوم التأسيس",
        "المسرح والهياكل والإضاءة والصوت وشاشات LED",
        "الخلفيات والجدران الإعلامية واللوحات ومطبوعات الفعالية",
        "مكاتب التسجيل والمنظّمون والبطاقات وتنظيم الحشود",
        "التصوير الفوتوغرافي والفيديو",
      ],
      whyTitle: "لماذا نحن",
      why: whyAr,
      areaTitle: "أين نعمل",
      area: "نجهّز الفعاليات في الفنادق والقاعات والمولات والمواقع الخارجية في أنحاء الرياض، ومنها العليا ومركز الملك عبدالله المالي والملقا وحطين والدرعية، وننتقل إلى مدن المملكة الأخرى عند الطلب.",
      faq: [
        { q: "ما أنواع الفعاليات التي تنظّمونها في الرياض؟", a: "مؤتمرات ومنتديات الشركات، وحفلات التدشين والافتتاح، وحفلات العشاء وتوزيع الجوائز، والحملات في المولات، وفعاليات اليوم الوطني ويوم التأسيس، من قاعة اجتماعات إلى قاعة كاملة." },
        { q: "هل تتولون المسرح والصوت والشاشات إلى جانب الهوية؟", a: "نعم. المسرح والإضاءة والصوت وشاشات LED والخلفيات واللوحات والمطبوعات يمكن أن تكون في عرض سعر واحد، فيكون فريق واحد مسؤولاً عن شكل الفعالية وسيرها." },
        { q: "كيف أحصل على سعر لفعالية في الرياض؟", a: "أرسل نموذج عرض السعر مع التاريخ والموقع وعدد الضيوف المتوقع وما تحتاجه. نعود إليك بأسئلة إن لزم، ثم نرسل عرض سعر مفصّلاً بالريال مع بيان الضريبة منفصلة." },
        { q: "هل تعملون خارج الرياض؟", a: "نعم. اذكر المدينة في النموذج، وتظهر تكاليف النقل والإقامة للفعاليات خارج الرياض في بنود مستقلة في العرض." },
        { q: "ما الذي يميّز أول ستار للإنتاج عن شركات تنظيم الفعاليات الأخرى في الرياض؟", a: "نصمّم الفعالية وننفّذها وندير يومها بفريقنا في الرياض، ونصنع الهوية والمطبوعات واللوحات بأنفسنا، ونسعّر كل بند على حدة بالريال، فتكون شركة واحدة مسؤولة من أول تصور ثلاثي الأبعاد حتى مغادرة آخر ضيف." },
      ],
    },
  },
  {
    slug: "exhibition-stand-builders",
    pillar: "exhibitions",
    productCats: ["display", "print", "fitout"],
    quoteService: "stand",
    en: {
      title: "Exhibition Planner & Stand Builders in Riyadh",
      description: "Exhibition planner and stand builders in Riyadh: custom stand design with 3D visuals, fabrication, graphics, lighting, installation and dismantling.",
      h1: "Exhibition stand design and build in Riyadh",
      intro: [
        "We design, build, install and dismantle exhibition stands for companies showing at trade fairs and conferences in Riyadh, from shell-scheme upgrades to custom double-deck stands and country pavilions.",
        "You get 3D visuals to approve before anything is built, then fabrication, graphics, lighting and AV, and a team on site for build-up and breakdown.",
      ],
      servicesTitle: "Exhibition services in Riyadh",
      services: [
        "Custom stand design with 3D visuals",
        "Fabrication, joinery, finishing and flooring",
        "Shell-scheme upgrades and modular stands",
        "Country, group and sponsor pavilions",
        "Printed graphics, light boxes and LED walls",
        "Furniture, counters and storage",
        "Build-up, on-site support and dismantling",
        "Storage between shows",
      ],
      whyTitle: "Why work with us",
      why: whyEn,
      areaTitle: "Where we build",
      area: "Planning a show at the Riyadh Front Exhibition & Conference Center, the Riyadh International Convention & Exhibition Center or a hotel ballroom? Tell us the venue, hall and stand number and we will work to the organiser's rules and build-up times.",
      faq: [
        { q: "Are you an exhibition planner or a stand builder?", a: "Both. Most of our exhibition work is stand design and build: we plan the layout, graphics, deadlines and build-up with you, then design, build, install and dismantle the stand. Country and group pavilions are planned the same way. We also organise complete exhibitions; send us the brief and we will scope it with you." },
        { q: "Do you design the stand or only build it?", a: "Both. We can design the stand from your brief with 3D visuals, or build a design you already have." },
        { q: "What size of stand can you build?", a: "From small shell-scheme upgrades to large custom and double-deck space-only stands and pavilions. Send the stand size and the show rules and we will confirm what is possible." },
        { q: "Do you handle organiser approvals and build-up?", a: "We prepare the drawings organisers usually ask for and manage build-up and dismantling on site. Tell us the show so we can check its deadlines and rules." },
        { q: "How do I get a quote for an exhibition stand in Riyadh?", a: "Send the quote form with the show name, dates, stand size and what you want on the stand. You receive an itemised quote in SAR with VAT shown separately." },
      ],
    },
    ar: {
      title: "تنظيم معارض وتصميم وتنفيذ أجنحة المعارض في الرياض",
      description: "تنظيم معارض وتصميم وتنفيذ أجنحة المعارض في الرياض: تصميم خاص بمجسمات ثلاثية الأبعاد، تصنيع، جرافيك، إضاءة، تركيب وفكّ للمعارض التجارية والأجنحة الوطنية.",
      h1: "تصميم وتنفيذ أجنحة المعارض في الرياض",
      intro: [
        "نصمّم أجنحة المعارض ونصنّعها ونركّبها ونفكّها للشركات المشاركة في المعارض التجارية والمؤتمرات في الرياض، من تطوير الأجنحة الجاهزة إلى الأجنحة الخاصة بطابقين والأجنحة الوطنية.",
        "تستلم مجسمات ثلاثية الأبعاد لاعتمادها قبل البدء، ثم التصنيع والجرافيك والإضاءة والأنظمة المرئية، وفريقاً في الموقع للتركيب والفكّ.",
      ],
      servicesTitle: "خدمات المعارض في الرياض",
      services: [
        "تصميم أجنحة خاصة بمجسمات ثلاثية الأبعاد",
        "التصنيع والنجارة والتشطيب والأرضيات",
        "تطوير الأجنحة الجاهزة والأجنحة المعيارية",
        "الأجنحة الوطنية والمشتركة وأجنحة الرعاة",
        "الجرافيك المطبوع والصناديق المضيئة وشاشات LED",
        "الأثاث والكاونترات والتخزين",
        "التركيب والدعم في الموقع والفكّ",
        "التخزين بين المعارض",
      ],
      whyTitle: "لماذا نحن",
      why: whyAr,
      areaTitle: "أين ننفّذ",
      area: "تشارك في معرض بمركز الرياض للمعارض والمؤتمرات (واجهة الرياض) أو مركز الرياض الدولي للمؤتمرات والمعارض أو قاعة فندق؟ أخبرنا بالموقع والقاعة ورقم الجناح، ونعمل وفق اشتراطات المنظّم ومواعيد التركيب.",
      faq: [
        { q: "هل تتولون تنظيم المعارض أم تنفيذ الأجنحة فقط؟", a: "الاثنان. معظم أعمالنا في المعارض تصميم الأجنحة وتنفيذها: نخطّط معك لمخطط الجناح والجرافيك والمواعيد والتركيب، ثم نصمّم الجناح وننفّذه ونركّبه ونفكّه، والأجنحة الوطنية والمشتركة تُنظَّم بالطريقة نفسها. وننظّم كذلك معارض كاملة؛ أرسل لنا التفاصيل لنحدّد النطاق معك." },
        { q: "هل تصمّمون الجناح أم تنفّذونه فقط؟", a: "الاثنان. نصمّم الجناح من طلبك بمجسمات ثلاثية الأبعاد، أو ننفّذ تصميماً جاهزاً لديك." },
        { q: "ما حجم الأجنحة التي تنفّذونها؟", a: "من تطوير الأجنحة الجاهزة الصغيرة إلى الأجنحة الخاصة الكبيرة والأجنحة بطابقين والأجنحة الوطنية. أرسل مساحة الجناح واشتراطات المعرض ونؤكد لك الممكن." },
        { q: "هل تتولون موافقات المنظّم والتركيب؟", a: "نجهّز المخططات التي يطلبها المنظّمون عادة، وندير التركيب والفكّ في الموقع. أخبرنا باسم المعرض لنراجع مواعيده واشتراطاته." },
        { q: "كيف أحصل على عرض سعر لجناح معرض في الرياض؟", a: "أرسل نموذج عرض السعر مع اسم المعرض وتواريخه ومساحة الجناح وما تريده فيه. تستلم عرض سعر مفصّلاً بالريال مع بيان الضريبة منفصلة." },
      ],
    },
  },
  {
    slug: "advertising-signage-printing",
    pillar: "advertising",
    productCats: ["signage", "outdoor", "print", "services"],
    quoteService: "advertising",
    en: {
      title: "Advertising Agency & Signage Company in Riyadh",
      description: "Advertising agency and signage company in Riyadh: shop signs, 3D LED letters, light boxes, banners, stickers, vehicle wraps and building wraps, installed.",
      h1: "Advertising, signage and printing in Riyadh",
      intro: [
        "All Star Productions is an advertising agency and signage company in Riyadh. We produce and install the advertising that puts a brand on the city's streets: shop-front signs and 3D LED letters, light boxes, large-format banners, building and hoarding wraps, vehicle wraps and flags.",
        "Artwork, printing, fabrication and installation are handled by one team, and our installers fit signs and graphics on site across the city.",
      ],
      servicesTitle: "Advertising services in Riyadh",
      services: [
        "Shop-front signs and 3D LED letters",
        "Light boxes, hanging signs and LED neon",
        "Large-format banner and backdrop printing",
        "Building wraps, hoardings and window graphics",
        "Vehicle wrapping and fleet branding",
        "Flags, pole banners and National Day branding",
        "Wayfinding and safety signage",
        "Business stationery, stickers and labels",
      ],
      whyTitle: "Why work with us",
      why: whyEn,
      areaTitle: "Where we install",
      area: "We survey, deliver and install across Riyadh, from shop fronts on King Fahd Road and Tahlia Street to malls, offices, compounds and construction sites, and ship printed work to other Saudi cities.",
      faq: [
        { q: "Do you install signs, or only make them?", a: "Both. We survey the site, fabricate the sign and install it, including wiring for illuminated signs." },
        { q: "Can you make signs in Arabic and English?", a: "Yes. Signs, letters and graphics can be Arabic, English or bilingual, set in your brand typeface." },
        { q: "Do I need a permit for a shop sign in Riyadh?", a: "Exterior signs in Riyadh generally need municipal approval. We supply the drawings and specifications the application needs; tell us the location and we will advise on the next step." },
        { q: "How do I get a price for signage or printing?", a: "Send the quote form with the size, quantity, location and date. You receive an itemised quote in SAR with VAT shown separately." },
      ],
    },
    ar: {
      title: "شركة دعاية وإعلان ولوحات وطباعة في الرياض",
      description: "شركة دعاية وإعلان ولوحات في الرياض: لوحات محلات وحروف بارزة مضيئة ولايت بوكس وطباعة بنرات وتغليف سيارات وأعلام وتغليف مباني مع الإنتاج والتركيب.",
      h1: "دعاية وإعلان ولوحات وطباعة في الرياض",
      intro: [
        "ننتج ونركّب الإعلانات التي تضع علامتك في شوارع الرياض: لوحات واجهات المحلات والحروف البارزة المضيئة، والصناديق المضيئة، والبنرات بالمقاسات الكبيرة، وتغليف المباني وأسوار المشاريع، وتغليف السيارات، والأعلام.",
        "التصميم والطباعة والتصنيع والتركيب يتولاها فريق واحد، ويركّب فنيّونا اللوحات والملصقات في الموقع في أنحاء المدينة.",
      ],
      servicesTitle: "خدمات الدعاية والإعلان في الرياض",
      services: [
        "لوحات محلات وواجهات وحروف بارزة مضيئة",
        "الصناديق المضيئة واللوحات المعلّقة ونيون LED",
        "طباعة البنرات والخلفيات بالمقاسات الكبيرة",
        "تغليف المباني وأسوار المشاريع وملصقات النوافذ",
        "تغليف السيارات وهوية الأساطيل",
        "الأعلام وبنرات الأعمدة وهوية اليوم الوطني",
        "اللوحات الإرشادية ولوحات السلامة",
        "مطبوعات الشركات والملصقات والليبل",
      ],
      whyTitle: "لماذا نحن",
      why: whyAr,
      areaTitle: "أين نركّب",
      area: "نعاين ونوصّل ونركّب في أنحاء الرياض، من واجهات المحلات في طريق الملك فهد وشارع التحلية إلى المولات والمكاتب والمجمعات ومواقع الإنشاء، ونشحن المطبوعات إلى مدن المملكة الأخرى.",
      faq: [
        { q: "هل تركّبون اللوحات أم تصنعونها فقط؟", a: "الاثنان. نعاين الموقع ونصنّع اللوحة ونركّبها، بما في ذلك التمديد الكهربائي للوحات المضيئة." },
        { q: "هل تنفّذون لوحات بالعربية والإنجليزية؟", a: "نعم. اللوحات والحروف والجرافيك بالعربية أو الإنجليزية أو باللغتين، وبخط علامتك." },
        { q: "هل أحتاج تصريحاً للوحة محل في الرياض؟", a: "اللوحات الخارجية في الرياض تحتاج عادةً إلى موافقة البلدية. نوفّر المخططات والمواصفات التي يحتاجها الطلب؛ أخبرنا بالموقع ونرشدك للخطوة التالية." },
        { q: "كيف أحصل على سعر للوحات أو الطباعة؟", a: "أرسل نموذج عرض السعر مع المقاس والكمية والموقع والتاريخ. تستلم عرض سعر مفصّلاً بالريال مع بيان الضريبة منفصلة." },
      ],
    },
  },
  {
    slug: "awards-ceremony-events",
    pillar: "events",
    productCats: [],
    productSlugs: ["stage-venue-branding", "led-screen-rental", "acrylic-fabrication", "laser-cutting-engraving", "certificates-vouchers-tickets", "invitation-greeting-cards", "backdrop-printing-media-walls", "photo-booth-setup", "entrance-arches-reception-branding", "name-badges-name-tags"],
    quoteService: "event",
    en: {
      title: "Awards Ceremony & Awards Night Events Company, Riyadh",
      description: "Awards ceremony and awards night events in Riyadh: stage and set design, lighting, sound, LED screens, trophies, certificates and branding from one team.",
      h1: "Awards ceremonies and awards nights in Riyadh",
      intro: [
        "An awards night has a few moments that matter: the walk to the stage, the winner on the screen and the photo with the trophy. We plan and build everything around those moments for companies, schools and organisations in Riyadh.",
        "One team handles the stage and set, lighting, sound and LED screens, the trophies and certificates, the photo wall and the venue branding, under one itemised quote.",
      ],
      servicesTitle: "Awards ceremony services in Riyadh",
      services: [
        "Stage and set design with 3D visuals before production",
        "Lighting, sound and LED screens for the winner reveals",
        "Acrylic and engraved trophies, plaques and awards",
        "Printed certificates and award folders",
        "Backdrops, media walls and photo spots",
        "Invitations, seating plans and table numbers",
        "Registration desks, ushers and name badges",
        "Photo and video coverage",
      ],
      whyTitle: "Why work with us",
      why: whyEn,
      areaTitle: "Where we work",
      area: "We set up awards nights in hotel ballrooms, halls and outdoor venues across Riyadh, and travel to other Saudi cities on request.",
      faq: [
        { q: "Can you make the trophies as well as run the ceremony?", a: "Yes. We make acrylic and engraved trophies and plaques and print the certificates, so the awards match the stage, the screens and the rest of the branding." },
        { q: "Do you run the winner reveals on screen?", a: "Yes. We supply the LED screens and a technician who runs the slides and videos for each category during the ceremony." },
        { q: "How do I get a price for an awards night?", a: "Send the quote form with the date, venue, number of guests and number of award categories. You receive an itemised quote in SAR with VAT shown separately." },
        { q: "Do you manage other corporate events too?", a: "Yes. We are an event management company in Riyadh for conferences, product launches, gala dinners and National Day events as well as awards nights." },
      ],
    },
    ar: {
      title: "تنظيم حفلات تكريم وتوزيع جوائز في الرياض",
      description: "تنظيم حفلات التكريم وتوزيع الجوائز في الرياض: تصميم المسرح والإضاءة والصوت وشاشات LED والدروع والشهادات والهوية من فريق واحد بعرض سعر مفصّل.",
      h1: "تنظيم حفلات التكريم وتوزيع الجوائز في الرياض",
      intro: [
        "لحفل التكريم لحظات قليلة تصنع الفرق: الصعود إلى المسرح، وظهور اسم الفائز على الشاشة، والصورة مع الدرع. نخطط لكل شيء حول هذه اللحظات وننفّذه للشركات والمدارس والجهات في الرياض.",
        "فريق واحد يتولى المسرح والديكور والإضاءة والصوت وشاشات LED والدروع والشهادات وركن التصوير وهوية القاعة، بعرض سعر واحد مفصّل.",
      ],
      servicesTitle: "خدمات حفلات التكريم في الرياض",
      services: [
        "تصميم المسرح والديكور بتصور ثلاثي الأبعاد قبل التنفيذ",
        "الإضاءة والصوت وشاشات LED لإعلان الفائزين",
        "دروع وجوائز ولوحات تكريم من الأكريليك والحفر",
        "شهادات وملفات تكريم مطبوعة",
        "خلفيات وجدران إعلامية وأركان تصوير",
        "بطاقات دعوة ومخططات جلوس وأرقام طاولات",
        "مكاتب تسجيل ومنظّمون وبطاقات أسماء",
        "التصوير الفوتوغرافي والفيديو",
      ],
      whyTitle: "لماذا نحن",
      why: whyAr,
      areaTitle: "أين نعمل",
      area: "نجهّز حفلات التكريم في قاعات الفنادق والقاعات والمواقع الخارجية في أنحاء الرياض، وننتقل إلى مدن المملكة الأخرى عند الطلب.",
      faq: [
        { q: "هل تصنعون الدروع إلى جانب تنظيم الحفل؟", a: "نعم. نصنع دروع ولوحات التكريم من الأكريليك والحفر ونطبع الشهادات، لتتناسق الجوائز مع المسرح والشاشات وباقي الهوية." },
        { q: "هل تتولون إعلان الفائزين على الشاشة؟", a: "نعم. نوفّر شاشات LED وفنياً يشغّل العروض والفيديوهات لكل فئة أثناء الحفل." },
        { q: "كيف أحصل على سعر لحفل تكريم؟", a: "أرسل نموذج عرض السعر مع التاريخ والموقع وعدد الضيوف وعدد فئات الجوائز. تستلم عرض سعر مفصّلاً بالريال مع بيان الضريبة منفصلة." },
        { q: "هل تنظّمون فعاليات الشركات الأخرى أيضاً؟", a: "نعم. نحن شركة تنظيم فعاليات في الرياض للمؤتمرات وحفلات التدشين وحفلات العشاء وفعاليات اليوم الوطني إلى جانب حفلات التكريم." },
      ],
    },
  },
  {
    slug: "gala-dinner-events",
    pillar: "events",
    productCats: [],
    productSlugs: ["stage-venue-branding", "entrance-arches-reception-branding", "led-screen-rental", "backdrop-printing-media-walls", "photo-booth-setup", "invitation-greeting-cards", "corporate-gifts", "gift-boxes-packaging", "acrylic-fabrication", "projector-av-rental"],
    quoteService: "event",
    en: {
      title: "Gala Dinner Event Company in Riyadh | All Star Productions",
      description: "Gala dinner events in Riyadh: venue styling, stage, lighting, sound, LED screens, entrance and registration, invitations and table branding from one team.",
      h1: "Gala dinner events in Riyadh",
      intro: [
        "A gala dinner is judged on the room the moment guests walk in. We style and brand the venue, build the stage, and run the lighting, sound and screens for the speeches, presentations and programme you plan, for companies and organisations in Riyadh.",
        "The invitations, the entrance, registration, table branding, guest gifts and the photo wall come from the same team and the same itemised quote.",
      ],
      servicesTitle: "Gala dinner services in Riyadh",
      services: [
        "Venue styling and branding",
        "Stage, lighting, sound and LED screens",
        "Entrance arches, welcome gates and registration",
        "Backdrops, media walls and photo booths",
        "Invitations, menus, table numbers and seating plans",
        "Branded gifts and gift boxes for guests",
        "Ushers and guest registration",
        "Photo and video coverage",
      ],
      whyTitle: "Why work with us",
      why: whyEn,
      areaTitle: "Where we work",
      area: "We set up gala dinners in hotel ballrooms, halls and outdoor venues across Riyadh, and travel to other Saudi cities on request.",
      faq: [
        { q: "What do you handle at a gala dinner?", a: "Everything guests see and hear: venue branding, the stage, lighting, sound and screens, the entrance and registration, printed invitations and table items, guest gifts and the photo wall. Tell us what else you need and we will say what we can include." },
        { q: "Can you combine a gala dinner with an awards ceremony?", a: "Yes. Many gala dinners include awards. We add the trophies, certificates and winner reveals on screen to the same plan and the same quote." },
        { q: "How do I get a price for a gala dinner?", a: "Send the quote form with the date, venue, number of guests and the programme. You receive an itemised quote in SAR with VAT shown separately." },
        { q: "Do you manage other corporate events too?", a: "Yes. We are an event management company in Riyadh for conferences, product launches, awards nights and National Day events as well as gala dinners." },
      ],
    },
    ar: {
      title: "تنظيم حفلات العشاء الرسمية في الرياض | أول ستار",
      description: "تنظيم حفلات العشاء الرسمية في الرياض: تجهيز القاعة وهويتها والمسرح والإضاءة والصوت وشاشات LED والمدخل والتسجيل والدعوات وهوية الطاولات من فريق واحد.",
      h1: "تنظيم حفلات العشاء الرسمية في الرياض",
      intro: [
        "يُحكم على حفل العشاء من لحظة دخول الضيوف إلى القاعة. نجهّز القاعة بهويتك، ونبني المسرح، ونشغّل الإضاءة والصوت والشاشات للكلمات والعروض والبرنامج الذي تخطط له، للشركات والجهات في الرياض.",
        "الدعوات والمدخل والتسجيل وهوية الطاولات وهدايا الضيوف وركن التصوير من الفريق نفسه وبعرض السعر نفسه المفصّل.",
      ],
      servicesTitle: "خدمات حفلات العشاء في الرياض",
      services: [
        "تجهيز القاعة وهويتها",
        "المسرح والإضاءة والصوت وشاشات LED",
        "أقواس المداخل وبوابات الترحيب والتسجيل",
        "خلفيات وجدران إعلامية وأركان تصوير",
        "دعوات وقوائم طعام وأرقام طاولات ومخططات جلوس",
        "هدايا وعلب هدايا بالهوية للضيوف",
        "منظّمون وتسجيل الضيوف",
        "التصوير الفوتوغرافي والفيديو",
      ],
      whyTitle: "لماذا نحن",
      why: whyAr,
      areaTitle: "أين نعمل",
      area: "نجهّز حفلات العشاء في قاعات الفنادق والقاعات والمواقع الخارجية في أنحاء الرياض، وننتقل إلى مدن المملكة الأخرى عند الطلب.",
      faq: [
        { q: "ماذا تتولون في حفل العشاء؟", a: "كل ما يراه الضيوف ويسمعونه: هوية القاعة والمسرح والإضاءة والصوت والشاشات والمدخل والتسجيل والدعوات المطبوعة وعناصر الطاولات وهدايا الضيوف وركن التصوير. أخبرنا بما تحتاجه أيضاً ونوضح لك ما يمكننا إضافته." },
        { q: "هل يمكن الجمع بين حفل العشاء وحفل التكريم؟", a: "نعم. كثير من حفلات العشاء تتضمن تكريماً، فنضيف الدروع والشهادات وإعلان الفائزين على الشاشة إلى الخطة نفسها وعرض السعر نفسه." },
        { q: "كيف أحصل على سعر لحفل عشاء؟", a: "أرسل نموذج عرض السعر مع التاريخ والموقع وعدد الضيوف والبرنامج. تستلم عرض سعر مفصّلاً بالريال مع بيان الضريبة منفصلة." },
        { q: "هل تنظّمون فعاليات الشركات الأخرى أيضاً؟", a: "نعم. نحن شركة تنظيم فعاليات في الرياض للمؤتمرات وحفلات التدشين وحفلات التكريم وفعاليات اليوم الوطني إلى جانب حفلات العشاء." },
      ],
    },
  },
]

export const getLanding = (slug: string) => landings.find((l) => l.slug === slug)
