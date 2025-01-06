"use client";

import { Button, Text } from "@/components/atoms";
import { FormInput, FormSelect, FormWrapper } from "@/components/form";
import { useAppSelector } from "@/redux";
import {
  getCateogryLoadingState,
  getExpenseCategories,
  getIncomeCategories,
} from "@/redux/features/category";
import { getCategoryOptions } from "@/utils";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export const AddBudgetForm = () => {
  const [isMounted, setIsMounted] = useState(false);
  const incomeCategories = useAppSelector(getIncomeCategories);
  const expenseCategories = useAppSelector(getExpenseCategories);
  const isLoading = useAppSelector(getCateogryLoadingState);

  const categoryOptions = useMemo(
    () => getCategoryOptions(incomeCategories, expenseCategories, "Expense"),
    [incomeCategories, expenseCategories]
  );

  const handleSubmit = useCallback(() => {
    const formData = {};
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  return (
    <FormWrapper onSubmit={handleSubmit}>
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
          loading={isLoading}
        >
          <Text className="text-white" variant="p3">
            Sign In
          </Text>
        </Button>
      )}
    </FormWrapper>
  );
};
