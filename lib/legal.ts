import type { Locale } from "./i18n/request";

// Legal content for the Privacy Policy and Terms & Conditions pages.
//
// Privacy Policy: client-provided. The text in `privacyEn` / `privacyAr` was
// supplied verbatim by the client (Rent Royz) and should not be edited
// without their sign-off. It carries no template disclaimer.
//
// Terms & Conditions: drafted in-house against the public legal framework of
// the Kingdom of Saudi Arabia (PDPL, E-Commerce Law, Anti-Cyber Crime Law,
// Tourism Law, VAT Law). It still carries the `disclaimer` notice — a
// licensed Saudi legal practitioner should review it before it is relied on,
// and it should be replaced if the client supplies their own Terms text.

export type LegalSection = {
  heading: string;
  /** Ordinary paragraphs, rendered in order. */
  body?: string[];
  /** A bulleted list rendered after the paragraphs. */
  items?: string[];
};

export type LegalDoc = {
  title: string;
  tagline: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
  /** Optional template disclaimer — present on the in-house Terms draft,
      omitted from the client-provided Privacy Policy. */
  disclaimerLabel?: string;
  disclaimer?: string;
};

// Official company identifiers — supplied by the client. The VAT number is
// the ZATCA registration; the CR number is the Ministry of Commerce
// commercial registration that serves as the business licence. The legal
// name and address were confirmed by the client on 14/05/2026.
export const COMPANY = {
  brandName: { en: "Rent Royz", ar: "رنت رويز" },
  legalName: { en: "RentRoyz", ar: "RentRoyz" },
  cr: "7053041203",
  vat: "314497025100003",
  address: {
    en: "Riyadh, Kingdom of Saudi Arabia",
    ar: "الرياض، المملكة العربية السعودية",
  },
  email: "info@rentroyz.com",
  phone: "+966 55 650 0470",
} as const;

const SHARED_DISCLAIMER_LABEL = {
  en: "Important notice",
  ar: "تنويه مهم",
};

const SHARED_DISCLAIMER = {
  en: "This document is provided for general information. It was prepared against the publicly available legal framework of the Kingdom of Saudi Arabia and reflects standard practice; it does not constitute legal advice. Rent Royz recommends that it be reviewed by a licensed Saudi legal practitioner before it is relied upon.",
  ar: "هذا المستند مُقدَّم لأغراض المعلومات العامة. وقد أُعِدَّ استناداً إلى الإطار النظامي المتاح للعموم في المملكة العربية السعودية ووفق الممارسات المعتادة، ولا يُعدّ استشارة قانونية. توصي رنت رويز بمراجعته من قِبل ممارس قانوني سعودي مرخّص قبل الاعتماد عليه.",
};

// ── English ────────────────────────────────────────────────────────────────

// Client-provided text — supplied by Rent Royz on 14/05/2026, used verbatim.
const privacyEn: LegalDoc = {
  title: "Privacy Policy",
  tagline: "How RentRoyz collects, uses, and protects your personal data.",
  lastUpdatedLabel: "Last Updated",
  lastUpdated: "14/05/2026",
  intro: [],
  sections: [
    {
      heading: "Introduction",
      body: [
        "This Privacy Policy explains how RentRoyz collects, uses, processes, stores, and protects personal data when using the website or related services, in compliance with the Saudi Personal Data Protection Law (PDPL) and its applicable regulations.",
      ],
    },
    {
      heading: "Information We Collect",
      body: ["We may collect the following information:"],
      items: [
        "Full name",
        "Mobile number",
        "Email address",
        "City or address",
        "Identification details when legally required",
        "Booking or order information",
        "Payment information when applicable",
        "Website usage data",
        "IP address, browser, and device information",
        "Cookies and tracking technologies",
      ],
    },
    {
      heading: "Methods of Data Collection",
      body: ["Personal data may be collected through:"],
      items: [
        "Online forms",
        "Account registration",
        "Communication via email, phone, or WhatsApp",
        "Website and service usage",
        "Cookies and analytics tools",
      ],
    },
    {
      heading: "Purpose of Data Processing",
      body: ["Personal data is processed for the following purposes:"],
      items: [
        "Providing services and operating the website",
        "Managing orders and bookings",
        "Customer communication and support",
        "Improving user experience",
        "Sending updates and marketing communications where consent is required",
        "Compliance with applicable laws and regulations",
        "Preventing fraud and unauthorized use",
      ],
    },
    {
      heading: "Legal Basis for Processing",
      body: [
        "Personal data is processed based on one or more of the following legal bases:",
      ],
      items: [
        "User consent",
        "Contractual necessity",
        "Compliance with legal obligations",
        "Legitimate interests that do not conflict with data subject rights",
      ],
    },
    {
      heading: "Data Sharing",
      body: [
        "Personal data is not sold or rented to third parties.",
        "Data may be shared with:",
      ],
      items: [
        "Technical and operational service providers",
        "Payment service providers",
        "Governmental or regulatory authorities when legally required",
        "Judicial or law enforcement authorities when necessary",
      ],
    },
    {
      heading: "International Data Transfers",
      body: [
        "If personal data is transferred or processed outside the Kingdom of Saudi Arabia, such transfer shall be conducted in accordance with applicable legal requirements and adequate protection measures.",
      ],
    },
    {
      heading: "Data Security",
      body: [
        "Appropriate technical, organizational, and security measures are implemented to protect personal data against unauthorized access, disclosure, alteration, loss, or destruction.",
      ],
    },
    {
      heading: "Data Retention",
      body: [
        "Personal data is retained only for the period necessary to fulfill the purposes stated in this policy or as required by applicable laws and regulations.",
      ],
    },
    {
      heading: "Data Subject Rights",
      body: ["Data subjects have the right to:"],
      items: [
        "Access their personal data",
        "Request correction of inaccurate information",
        "Request deletion where legally permissible",
        "Withdraw consent where processing is based on consent",
        "Submit complaints to the competent authority",
      ],
    },
    {
      heading: "Cookies",
      body: [
        "The website may use cookies and similar technologies to enhance functionality, user experience, and analytics.",
      ],
    },
    {
      heading: "Policy Updates",
      body: [
        "RentRoyz reserves the right to amend this Privacy Policy at any time. Updated versions will be published on the website with the revised effective date.",
      ],
    },
    {
      heading: "Contact Information",
      items: [
        `Company Name: ${COMPANY.legalName.en}`,
        `Email: ${COMPANY.email}`,
        `Phone Number: ${COMPANY.phone}`,
        `Address: ${COMPANY.address.en}`,
      ],
    },
  ],
};

const termsEn: LegalDoc = {
  title: "Terms & Conditions",
  tagline:
    "The terms governing your use of the Rent Royz website and services.",
  lastUpdatedLabel: "Last Updated",
  lastUpdated: "14/05/2026",
  intro: [
    "These Terms and Conditions (the “Terms”) govern your access to and use of the website rentroyz.com and the property management services provided by Rent Royz in the Kingdom of Saudi Arabia.",
    "By accessing the website or engaging our services, you agree to be bound by these Terms. If you do not agree with them, please do not use the website or our services.",
  ],
  sections: [
    {
      heading: "Definitions",
      items: [
        "“Rent Royz”, “we”, “us”, or “our” — the business identified in the contact section below.",
        "“Owner” — a person who owns a property and engages Rent Royz to manage it.",
        "“Guest” — a person who books or stays at a managed property.",
        "“Property” — an apartment or unit managed by Rent Royz on behalf of an Owner.",
        "“Services” — the furnishing, listing, and end-to-end management services provided by Rent Royz.",
        "“Booking Platforms” — third-party platforms such as Airbnb and Booking.com on which Properties may be listed.",
        "“Management Agreement” — the separate written property management agreement signed between Rent Royz and an Owner.",
      ],
    },
    {
      heading: "About Rent Royz and our services",
      body: [
        "Rent Royz is a professional property operations company focused on short-term and mid-term rentals. Our model is to take properties from their owners, furnish and prepare them to a hospitality standard, list them on Booking Platforms and our own channels, and manage the complete guest operation — including guest communication, check-in and check-out, cleaning, maintenance, pricing, and revenue optimisation.",
        "The Owner retains ownership of the Property. Rent Royz operates it, and revenue is shared between the Owner and Rent Royz transparently in accordance with the Management Agreement.",
        "Information presented on the website — including any revenue estimate — is indicative only, is based on market data and assumptions, and does not constitute a guarantee of income or performance.",
      ],
    },
    {
      heading: "Eligibility",
      body: [
        "To engage our services you must be at least 18 years old and have the legal capacity to enter into a binding agreement. An Owner must have the lawful right to make the Property available for short-term rental and to authorise Rent Royz to manage it.",
      ],
    },
    {
      heading: "Regulatory compliance and licensing",
      body: [
        "Rent Royz carries on its business in accordance with the applicable laws of the Kingdom of Saudi Arabia, including:",
      ],
      items: [
        "the Tourism Law, issued by Royal Decree No. M/51, and the regulations governing the licensing of hospitality and furnished-accommodation facilities issued by the Ministry of Tourism, including the requirements applicable to short-term rental;",
        "the E-Commerce Law, issued by Royal Decree No. M/126 dated 7/11/1440H, and its Implementing Regulations;",
        "the Anti-Cyber Crime Law, issued by Royal Decree No. M/17 dated 8/3/1428H;",
        "the Personal Data Protection Law, issued by Royal Decree No. M/19 dated 9/2/1443H (as amended), and its Implementing Regulations; and",
        "the Value Added Tax Law and its Implementing Regulations, as administered by the Zakat, Tax and Customs Authority (ZATCA).",
      ],
    },
    {
      heading: "Owner responsibility for permits",
      body: [
        "The Owner is responsible for ensuring that the Property may lawfully be used for short-term rental, including any requirements relating to title, mortgage, owners'-association or building rules, and municipal or homeowners'-association approvals. Where a short-term rental permit or registration is required, Rent Royz will assist the Owner in obtaining it, but the underlying eligibility of the Property remains the Owner's responsibility.",
      ],
    },
    {
      heading: "The Management Agreement",
      body: [
        "These Terms apply to your use of the website and to the general relationship between us. For Owners, they are supplemented by a separate written Management Agreement that sets out the commercial terms — including fees, revenue share, payout schedule, and term. In the event of any conflict between these Terms and the Management Agreement on a commercial matter, the Management Agreement prevails.",
      ],
    },
    {
      heading: "Owner obligations",
      items: [
        "Provide accurate, complete, and up-to-date information about yourself and the Property.",
        "Ensure you hold lawful title to, or authority over, the Property and the right to let it.",
        "Deliver the Property in a condition suitable for furnishing and guest occupation, and disclose any known defects.",
        "Maintain appropriate property insurance, unless otherwise agreed in the Management Agreement.",
        "Cooperate reasonably with Rent Royz to enable the Services to be delivered.",
      ],
    },
    {
      heading: "Rent Royz obligations",
      items: [
        "Furnish and prepare the Property to a hospitality standard, as agreed with the Owner.",
        "List the Property on Booking Platforms and our own channels and manage reservations.",
        "Manage the guest operation, including communication, check-in and check-out, cleaning, and maintenance.",
        "Optimise pricing and occupancy and account for revenue transparently.",
        "Provide the Owner with reporting and payouts in accordance with the Management Agreement.",
      ],
    },
    {
      heading: "Fees, revenue sharing, and payouts",
      body: [
        "Fees, the revenue-share split, and the payout schedule are set out in the Management Agreement. Value Added Tax (VAT) is applied where required by law. Rent Royz issues tax invoices in accordance with ZATCA requirements. Payouts are made to the bank account designated by the Owner.",
      ],
    },
    {
      heading: "Bookings and guests",
      body: [
        "Reservations are accepted subject to the house rules of the Property and the terms of the relevant Booking Platform. Cancellations, refunds, and guest disputes are handled in accordance with the policies of the Booking Platform through which the reservation was made and the Management Agreement. Guests are expected to comply with the house rules, applicable law, and the requirements of the relevant authorities.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "The website and its content — including text, graphics, logos, the Rent Royz name and brand, photography, and software — are owned by Rent Royz or its licensors and are protected by law. You may not copy, reproduce, distribute, or create derivative works from any part of the website without our prior written consent.",
      ],
    },
    {
      heading: "Acceptable use of the website",
      body: [
        "You agree to use the website only for lawful purposes. You must not use the website in any way that breaches applicable law — including the Anti-Cyber Crime Law — attempt to gain unauthorised access to our systems, introduce malicious code, or interfere with the proper operation of the website.",
      ],
    },
    {
      heading: "Third-party platforms and links",
      body: [
        "The website and Services rely on third-party platforms — including Booking Platforms and scheduling tools — and may contain links to third-party websites. Those platforms and websites are governed by their own terms and privacy policies. Rent Royz is not responsible for the content, policies, or practices of third parties.",
      ],
    },
    {
      heading: "Disclaimers and limitation of liability",
      body: [
        "The website and its content are provided on an “as is” and “as available” basis. Revenue estimates and other figures shown on the website are indicative and are not a guarantee of results. To the maximum extent permitted by the laws of the Kingdom of Saudi Arabia, Rent Royz shall not be liable for any indirect or consequential loss, or for loss of profit or revenue, arising from the use of the website. Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited.",
      ],
    },
    {
      heading: "Indemnity",
      body: [
        "You agree to indemnify Rent Royz against any claims, losses, or costs arising from your breach of these Terms, your breach of applicable law, or — in the case of an Owner — any inaccurate information or any lack of lawful right in relation to the Property.",
      ],
    },
    {
      heading: "Force majeure",
      body: [
        "Rent Royz is not liable for any failure or delay in performing its obligations that results from events beyond its reasonable control, including natural events, government action, regulatory change, or interruptions to third-party platforms or utilities.",
      ],
    },
    {
      heading: "Term and termination",
      body: [
        "Your right to use the website continues while these Terms are in effect. The term and termination of the management relationship for Owners are governed by the Management Agreement. We may suspend or restrict access to the website where necessary to protect the website, our users, or our lawful interests.",
      ],
    },
    {
      heading: "Amendments to these Terms",
      body: [
        "We may update these Terms from time to time. The current version, with its “Last Updated” date, will always be available on this page. Your continued use of the website after a change takes effect constitutes acceptance of the updated Terms.",
      ],
    },
    {
      heading: "Governing law and dispute resolution",
      body: [
        "These Terms, and any dispute or claim arising out of or in connection with them or with your use of the website or Services, are governed by the laws of the Kingdom of Saudi Arabia. The competent courts of the Kingdom of Saudi Arabia have exclusive jurisdiction to settle any such dispute.",
      ],
    },
    {
      heading: "Contact us",
      body: [
        "If you have any question about these Terms, please contact us:",
      ],
      items: [
        `Company name: ${COMPANY.legalName.en}`,
        `Commercial Registration (CR) No.: ${COMPANY.cr}`,
        `VAT Registration No.: ${COMPANY.vat}`,
        `Address: ${COMPANY.address.en}`,
        `Email: ${COMPANY.email}`,
        `Phone: ${COMPANY.phone}`,
      ],
    },
  ],
  disclaimerLabel: SHARED_DISCLAIMER_LABEL.en,
  disclaimer: SHARED_DISCLAIMER.en,
};

// ── Arabic ─────────────────────────────────────────────────────────────────

// Client-provided text — supplied by Rent Royz on 14/05/2026, used verbatim.
const privacyAr: LegalDoc = {
  title: "سياسة الخصوصية",
  tagline: "كيف تجمع RentRoyz بياناتك الشخصية وتستخدمها وتحميها.",
  lastUpdatedLabel: "آخر تحديث",
  lastUpdated: "14/05/2026",
  intro: [],
  sections: [
    {
      heading: "مقدمة",
      body: [
        "توضح سياسة الخصوصية هذه كيفية قيام شركة RentRoyz بجمع البيانات الشخصية واستخدامها ومعالجتها وحمايتها عند استخدام الموقع أو الخدمات المرتبطة به، وذلك بما يتوافق مع نظام حماية البيانات الشخصية في المملكة العربية السعودية (PDPL) واللوائح التنفيذية ذات العلاقة.",
      ],
    },
    {
      heading: "البيانات التي يتم جمعها",
      body: ["قد نقوم بجمع البيانات التالية:"],
      items: [
        "الاسم الكامل",
        "رقم الجوال",
        "البريد الإلكتروني",
        "المدينة أو العنوان",
        "بيانات الهوية عند الحاجة النظامية",
        "بيانات الحجوزات أو الطلبات",
        "بيانات الدفع عند الحاجة",
        "بيانات استخدام الموقع",
        "عنوان IP ونوع الجهاز والمتصفح",
        "ملفات تعريف الارتباط (Cookies)",
      ],
    },
    {
      heading: "طرق جمع البيانات",
      body: ["يتم جمع البيانات الشخصية من خلال:"],
      items: [
        "النماذج الإلكترونية",
        "إنشاء الحسابات",
        "التواصل عبر البريد الإلكتروني أو الهاتف أو الواتساب",
        "استخدام الموقع والخدمات",
        "ملفات تعريف الارتباط وأدوات التحليل",
      ],
    },
    {
      heading: "الغرض من استخدام البيانات",
      body: ["تُستخدم البيانات الشخصية للأغراض التالية:"],
      items: [
        "تقديم الخدمات وتشغيل الموقع",
        "إدارة الطلبات والحجوزات",
        "التواصل مع المستخدمين وخدمة العملاء",
        "تحسين تجربة المستخدم",
        "إرسال التحديثات والعروض التسويقية بعد الحصول على الموافقة عند الحاجة",
        "الامتثال للأنظمة واللوائح المعمول بها",
        "حماية الموقع من الاحتيال أو الاستخدام غير المشروع",
      ],
    },
    {
      heading: "الأساس النظامي للمعالجة",
      body: [
        "تتم معالجة البيانات الشخصية بناءً على أحد الأسس النظامية التالية:",
      ],
      items: [
        "موافقة صاحب البيانات",
        "تنفيذ التزام تعاقدي",
        "الامتثال لالتزام نظامي",
        "تحقيق مصلحة مشروعة لا تتعارض مع حقوق صاحب البيانات",
      ],
    },
    {
      heading: "مشاركة البيانات",
      body: [
        "لا يتم بيع أو تأجير البيانات الشخصية لأي طرف ثالث.",
        "قد تتم مشاركة البيانات مع:",
      ],
      items: [
        "مزودي الخدمات التقنية والتشغيلية",
        "مزودي خدمات الدفع",
        "الجهات الحكومية أو التنظيمية عند الطلب النظامي",
        "الجهات القضائية أو الأمنية عند الحاجة النظامية",
      ],
    },
    {
      heading: "نقل البيانات خارج المملكة",
      body: [
        "في حال نقل البيانات الشخصية أو معالجتها خارج المملكة العربية السعودية، يتم ذلك وفق الضوابط النظامية المعتمدة وبما يضمن مستوىً مناسباً من الحماية.",
      ],
    },
    {
      heading: "حماية البيانات",
      body: [
        "يتم تطبيق تدابير أمنية وتقنية وتنظيمية مناسبة لحماية البيانات الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو الفقد أو التلف.",
      ],
    },
    {
      heading: "مدة الاحتفاظ بالبيانات",
      body: [
        "يتم الاحتفاظ بالبيانات الشخصية للمدة اللازمة لتحقيق الأغراض الموضحة في هذه السياسة أو وفقاً لما تتطلبه الأنظمة المعمول بها.",
      ],
    },
    {
      heading: "حقوق صاحب البيانات",
      body: ["يحق لصاحب البيانات الشخصية:"],
      items: [
        "الوصول إلى بياناته الشخصية",
        "طلب تصحيح البيانات غير الدقيقة",
        "طلب إتلاف البيانات عند انتفاء الحاجة النظامية",
        "سحب الموافقة متى كان الأساس النظامي هو الموافقة",
        "تقديم شكوى لدى الجهة المختصة",
      ],
    },
    {
      heading: "ملفات تعريف الارتباط",
      body: [
        "قد يستخدم الموقع ملفات تعريف الارتباط لتحسين الأداء وتجربة المستخدم وتحليل الاستخدام.",
      ],
    },
    {
      heading: "التعديلات على السياسة",
      body: [
        "تحتفظ RentRoyz بحق تعديل سياسة الخصوصية في أي وقت، ويتم نشر النسخة المحدثة عبر الموقع مع تحديث تاريخ السريان.",
      ],
    },
    {
      heading: "معلومات التواصل",
      items: [
        `اسم الشركة: ${COMPANY.legalName.ar}`,
        `البريد الإلكتروني: ${COMPANY.email}`,
        `رقم التواصل: ${COMPANY.phone}`,
        `العنوان: ${COMPANY.address.ar}`,
      ],
    },
  ],
};

const termsAr: LegalDoc = {
  title: "الشروط والأحكام",
  tagline: "الشروط التي تحكم استخدامك لموقع رنت رويز وخدماتها.",
  lastUpdatedLabel: "آخر تحديث",
  lastUpdated: "14/05/2026",
  intro: [
    "تحكم هذه الشروط والأحكام («الشروط») وصولك إلى الموقع الإلكتروني rentroyz.com واستخدامك له، وخدمات إدارة العقارات التي تقدّمها رنت رويز في المملكة العربية السعودية.",
    "بوصولك إلى الموقع أو استعانتك بخدماتنا، فإنك توافق على الالتزام بهذه الشروط. وإذا كنت لا توافق عليها، فيُرجى عدم استخدام الموقع أو خدماتنا.",
  ],
  sections: [
    {
      heading: "التعريفات",
      items: [
        "«رنت رويز» أو «نحن» — المنشأة المُحدّدة في قسم التواصل أدناه.",
        "«المالك» — الشخص الذي يملك عقاراً ويستعين برنت رويز لإدارته.",
        "«الضيف» — الشخص الذي يحجز أو يقيم في عقار مُدار.",
        "«العقار» — شقة أو وحدة تديرها رنت رويز نيابةً عن المالك.",
        "«الخدمات» — خدمات التأثيث والإدراج والإدارة الكاملة التي تقدّمها رنت رويز.",
        "«منصات الحجز» — منصات الأطراف الثالثة مثل Airbnb وBooking.com التي قد تُدرَج عليها العقارات.",
        "«اتفاقية الإدارة» — اتفاقية إدارة العقار المكتوبة والمنفصلة المُوقَّعة بين رنت رويز والمالك.",
      ],
    },
    {
      heading: "عن رنت رويز وخدماتنا",
      body: [
        "رنت رويز شركة متخصصة في تشغيل العقارات للإيجار قصير ومتوسط الأجل. ويقوم نموذجنا على استلام العقارات من مُلّاكها وتأثيثها وتجهيزها على مستوى الضيافة، وإدراجها على منصات الحجز وقنواتنا الخاصة، وإدارة تشغيل الضيوف بالكامل — بما يشمل التواصل مع الضيوف وتسجيل الدخول والخروج والتنظيف والصيانة والتسعير وتحسين الإيرادات.",
        "يحتفظ المالك بملكية العقار، وتتولى رنت رويز تشغيله، وتُقتسم الإيرادات بين المالك ورنت رويز بشفافية وفقاً لاتفاقية الإدارة.",
        "المعلومات المعروضة على الموقع — بما في ذلك أي تقدير للإيرادات — هي للاسترشاد فقط، وتستند إلى بيانات السوق وافتراضات، ولا تُشكّل ضماناً للدخل أو الأداء.",
      ],
    },
    {
      heading: "الأهلية",
      body: [
        "للاستعانة بخدماتنا يجب ألا يقل عمرك عن ١٨ عاماً وأن تتمتع بالأهلية النظامية لإبرام اتفاق ملزم. ويجب أن يكون لدى المالك الحق النظامي في إتاحة العقار للإيجار قصير الأجل وتفويض رنت رويز بإدارته.",
      ],
    },
    {
      heading: "الامتثال النظامي والترخيص",
      body: [
        "تمارس رنت رويز نشاطها وفقاً للأنظمة المعمول بها في المملكة العربية السعودية، ومن ذلك:",
      ],
      items: [
        "نظام السياحة الصادر بالمرسوم الملكي رقم (م/٥١)، والأنظمة المنظِّمة لترخيص مرافق الضيافة والإيواء المفروش الصادرة عن وزارة السياحة، بما في ذلك المتطلبات المتعلقة بالإيجار قصير الأجل؛",
        "نظام التجارة الإلكترونية الصادر بالمرسوم الملكي رقم (م/١٢٦) وتاريخ ٧/١١/١٤٤٠هـ، ولائحته التنفيذية؛",
        "نظام مكافحة الجرائم المعلوماتية الصادر بالمرسوم الملكي رقم (م/١٧) وتاريخ ٨/٣/١٤٢٨هـ؛",
        "نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/١٩) وتاريخ ٩/٢/١٤٤٣هـ (وتعديلاته)، ولائحته التنفيذية؛",
        "ونظام ضريبة القيمة المضافة ولائحته التنفيذية، بإشراف هيئة الزكاة والضريبة والجمارك.",
      ],
    },
    {
      heading: "مسؤولية المالك عن التراخيص",
      body: [
        "يتحمّل المالك مسؤولية التأكد من جواز استخدام العقار نظاماً للإيجار قصير الأجل، بما في ذلك أي متطلبات تتعلق بالملكية أو الرهن أو لوائح اتحاد المُلّاك أو نظام المبنى أو موافقات الجهات البلدية أو جمعية المُلّاك. وحيثما يتطلب الأمر ترخيصاً أو تسجيلاً للإيجار قصير الأجل، تساعد رنت رويز المالك في الحصول عليه، إلا أن أهلية العقار الأساسية تظل مسؤولية المالك.",
      ],
    },
    {
      heading: "اتفاقية الإدارة",
      body: [
        "تنطبق هذه الشروط على استخدامك للموقع وعلى العلاقة العامة بيننا. وبالنسبة للمُلّاك، تُستكمَل هذه الشروط باتفاقية إدارة مكتوبة ومنفصلة تحدّد الشروط التجارية — بما في ذلك الرسوم وحصة الإيرادات وجدول التحويلات والمدة. وفي حال وجود أي تعارض بين هذه الشروط واتفاقية الإدارة في مسألة تجارية، تكون الغلبة لاتفاقية الإدارة.",
      ],
    },
    {
      heading: "التزامات المالك",
      items: [
        "تقديم معلومات دقيقة وكاملة ومحدّثة عن نفسه وعن العقار.",
        "التأكد من امتلاكه حق الملكية النظامي للعقار أو الصلاحية عليه وحق تأجيره.",
        "تسليم العقار في حالة مناسبة للتأثيث وإقامة الضيوف، والإفصاح عن أي عيوب معلومة.",
        "الاحتفاظ بتأمين مناسب على العقار، ما لم يُتفق على خلاف ذلك في اتفاقية الإدارة.",
        "التعاون على نحو معقول مع رنت رويز لتمكينها من تقديم الخدمات.",
      ],
    },
    {
      heading: "التزامات رنت رويز",
      items: [
        "تأثيث العقار وتجهيزه على مستوى الضيافة، وفق المتفق عليه مع المالك.",
        "إدراج العقار على منصات الحجز وقنواتنا الخاصة وإدارة الحجوزات.",
        "إدارة تشغيل الضيوف، بما يشمل التواصل وتسجيل الدخول والخروج والتنظيف والصيانة.",
        "تحسين التسعير ومعدلات الإشغال وبيان الإيرادات بشفافية.",
        "تزويد المالك بالتقارير والتحويلات وفقاً لاتفاقية الإدارة.",
      ],
    },
    {
      heading: "الرسوم وتقاسم الإيرادات والتحويلات",
      body: [
        "تُحدَّد الرسوم ونسبة تقاسم الإيرادات وجدول التحويلات في اتفاقية الإدارة. وتُطبَّق ضريبة القيمة المضافة حيثما يقتضيها النظام. وتُصدِر رنت رويز فواتير ضريبية وفقاً لمتطلبات هيئة الزكاة والضريبة والجمارك. وتُحوَّل المبالغ إلى الحساب البنكي الذي يحدّده المالك.",
      ],
    },
    {
      heading: "الحجوزات والضيوف",
      body: [
        "تُقبَل الحجوزات وفقاً لقواعد العقار وشروط منصة الحجز ذات الصلة. وتُعالَج عمليات الإلغاء والاسترداد ونزاعات الضيوف وفقاً لسياسات منصة الحجز التي تم الحجز من خلالها ولاتفاقية الإدارة. ويُتوقَّع من الضيوف الالتزام بقواعد العقار والأنظمة المعمول بها ومتطلبات الجهات المختصة.",
      ],
    },
    {
      heading: "الملكية الفكرية",
      body: [
        "الموقع ومحتواه — بما في ذلك النصوص والرسومات والشعارات واسم رنت رويز وعلامتها التجارية والصور والبرمجيات — مملوكة لرنت رويز أو لمرخّصيها ومحمية نظاماً. ولا يجوز لك نسخ أي جزء من الموقع أو إعادة إنتاجه أو توزيعه أو إنشاء أعمال مشتقة منه دون موافقتنا الكتابية المسبقة.",
      ],
    },
    {
      heading: "الاستخدام المقبول للموقع",
      body: [
        "توافق على استخدام الموقع للأغراض المشروعة فقط. ولا يجوز لك استخدام الموقع بأي طريقة تخالف الأنظمة المعمول بها — بما في ذلك نظام مكافحة الجرائم المعلوماتية — أو محاولة الوصول غير المصرّح به إلى أنظمتنا، أو إدخال برمجيات ضارة، أو التشويش على التشغيل السليم للموقع.",
      ],
    },
    {
      heading: "منصات الأطراف الثالثة والروابط",
      body: [
        "يعتمد الموقع والخدمات على منصات أطراف ثالثة — بما في ذلك منصات الحجز وأدوات الجدولة — وقد يتضمن روابط لمواقع أطراف ثالثة. وتخضع تلك المنصات والمواقع لشروطها وسياسات الخصوصية الخاصة بها. ولا تتحمّل رنت رويز مسؤولية محتوى الأطراف الثالثة أو سياساتها أو ممارساتها.",
      ],
    },
    {
      heading: "إخلاء المسؤولية وحدودها",
      body: [
        "يُقدَّم الموقع ومحتواه «كما هو» و«حسب توافره». وتقديرات الإيرادات وغيرها من الأرقام المعروضة على الموقع هي للاسترشاد ولا تُشكّل ضماناً للنتائج. وإلى أقصى حد يسمح به نظام المملكة العربية السعودية، لا تتحمّل رنت رويز مسؤولية أي خسارة غير مباشرة أو تبعية، أو فوات ربح أو إيراد، ناشئة عن استخدام الموقع. ولا يوجد في هذه الشروط ما يستثني أو يحدّ من المسؤولية التي لا يجوز نظاماً استثناؤها أو الحدّ منها.",
      ],
    },
    {
      heading: "التعويض",
      body: [
        "توافق على تعويض رنت رويز عن أي مطالبات أو خسائر أو تكاليف ناشئة عن إخلالك بهذه الشروط، أو مخالفتك للأنظمة المعمول بها، أو — في حالة المالك — أي معلومات غير دقيقة أو انتفاء أي حق نظامي يتعلق بالعقار.",
      ],
    },
    {
      heading: "القوة القاهرة",
      body: [
        "لا تتحمّل رنت رويز مسؤولية أي إخفاق أو تأخير في أداء التزاماتها ناتج عن أحداث خارجة عن سيطرتها المعقولة، بما في ذلك الأحداث الطبيعية أو الإجراءات الحكومية أو التغييرات النظامية أو انقطاع منصات الأطراف الثالثة أو الخدمات.",
      ],
    },
    {
      heading: "المدة والإنهاء",
      body: [
        "يستمر حقك في استخدام الموقع طوال سريان هذه الشروط. وتخضع مدة علاقة الإدارة وإنهاؤها بالنسبة للمُلّاك لاتفاقية الإدارة. ويجوز لنا تعليق الوصول إلى الموقع أو تقييده عند الحاجة لحماية الموقع أو مستخدميه أو مصالحنا المشروعة.",
      ],
    },
    {
      heading: "التعديلات على هذه الشروط",
      body: [
        "قد نُحدّث هذه الشروط من حين لآخر. وستظل النسخة الحالية، مع تاريخ «آخر تحديث»، متاحة دائماً على هذه الصفحة. ويُعدّ استمرارك في استخدام الموقع بعد سريان أي تعديل قبولاً للشروط المحدّثة.",
      ],
    },
    {
      heading: "النظام الواجب التطبيق وتسوية النزاعات",
      body: [
        "تخضع هذه الشروط، وأي نزاع أو مطالبة تنشأ عنها أو ترتبط بها أو باستخدامك للموقع أو الخدمات، لأنظمة المملكة العربية السعودية. وتختص المحاكم المختصة في المملكة العربية السعودية دون غيرها بالفصل في أي نزاع من هذا القبيل.",
      ],
    },
    {
      heading: "التواصل معنا",
      body: ["إذا كان لديك أي سؤال بخصوص هذه الشروط، فيُرجى التواصل معنا:"],
      items: [
        `اسم الشركة: ${COMPANY.legalName.ar}`,
        `رقم السجل التجاري: ${COMPANY.cr}`,
        `الرقم الضريبي (ضريبة القيمة المضافة): ${COMPANY.vat}`,
        `العنوان: ${COMPANY.address.ar}`,
        `البريد الإلكتروني: ${COMPANY.email}`,
        `الهاتف: ${COMPANY.phone}`,
      ],
    },
  ],
  disclaimerLabel: SHARED_DISCLAIMER_LABEL.ar,
  disclaimer: SHARED_DISCLAIMER.ar,
};

// ── Lookup ─────────────────────────────────────────────────────────────────

export type LegalDocId = "privacy" | "terms";

const DOCS: Record<Locale, Record<LegalDocId, LegalDoc>> = {
  en: { privacy: privacyEn, terms: termsEn },
  ar: { privacy: privacyAr, terms: termsAr },
};

export function getLegalDoc(locale: Locale, id: LegalDocId): LegalDoc {
  return DOCS[locale][id];
}
