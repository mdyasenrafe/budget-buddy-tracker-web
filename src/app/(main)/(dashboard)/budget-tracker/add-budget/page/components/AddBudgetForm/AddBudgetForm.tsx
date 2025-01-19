"use client";

import { BudgetForm } from "@/components/organism";
import {
  TBudgetCreateRequest,
  useCreateBudgetMutation,
} from "@/redux/features/budget";
import { TCreateBudgetFormData } from "@/schema";
import React, { useCallback } from "react";
import { toast } from "sonner";

export const AddBudgetForm = () => {
  // api hooks
  const [createBudget, { isLoading: isBudgetCreateLoading }] =
    useCreateBudgetMutation();

  const handleSubmit = useCallback(async (data: TCreateBudgetFormData) => {
    const payload: TBudgetCreateRequest = {
      ...data,
      limit: Number(data?.limit),
    };
    try {
      const res = await createBudget(payload).unwrap();
      toast.success("Budget added successfully! 🎉");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(`Failed to add card: ${errorMessage}`);
    }
  }, []);

  return (
    <BudgetForm onSubmit={handleSubmit} isLoading={isBudgetCreateLoading} />
  );
};
