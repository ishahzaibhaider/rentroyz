import type { Locale } from "./i18n/request";

// Legal content for the Privacy Policy and Terms & Conditions pages.
//
// These documents were drafted against the public legal framework of the
// Kingdom of Saudi Arabia — the Personal Data Protection Law, the E-Commerce
// Law, the Anti-Cyber Crime Law, the Tourism Law, and the VAT Law — and
// reflect standard practice for a short-term-rental property operator. They
// are templates: a licensed Saudi legal practitioner should review them
// before they are relied on, and every `[bracketed]` placeholder must be
// filled in with the company's registered details. See `disclaimer` below,
// which is also surfaced on the page itself.

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
  disclaimerLabel: string;
  disclaimer: string;
};

// Official company identifiers — provided by the client and already shown in
// the site footer. The VAT number is the ZATCA registration; the CR number is
// the Ministry of Commerce commercial registration that serves as the
// business licence. `legalName` and `address` are genuine unknowns and must
// be supplied by the client before submission.
export const COMPANY = {
  brandName: { en: "Rent Royz", ar: "رنت رويز" },
  legalName: {
    en: "[Registered legal entity name]",
    ar: "[الاسم النظامي المسجّل للمنشأة]",
  },
  cr: "7053041203",
  vat: "314497025100003",
  address: {
    en: "[Registered business address, Kingdom of Saudi Arabia]",
    ar: "[العنوان الوطني المسجّل للمنشأة، المملكة العربية السعودية]",
  },
  email: "info@rentroyz.com",
  phone: "+966 55 650 0470",
} as const;

const SHARED_DISCLAIMER_LABEL = {
  en: "Important notice",
  ar: "تنويه مهم",
};

const SHARED_DISCLAIMER = {
  en: "This document is provided for general information. It was prepared against the publicly available legal framework of the Kingdom of Saudi Arabia and reflects standard practice; it does not constitute legal advice. Rent Royz recommends that it be reviewed by a licensed Saudi legal practitioner, and any items shown in square brackets must be completed with the company's registered details before this document is relied upon.",
  ar: "هذا المستند مُقدَّم لأغراض المعلومات العامة. وقد أُعِدَّ استناداً إلى الإطار النظامي المتاح للعموم في المملكة العربية السعودية ووفق الممارسات المعتادة، ولا يُعدّ استشارة قانونية. توصي رنت رويز بمراجعته من قِبل ممارس قانوني سعودي مرخّص، ويجب استكمال أي بنود تظهر بين قوسين مربّعين ببيانات المنشأة المسجّلة قبل الاعتماد عليه.",
};

// ── English ────────────────────────────────────────────────────────────────

const privacyEn: LegalDoc = {
  title: "Privacy Policy",
  tagline:
    "How Rent Royz collects, uses, discloses, and protects personal data.",
  lastUpdatedLabel: "Last updated",
  lastUpdated: "14 May 2026",
  intro: [
    "Rent Royz (“Rent Royz”, “we”, “us”, or “our”) operates the website rentroyz.com and provides short-term and mid-term rental property management services in the Kingdom of Saudi Arabia. We furnish properties on behalf of their owners, list them on booking platforms and our own channels, and manage the end-to-end guest operation.",
    "This Privacy Policy explains how we collect, use, disclose, store, and protect your personal data, and the rights available to you. It is intended to comply with the Personal Data Protection Law of the Kingdom of Saudi Arabia, issued by Royal Decree No. M/19 dated 9/2/1443H and amended by Royal Decree No. M/148 dated 5/9/1444H, together with its Implementing Regulations, as administered by the Saudi Data and Artificial Intelligence Authority (SDAIA).",
    "By using our website or our services, you confirm that you have read and understood this Policy. If you do not agree with it, please do not use the website or engage our services.",
  ],
  sections: [
    {
      heading: "Who we are",
      body: [
        "The party responsible for your personal data (the data controller) is Rent Royz, a business registered in the Kingdom of Saudi Arabia.",
      ],
      items: [
        `Registered name: ${COMPANY.legalName.en}`,
        `Trading as: ${COMPANY.brandName.en}`,
        `Commercial Registration (CR) No.: ${COMPANY.cr}`,
        `VAT Registration No.: ${COMPANY.vat}`,
        `Registered address: ${COMPANY.address.en}`,
        `Email: ${COMPANY.email}`,
        `Phone: ${COMPANY.phone}`,
      ],
    },
    {
      heading: "Personal data we collect",
      body: [
        "Depending on how you interact with us — as a property owner, a guest, or a website visitor — we may collect the following categories of personal data:",
      ],
      items: [
        "Identity data — full name, nationality, National ID or Iqama number, and date of birth where required for verification.",
        "Contact data — email address, telephone number, and postal or national address.",
        "Property data — for owners: property location, title deed or ownership documentation, property photographs, and details of fixtures and furnishings.",
        "Financial data — bank account or IBAN details for payouts, VAT registration details where applicable, and records of payments and revenue shares.",
        "Booking and guest data — reservation details, stay dates, and communications relating to a booking.",
        "Technical data — IP address, browser type and version, device information, and data collected through cookies and similar technologies when you visit our website.",
        "Communications data — the content of enquiries, messages, and correspondence you exchange with us.",
      ],
    },
    {
      heading: "How we collect your data",
      items: [
        "Directly from you — when you complete a form on our website, request a revenue estimate, contact us, or go through owner onboarding.",
        "Automatically — through cookies and analytics tools when you browse our website.",
        "From third parties — from booking platforms such as Airbnb and Booking.com, from payment service providers, and from government or verification services where required to deliver or to lawfully provide our services.",
      ],
    },
    {
      heading: "Purposes for which we use your data",
      body: [
        "We process personal data only where there is a lawful basis to do so under the Personal Data Protection Law — including the performance of a contract with you, compliance with a legal obligation, our legitimate interests, or your consent. We use personal data to:",
      ],
      items: [
        "Provide our property management services, including furnishing, listing, and operating properties.",
        "Create and manage listings on booking platforms and process reservations.",
        "Process payments, revenue shares, and payouts, and maintain accounting and tax records.",
        "Verify identity and ownership and carry out related due-diligence checks.",
        "Communicate with you about your property, your account, bookings, and service updates.",
        "Comply with legal and regulatory obligations, including tourism licensing, taxation, and anti-financial-crime requirements.",
        "Operate, maintain, secure, and improve our website and services.",
        "Send marketing communications where you have consented to receive them; you may withdraw that consent at any time.",
      ],
    },
    {
      heading: "Cookies and analytics",
      body: [
        "Our website uses cookies and similar technologies to keep the site functioning, to remember your language preference, and to understand how visitors use the site so that we can improve it. You can control or disable cookies through your browser settings; disabling some cookies may affect how the website works.",
      ],
    },
    {
      heading: "Disclosure of your data",
      body: [
        "We do not sell your personal data. We may disclose it only as necessary and as permitted by law, to:",
      ],
      items: [
        "Booking platforms — such as Airbnb and Booking.com — to the extent needed to list properties and manage reservations.",
        "Payment service providers and banks — to process payments and payouts.",
        "Service providers acting on our behalf — such as cleaning, maintenance, photography, scheduling, and hosting providers — who are bound to protect the data.",
        "Professional advisers — such as legal, accounting, and audit advisers.",
        "Government, regulatory, and judicial authorities — including the Ministry of Tourism, the Zakat, Tax and Customs Authority (ZATCA), and SDAIA — where disclosure is required by law or to establish, exercise, or defend legal rights.",
      ],
    },
    {
      heading: "Transfer of data outside the Kingdom",
      body: [
        "Your personal data is primarily processed and stored within the Kingdom of Saudi Arabia. Where any transfer or processing outside the Kingdom is necessary — for example through an international booking platform — it will be carried out only in accordance with the conditions and safeguards required by the Personal Data Protection Law and its Implementing Regulations.",
      ],
    },
    {
      heading: "Data retention",
      body: [
        "We keep personal data only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy any legal, accounting, tax, or regulatory requirements. Financial and tax records are retained for the period required by Saudi law. When data is no longer needed, it is securely destroyed or anonymised.",
      ],
    },
    {
      heading: "Data security",
      body: [
        "We apply appropriate technical and organisational measures to protect personal data against loss, unauthorised access, alteration, or disclosure. Access to personal data is limited to those who need it to perform their role. While no method of transmission or storage is completely secure, we work to protect your data and to maintain the safeguards required by law.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Under the Personal Data Protection Law, and subject to its conditions and exceptions, you have the right to:",
      ],
      items: [
        "Be informed of the legal basis and purpose for collecting your personal data.",
        "Access your personal data held by us.",
        "Request a copy of your personal data in a readable format.",
        "Request the correction of personal data that is inaccurate, incomplete, or out of date.",
        "Request the destruction of your personal data where it is no longer needed.",
        "Withdraw your consent to the processing of your personal data at any time, where processing is based on consent.",
      ],
    },
    {
      heading: "How to exercise your rights",
      body: [
        `To exercise any of these rights, contact us at ${COMPANY.email} or ${COMPANY.phone}. We will respond to your request within the period required by law. There is normally no charge for exercising your rights.`,
      ],
    },
    {
      heading: "Children's privacy",
      body: [
        "Our website and services are directed to property owners and adult users. We do not knowingly collect personal data from minors. If you believe a minor has provided us with personal data, please contact us so that we can take appropriate action.",
      ],
    },
    {
      heading: "Changes to this Policy",
      body: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices or in the law. The current version, with its “Last updated” date, will always be available on this page. Significant changes will be communicated where appropriate.",
      ],
    },
    {
      heading: "Contact us and complaints",
      body: [
        `If you have any question, request, or complaint about this Policy or about how we handle your personal data, please contact us at ${COMPANY.email} or ${COMPANY.phone}.`,
        "If you are not satisfied with our response, you have the right to lodge a complaint with the Saudi Data and Artificial Intelligence Authority (SDAIA) as the competent supervisory authority in the Kingdom of Saudi Arabia.",
      ],
    },
  ],
  disclaimerLabel: SHARED_DISCLAIMER_LABEL.en,
  disclaimer: SHARED_DISCLAIMER.en,
};

const termsEn: LegalDoc = {
  title: "Terms & Conditions",
  tagline:
    "The terms governing your use of the Rent Royz website and services.",
  lastUpdatedLabel: "Last updated",
  lastUpdated: "14 May 2026",
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
        "We may update these Terms from time to time. The current version, with its “Last updated” date, will always be available on this page. Your continued use of the website after a change takes effect constitutes acceptance of the updated Terms.",
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
        `Registered name: ${COMPANY.legalName.en}`,
        `Trading as: ${COMPANY.brandName.en}`,
        `Commercial Registration (CR) No.: ${COMPANY.cr}`,
        `VAT Registration No.: ${COMPANY.vat}`,
        `Registered address: ${COMPANY.address.en}`,
        `Email: ${COMPANY.email}`,
        `Phone: ${COMPANY.phone}`,
      ],
    },
  ],
  disclaimerLabel: SHARED_DISCLAIMER_LABEL.en,
  disclaimer: SHARED_DISCLAIMER.en,
};

// ── Arabic ─────────────────────────────────────────────────────────────────

const privacyAr: LegalDoc = {
  title: "سياسة الخصوصية",
  tagline: "كيف تجمع رنت رويز البيانات الشخصية وتستخدمها وتُفصح عنها وتحميها.",
  lastUpdatedLabel: "آخر تحديث",
  lastUpdated: "١٤ مايو ٢٠٢٦",
  intro: [
    "تُشغّل رنت رويز («رنت رويز» أو «نحن») الموقع الإلكتروني rentroyz.com وتقدّم خدمات إدارة العقارات للإيجار قصير ومتوسط الأجل في المملكة العربية السعودية. نقوم بتأثيث العقارات نيابةً عن مُلّاكها، وإدراجها على منصات الحجز وقنواتنا الخاصة، وإدارة تشغيل الضيوف بالكامل.",
    "توضّح سياسة الخصوصية هذه كيفية جمعنا لبياناتك الشخصية واستخدامها والإفصاح عنها وتخزينها وحمايتها، والحقوق المتاحة لك. وقد أُعِدَّت بما يتوافق مع نظام حماية البيانات الشخصية في المملكة العربية السعودية الصادر بالمرسوم الملكي رقم (م/١٩) وتاريخ ٩/٢/١٤٤٣هـ، والمعدّل بالمرسوم الملكي رقم (م/١٤٨) وتاريخ ٥/٩/١٤٤٤هـ، ولائحته التنفيذية، وبإشراف الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا).",
    "باستخدامك لموقعنا الإلكتروني أو خدماتنا، فإنك تُقِرّ بأنك قرأت هذه السياسة وفهمتها. وإذا كنت لا توافق عليها، فيُرجى عدم استخدام الموقع أو الاستعانة بخدماتنا.",
  ],
  sections: [
    {
      heading: "من نحن",
      body: [
        "الجهة المسؤولة عن بياناتك الشخصية (جهة التحكّم بالبيانات) هي رنت رويز، وهي منشأة مسجّلة في المملكة العربية السعودية.",
      ],
      items: [
        `الاسم المسجّل: ${COMPANY.legalName.ar}`,
        `الاسم التجاري: ${COMPANY.brandName.ar}`,
        `رقم السجل التجاري: ${COMPANY.cr}`,
        `الرقم الضريبي (ضريبة القيمة المضافة): ${COMPANY.vat}`,
        `العنوان المسجّل: ${COMPANY.address.ar}`,
        `البريد الإلكتروني: ${COMPANY.email}`,
        `الهاتف: ${COMPANY.phone}`,
      ],
    },
    {
      heading: "البيانات الشخصية التي نجمعها",
      body: [
        "بحسب طريقة تعاملك معنا — بصفتك مالك عقار أو ضيفاً أو زائراً للموقع — قد نجمع الفئات التالية من البيانات الشخصية:",
      ],
      items: [
        "بيانات الهوية — الاسم الكامل والجنسية ورقم الهوية الوطنية أو الإقامة وتاريخ الميلاد عند الحاجة إليه للتحقق.",
        "بيانات التواصل — البريد الإلكتروني ورقم الهاتف والعنوان البريدي أو الوطني.",
        "بيانات العقار — بالنسبة للمُلّاك: موقع العقار وصك الملكية أو وثائق إثبات الملكية وصور العقار وتفاصيل التجهيزات والمفروشات.",
        "البيانات المالية — بيانات الحساب البنكي أو الآيبان لأغراض التحويلات، وبيانات التسجيل الضريبي عند الاقتضاء، وسجلات المدفوعات وحصص الإيرادات.",
        "بيانات الحجز والضيوف — تفاصيل الحجز وتواريخ الإقامة والمراسلات المتعلقة بالحجز.",
        "البيانات التقنية — عنوان بروتوكول الإنترنت ونوع المتصفح وإصداره ومعلومات الجهاز والبيانات التي تُجمَع عبر ملفات تعريف الارتباط والتقنيات المشابهة عند زيارتك للموقع.",
        "بيانات المراسلات — مضمون الاستفسارات والرسائل والمراسلات التي تتبادلها معنا.",
      ],
    },
    {
      heading: "كيف نجمع بياناتك",
      items: [
        "مباشرةً منك — عند تعبئة نموذج على موقعنا أو طلب تقدير للإيرادات أو التواصل معنا أو خلال إجراءات تسجيل المالك.",
        "تلقائياً — عبر ملفات تعريف الارتباط وأدوات التحليل عند تصفّحك للموقع.",
        "من أطراف ثالثة — من منصات الحجز مثل Airbnb وBooking.com، ومن مزوّدي خدمات الدفع، ومن الجهات الحكومية أو خدمات التحقق عند الحاجة لتقديم خدماتنا بصورة نظامية.",
      ],
    },
    {
      heading: "أغراض استخدام بياناتك",
      body: [
        "لا نعالج البيانات الشخصية إلا متى وُجِد أساس نظامي لذلك بموجب نظام حماية البيانات الشخصية — بما في ذلك تنفيذ عقد معك، أو الامتثال لالتزام نظامي، أو المصلحة المشروعة، أو موافقتك. ونستخدم البيانات الشخصية للأغراض التالية:",
      ],
      items: [
        "تقديم خدمات إدارة العقارات، بما يشمل التأثيث والإدراج والتشغيل.",
        "إنشاء الإعلانات وإدارتها على منصات الحجز ومعالجة الحجوزات.",
        "معالجة المدفوعات وحصص الإيرادات والتحويلات، ومسك السجلات المحاسبية والضريبية.",
        "التحقق من الهوية والملكية وإجراء فحوصات العناية الواجبة ذات الصلة.",
        "التواصل معك بشأن عقارك وحسابك وحجوزاتك وتحديثات الخدمة.",
        "الامتثال للالتزامات النظامية والرقابية، بما في ذلك متطلبات الترخيص السياحي والضرائب ومكافحة الجرائم المالية.",
        "تشغيل موقعنا وخدماتنا وصيانتها وتأمينها وتحسينها.",
        "إرسال الرسائل التسويقية في حال موافقتك على تلقّيها، ويمكنك سحب هذه الموافقة في أي وقت.",
      ],
    },
    {
      heading: "ملفات تعريف الارتباط وأدوات التحليل",
      body: [
        "يستخدم موقعنا ملفات تعريف الارتباط والتقنيات المشابهة للحفاظ على عمل الموقع، وتذكّر تفضيل اللغة لديك، وفهم طريقة استخدام الزوار للموقع بهدف تحسينه. ويمكنك التحكم في ملفات تعريف الارتباط أو تعطيلها من إعدادات متصفحك، علماً بأن تعطيل بعضها قد يؤثر في طريقة عمل الموقع.",
      ],
    },
    {
      heading: "الإفصاح عن بياناتك",
      body: [
        "لا نبيع بياناتك الشخصية. وقد نُفصح عنها فقط بالقدر اللازم وبما يسمح به النظام، إلى الجهات التالية:",
      ],
      items: [
        "منصات الحجز — مثل Airbnb وBooking.com — بالقدر اللازم لإدراج العقارات وإدارة الحجوزات.",
        "مزوّدو خدمات الدفع والبنوك — لمعالجة المدفوعات والتحويلات.",
        "مزوّدو الخدمات الذين يعملون نيابةً عنا — مثل مزوّدي خدمات التنظيف والصيانة والتصوير والجدولة والاستضافة — وهم ملزمون بحماية البيانات.",
        "المستشارون المهنيون — مثل المستشارين القانونيين والمحاسبين ومراجعي الحسابات.",
        "الجهات الحكومية والرقابية والقضائية — بما في ذلك وزارة السياحة وهيئة الزكاة والضريبة والجمارك والهيئة السعودية للبيانات والذكاء الاصطناعي — متى كان الإفصاح مطلوباً نظاماً أو لإثبات حق نظامي أو ممارسته أو الدفاع عنه.",
      ],
    },
    {
      heading: "نقل البيانات خارج المملكة",
      body: [
        "تُعالَج بياناتك الشخصية وتُخزَّن بصورة أساسية داخل المملكة العربية السعودية. وعند الحاجة إلى أي نقل أو معالجة خارج المملكة — مثلاً عبر منصة حجز دولية — فلن يتم ذلك إلا وفق الشروط والضمانات التي يقتضيها نظام حماية البيانات الشخصية ولائحته التنفيذية.",
      ],
    },
    {
      heading: "مدة الاحتفاظ بالبيانات",
      body: [
        "نحتفظ بالبيانات الشخصية للمدة اللازمة فقط لتحقيق الأغراض التي جُمِعت من أجلها، بما في ذلك الوفاء بأي متطلبات نظامية أو محاسبية أو ضريبية أو رقابية. ويُحتفظ بالسجلات المالية والضريبية للمدة التي يقتضيها النظام السعودي. وعند انتفاء الحاجة إلى البيانات، يتم إتلافها أو إخفاء هويتها بصورة آمنة.",
      ],
    },
    {
      heading: "أمن البيانات",
      body: [
        "نطبّق تدابير تقنية وتنظيمية مناسبة لحماية البيانات الشخصية من الفقد أو الوصول أو التعديل أو الإفصاح غير المصرّح به. ويقتصر الوصول إلى البيانات الشخصية على من يحتاجها لأداء مهامه. ومع أنه لا توجد وسيلة نقل أو تخزين آمنة تماماً، فإننا نعمل على حماية بياناتك والمحافظة على الضمانات التي يقتضيها النظام.",
      ],
    },
    {
      heading: "حقوقك",
      body: [
        "بموجب نظام حماية البيانات الشخصية، ومع مراعاة شروطه واستثناءاته، يحق لك ما يلي:",
      ],
      items: [
        "العلم بالأساس النظامي والغرض من جمع بياناتك الشخصية.",
        "الوصول إلى بياناتك الشخصية المحفوظة لدينا.",
        "طلب الحصول على نسخة من بياناتك الشخصية بصيغة مقروءة.",
        "طلب تصحيح البيانات الشخصية غير الصحيحة أو غير المكتملة أو غير المحدّثة.",
        "طلب إتلاف بياناتك الشخصية متى انتفت الحاجة إليها.",
        "سحب موافقتك على معالجة بياناتك الشخصية في أي وقت، متى كانت المعالجة قائمة على الموافقة.",
      ],
    },
    {
      heading: "كيفية ممارسة حقوقك",
      body: [
        `لممارسة أي من هذه الحقوق، تواصل معنا عبر البريد الإلكتروني ${COMPANY.email} أو الهاتف ${COMPANY.phone}. وسنردّ على طلبك خلال المدة التي يقتضيها النظام. ولا تُفرض في العادة أي رسوم مقابل ممارسة حقوقك.`,
      ],
    },
    {
      heading: "خصوصية الأطفال",
      body: [
        "موقعنا وخدماتنا موجّهة لمُلّاك العقارات والمستخدمين البالغين. ولا نجمع عن قصد بيانات شخصية من القُصّر. وإذا كنت تعتقد أن قاصراً قد زوّدنا ببيانات شخصية، فيُرجى التواصل معنا لاتخاذ الإجراء المناسب.",
      ],
    },
    {
      heading: "التعديلات على هذه السياسة",
      body: [
        "قد نُحدّث سياسة الخصوصية هذه من حين لآخر لتعكس تغييرات في ممارساتنا أو في الأنظمة. وستظل النسخة الحالية، مع تاريخ «آخر تحديث»، متاحة دائماً على هذه الصفحة. وسيتم الإبلاغ عن التغييرات الجوهرية عند الاقتضاء.",
      ],
    },
    {
      heading: "التواصل معنا وتقديم الشكاوى",
      body: [
        `إذا كان لديك أي سؤال أو طلب أو شكوى بخصوص هذه السياسة أو طريقة تعاملنا مع بياناتك الشخصية، فيُرجى التواصل معنا عبر ${COMPANY.email} أو ${COMPANY.phone}.`,
        "وإذا لم تكن راضياً عن ردّنا، فيحق لك تقديم شكوى إلى الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا) بصفتها الجهة الرقابية المختصة في المملكة العربية السعودية.",
      ],
    },
  ],
  disclaimerLabel: SHARED_DISCLAIMER_LABEL.ar,
  disclaimer: SHARED_DISCLAIMER.ar,
};

const termsAr: LegalDoc = {
  title: "الشروط والأحكام",
  tagline: "الشروط التي تحكم استخدامك لموقع رنت رويز وخدماتها.",
  lastUpdatedLabel: "آخر تحديث",
  lastUpdated: "١٤ مايو ٢٠٢٦",
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
        `الاسم المسجّل: ${COMPANY.legalName.ar}`,
        `الاسم التجاري: ${COMPANY.brandName.ar}`,
        `رقم السجل التجاري: ${COMPANY.cr}`,
        `الرقم الضريبي (ضريبة القيمة المضافة): ${COMPANY.vat}`,
        `العنوان المسجّل: ${COMPANY.address.ar}`,
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
