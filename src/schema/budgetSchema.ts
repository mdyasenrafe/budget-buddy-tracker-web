import { z } from "zod";

export const createBudgetSchema = z.object({
  name: z
    .string()
    .min(1, "Budget name is required")
    .min(3, "Budget name must be at least 3 characters")
    .max(50, "Budget name cannot exceed 50 characters")
    .refine((value) => /^[a-zA-Z0-9\s-]+$/.test(value), {
      message:
        "Budget name can only contain letters, numbers, spaces, and hyphens",
    }),

  category: z
    .string()
    .min(1, "Category is required")
    .refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
      message: "Invalid category ID format",
    }),

  limit: z.string().min(1, "Limit is required"),
});

export type TCreateBudgetFormData = z.infer<typeof createBudgetSchema>;
