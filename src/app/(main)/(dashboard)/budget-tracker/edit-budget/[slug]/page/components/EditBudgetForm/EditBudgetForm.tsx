"use client";

import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { BudgetForm } from "@/components/organism";
import {
  TBudgetCreateRequest,
  useEditBudgetMutation,
  useGetBudgetByIdQuery,
} from "@/redux/features/budget";
import { TCategory } from "@/redux/features/category";
import { TCreateBudgetFormData } from "@/schema";
import React, { useCallback } from "react";
import { toast } from "sonner";

type EditBudgetFormProps = {
  budgetId: string;
};

export const EditBudgetForm: React.FC<EditBudgetFormProps> = ({ budgetId }) => {
  // api hooks
  const {
    data: budgetData,
    isLoading,
    isFetching,
  } = useGetBudgetByIdQuery(budgetId);
  const [editBudget, { isLoading: budgetEditLoading }] =
    useEditBudgetMutation();
  const handleSubmit = useCallback(async (data: TCreateBudgetFormData) => {
    try {
      const payload: TBudgetCreateRequest = {
        ...data,
        limit: Number(data?.limit),
      };
      const res = await editBudget({
        payload: payload,
        budgetId: budgetData?.data?._id as string,
      }).unwrap();
      toast.success("Budget updated successfully! 🎉");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(`Failed to update budget: ${errorMessage}`);
    }
  }, []);

  const initialValues: TCreateBudgetFormData = {
    name: budgetData?.data?.name as string,
    limit: budgetData?.data?.limit.toString() as string,
    category: budgetData?.data?.category as any,
  };

  return isLoading || isFetching ? (
    <LoadingSpinner size="default" />
  ) : (
    <BudgetForm
      onSubmit={handleSubmit}
      submitButtonText="Update Budget"
      initialValues={initialValues}
      isLoading={budgetEditLoading}
    />
  );
};
