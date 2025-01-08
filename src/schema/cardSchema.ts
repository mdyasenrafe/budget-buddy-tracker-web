import { z } from "zod";

export const addCardSchema = z.object({
  accountHolderName: z
    .string()
    .min(1, "Cardholder Name is required")
    .max(50, "Cardholder Name cannot exceed 100 characters"),
  last4Digits: z
    .string()
    .regex(/^\d{4}$/, "Last 4 digits must be exactly 4 digits"),
  totalBalance: z.string().min(1, "Current balance is required"),
  bankName: z.string().min(1, "Bank Name is required"),
  expireDate: z.any(),
});

export type TCardFormValues = z.infer<typeof addCardSchema>;
