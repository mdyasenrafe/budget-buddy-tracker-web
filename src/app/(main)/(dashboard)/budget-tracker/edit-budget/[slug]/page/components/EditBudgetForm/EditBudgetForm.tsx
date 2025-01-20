"use client";

import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { BudgetForm } from "@/components/organism";
import { useGetBudgetByIdQuery } from "@/redux/features/budget";
import { TCreateBudgetFormData } from "@/schema";
import React, { useCallback } from "react";

type EditBudgetFormProps = {
  budgetId: string;
};

export const EditBudgetForm: React.FC<EditBudgetFormProps> = ({ budgetId }) => {
  const { data, isLoading, isFetching } = useGetBudgetByIdQuery(budgetId);
  const handleSubmit = useCallback(async (data: TCreateBudgetFormData) => {
    console.log("Edit card payload:", data);
  }, []);

  const initialValues: TCreateBudgetFormData = {
    name: data?.data?.name as string,
    limit: data?.data?.limit.toString() as string,
    category: data?.data?.category?.label as string,
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
