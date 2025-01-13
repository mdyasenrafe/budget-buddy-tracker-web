import { z } from "zod";

export const addTransactionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  category: z.string().min(1, "Category is required"),
  amount: z.string(),
  budget: z.string().optional(),
  card: z.string().optional(),
  date: z.any(),
  description: z.string().max(500, "Description cannot exceed 500 characters"),
  photo: z.any().optional().nullable(),
});

export type TAddTransactionFormValues = z.infer<typeof addTransactionSchema>;
