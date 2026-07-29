export const growthPathSection = {
  eyebrow: "How we help you grow",
  title: "Same team.",
  titleEm: "More room to grow.",
  subtitle:
    "Most owners don't need to hire first — they need to stop losing bookings, hours, and enquiries to broken processes. We build software that fixes that, then leaves you with capacity to grow.",
  footnote:
    "You don't need to become a tech company. You need systems that work like part of your team.",
};

export type GrowthStep = {
  number: string;
  title: string;
  pain: string;
  body: string;
  outcome: string;
};

export const growthSteps: GrowthStep[] = [
  {
    number: "01",
    title: "Stop the leaks",
    pain: "Calls missed after hours. Bookings stuck in inboxes. Follow-ups forgotten.",
    body:
      "We put booking, reminders, and enquiry capture where your customers already are — online, 24/7.",
    outcome: "Revenue you were already earning stops walking out the door.",
  },
  {
    number: "02",
    title: "Free your team",
    pain: "Staff chasing paperwork instead of customers. The same tasks, every week.",
    body:
      "Portals, automations, and field apps replace the manual work — without adding headcount.",
    outcome: "Your people spend time on work that actually grows the business.",
  },
  {
    number: "03",
    title: "Win more enquiries",
    pain: "A website that looks fine but doesn't convert. Slow replies lose the job.",
    body:
      "We tighten the path from first visit to booked job — clear pages, fast forms, professional follow-up.",
    outcome: "More of the leads you already get say yes.",
  },
  {
    number: "04",
    title: "Grow with clarity",
    pain: "Decisions from gut feel. No single view of what's working.",
    body:
      "Dashboards and integrations give you numbers you trust — so you know when to hire, expand, or invest.",
    outcome: "Growth becomes a choice, not a guess.",
  },
];
