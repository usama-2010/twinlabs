export type LeadStatus =
  | "needs_email"
  | "ready"
  | "queued"
  | "sent"
  | "replied"
  | "bounced"
  | "do_not_contact";

export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export type CampaignLeadStatus =
  | "queued"
  | "sent"
  | "skipped"
  | "failed"
  | "replied";

export type Lead = {
  id: string;
  business_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  location: string | null;
  rating: number | null;
  reviews: number | null;
  lead_score: number | null;
  website_issue: string | null;
  reason: string | null;
  source: string | null;
  profession: string | null;
  priority: string | null;
  status: LeadStatus;
  dedupe_key: string;
  created_at: string;
  updated_at: string;
  composed?: LeadComposedEmail | null;
};

export type LeadComposedEmail = {
  subject: string;
  body: string;
  html: string;
  editable: boolean;
};

export type Campaign = {
  id: string;
  name: string;
  profession: string | null;
  priority: string | null;
  status: CampaignStatus;
  daily_cap: number;
  total_leads: number;
  sent_count: number;
  skipped_count: number;
  created_at: string;
  updated_at: string;
};

export type CampaignLead = {
  id: string;
  campaign_id: string;
  lead_id: string;
  rendered_subject: string;
  rendered_body_text: string;
  rendered_body_html: string;
  status: CampaignLeadStatus;
  sent_at: string | null;
  resend_id: string | null;
  error: string | null;
  created_at: string;
  lead?: Lead;
};

export type ParsedLeadRow = {
  business_name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  rating?: number;
  reviews?: number;
  lead_score?: number;
  website_issue?: string;
  reason?: string;
  source?: string;
};

export type ComposedEmail = {
  subject: string;
  text: string;
  html: string;
};

export type ComposeMode = "gemini" | "template";

export type ComposeSource = "gemini" | "template_scenario" | "template_generic";

export type ComposeResult = ComposedEmail & {
  source: ComposeSource;
  /** Message body only — no CTA, signature, or unsubscribe footer. */
  body: string;
};

export type ImportSummary = {
  imported: number;
  updated: number;
  skipped: number;
  needsEmail: number;
  ready: number;
  campaignId: string;
  composeMode: ComposeMode;
  aiComposed: number;
  templateScenario: number;
  templateGeneric: number;
  samples: Array<{
    leadId?: string;
    business_name: string;
    subject: string;
    text: string;
    html: string;
    status: LeadStatus;
    source?: ComposeSource;
  }>;
};

export type ImportProgressPhase = "starting" | "composing" | "finishing" | "complete";

export type ImportProgress = {
  phase: ImportProgressPhase;
  completed: number;
  total: number;
  remaining: number;
  businessName?: string;
  leadNames?: string[];
};

export type ImportStreamEvent =
  | { type: "progress"; progress: ImportProgress }
  | { type: "complete"; summary: ImportSummary }
  | { type: "error"; error: string };
