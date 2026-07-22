export type Founder = {
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
};

export type TeamValue = {
  title: string;
  description: string;
};

/** Bump when replacing founder photos (Next.js image cache bust). */
export const TEAM_IMAGE_VERSION = 3;

export function teamImageSrc(path: string): string {
  return `${path}?v=${TEAM_IMAGE_VERSION}`;
}

export const aboutPage = {
  eyebrow: "About",
  title: "Two founders.",
  titleEm: "No account-manager layer.",
  lede:
    "TwinLabs is a UK custom software studio run by Usama and Muhammad. You speak to the people scoping and delivering your project — not a sales team that disappears after the contract.",
  story: {
    title: "Why we started TwinLabs",
    paragraphs: [
      "We kept seeing the same pattern: UK businesses stuck between off-the-shelf tools that almost fit, and agencies that talk a good game then hand the work to someone you never meet.",
      "We're a two-founder studio based in the UK. Usama leads scoping and engineering; Muhammad runs delivery and client coordination. We build booking systems, client portals, field apps, and the operational software SMEs actually need — scoped upfront, quoted in writing, delivered in weeks. When the project ends, you own the code.",
    ],
  },
  cta: {
    label: "Get in touch",
    href: "/#contact",
  },
};

export const founders: Founder[] = [
  {
    name: "Usama Ahmed",
    role: "Co-founder & Director",
    bio: "Usama runs discovery and technical delivery. He maps your operations, writes the fixed scope, and stays on the build — clients talk directly to the person making decisions on the codebase, not someone relaying messages.",
    image: teamImageSrc("/images/team/usama-ahmed.jpg"),
    imageAlt: "Usama Ahmed, Co-founder and Director at TwinLabs",
  },
  {
    name: "Muhammad Amer",
    role: "Co-founder",
    bio: "Muhammad keeps projects on track — timelines, client updates, and making sure what ships matches what was agreed. If something shifts mid-build, you hear about it early, not at the final demo.",
    image: teamImageSrc("/images/team/muhammad-amer.jpg"),
    imageAlt: "Muhammad Amer, Co-founder at TwinLabs",
  },
];

export const teamValues: TeamValue[] = [
  {
    title: "Fixed scope first",
    description: "Written quote before a line of code.",
  },
  {
    title: "Direct access",
    description: "Founders on your calls, not a ticket queue.",
  },
  {
    title: "You own the code",
    description: "Full source ownership at handover.",
  },
  {
    title: "UK-based",
    description: "Working with SMEs across England, Scotland, and Wales.",
  },
];
