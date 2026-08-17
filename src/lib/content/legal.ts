import type { NavLink } from "@/types";

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; intro?: string; items: readonly string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: readonly LegalBlock[];
};

export type LegalPageContent = {
  eyebrow: string;
  title: string;
  lede: string;
  lastUpdated: string;
  sections: readonly LegalSection[];
  related: {
    label: string;
    href: string;
    description: string;
  };
};

export const privacyPolicy: LegalPageContent = {
  eyebrow: "Legal",
  title: "Privacy policy",
  lede:
    "How Twinlabs Ltd collects, uses, and protects personal information when you visit our website, contact us, or work with us.",
  lastUpdated: "17 August 2026",
  related: {
    label: "Terms of use",
    href: "/terms",
    description: "Rules for using the TwinLabs website and the limits of what we publish here.",
  },
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        {
          type: "paragraph",
          text: 'Twinlabs Ltd ("TwinLabs", "we", "us") is a UK custom software studio. We build booking systems, client portals, field apps, and related software for businesses.',
        },
        {
          type: "paragraph",
          text: "For data protection purposes, Twinlabs Ltd is the controller of personal data described in this policy. If you have questions, contact us at info@twinlabs.co.uk.",
        },
      ],
    },
    {
      id: "what-we-collect",
      title: "Information we collect",
      blocks: [
        {
          type: "list",
          intro: "Depending on how you interact with us, we may process:",
          items: [
            "Contact details you submit — name, business name, email address, phone number, budget, and project description.",
            "Correspondence — emails, meeting notes, and messages you send us before or during a project.",
            "Business contact details for sales outreach — name, business name, email address, website, and publicly available business information used to assess whether our services may be relevant.",
            "Technical data — IP address, browser type, and basic server logs when you visit our website.",
            "Project and delivery data — requirements, credentials, and content you share so we can scope, build, and support software for you.",
          ],
        },
      ],
    },
    {
      id: "how-we-use",
      title: "How we use your information",
      blocks: [
        {
          type: "list",
          intro: "We use personal data to:",
          items: [
            "Respond to enquiries submitted through our website or email.",
            "Send transactional messages such as enquiry confirmations.",
            "Assess fit, prepare written scopes, quotes, and proposals.",
            "Deliver software development and support under contract.",
            "Run limited B2B outreach to businesses where we believe our services may be relevant.",
            "Maintain security, prevent abuse, and improve our website and internal tools.",
            "Meet legal, tax, and accounting obligations.",
          ],
        },
      ],
    },
    {
      id: "legal-bases",
      title: "Legal bases (UK GDPR)",
      blocks: [
        {
          type: "list",
          intro: "We rely on the following lawful bases:",
          items: [
            "Consent — where you submit our contact form or opt in to communications.",
            "Contract — where processing is necessary to deliver services you have asked us to provide.",
            "Legitimate interests — to respond to enquiries, operate our business, and conduct proportionate B2B outreach, balanced against your rights.",
            "Legal obligation — where we must retain or disclose information to comply with law.",
          ],
        },
      ],
    },
    {
      id: "sharing",
      title: "Who we share data with",
      blocks: [
        {
          type: "paragraph",
          text: "We do not sell personal data. We share information only with trusted providers that help us run our business, under appropriate contractual safeguards.",
        },
        {
          type: "list",
          intro: "Typical subprocessors include:",
          items: [
            "Email delivery providers (for example Resend) — to send and receive email.",
            "Hosting and infrastructure providers (for example Vercel) — to operate our website.",
            "Database and tooling providers (for example Supabase) — for internal business systems.",
            "Professional advisers — accountants, insurers, or lawyers where reasonably required.",
          ],
        },
        {
          type: "paragraph",
          text: "We may also disclose information if required by law, court order, or to protect our rights, users, or the public.",
        },
      ],
    },
    {
      id: "retention",
      title: "How long we keep data",
      blocks: [
        {
          type: "paragraph",
          text: "We keep personal data only for as long as needed for the purposes above.",
        },
        {
          type: "paragraph",
          text: "Enquiry records are typically retained for up to 24 months unless a project proceeds. Client and project records are retained for the life of the engagement and for up to seven years afterwards where needed for legal, tax, or warranty purposes. Outreach records are removed when no longer relevant or when you ask us to stop contact.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      blocks: [
        {
          type: "list",
          intro: "Under UK data protection law you may have the right to:",
          items: [
            "Request access to the personal data we hold about you.",
            "Ask us to correct inaccurate data.",
            "Ask us to delete data in certain circumstances.",
            "Object to or restrict certain processing, including direct marketing.",
            "Withdraw consent where processing is based on consent.",
            "Lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.",
          ],
        },
        {
          type: "paragraph",
          text: "To exercise these rights, email info@twinlabs.co.uk. We may need to verify your identity before responding.",
        },
        {
          type: "paragraph",
          text: 'If you receive a business outreach email from us, you can ask to be removed from future contact at any time by replying with "unsubscribe" or emailing info@twinlabs.co.uk.',
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        {
          type: "paragraph",
          text: "Our public website is designed to use only essential cookies required for basic operation and security.",
        },
        {
          type: "paragraph",
          text: "We do not currently use non-essential analytics or advertising cookies on the marketing site. If that changes, we will update this policy and, where required, ask for your consent before setting non-essential cookies.",
        },
        {
          type: "paragraph",
          text: "Password-protected internal tools we operate for our own use may set session cookies. Those tools are not intended for public visitors.",
        },
      ],
    },
    {
      id: "international",
      title: "International transfers",
      blocks: [
        {
          type: "paragraph",
          text: "Some subprocessors may process data outside the UK. Where that happens, we rely on appropriate safeguards such as UK adequacy regulations or standard contractual clauses.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          type: "paragraph",
          text: 'We may update this policy from time to time. The "Last updated" date at the top of this page shows when it was last revised. Material changes will be reflected here.',
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        {
          type: "paragraph",
          text: "Twinlabs Ltd · United Kingdom · info@twinlabs.co.uk",
        },
      ],
    },
  ],
};

export const termsOfUse: LegalPageContent = {
  eyebrow: "Legal",
  title: "Terms of use",
  lede:
    "These terms apply to your use of the TwinLabs website at twinlabs.co.uk. They do not replace a signed contract for software development work.",
  lastUpdated: "17 August 2026",
  related: {
    label: "Privacy policy",
    href: "/privacy",
    description: "How we collect and use personal information when you contact us or use this site.",
  },
  sections: [
    {
      id: "acceptance",
      title: "Acceptance",
      blocks: [
        {
          type: "paragraph",
          text: "By accessing or using this website, you agree to these terms. If you do not agree, please do not use the site.",
        },
        {
          type: "paragraph",
          text: "These terms apply to visitors and enquiry submitters. If you become a TwinLabs client, your project will be governed by the written proposal, statement of work, or agreement we sign with you — not by this page alone.",
        },
      ],
    },
    {
      id: "about-the-site",
      title: "About this website",
      blocks: [
        {
          type: "paragraph",
          text: "This website describes TwinLabs and the custom software services we offer to UK businesses. Content is provided for general information only.",
        },
        {
          type: "paragraph",
          text: "We aim to keep information accurate and up to date, but we do not guarantee that every detail on the site is complete, current, or free from error.",
        },
      ],
    },
    {
      id: "not-advice",
      title: "Not professional advice",
      blocks: [
        {
          type: "paragraph",
          text: "Nothing on this website constitutes legal, financial, or technical advice. You should obtain independent advice before making decisions based on site content.",
        },
        {
          type: "paragraph",
          text: "Case studies, testimonials, pricing ranges, and timelines describe past or typical projects. They are illustrative. Your project scope, price, and delivery plan will be confirmed in writing after discovery.",
        },
      ],
    },
    {
      id: "enquiries",
      title: "Enquiries and communications",
      blocks: [
        {
          type: "paragraph",
          text: "When you submit our contact form or email us, you confirm that the information you provide is accurate to the best of your knowledge.",
        },
        {
          type: "paragraph",
          text: "Submitting an enquiry does not create a client relationship or obligate either party to proceed. We will use your details as described in our Privacy Policy.",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      blocks: [
        {
          type: "paragraph",
          text: "Unless stated otherwise, TwinLabs owns the copyright, branding, design, text, images, and code that make up this website. You may view and print pages for personal or internal business reference.",
        },
        {
          type: "paragraph",
          text: "You may not copy, scrape, republish, or exploit site content for commercial purposes without our written permission.",
        },
        {
          type: "paragraph",
          text: "Client project deliverables are handled separately. Where we agree in writing that you own project source code and materials, that ownership is set out in your project contract — not on this page.",
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      blocks: [
        {
          type: "list",
          intro: "You agree not to:",
          items: [
            "Use the site in any way that breaks applicable law or regulation.",
            "Attempt to gain unauthorised access to our systems, accounts, or internal tools.",
            "Introduce malware, automated scraping at scale, or activity that disrupts the site for others.",
            "Misrepresent your identity or affiliation when contacting us.",
          ],
        },
      ],
    },
    {
      id: "third-party-links",
      title: "Third-party links",
      blocks: [
        {
          type: "paragraph",
          text: "Our website may link to external sites. We are not responsible for the content, privacy practices, or availability of third-party websites.",
        },
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      blocks: [
        {
          type: "paragraph",
          text: "To the fullest extent permitted by law, Twinlabs Ltd excludes liability for loss or damage arising from your use of, or reliance on, this website or its content.",
        },
        {
          type: "paragraph",
          text: "We do not exclude or limit liability where it would be unlawful to do so — including for death or personal injury caused by negligence, or for fraud.",
        },
        {
          type: "paragraph",
          text: "If you engage TwinLabs for paid services, liability limits and warranties will be set out in your signed project agreement.",
        },
      ],
    },
    {
      id: "availability",
      title: "Availability",
      blocks: [
        {
          type: "paragraph",
          text: "We may update, suspend, or withdraw any part of the website at any time without notice. We do not guarantee uninterrupted access.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      blocks: [
        {
          type: "paragraph",
          text: "These terms are governed by the laws of England and Wales. The courts of England and Wales have exclusive jurisdiction, except where mandatory consumer protection law in your location gives you additional rights.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes",
      blocks: [
        {
          type: "paragraph",
          text: "We may revise these terms by posting an updated version on this page. Continued use of the site after changes are published means you accept the revised terms.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        {
          type: "paragraph",
          text: "Twinlabs Ltd · United Kingdom · info@twinlabs.co.uk",
        },
      ],
    },
  ],
};
