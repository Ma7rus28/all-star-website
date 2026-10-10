import type { LegalSlug, Locale } from "@/lib/i18n"
import { site } from "@/lib/site"

// DRAFT TEMPLATES. These policies are written around Saudi law (PDPL, the
// E-Commerce Law and VAT rules) but have not been reviewed by a lawyer.
// Have them checked and adjusted to how the business really operates before launch.

export type LegalDoc = {
  title: string
  intro: string
  sections: { h: string; p?: string[]; ul?: string[] }[]
}

const c = site.name
const cAr = site.nameAr

const en: Record<LegalSlug, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    intro: `This policy explains what personal data ${c} (“we”) collects through this website, why, and the choices you have. It is written to follow the Saudi Personal Data Protection Law (PDPL).`,
    sections: [
      {
        h: "Who is responsible for your data",
        p: [
          `The controller is ${site.name}, Commercial Registration ${site.cr}, ${site.address}. For any privacy question contact ${site.privacyEmail}.`,
        ],
      },
      {
        h: "What we collect, and why",
        ul: [
          "Quote form: your name, email, the service you need and your message; optionally your company, phone, city and project date. We use these only to reply to your enquiry and prepare a quote.",
          "Online payment: the quote or invoice reference and the amount. Card details are entered on our payment provider's page and never reach us.",
          "Data requests: your email and the request you make, so we can find your records and act on it.",
          "Cookie choice: your consent decision, stored in your browser.",
        ],
        p: ["We do not ask for information we do not need, and we do not buy personal data from third parties."],
      },
      {
        h: "Legal basis",
        p: [
          "We process enquiry data on the basis of your consent, given when you tick the box on the form. We process project, invoice and payment data to perform our contract with you and to meet legal obligations such as tax record-keeping. You can withdraw consent at any time.",
        ],
      },
      {
        h: "Marketing emails",
        p: [
          "We send marketing emails only if you opted in by ticking the separate, unticked box. Every marketing email contains an unsubscribe link, and you can also stop them from the data request page. Unsubscribing never affects your projects or quotes.",
        ],
      },
      {
        h: "Who we share data with",
        ul: [
          "Moyasar, our payment provider, to process card payments.",
          "Our website hosting and email providers, who store data on our behalf.",
          "Venues, organisers or subcontractors, only where a project you have approved requires it.",
          "Authorities, where the law requires it.",
        ],
        p: ["We do not sell personal data. If a provider stores data outside Saudi Arabia, we rely on the transfer conditions set by the PDPL."],
      },
      {
        h: "How long we keep it",
        p: [
          "Enquiries that do not become projects are deleted within 12 months. Project and invoice records are kept for as long as Saudi tax and commercial law requires, then deleted or anonymised.",
        ],
      },
      {
        h: "Your rights",
        ul: [
          "Know how your data is used.",
          "Get a copy of your data.",
          "Have inaccurate data corrected.",
          "Have your data deleted when it is no longer needed.",
          "Withdraw consent at any time.",
        ],
        p: [
          "Use the data request page or email us. We reply within 30 days. If you are not satisfied with our answer you may complain to the Saudi Data & AI Authority (SDAIA).",
        ],
      },
      {
        h: "Children",
        p: [
          "This website offers business services and is not directed at anyone under 18. We do not knowingly collect children's data. If you believe a child has sent us personal data, contact us and we will delete it. Any event that would involve collecting data about minors requires the consent of a parent or legal guardian first.",
        ],
      },
      {
        h: "Security and changes",
        p: [
          "We limit access to personal data to staff who need it and use encrypted connections on this site. If this policy changes we will update the date at the top of this page.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: `These terms apply when you use this website or order services from ${c}. A signed quote or contract for a specific project takes priority over these terms where they differ.`,
    sections: [
      { h: "About us", p: [`${site.name}, Commercial Registration ${site.cr}, VAT ${site.vat}, ${site.address}. Contact: ${site.email}, ${site.phone}.`] },
      {
        h: "Quotes and orders",
        ul: [
          "Information on this site describes our services; it is not a binding offer.",
          "A quote is valid for the period written on it. An order exists only once you approve the quote in writing and pay any deposit it specifies.",
          "Quotes are itemised in Saudi riyals and show VAT separately. We do not add charges that are not on the quote.",
        ],
      },
      {
        h: "Changes to the work",
        p: ["If you ask for changes after approval, we send a revised quote and timeline. We carry out and bill extra work only after you approve it in writing."],
      },
      {
        h: "Your responsibilities",
        ul: [
          "Give us accurate information, final artwork and approvals by the agreed dates.",
          "Make sure you own or are licensed to use any logos, images, fonts and other content you supply.",
          "Arrange venue or organiser permits unless the quote says we will.",
        ],
      },
      {
        h: "Payment",
        p: ["Payment stages are stated on your quote. You can pay by bank transfer or by card through the Pay invoice page, which uses Moyasar. Cancellations and refunds are covered by our Refund Policy."],
      },
      {
        h: "Intellectual property",
        p: ["Designs, drawings and 3D visuals we create remain ours until the related invoice is paid in full, and may not be given to another supplier to build before then. Your trademarks and content remain yours."],
      },
      {
        h: "Liability",
        p: ["We are responsible for carrying out the work with reasonable skill and care. Nothing in these terms limits rights you have under Saudi law that cannot be excluded. Beyond that, our liability for a project is limited to the amount you paid for it, and we are not liable for delays caused by events outside our reasonable control."],
      },
      {
        h: "Governing law",
        p: ["These terms are governed by the laws of the Kingdom of Saudi Arabia, and its competent courts have jurisdiction over any dispute."],
      },
    ],
  },
  "refund-policy": {
    title: "Refund & Cancellation Policy",
    intro: "Most of what we make is custom-built for one client and one date, so refunds depend on how far the work has progressed. The stages below apply unless your signed quote says otherwise.",
    sections: [
      {
        h: "Cancelling a project",
        ul: [
          "Before design or production starts: full refund of anything you have paid.",
          "After design has started but before fabrication or printing: we refund what you paid minus the design work already completed, itemised at the rates on your quote.",
          "After fabrication, printing or purchasing has started: materials, printed items and third-party bookings already committed are not refundable. Any unspent balance is refunded.",
          "After delivery or the event: no refund, except as set out under “If something is wrong”.",
        ],
      },
      {
        h: "Custom-made goods",
        p: ["Printed, branded and made-to-measure items are produced to your specification and cannot be returned or resold. They are therefore excluded from the general right to cancel that applies to standard goods bought online."],
      },
      {
        h: "If something is wrong",
        p: ["If what we deliver is defective or does not match the approved quote and design, tell us within 7 days of delivery with photos. We will repair or remake it at our cost, or refund the affected item if we cannot."],
      },
      {
        h: "If we cancel",
        p: ["If we cannot deliver a confirmed order, we refund everything you have paid for the undelivered part."],
      },
      {
        h: "How refunds are paid",
        p: ["Refunds go back to the original payment method. Card refunds are issued through Moyasar and usually reach your account within 7 to 14 working days, depending on your bank. We do not charge a fee for processing a refund."],
      },
      { h: "How to ask", p: [`Email ${site.email} with your quote or invoice reference. We confirm the refund amount in writing before it is issued.`] },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    intro: "This page lists everything this website stores in your browser. We keep it short on purpose.",
    sections: [
      {
        h: "Strictly necessary",
        ul: [
          "asp-consent (local storage): remembers your cookie choice so we do not ask on every visit. Kept until you clear it or change your choice.",
          "asp_inv (cookie): set only when you start a card payment, so we can show you the result when you return from the payment page. Deleted after 2 hours.",
        ],
        p: ["These do not track you and cannot be switched off, because the site needs them to work."],
      },
      {
        h: "Analytics (optional)",
        p: ["We may use analytics to count page visits. Analytics is off by default and loads only if you choose “Accept all” or switch it on in Cookie settings. At the moment no analytics tool is installed, so nothing is set in this category."],
      },
      {
        h: "Advertising and tracking",
        p: ["We do not use advertising cookies, tracking pixels or social media trackers. Fonts are served from our own domain, so loading a page does not contact a font provider."],
      },
      {
        h: "Third parties",
        p: ["When you choose to pay by card you leave this site for Moyasar's payment page, which sets its own cookies under its own policy."],
      },
      {
        h: "Changing your choice",
        p: ["Use the Cookie settings link in the footer at any time. Rejecting optional cookies is one click and does not limit what you can do on the site."],
      },
    ],
  },
}

const ar: Record<LegalSlug, LegalDoc> = {
  privacy: {
    title: "سياسة الخصوصية",
    intro: `توضّح هذه السياسة البيانات الشخصية التي تجمعها ${cAr} («نحن») عبر هذا الموقع، وأسباب جمعها، والخيارات المتاحة لك. وقد أُعدّت وفق نظام حماية البيانات الشخصية في المملكة العربية السعودية.`,
    sections: [
      {
        h: "الجهة المسؤولة عن بياناتك",
        p: [`جهة التحكم هي ${site.name}، سجل تجاري ${site.cr}، ${site.addressAr}. لأي استفسار يخص الخصوصية راسلنا على ${site.privacyEmail}.`],
      },
      {
        h: "ما الذي نجمعه ولماذا",
        ul: [
          "نموذج عرض السعر: الاسم والبريد الإلكتروني والخدمة المطلوبة ونص الرسالة، واختيارياً الشركة والهاتف والمدينة وتاريخ المشروع. نستخدمها فقط للرد على استفسارك وإعداد عرض السعر.",
          "الدفع الإلكتروني: رقم عرض السعر أو الفاتورة والمبلغ. بيانات البطاقة تُدخل في صفحة مزوّد الدفع ولا تصل إلينا.",
          "طلبات البيانات: بريدك الإلكتروني ونوع الطلب، لنعثر على سجلاتك وننفّذ الطلب.",
          "اختيار ملفات تعريف الارتباط: قرار موافقتك، ويُحفظ في متصفحك.",
        ],
        p: ["لا نطلب معلومات لا نحتاجها، ولا نشتري بيانات شخصية من أطراف أخرى."],
      },
      {
        h: "الأساس النظامي",
        p: ["نعالج بيانات الاستفسارات بناءً على موافقتك التي تمنحها عند تحديد المربع في النموذج. ونعالج بيانات المشاريع والفواتير والمدفوعات لتنفيذ العقد معك وللوفاء بالالتزامات النظامية مثل حفظ السجلات الضريبية. يمكنك سحب موافقتك في أي وقت."],
      },
      {
        h: "الرسائل التسويقية",
        p: ["لا نرسل رسائل تسويقية إلا إذا اشتركت بتحديد المربع المستقل غير المحدد مسبقاً. تحتوي كل رسالة تسويقية على رابط لإلغاء الاشتراك، ويمكنك إيقافها أيضاً من صفحة طلبات البيانات. إلغاء الاشتراك لا يؤثر على مشاريعك أو عروض أسعارك."],
      },
      {
        h: "مع من نشارك البيانات",
        ul: [
          "«ميسّر»، مزوّد خدمة الدفع، لمعالجة مدفوعات البطاقات.",
          "مزوّدو استضافة الموقع والبريد الإلكتروني الذين يخزّنون البيانات نيابةً عنا.",
          "المواقع أو الجهات المنظِّمة أو المقاولون من الباطن، فقط حين يتطلب ذلك مشروع وافقت عليه.",
          "الجهات الرسمية، متى أوجب النظام ذلك.",
        ],
        p: ["لا نبيع البيانات الشخصية. وإذا خزّن أحد المزوّدين البيانات خارج المملكة فإننا نلتزم بشروط النقل المنصوص عليها في نظام حماية البيانات الشخصية."],
      },
      {
        h: "مدة الاحتفاظ",
        p: ["تُحذف الاستفسارات التي لا تتحول إلى مشاريع خلال 12 شهراً. وتُحفظ سجلات المشاريع والفواتير للمدة التي تفرضها الأنظمة الضريبية والتجارية في المملكة، ثم تُحذف أو تُجعل مجهولة الهوية."],
      },
      {
        h: "حقوقك",
        ul: [
          "معرفة كيفية استخدام بياناتك.",
          "الحصول على نسخة من بياناتك.",
          "تصحيح البيانات غير الدقيقة.",
          "حذف بياناتك عند انتهاء الحاجة إليها.",
          "سحب موافقتك في أي وقت.",
        ],
        p: ["استخدم صفحة طلبات البيانات أو راسلنا بالبريد الإلكتروني. نرد خلال 30 يوماً. وإذا لم يرضِك ردّنا فلك أن تتقدم بشكوى إلى الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)."],
      },
      {
        h: "الأطفال",
        p: ["يقدّم هذا الموقع خدمات للأعمال وليس موجهاً لمن هم دون 18 عاماً، ولا نجمع بيانات الأطفال عن علم. إذا اعتقدت أن طفلاً أرسل إلينا بيانات شخصية فتواصل معنا وسنحذفها. وأي فعالية تستلزم جمع بيانات عن قاصرين تتطلب موافقة مسبقة من وليّ الأمر."],
      },
      {
        h: "الأمان والتعديلات",
        p: ["نحصر الوصول إلى البيانات الشخصية في الموظفين الذين يحتاجون إليها، ونستخدم اتصالاً مشفّراً في هذا الموقع. وإذا تغيّرت هذه السياسة فسنحدّث التاريخ في أعلى الصفحة."],
      },
    ],
  },
  terms: {
    title: "شروط الخدمة",
    intro: `تسري هذه الشروط عند استخدامك هذا الموقع أو طلبك خدمات من ${cAr}. وعند الاختلاف، تكون الأولوية لعرض السعر الموقّع أو العقد الخاص بالمشروع.`,
    sections: [
      { h: "من نحن", p: [`${site.name}، سجل تجاري ${site.cr}، الرقم الضريبي ${site.vat}، ${site.addressAr}. للتواصل: ${site.email}، ${site.phone}.`] },
      {
        h: "عروض الأسعار والطلبات",
        ul: [
          "المعلومات في هذا الموقع تصف خدماتنا ولا تُعدّ عرضاً ملزماً.",
          "عرض السعر سارٍ للمدة المذكورة فيه. ولا يقوم الطلب إلا بعد موافقتك الكتابية على العرض وسداد أي دفعة مقدّمة ينص عليها.",
          "عروض الأسعار مفصّلة بالريال السعودي وتُظهر ضريبة القيمة المضافة في بند مستقل. لا نضيف رسوماً غير مذكورة في العرض.",
        ],
      },
      { h: "تعديل نطاق العمل", p: ["إذا طلبت تعديلات بعد الموافقة نرسل عرضاً وجدولاً زمنياً معدّلين. ولا ننفّذ أي عمل إضافي ولا نفوتره إلا بعد موافقتك الكتابية."] },
      {
        h: "مسؤولياتك",
        ul: [
          "تزويدنا بمعلومات دقيقة وبالملفات النهائية والموافقات في المواعيد المتفق عليها.",
          "التأكد من ملكيتك أو ترخيصك لاستخدام الشعارات والصور والخطوط وأي محتوى تزوّدنا به.",
          "استخراج تصاريح الموقع أو الجهة المنظِّمة، ما لم ينص العرض على أننا نتولى ذلك.",
        ],
      },
      { h: "السداد", p: ["مراحل السداد موضّحة في عرض السعر. يمكنك الدفع بالتحويل البنكي أو بالبطاقة من صفحة سداد فاتورة التي تعمل عبر «ميسّر». الإلغاء والاسترداد تحكمهما سياسة الاسترداد."] },
      { h: "الملكية الفكرية", p: ["التصاميم والرسومات والمجسمات التي ننتجها تبقى ملكاً لنا حتى سداد الفاتورة المتعلقة بها كاملة، ولا يجوز تسليمها لمورّد آخر لتنفيذها قبل ذلك. علاماتك التجارية ومحتواك يبقيان ملكاً لك."] },
      { h: "المسؤولية", p: ["نلتزم بتنفيذ العمل بالعناية والمهارة المعقولتين. لا يحدّ أي بند في هذه الشروط من حقوقك التي تكفلها أنظمة المملكة ولا يجوز استبعادها. وفيما عدا ذلك تقتصر مسؤوليتنا عن أي مشروع على المبلغ الذي دفعته عنه، ولا نتحمل مسؤولية التأخير الناتج عن ظروف خارجة عن إرادتنا المعقولة."] },
      { h: "النظام الواجب التطبيق", p: ["تخضع هذه الشروط لأنظمة المملكة العربية السعودية، وتختص محاكمها بالنظر في أي نزاع."] },
    ],
  },
  "refund-policy": {
    title: "سياسة الاسترداد والإلغاء",
    intro: "أغلب ما ننتجه يُصنع خصيصاً لعميل واحد وتاريخ واحد، ولذلك يعتمد الاسترداد على مرحلة تنفيذ العمل. تسري المراحل التالية ما لم ينص عرض السعر الموقّع على غير ذلك.",
    sections: [
      {
        h: "إلغاء المشروع",
        ul: [
          "قبل بدء التصميم أو الإنتاج: استرداد كامل لما دفعته.",
          "بعد بدء التصميم وقبل التصنيع أو الطباعة: نعيد ما دفعته مخصوماً منه أعمال التصميم المنجزة، مفصّلةً بالأسعار الواردة في عرض السعر.",
          "بعد بدء التصنيع أو الطباعة أو الشراء: لا تُسترد قيمة الخامات والمطبوعات وحجوزات الأطراف الأخرى التي تم الالتزام بها، ويُعاد أي رصيد لم يُصرف.",
          "بعد التسليم أو انتهاء الفعالية: لا استرداد، إلا وفق ما ورد في بند «إذا كان هناك خلل».",
        ],
      },
      { h: "المنتجات المصنوعة حسب الطلب", p: ["المطبوعات والمنتجات التي تحمل علامتك والمصنوعة بمقاسات خاصة تُنتج وفق مواصفاتك ولا يمكن إرجاعها أو إعادة بيعها، ولذلك فهي مستثناة من حق الإلغاء العام الذي يسري على السلع القياسية المشتراة إلكترونياً."] },
      { h: "إذا كان هناك خلل", p: ["إذا كان ما سلّمناه معيباً أو غير مطابق للعرض والتصميم المعتمدين فأبلغنا خلال 7 أيام من التسليم مع صور. سنصلحه أو نعيد إنتاجه على نفقتنا، أو نعيد قيمة البند المتأثر إن تعذّر ذلك."] },
      { h: "إذا ألغينا نحن", p: ["إذا تعذّر علينا تنفيذ طلب مؤكد فإننا نعيد كل ما دفعته عن الجزء غير المنفّذ."] },
      { h: "طريقة ردّ المبالغ", p: ["تُعاد المبالغ إلى وسيلة الدفع الأصلية. استرداد مدفوعات البطاقات يتم عبر «ميسّر» ويصل إلى حسابك عادةً خلال 7 إلى 14 يوم عمل بحسب البنك. لا نتقاضى أي رسوم على معالجة الاسترداد."] },
      { h: "كيف تطلب الاسترداد", p: [`راسلنا على ${site.email} مع رقم عرض السعر أو الفاتورة. نؤكد لك مبلغ الاسترداد كتابياً قبل صرفه.`] },
    ],
  },
  cookies: {
    title: "سياسة ملفات تعريف الارتباط",
    intro: "تعرض هذه الصفحة كل ما يخزّنه هذا الموقع في متصفحك، وقد حرصنا على أن تكون القائمة قصيرة.",
    sections: [
      {
        h: "الضرورية",
        ul: [
          "asp-consent (تخزين محلي): يحفظ اختيارك لملفات تعريف الارتباط حتى لا نسألك في كل زيارة. يبقى حتى تمسحه أو تغيّر اختيارك.",
          "asp_inv (ملف تعريف ارتباط): يُنشأ فقط عند بدء دفع بالبطاقة، لنعرض لك النتيجة عند عودتك من صفحة الدفع. يُحذف بعد ساعتين.",
        ],
        p: ["هذه العناصر لا تتتبّعك ولا يمكن إيقافها لأن الموقع يحتاج إليها ليعمل."],
      },
      { h: "التحليلات (اختيارية)", p: ["قد نستخدم التحليلات لإحصاء زيارات الصفحات. التحليلات متوقفة افتراضياً ولا تعمل إلا إذا اخترت «قبول الكل» أو فعّلتها من إعدادات ملفات تعريف الارتباط. لا توجد حالياً أي أداة تحليلات مثبّتة، فلا يُخزَّن شيء ضمن هذه الفئة."] },
      { h: "الإعلانات والتتبّع", p: ["لا نستخدم ملفات ارتباط إعلانية ولا بكسلات تتبّع ولا أدوات تتبّع لوسائل التواصل الاجتماعي. الخطوط تُحمَّل من نطاق موقعنا، فلا يتصل تحميل الصفحة بمزوّد خطوط."] },
      { h: "الأطراف الأخرى", p: ["عند اختيارك الدفع بالبطاقة تنتقل من هذا الموقع إلى صفحة الدفع لدى «ميسّر»، التي تضع ملفات ارتباط خاصة بها وفق سياستها."] },
      { h: "تغيير اختيارك", p: ["استخدم رابط «إعدادات ملفات تعريف الارتباط» أسفل الصفحة في أي وقت. رفض الملفات الاختيارية يتم بنقرة واحدة ولا يحدّ مما يمكنك فعله في الموقع."] },
    ],
  },
}

export const getLegal = (locale: Locale, slug: LegalSlug): LegalDoc =>
  (locale === "ar" ? ar : en)[slug]
