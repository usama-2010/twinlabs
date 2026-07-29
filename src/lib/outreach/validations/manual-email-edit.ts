import { z } from "zod";

export const manualEmailEditSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required.")
    .max(120, "Subject must be 120 characters or fewer."),
  body: z
    .string()
    .trim()
    .min(40, "Message is too short — write at least a few sentences.")
    .max(2000, "Message must be 2000 characters or fewer."),
});

export type ManualEmailEditInput = z.infer<typeof manualEmailEditSchema>;
