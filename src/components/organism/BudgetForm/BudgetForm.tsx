import { Button, Text } from "@/components/atoms";
import { FormInput, FormSelect, FormWrapper } from "@/components/form";
import { useAppSelector } from "@/redux";
import {
  getCateogryLoadingState,
  getExpenseCategories,
  getIncomeCategories,
} from "@/redux/features/category";
import { TCreateBudgetFormData, createBudgetSchema } from "@/schema";
import { getCategoryOptions } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  onSubmit: (data: TCreateBudgetFormData) => Promise<void>;
  initialValues?: Partial<TCreateBudgetFormData>;
  submitButtonText?: string;
  isLoading?: boolean;
};

export const BudgetForm: React.FC<Props> = ({
  onSubmit,
  initialValues,
  submitButtonText = "Submit",
  isLoading,
}) => {
  // states
  const [isMounted, setIsMounted] = useState(false);
  // hooks
  const incomeCategories = useAppSelector(getIncomeCategories);
  const expenseCategories = useAppSelector(getExpenseCategories);
  const isCategoryLoading = useAppSelector(getCateogryLoadingState);

  const categoryOptions = useMemo(
    () => getCategoryOptions(incomeCategories, expenseCategories, "Expense"),
    [incomeCategories, expenseCategories]
  );

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);
  return (
    <FormWrapper
      onSubmit={onSubmit}
      resolver={zodResolver(createBudgetSchema)}
      defaultValues={initialValues}
    >
      <FormInput
        name="name"
        type="text"
        label="Budget Name"
        placeholder="Enter a name for your budget (e.g., Groceries, Rent)"
      />
      <FormSelect
        name="category"
        label="Category"
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
          loading={isLoading || isCategoryLoading}
          disabled={isLoading || isCategoryLoading}
        >
          <Text className="text-white" variant="p3">
            {submitButtonText}
          </Text>
        </Button>
      )}
    </FormWrapper>
  );
};
