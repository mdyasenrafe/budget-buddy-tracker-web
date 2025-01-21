"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Button, Text } from "@/components/atoms";
import {
  FormDatePicker,
  FormInput,
  FormSelect,
  FormTextArea,
  FormUpload,
  FormWrapper,
} from "@/components/form";
import { useAppSelector } from "@/redux";
import {
  getCateogryLoadingState,
  getExpenseCategories,
  getIncomeCategories,
} from "@/redux/features/category";
import {
  formatBudgetSelectOptions,
  formatCardSelectOptions,
  getCategoryOptions,
} from "@/utils";
import { TCard } from "@/redux/features/cardOverview";
import { useGetCardsQuery } from "@/redux/features/card";
import { TBudget, useGetBudgetQuery } from "@/redux/features/budget";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { TAddTransactionFormValues, addTransactionSchema } from "@/schema";
import { toast } from "sonner";
import { useFileUploadMutation } from "@/api/updloadApi";
import {
  TTransactionCreatePayload,
  TTransactionTypeValue,
  useCreateTransactionMutation,
} from "@/redux/features/transaction";

const transactionTypes = ["Income", "Expense"] as const;
type TTransactionType = (typeof transactionTypes)[number];

export const AddTransactionForm: React.FC = () => {
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TTransactionType>("Income");

  const incomeCategories = useAppSelector(getIncomeCategories);
  const expenseCategories = useAppSelector(getExpenseCategories);

  const isLoading = useAppSelector(getCateogryLoadingState);
  // api hooks
  const { data: cardsData, isLoading: isCardLoading } = useGetCardsQuery();
  const { data: budgetsData, isLoading: isBudgetLoading } = useGetBudgetQuery(
    dayjs().month()
  );
  const [imageUpload, { isLoading: imageLoading }] = useFileUploadMutation();
  const [addTransaction, { isLoading: transactionLoading }] =
    useCreateTransactionMutation();

  const categoryOptions = useMemo(
    () =>
      getCategoryOptions(
        incomeCategories,
        expenseCategories,
        selectedTransactionType
      ),
    [selectedTransactionType, incomeCategories, expenseCategories]
  );
  const cardOptions = useMemo(
    () => formatCardSelectOptions(cardsData?.data as TCard[]),
    [cardsData, isCardLoading]
  );
  const budgetOptions = useMemo(
    () => formatBudgetSelectOptions(budgetsData?.data as TBudget[]),
    [cardsData, isCardLoading]
  );

  const handleTransactionTypeSelect = useCallback((type: TTransactionType) => {
    setSelectedTransactionType(type);
  }, []);

  const handleSubmit = useCallback(
    async (data: TAddTransactionFormValues) => {
      try {
        if (data.photo) {
          const thumbRes = await imageUpload({ file: data.photo }).unwrap();
          if (thumbRes?.data?.url) {
            data.photo = thumbRes.data.url;
          } else {
            toast.error("Something went wrong! Please try again");
            return;
          }
        }

        const payload: TTransactionCreatePayload = {
          ...data,
          attachment: data?.photo,
          type: selectedTransactionType.toLowerCase() as TTransactionTypeValue,
          status: "active",
          amount: Number(data?.amount),
          date: data?.date as Date,
        };

        const res = await addTransaction(payload).unwrap();
        toast.success("Transaction added successfully! 🎉 ");
      } catch (err: any) {
        const errorMessage =
          err?.data?.message ||
          "An unexpected error occurred. Please try again.";
        toast.error(errorMessage);
      }
    },
    [selectedTransactionType]
  );

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      resolver={zodResolver(addTransactionSchema)}
    >
      <Text variant="p3" className="!font-semibold !mb-3">
        Transaction Type
      </Text>
      <div className="flex gap-4 mb-6">
        {transactionTypes.map((type) => (
          <Button
            key={type}
            onClick={() => handleTransactionTypeSelect(type)}
            className="w-[50%] !h-[44px] text"
            customColor={selectedTransactionType === type ? "primary" : "white"}
          >
            <Text
              variant="p3"
              color={selectedTransactionType === type ? "white" : "primary"}
            >
              {type}
            </Text>
          </Button>
        ))}
      </div>

      <FormInput
        name="title"
        type="text"
        label="Title"
        placeholder="Enter transaction title (e.g., Salary, Rent)"
      />
      <FormSelect
        name="category"
        label="Category"
        options={categoryOptions}
        showSearch
        placeholder={`Select ${
          selectedTransactionType === "Income" ? "income" : "expense"
        } category`}
        loading={isLoading}
      />
      <FormInput
        name="amount"
        type="number"
        label="Amount"
        placeholder={`Enter ${
          selectedTransactionType === "Income" ? "income" : "expense"
        } amount`}
      />

      {selectedTransactionType == "Expense" && (
        <FormSelect
          name="budget"
          label="Budget"
          options={budgetOptions}
          showSearch
          placeholder={`Select the budget to track this expense`}
          loading={isBudgetLoading}
        />
      )}

      <FormSelect
        name="card"
        label="Available Cards"
        options={cardOptions}
        showSearch
        placeholder="Select a payment card"
        loading={isCardLoading}
      />

      <FormDatePicker
        name="date"
        label="Transaction Date"
        placeholder="Select the date of the transaction"
      />

      <FormTextArea
        name="description"
        label="Description"
        autoSize={{ minRows: 2, maxRows: 3 }}
        placeholder="Add a brief description"
      />
      <FormUpload
        name="photo"
        label={`Upload ${
          selectedTransactionType === "Income" ? "proof of income" : "receipt"
        }`}
      />
      <Button
        htmlType="submit"
        customColor="primary"
        className="w-full !h-[44px] hover:bg-primary-dark transition duration-300 mt-4"
        loading={imageLoading || transactionLoading}
      >
        <Text className="text-white" variant="p3">
          Submit
        </Text>
      </Button>
    </FormWrapper>
  );
};
