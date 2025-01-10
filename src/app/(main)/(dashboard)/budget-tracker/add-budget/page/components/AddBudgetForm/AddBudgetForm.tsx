"use client";

import { Button, Text } from "@/components/atoms";
import { FormInput, FormSelect, FormWrapper } from "@/components/form";
import { useAppSelector } from "@/redux";
import {
  TBudgetCreateRequest,
  useCreateBudgetMutation,
} from "@/redux/features/budget";
import {
  getCateogryLoadingState,
  getExpenseCategories,
  getIncomeCategories,
} from "@/redux/features/category";
import { TCreateBudgetFormData, createBudgetSchema } from "@/schema";
import { getCategoryOptions } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const AddBudgetForm = () => {
  // states
  const [isMounted, setIsMounted] = useState(false);
  // hooks
  const incomeCategories = useAppSelector(getIncomeCategories);
  const expenseCategories = useAppSelector(getExpenseCategories);
  const isLoading = useAppSelector(getCateogryLoadingState);

  const categoryOptions = useMemo(
    () => getCategoryOptions(incomeCategories, expenseCategories, "Expense"),
    [incomeCategories, expenseCategories]
  );
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

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      resolver={zodResolver(createBudgetSchema)}
    >
      <FormInput
        name="name"
        type="text"
        label="Budget Name"
        placeholder="Enter a name for your budget (e.g., Groceries, Rent)"
      />
      <FormSelect
        name="category"
        label="Expense Category"
        placeholder="Select a category for this budget"
        options={categoryOptions}
        showSearch
        loading={isLoading}
      />
      <FormInput
        name="limit"
        label="Monthly Limit"
        placeholder="Enter your monthly spending limit for this category"
        type="number"
      />
      {isMounted && (
        <Button
          htmlType="submit"
          customColor="primary"
          className="w-full !h-[44px] hover:bg-primary-dark transition duration-300 mt-4"
          loading={isLoading || isBudgetCreateLoading}
          disabled={isBudgetCreateLoading || isBudgetCreateLoading}
        >
          <Text className="text-white" variant="p3">
            Submit
          </Text>
        </Button>
      )}
    </FormWrapper>
  );
};
