import { z } from "zod";

export const cardOverviewModalSchema = z.object({
  totalBalance: z
    .string()
    .nonempty("Balance is required")
    .refine((val) => parseFloat(val) > 0, {
      message: "Balance must be greater than 0",
    }),
});
