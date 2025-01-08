import { z } from "zod";

export const addCardSchema = z.object({
  accountHolderName: z
    .string()
    .min(1, "Cardholder Name is required")
    .max(100, "Cardholder Name cannot exceed 100 characters"),
  last4Digits: z
    .string()
    .regex(/^\d{4}$/, "Last 4 digits must be exactly 4 digits"),
  totalBalance: z
    .number({ invalid_type_error: "Balance must be a number" })
    .min(0, "Balance must be at least 0"),
  bankName: z.string().min(1, "Bank Name is required"),
  expireDate: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "Expiry Date must be in YYYY-MM format"),
});
