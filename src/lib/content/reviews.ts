import type { Review } from "@/types";

export const testimonialsSection = {
  title: "From the people we worked with",
  subtitle:
    "What clients said after go-live — in their own words, linked to the project each quote refers to.",
};

export const reviews: Review[] = [
  {
    id: "london-hair-co",
    quote:
      "Our diary was a mess across three sites — double bookings, missed calls, the usual. TwinLabs rebuilt booking properly: texts go out, stylists see their day, reception isn't on the phone all morning. No-shows have dropped off properly. Should've done it sooner.",
    author: "Sarah Chen",
    role: "Owner",
    company: "The London Hair Co.",
    location: "London",
    initials: "SC",
    caseStudySlug: "london-hair-co-booking",
    projectLabel: "Salon booking platform",
  },
  {
    id: "morrison-sons",
    quote:
      "Twelve vans and we were still on paper job sheets. Invoices going out a week late, every week. Amer built something our office lot actually use first thing in the morning. Admin's gone from about fifteen hours to four. Gutted we left it so long.",
    author: "Dave Morrison",
    role: "Director",
    company: "Morrison & Sons Plumbing",
    location: "Leeds",
    initials: "DM",
    caseStudySlug: "morrison-sons-job-management",
    projectLabel: "Job management system",
  },
  {
    id: "sharma-co",
    quote:
      "Chasing documents by email was doing our heads in. Wrong attachments, wrong clients, no audit trail. Portal went live in six weeks, same price we were quoted. About ninety percent of clients on it now. Partners are much happier.",
    author: "Priya Sharma",
    role: "Partner",
    company: "Sharma & Co. Accountants",
    location: "Birmingham",
    initials: "PS",
    caseStudySlug: "sharma-co-client-portal",
    projectLabel: "Client portal",
  },
  {
    id: "oak-co",
    quote:
      "Old site was rubbish on mobile, if I'm honest. TwinLabs rebuilt the shop — search works, checkout's quick, pages don't hang. Sales up about forty percent since spring. No drama, just got on with it.",
    author: "James O'Brien",
    role: "Founder",
    company: "Oak & Co. Furniture",
    location: "Bristol",
    initials: "JO",
    caseStudySlug: "oak-co-ecommerce",
    projectLabel: "E-commerce rebuild",
  },
  {
    id: "bridge-dental",
    quote:
      "Recall lists in three places, reception glued to the phone. New booking and recall kit went in and empty chairs are rare now. Team trusts the diary again. Paid back quicker than we expected, if I'm being blunt.",
    author: "Dr Emily Hart",
    role: "Practice Principal",
    company: "Bridge Dental Clinic",
    location: "Manchester",
    initials: "EH",
    caseStudySlug: "bridge-dental-patient-hub",
    projectLabel: "Patient booking system",
  },
  {
    id: "pawpath-vet",
    quote:
      "Owners want everything on their phone these days. Repeat scripts used to tie up two on reception every morning — most of that's self-serve now. Vaccination reminders alone have saved us a fair bit of grief.",
    author: "Tom Fletcher",
    role: "Practice Manager",
    company: "PawPath Veterinary",
    location: "Sheffield",
    initials: "TF",
    caseStudySlug: "pawpath-vet-portal",
    projectLabel: "Vet practice portal",
  },
  {
    id: "copper-pot",
    quote:
      "Three kitchens, all running on gut feel and WhatsApp. Managers can see covers and ticket times before service now. Weekend double bookings basically stopped overnight. Much less shouting in the pass.",
    author: "Marco Ricci",
    role: "Operations Director",
    company: "Copper Pot Kitchen",
    location: "Liverpool",
    initials: "MR",
    caseStudySlug: "copper-pot-kitchen-ops",
    projectLabel: "Restaurant operations",
  },
  {
    id: "flexfit",
    quote:
      "Off-the-shelf gym software couldn't do class caps or the turnstiles properly. TwinLabs built what we asked for — members book in seconds, churn's down since we switched. Worth the hassle of changing systems.",
    author: "Nina Okonkwo",
    role: "Founder",
    company: "FlexFit Leeds",
    location: "Leeds",
    initials: "NO",
    caseStudySlug: "flexfit-gym-platform",
    projectLabel: "Gym membership platform",
  },
  {
    id: "harrison-webb",
    quote:
      "Clients ringing for updates was eating the day. Milestone emails and the checklist mean they're not chasing us — feels calmer. Matters are moving through quicker too. Small thing, big difference.",
    author: "Helen Webb",
    role: "Senior Partner",
    company: "Harrison & Webb Legal",
    location: "Cambridge",
    initials: "HW",
    caseStudySlug: "harrison-webb-conveyancing",
    projectLabel: "Conveyancing platform",
  },
  {
    id: "northline",
    quote:
      "Repeat prescriptions on the phone were backing up at every branch. Portal and delivery planner took pressure off the counter straight away. Drivers know where they're going. Stock alerts land with the right person — finally.",
    author: "Raj Patel",
    role: "Superintendent Pharmacist",
    company: "Northline Pharmacy",
    location: "Nottingham",
    initials: "RP",
    caseStudySlug: "northline-pharmacy-hub",
    projectLabel: "Pharmacy workflow",
  },
  {
    id: "keystone",
    quote:
      "Leads went cold overnight because nobody answered until nine. Online booking and a quick follow-up mean we're usually first to a viewing. Offers up a bit. Agents work off one list instead of five spreadsheets.",
    author: "Claire Dunne",
    role: "Managing Director",
    company: "Keystone Estates",
    location: "Oxford",
    initials: "CD",
    caseStudySlug: "keystone-estates-crm",
    projectLabel: "Viewing scheduler & CRM",
  },
  {
    id: "swifthaul",
    quote:
      "Dispatch spent half the day on 'where's my parcel' calls. Tracking links and photo POD sorted most of that. Volume's up about a third, same desk headcount. Drivers took to the app — didn't expect that.",
    author: "Gary Hughes",
    role: "Fleet Manager",
    company: "SwiftHaul Logistics",
    location: "Coventry",
    initials: "GH",
    caseStudySlug: "swifthaul-dispatch",
    projectLabel: "Dispatch & POD app",
  },
  {
    id: "bloom-aesthetics",
    quote:
      "Deposits and consent forms were a daily row at front desk. Booking by treatment with digital consent fixed both. Practitioners see their day clearly. No-shows fell within a few weeks of launch — big relief.",
    author: "Laura Finch",
    role: "Clinical Director",
    company: "Bloom Aesthetics",
    location: "Brighton",
    initials: "LF",
    caseStudySlug: "bloom-aesthetics-booking",
    projectLabel: "Aesthetics booking",
  },
  {
    id: "meridian-gp",
    quote:
      "Email booking doesn't work when you're a private GP — it just doesn't scale. Triage before the appointment means doctors walk in knowing what's what. Same-day slots fill properly. Admin saves about four hours a day, no exaggeration.",
    author: "Dr Andrew Mills",
    role: "Clinical Lead",
    company: "Meridian Private GP",
    location: "Edinburgh",
    initials: "AM",
    caseStudySlug: "meridian-gp-scheduling",
    projectLabel: "GP scheduling platform",
  },
  {
    id: "apex-facilities",
    quote:
      "Forty-odd sites on email tickets — couldn't carry on like that. SLA timers and asset history mean we spot overdue jobs before the client rings. Renewals all stayed put last year. Reporting finally matches what's happening on the ground.",
    author: "Simon Grant",
    role: "Operations Director",
    company: "Apex Facilities Group",
    location: "Glasgow",
    initials: "SG",
    caseStudySlug: "apex-facilities-maintenance",
    projectLabel: "Facilities maintenance",
  },
  {
    id: "harbour-group",
    quote:
      "Five venues, one phone line for bookings — absolute carnage on Fridays. Large-party deposits alone made it worthwhile. Online bookings trebled in six months. Managers can forecast covers without guessing.",
    author: "Fiona Walsh",
    role: "Group GM",
    company: "Harbour Group Hospitality",
    location: "Cardiff",
    initials: "FW",
    caseStudySlug: "harbour-group-reservations",
    projectLabel: "Reservation hub",
  },
];

export function getReviewById(id: string): Review | undefined {
  return reviews.find((r) => r.id === id);
}

export function getReviewByCaseStudySlug(slug: string): Review | undefined {
  return reviews.find((r) => r.caseStudySlug === slug);
}
