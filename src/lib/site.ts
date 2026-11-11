/**
 * Editable site content.
 *
 * The footer company block and the Montevideo address are client-supplied.
 * Leave public contact destinations empty until a URL or address is confirmed.
 * Do not add admissions or case results that the client has not confirmed.
 */

export const firmName = "Pranda Global";

export const firmComplement = "Patricia Regules and Associates";

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#jurisdictions", label: "Jurisdictions" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const services = [
  {
    number: "01",
    id: "cross-border-fraud",
    title: "Cross-Border Fraud & Asset Recovery",
    description:
      "Pranda Global supports investors, their families, and their counsel when a loss involves brokers, funds, or other financial intermediaries working across jurisdictions. Engagements cover the legal strategy for tracing and recovering assets, and the coordination a cross-border matter requires.",
    audience: "Investors, their families, and the lawyers who represent them.",
  },
  {
    number: "02",
    id: "expert-advisory",
    title: "Expert Advisory & Co-Counsel",
    description:
      "The practice supports law firms, in-house counsel, and compliance teams with legal memoranda, regulatory analysis, expert declarations, and litigation strategy, working alongside the counsel already instructed.",
    audience: "Law firms, in-house counsel, and compliance teams.",
  },
  {
    number: "03",
    id: "us-financial-matters",
    title: "U.S. Financial & Regulatory Matters",
    description:
      "On financial and regulatory matters connected to the United States, Pranda Global coordinates with U.S.-admitted counsel so the U.S. questions and the strategy in the Southern Cone are handled together.",
    audience:
      "Individuals and businesses with U.S.-connected financial matters, and the counsel advising them.",
  },
] as const;

export const jurisdictions = ["Uruguay", "Brazil", "Argentina"] as const;

export const serviceLanguages = ["English", "Español", "Português"] as const;

export const about = {
  introduction:
    "Pranda Global advises on cross-border financial fraud, asset recovery, investor protection, and legal strategy. The practice works with investors and their families, with law firms and legal counsel, and with individuals and businesses whose financial matters have a connection to the United States.",
};

/** Legal details shown in the footer, exactly as supplied by the client. */
export const company = {
  legalName: "Pranda Global S.A.S",
  taxId: "R.U.T. 220757880018",
  street: "Plácido Ellauri 3359, Montevideo",
  country: "Uruguay",
  copyright: "© 2026 Pranda Global S.A.S. All rights reserved.",
} as const;

export const footerServiceLinks = [
  { href: "#services", label: "What we do" },
  ...services.map((service) => ({ href: `#${service.id}`, label: service.title })),
];

export type ContactChannelId = "instagram" | "email" | "location" | "whatsapp";

/**
 * Public address opened by the footer email icon.
 * Leave empty until the client confirms it. This is not CONTACT_TO_EMAIL.
 */
export const publicEmail: string = "";

/** Street View of the office, opened by the footer location button. */
export const locationUrl =
  "https://www.google.com/maps/@-34.9044797,-56.1413547,26a,75y,346.7h,89.57t/data=!3m7!1e1!3m5!1sl-QJ_J2HpveOwCeKoIIQIg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.clients6.google.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.4278026311472729%26panoid%3Dl-QJ_J2HpveOwCeKoIIQIg%26yaw%3D346.704992628144!7i16384!8i8192";

/** WhatsApp chat for +55 47 9916-1313. */
export const whatsappUrl = "https://wa.me/554799161313";

/**
 * Footer contact destinations, in display order.
 * The button is always shown. An empty href stays unlinked until confirmed.
 * The email button uses publicEmail.
 */
export const contactChannels: { id: ContactChannelId; label: string; href: string }[] = [
  { id: "instagram", label: "Instagram", href: "" },
  { id: "email", label: "Email", href: "" },
  { id: "location", label: "Location", href: locationUrl },
  { id: "whatsapp", label: "WhatsApp", href: whatsappUrl },
];

/** Approved personal biography, in paragraph order. */
export const biography = [
  "Dr. Patricia Regules is the founding partner of Pranda Global and is dual-qualified in Uruguay and Brazil. Based in Brazil, she represents victims of complex financial fraud across the Southern Cone.",
  "She holds a Bachelor in Law and Social Sciences from the Universidad de la República (Uruguay; Bar No. 12.947) and a Bachelor of Laws from the Universidade Federal de Santa Catarina (Brazil; OAB/SC 44322). She also holds an LL.M. in International Dispute Settlement from the University in Geneva (MIDS Program), and a diploma in Negotiation from Harvard University.",
  "After many years in London on international litigation, she now represents more than 140 investors from Uruguay, Argentina, Brazil, and Europe harmed in the Sara Goldring case. She pursues recovery on parallel fronts: criminal proceedings in Uruguay, regulatory complaints before FINRA in the United States, and actions against the institutions responsible for supervision and custody.",
  "Her practice brings together criminal law, arbitration, financial regulation, and administrative law. It rests on one conviction: every victim has the right to access to justice and to the truth.",
] as const;

export const portraitSrc = "/images/Text-Free Portrait with Beige Jacket.png";

export const portraitAlt = "Dr. Patricia Regules, founding partner of Pranda Global";

export const portraitName = "Dr. Patricia Regules";
