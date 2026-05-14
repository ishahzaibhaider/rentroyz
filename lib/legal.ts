import type { Locale } from "./i18n/request";

// Legal content for the Privacy Policy, Terms & Conditions, and Payment &
// Refund Policy pages.
//
// All three documents are client-provided. The Arabic text was supplied
// verbatim by the client (Rent Royz) on 14/05/2026 and must not be edited
// without their sign-off. The client sent Privacy in both languages; Terms
// and the Payment & Refund Policy were sent in Arabic only, so the English
// versions here are faithful translations — they carry a short translation
// note pointing to the Arabic original as the authoritative text.

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
  /** Optional notice shown in a callout box above the content. Used here for
      the translation note on the English Terms / Payment documents. */
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

// Shown on the English Terms / Payment documents, which are translations of
// the Arabic originals the client supplied.
const TRANSLATION_NOTE = {
  label: "Translation note",
  text: "This English text is a translation provided for convenience. The Arabic version of this document is the authoritative text and prevails in the event of any discrepancy.",
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

// English translation of the client's Arabic Terms & Conditions (supplied
// 14/05/2026). The Arabic version (`termsAr`) is authoritative.
const termsEn: LegalDoc = {
  title: "Terms & Conditions",
  tagline:
    "The terms governing bookings and use of the RentRoyz website and services.",
  lastUpdatedLabel: "Last Updated",
  lastUpdated: "14/05/2026",
  intro: [],
  sections: [
    {
      heading: "Acceptance of the Terms",
      body: [
        "By using the RentRoyz website or completing any booking or payment through it, the customer acknowledges that they have read, understood, and agreed to these Terms & Conditions, including the payment, cancellation, and refund policy.",
      ],
    },
    {
      heading: "Nature of the Service",
      body: [
        "RentRoyz provides services relating to daily bookings and the management and operation of residential, tourism, or similar real-estate units. The service may be provided directly by RentRoyz or through partners, owners, operators, or external booking platforms.",
      ],
    },
    {
      heading: "Accuracy of Information",
      body: [
        "The customer undertakes to provide correct and up-to-date information when booking, including name, mobile number, email address, number of guests, and check-in and check-out dates.",
        "RentRoyz reserves the right to cancel the booking or refuse entry if any incorrect or misleading information is found.",
      ],
    },
    {
      heading: "Booking Confirmation",
      body: [
        "A booking is not considered confirmed until the required payment has been received and an official confirmation has been issued by RentRoyz or by the platform through which the booking was made.",
        "Some bookings may be subject to identity verification or the completion of additional requirements before check-in.",
      ],
    },
    {
      heading: "Check-in and Check-out",
      body: [
        "The customer must comply with the check-in and check-out times stated in the booking.",
        "Any delay in checking out without prior approval may result in additional charges or in the customer bearing any losses resulting from the delay.",
      ],
    },
    {
      heading: "Use of the Unit",
      body: [
        "The customer undertakes to use the unit in a lawful, safe, and careful manner, and not to use it for any purpose that violates the law, public morals, or the booking terms.",
        "The customer also undertakes not to disturb the neighbours, hold unauthorised gatherings, exceed the permitted number of guests, or cause any damage to the unit or its contents.",
      ],
    },
    {
      heading: "Damages and Liability",
      body: [
        "The customer is responsible for any damage or loss occurring to the unit or its contents during their stay, where it results from misuse, negligence, or breach of the terms.",
        "RentRoyz is entitled to claim appropriate compensation from the customer for the resulting damages or costs.",
      ],
    },
    {
      heading: "Cleanliness and Maintenance",
      body: [
        "RentRoyz or the operating party undertakes to deliver the unit in a condition suitable for use, and the customer must keep the unit and its contents clean throughout the stay.",
        "If there are any observations regarding cleanliness or maintenance, RentRoyz must be notified immediately upon check-in or within a reasonable period of discovering the issue.",
      ],
    },
    {
      heading: "Photographs and Specifications",
      body: [
        "RentRoyz makes every effort to display accurate photographs and information about the units. Nevertheless, there may be minor differences in furniture, décor, or arrangement due to operational updates or the nature of the unit.",
        "Minor differences are not grounds for a refund unless there is a material difference that affects the use of the unit or contradicts what was confirmed to the customer.",
      ],
    },
    {
      heading: "External Platforms",
      body: [
        "If a booking is made through an external platform, the customer agrees to comply with the terms and conditions of that platform, including its payment, cancellation, and refund policy.",
        "In the event of any conflict between RentRoyz's policy and the platform's policy, the platform's policy applies to the booking made through it, unless the applicable laws provide otherwise.",
      ],
    },
    {
      heading: "Emergencies and Force Majeure",
      body: [
        "RentRoyz is not liable for any delay, cancellation, or inability to provide the service resulting from circumstances beyond its control, such as natural disasters, interruption of public utilities, government decisions, emergency incidents, or any force majeure event.",
        "In such cases, RentRoyz will work to find a suitable solution as far as possible.",
      ],
    },
    {
      heading: "Privacy and Data",
      body: [
        "RentRoyz handles customer data in accordance with the Privacy Policy published on the website, and in compliance with the applicable laws of the Kingdom of Saudi Arabia.",
        "By using the website, the customer consents to the collection and processing of the data necessary to complete the booking, communication, payment, verification, and customer service.",
      ],
    },
    {
      heading: "Complaints and Communication",
      body: [
        "If there is any complaint or observation, the customer may contact RentRoyz through the official communication channels shown on the website.",
        "RentRoyz undertakes to review complaints seriously and to work on resolving them within a reasonable period according to the nature of the case.",
      ],
    },
    {
      heading: "Amendment of the Terms",
      body: [
        "RentRoyz reserves the right to amend these Terms & Conditions or the Payment & Refund Policy from time to time, and the version published on the website at the time of booking or at the time of using the service shall apply.",
      ],
    },
    {
      heading: "Governing Law",
      body: [
        "These Terms & Conditions are governed by the applicable laws of the Kingdom of Saudi Arabia, and the competent authorities in the Kingdom shall be the point of reference in the event of any dispute that is not resolved amicably.",
      ],
    },
  ],
  disclaimerLabel: TRANSLATION_NOTE.label,
  disclaimer: TRANSLATION_NOTE.text,
};

// English translation of the client's Arabic Payment & Refund Policy
// (supplied 14/05/2026). The Arabic version (`paymentAr`) is authoritative.
const paymentEn: LegalDoc = {
  title: "Payment & Refund Policy",
  tagline: "How RentRoyz handles payments, cancellations, and refunds.",
  lastUpdatedLabel: "Last Updated",
  lastUpdated: "14/05/2026",
  intro: [],
  sections: [
    {
      heading: "Payment Policy",
      body: [
        "All payments for bookings or services provided through RentRoyz are made via the payment methods approved on the website or through the payment channels designated by the company.",
        "The customer must pay the full required amount to confirm the booking or service. A booking is not considered confirmed until the payment has been received successfully and the booking confirmation has been issued by RentRoyz or by the platform through which the booking was made.",
        "Depending on the nature of the booking, the amounts paid include the cost of the stay or service, operational fees, cleaning fees, taxes, and any additional fees that are explained to the customer before the payment is completed.",
      ],
    },
    {
      heading: "Non-Refundable Amounts",
      body: [
        "All amounts paid are considered non-refundable after the booking is confirmed, except in cases where a material defect in the unit is established that prevents the customer from benefiting from the booking as agreed.",
        "This includes, but is not limited to: a material operational problem in the unit, the unit not being ready for occupancy, a material difference between the confirmed unit and the unit delivered to the customer, or a significant defect in essential services such as electricity, water, or air conditioning — where the defect existed before or at the time of check-in and was not resolved within a reasonable period.",
        "The refund does not cover cases resulting from a change in the customer's wishes, a no-show, late arrival, early departure, a change of personal plans, or failure to read the booking details and policies before payment.",
      ],
    },
    {
      heading: "Refunds in the Event of a Defect in the Unit",
      body: [
        "If there is a defect in the unit, the customer must notify RentRoyz immediately through the approved communication channels, providing evidence of the issue such as photographs, video, or a clear description of the situation.",
        "RentRoyz reviews and verifies the case, and one of the following actions may be taken at the company's discretion and according to the nature of the case: providing a suitable solution or urgent maintenance, moving the customer to a suitable available alternative unit, partial compensation, or a full or partial refund of the amount paid where it is established that the defect prevents benefit from the booking and no suitable alternative was provided.",
        "Each case is assessed based on its circumstances, and a minor observation or an immaterial defect is not automatically grounds for a refund.",
      ],
    },
    {
      heading: "Bookings Made Through External Platforms",
      body: [
        "If the booking is made through an external platform such as Booking.com, Airbnb, or any other booking platform, the cancellation and refund policy is primarily subject to the policy of the platform through which the booking was made.",
        "In this case, RentRoyz is not obliged to issue any direct refund outside the platform's mechanism, and the customer must submit the cancellation or refund request through the same platform on which the booking was completed.",
        "RentRoyz may assist in reviewing the case or providing the platform with the necessary information, but the final decision regarding the refund or cancellation is made in accordance with the platform's policy and its approved booking terms.",
      ],
    },
    {
      heading: "Cancellation by the Customer",
      body: [
        "If the customer wishes to cancel the booking after it has been confirmed, the cancellation policy stated at the time of booking applies.",
        "If the booking is classified as non-refundable, no amounts paid will be returned, except in cases where a material defect in the unit is established or the service cannot be provided for a reason attributable to RentRoyz.",
      ],
    },
    {
      heading: "Cancellation by RentRoyz",
      body: [
        "RentRoyz reserves the right to cancel or amend the booking in cases of necessity, such as emergency operational circumstances, the inability to prepare the unit, a defect that prevents its use, or any reason beyond its control.",
        "In such cases, RentRoyz will work to provide a suitable alternative whenever possible, or refund the amount paid according to the case.",
      ],
    },
    {
      heading: "Additional Fees",
      body: [
        "Additional fees may be charged to the customer in the event of damage to the unit, loss of keys or access cards, breach of the usage terms, exceeding the permitted number of guests, smoking in a unit not designated for smoking, or late check-out without prior approval.",
        "These fees are calculated based on the value of the damage, the actual cost, or the policy stated on the booking page.",
      ],
    },
    {
      heading: "Refund Processing Time",
      body: [
        "If a refund is approved, the amount is processed within a reasonable period depending on the payment method used, and the time for the amount to reach the customer's account may vary according to the bank or payment service provider.",
        "If the booking was made through an external platform, the refund period and mechanism are subject to that platform's procedures.",
      ],
    },
  ],
  disclaimerLabel: TRANSLATION_NOTE.label,
  disclaimer: TRANSLATION_NOTE.text,
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

// Client-provided text — supplied by Rent Royz on 14/05/2026, used verbatim.
const termsAr: LegalDoc = {
  title: "الشروط والأحكام",
  tagline: "الشروط التي تحكم الحجوزات واستخدام موقع RentRoyz وخدماته.",
  lastUpdatedLabel: "آخر تحديث",
  lastUpdated: "14/05/2026",
  intro: [],
  sections: [
    {
      heading: "القبول بالشروط",
      body: [
        "باستخدام موقع RentRoyz أو إتمام أي حجز أو دفع من خلاله، يقر العميل بأنه قرأ وفهم ووافق على هذه الشروط والأحكام، بما في ذلك سياسة الدفع، الإلغاء، والاسترداد.",
      ],
    },
    {
      heading: "طبيعة الخدمة",
      body: [
        "تقدم RentRoyz خدمات متعلقة بالحجوزات اليومية وإدارة وتشغيل الوحدات السكنية أو السياحية أو العقارية المشابهة، وقد تكون الخدمة مقدمة مباشرة من RentRoyz أو من خلال شركاء أو ملاك أو مشغلين أو منصات حجز خارجية.",
      ],
    },
    {
      heading: "دقة البيانات",
      body: [
        "يلتزم العميل بتقديم بيانات صحيحة ومحدثة عند الحجز، بما في ذلك الاسم، رقم الجوال، البريد الإلكتروني، عدد الضيوف، وتاريخ الدخول والخروج.",
        "تحتفظ RentRoyz بحق إلغاء الحجز أو رفض الدخول إذا تبين وجود معلومات غير صحيحة أو مضللة.",
      ],
    },
    {
      heading: "تأكيد الحجز",
      body: [
        "لا يعتبر الحجز مؤكدًا إلا بعد استلام الدفع المطلوب وصدور تأكيد رسمي من RentRoyz أو من المنصة التي تم الحجز من خلالها.",
        "قد تخضع بعض الحجوزات للتحقق من الهوية أو استكمال متطلبات إضافية قبل الدخول.",
      ],
    },
    {
      heading: "الدخول والخروج",
      body: [
        "يجب على العميل الالتزام بأوقات الدخول والخروج الموضحة في الحجز.",
        "أي تأخير في الخروج دون موافقة مسبقة قد يترتب عليه رسوم إضافية أو تحميل العميل أي خسائر ناتجة عن التأخير.",
      ],
    },
    {
      heading: "استخدام الوحدة",
      body: [
        "يلتزم العميل باستخدام الوحدة بطريقة نظامية وآمنة ومحافظة، وعدم استخدامها لأي غرض مخالف للأنظمة أو الآداب العامة أو شروط الحجز.",
        "كما يلتزم العميل بعدم إزعاج الجيران، أو إقامة تجمعات غير مصرح بها، أو زيادة عدد الضيوف عن العدد المسموح، أو إحداث أي تلفيات في الوحدة أو محتوياتها.",
      ],
    },
    {
      heading: "الأضرار والمسؤولية",
      body: [
        "يتحمل العميل المسؤولية عن أي أضرار أو خسائر تحدث في الوحدة أو محتوياتها خلال فترة إقامته، إذا كانت ناتجة عن سوء استخدام أو إهمال أو مخالفة للشروط.",
        "يحق لـ RentRoyz مطالبة العميل بتعويض مناسب عن الأضرار أو التكاليف الناتجة.",
      ],
    },
    {
      heading: "النظافة والصيانة",
      body: [
        "تلتزم RentRoyz أو الجهة المشغلة بتسليم الوحدة بحالة مناسبة للاستخدام، وعلى العميل المحافظة على نظافة الوحدة ومحتوياتها طوال فترة الإقامة.",
        "في حال وجود ملاحظات على النظافة أو الصيانة، يجب إبلاغ RentRoyz فورًا عند الدخول أو خلال مدة معقولة من اكتشاف المشكلة.",
      ],
    },
    {
      heading: "الصور والمواصفات",
      body: [
        "تحرص RentRoyz على عرض صور ومعلومات دقيقة قدر الإمكان عن الوحدات. ومع ذلك، قد توجد اختلافات بسيطة في الأثاث أو الديكور أو الترتيب حسب التحديثات التشغيلية أو طبيعة الوحدة.",
        "لا تعد الاختلافات البسيطة سببًا للاسترداد ما لم يكن هناك اختلاف جوهري يؤثر على استخدام الوحدة أو يخالف ما تم تأكيده للعميل.",
      ],
    },
    {
      heading: "المنصات الخارجية",
      body: [
        "في حال تم الحجز من خلال منصة خارجية، فإن العميل يوافق على الالتزام بشروط وأحكام تلك المنصة، بما في ذلك سياسة الدفع والإلغاء والاسترداد.",
        "وفي حال وجود تعارض بين سياسة RentRoyz وسياسة المنصة، تسري سياسة المنصة على الحجز الذي تم من خلالها، ما لم تنص الأنظمة المعمول بها على خلاف ذلك.",
      ],
    },
    {
      heading: "الحالات الطارئة والقوة القاهرة",
      body: [
        "لا تتحمل RentRoyz المسؤولية عن أي تأخير أو إلغاء أو تعذر في تقديم الخدمة ناتج عن ظروف خارجة عن السيطرة، مثل الكوارث الطبيعية، انقطاع الخدمات العامة، القرارات الحكومية، الحوادث الطارئة، أو أي حالة قوة قاهرة.",
        "وفي هذه الحالات، ستعمل RentRoyz على إيجاد حل مناسب قدر الإمكان.",
      ],
    },
    {
      heading: "الخصوصية والبيانات",
      body: [
        "تتعامل RentRoyz مع بيانات العملاء وفقًا لسياسة الخصوصية المنشورة في الموقع، وبما يتوافق مع الأنظمة المعمول بها في المملكة العربية السعودية.",
        "باستخدام الموقع، يوافق العميل على جمع ومعالجة البيانات اللازمة لإتمام الحجز، التواصل، الدفع، التحقق، وخدمة العملاء.",
      ],
    },
    {
      heading: "الشكاوى والتواصل",
      body: [
        "في حال وجود أي شكوى أو ملاحظة، يمكن للعميل التواصل مع RentRoyz عبر قنوات التواصل الرسمية الموضحة في الموقع.",
        "تلتزم RentRoyz بمراجعة الشكاوى بجدية والعمل على حلها خلال مدة مناسبة حسب طبيعة الحالة.",
      ],
    },
    {
      heading: "تعديل الشروط",
      body: [
        "تحتفظ RentRoyz بحق تعديل هذه الشروط والأحكام أو سياسة الدفع والاسترداد من وقت لآخر، ويتم تطبيق النسخة المنشورة في الموقع وقت الحجز أو وقت استخدام الخدمة.",
      ],
    },
    {
      heading: "القانون المعمول به",
      body: [
        "تخضع هذه الشروط والأحكام للأنظمة المعمول بها في المملكة العربية السعودية، وتكون الجهات المختصة في المملكة هي المرجع في حال حدوث أي نزاع لا يتم حله وديًا.",
      ],
    },
  ],
};

// Client-provided text — supplied by Rent Royz on 14/05/2026, used verbatim.
const paymentAr: LegalDoc = {
  title: "سياسة الدفع والاسترداد",
  tagline: "كيف تتعامل RentRoyz مع المدفوعات والإلغاء والاسترداد.",
  lastUpdatedLabel: "آخر تحديث",
  lastUpdated: "14/05/2026",
  intro: [],
  sections: [
    {
      heading: "سياسة الدفع",
      body: [
        "تتم جميع المدفوعات الخاصة بالحجوزات أو الخدمات المقدمة عبر RentRoyz من خلال وسائل الدفع المعتمدة في الموقع أو من خلال قنوات الدفع التي تحددها الشركة.",
        "يجب على العميل سداد كامل المبلغ المطلوب لتأكيد الحجز أو الخدمة، ويُعد الحجز غير مؤكد إلا بعد استلام الدفعة بنجاح وصدور تأكيد الحجز من RentRoyz أو من المنصة التي تم الحجز من خلالها.",
        "تشمل المبالغ المدفوعة، حسب طبيعة الحجز، قيمة الإقامة أو الخدمة، الرسوم التشغيلية، رسوم التنظيف، الضرائب، وأي رسوم إضافية يتم توضيحها للعميل قبل إتمام عملية الدفع.",
      ],
    },
    {
      heading: "المبالغ غير المستردة",
      body: [
        "جميع المبالغ المدفوعة تعتبر غير مستردة بعد تأكيد الحجز، إلا في الحالات التي يثبت فيها وجود خلل جوهري في الوحدة يمنع العميل من الاستفادة من الحجز بالشكل المتفق عليه.",
        "ويشمل ذلك، على سبيل المثال لا الحصر: وجود مشكلة تشغيلية جوهرية في الوحدة، أو عدم جاهزية الوحدة للسكن، أو اختلاف جوهري بين الوحدة المؤكدة والوحدة المسلمة للعميل، أو وجود خلل مؤثر في الخدمات الأساسية مثل الكهرباء أو المياه أو التكييف إذا كان الخلل قائماً قبل أو عند وقت الدخول ولم تتم معالجته خلال مدة معقولة.",
        "لا يشمل الاسترداد الحالات الناتجة عن تغيير رغبة العميل، أو عدم الحضور، أو التأخر في الوصول، أو المغادرة المبكرة، أو تغيير الخطط الشخصية، أو عدم قراءة تفاصيل الحجز والسياسات قبل الدفع.",
      ],
    },
    {
      heading: "الاسترداد في حال وجود خلل في الوحدة",
      body: [
        "في حال وجود خلل في الوحدة، يجب على العميل إبلاغ RentRoyz فورًا عبر قنوات التواصل المعتمدة، مع تقديم ما يثبت المشكلة مثل الصور أو الفيديو أو وصف واضح للحالة.",
        "تقوم RentRoyz بمراجعة الحالة والتحقق منها، وقد يتم اتخاذ أحد الإجراءات التالية حسب تقدير الشركة وطبيعة الحالة: توفير حل مناسب أو صيانة عاجلة، أو نقل العميل إلى وحدة بديلة متاحة ومناسبة، أو تعويض جزئي، أو استرداد كامل أو جزئي للمبلغ المدفوع في حال ثبت أن الخلل يمنع الاستفادة من الحجز ولم يتم توفير بديل مناسب.",
        "يتم تقييم كل حالة بناءً على ظروفها، ولا يُعد وجود ملاحظة بسيطة أو عيب غير مؤثر سببًا تلقائيًا للاسترداد.",
      ],
    },
    {
      heading: "الحجوزات من خلال منصات خارجية",
      body: [
        "إذا تم الحجز من خلال منصة خارجية مثل Booking.com أو Airbnb أو أي منصة حجوزات أخرى، فإن سياسة الإلغاء والاسترداد تكون خاضعة بشكل أساسي لسياسة المنصة التي تم الحجز من خلالها.",
        "في هذه الحالة، لا تلتزم RentRoyz بإصدار أي استرداد مباشر خارج آلية المنصة، ويجب على العميل تقديم طلب الإلغاء أو الاسترداد من خلال نفس المنصة التي أتم الحجز عبرها.",
        "قد تساعد RentRoyz في مراجعة الحالة أو تزويد المنصة بالمعلومات اللازمة، ولكن القرار النهائي بشأن الاسترداد أو الإلغاء يكون وفقًا لسياسة المنصة وشروط الحجز المعتمدة لديها.",
      ],
    },
    {
      heading: "الإلغاء من قبل العميل",
      body: [
        "في حال رغب العميل في إلغاء الحجز بعد تأكيده، يتم تطبيق سياسة الإلغاء الموضحة وقت الحجز.",
        "إذا كان الحجز مصنفًا على أنه غير قابل للاسترداد، فلن يتم إعادة أي مبالغ مدفوعة، إلا في الحالات التي يثبت فيها وجود خلل جوهري في الوحدة أو تعذر تقديم الخدمة بسبب سبب راجع إلى RentRoyz.",
      ],
    },
    {
      heading: "الإلغاء من قبل RentRoyz",
      body: [
        "تحتفظ RentRoyz بحق إلغاء أو تعديل الحجز في حالات الضرورة، مثل الظروف التشغيلية الطارئة، أو تعذر تجهيز الوحدة، أو وجود خلل يمنع استخدامها، أو أي سبب خارج عن السيطرة.",
        "في هذه الحالات، ستعمل RentRoyz على توفير بديل مناسب متى ما كان ذلك ممكنًا، أو إعادة المبلغ المدفوع حسب الحالة.",
      ],
    },
    {
      heading: "رسوم إضافية",
      body: [
        "قد يتم فرض رسوم إضافية على العميل في حال حدوث أضرار في الوحدة، أو فقدان مفاتيح أو بطاقات دخول، أو مخالفة شروط الاستخدام، أو تجاوز عدد الضيوف المسموح به، أو التدخين في وحدة غير مخصصة للتدخين، أو التأخر في الخروج دون موافقة مسبقة.",
        "يتم احتساب هذه الرسوم بناءً على قيمة الضرر أو التكلفة الفعلية أو السياسة الموضحة في صفحة الحجز.",
      ],
    },
    {
      heading: "مدة معالجة الاسترداد",
      body: [
        "في حال الموافقة على الاسترداد، تتم معالجة المبلغ خلال مدة مناسبة حسب وسيلة الدفع المستخدمة، وقد تختلف مدة وصول المبلغ إلى حساب العميل وفقًا للبنك أو مزود خدمة الدفع.",
        "إذا كان الحجز من خلال منصة خارجية، فإن مدة وآلية الاسترداد تخضع لإجراءات تلك المنصة.",
      ],
    },
  ],
};

// ── Lookup ─────────────────────────────────────────────────────────────────

export type LegalDocId = "privacy" | "terms" | "payment";

const DOCS: Record<Locale, Record<LegalDocId, LegalDoc>> = {
  en: { privacy: privacyEn, terms: termsEn, payment: paymentEn },
  ar: { privacy: privacyAr, terms: termsAr, payment: paymentAr },
};

export function getLegalDoc(locale: Locale, id: LegalDocId): LegalDoc {
  return DOCS[locale][id];
}
