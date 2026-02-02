import { z } from "zod";

export const LeadFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
  email: z.email({ message: "Invalid email address" }),
  website: z
    .url({ message: "Invalid URL" })
    .or(z.literal(""))
    .optional(),
});
