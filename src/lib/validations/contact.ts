import { z } from "zod";
import { contactPackageOptions } from "@/lib/content/pricing";

const packageValues = contactPackageOptions.map((option) => option.value);

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  businessName: z.string().min(2, "Please enter your business name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  projectPackage: z
    .string()
    .refine((value) => packageValues.includes(value), {
      message: "Please select a package",
    }),
  budget: z
    .string()
    .min(1, "Please enter your estimated budget")
    .max(50, "Please keep the budget under 50 characters"),
  description: z
    .string()
    .min(10, "Please tell us a bit more about what you need"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
