"use client";

import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { BudgetForm } from "@/components/organism";
import { useGetBudgetByIdQuery } from "@/redux/features/budget";
import { TCategory } from "@/redux/features/category";
import { TCreateBudgetFormData } from "@/schema";
import React, { useCallback } from "react";
import { toast } from "sonner";

type EditBudgetFormProps = {
  budgetId: string;
};

export const EditBudgetForm: React.FC<EditBudgetFormProps> = ({ budgetId }) => {
  const { data, isLoading, isFetching } = useGetBudgetByIdQuery(budgetId);
  const handleSubmit = useCallback(async (data: TCreateBudgetFormData) => {
    try {
      toast.success("Budget updated successfully! 🎉");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(`Failed to add card: ${errorMessage}`);
    }
  }, []);

  const initialValues: TCreateBudgetFormData = {
    name: data?.data?.name as string,
    limit: data?.data?.limit.toString() as string,
    category: data?.data?.category as any,
  };

  return isLoading || isFetching ? (
    <LoadingSpinner size="default" />
  ) : (
    <BudgetForm
      onSubmit={handleSubmit}
      submitButtonText="Update Budget"
      initialValues={initialValues}
    />
  );
};
