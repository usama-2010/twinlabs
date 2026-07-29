import { z } from "zod";

export const chatTurnSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(1000),
});

export const chatModifyRequestSchema = z.object({
  instruction: z
    .string()
    .trim()
    .min(3, "Instruction must be at least 3 characters.")
    .max(500, "Instruction must be at most 500 characters."),
  history: z.array(chatTurnSchema).max(20).optional(),
});

export type ChatTurn = z.infer<typeof chatTurnSchema>;
export type ChatModifyRequest = z.infer<typeof chatModifyRequestSchema>;

export const chatModifyResponseSchema = z.object({
  subject: z.string().min(2).max(120),
  body: z.string().min(40).max(1200),
  summary: z.string().min(5).max(200),
});

export type ChatModifyResponse = z.infer<typeof chatModifyResponseSchema>;
