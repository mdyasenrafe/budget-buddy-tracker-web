"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Button, Modal, Text } from "@/components/atoms";
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
import {
  TUpdateTransactionFormValues,
  updateTransactionSchema,
} from "@/schema";
import { toast } from "sonner";
import { useFileUploadMutation } from "@/api/updloadApi";
import {
  TTransaction,
  TTransactionTypeValue,
  TTransactionUpdatePayload,
  useUpdateTransactionMutation,
} from "@/redux/features/transaction";

type TransactionEditModalProps = {
  transaction: TTransaction;
  isModalOpen: boolean;
  closeModal: () => void;
};

const transactionTypes = ["Income", "Expense"] as const;
type TTransactionType = (typeof transactionTypes)[number];

export const TransactionEditModal: React.FC<TransactionEditModalProps> = ({
  transaction,
  isModalOpen,
  closeModal,
}) => {
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TTransactionType>(
      transaction?.type === "expense" ? "Expense" : "Income"
    );

  const incomeCategories = useAppSelector(getIncomeCategories);
  const expenseCategories = useAppSelector(getExpenseCategories);
  const isCategoryLoading = useAppSelector(getCateogryLoadingState);

  const { data: cardsData, isLoading: isCardLoading } = useGetCardsQuery();
  const { data: budgetsData, isLoading: isBudgetLoading } = useGetBudgetQuery(
    dayjs(transaction?.date).month()
  );

  const [imageUpload, { isLoading: imageLoading }] = useFileUploadMutation();
  const [updateTransaction, { isLoading: isUpdating }] =
    useUpdateTransactionMutation();

  const isExpense = selectedTransactionType === "Expense";

  const categoryOptions = useMemo(
    () =>
      getCategoryOptions(
        incomeCategories,
        expenseCategories,
        selectedTransactionType
      ),
    [incomeCategories, expenseCategories, selectedTransactionType]
  );

  const cardOptions = useMemo(
    () => formatCardSelectOptions(cardsData?.data as TCard[]),
    [cardsData]
  );

  const budgetOptions = useMemo(
    () => formatBudgetSelectOptions(budgetsData?.data as TBudget[]),
    [budgetsData]
  );

  const defaultCategory = useMemo(() => {
    if (!transaction?.category) return undefined;
    return typeof transaction.category === "object"
      ? transaction.category._id
      : transaction.category;
  }, [transaction?.category]);

  const defaultCard = useMemo(() => {
    if (!transaction?.card) return undefined;
    return typeof transaction.card === "object"
      ? transaction.card._id
      : transaction.card;
  }, [transaction?.card]);

  const defaultBudget = useMemo(() => {
    if (!transaction?.budget) return undefined;
    return typeof transaction.budget === "object"
      ? transaction.budget._id
      : transaction.budget;
  }, [transaction?.budget]);

  const defaultValues = useMemo(
    () => ({
      title: transaction?.title || "",
      category: defaultCategory,
      amount: String(transaction?.amount || ""),
      card: defaultCard,
      budget: defaultBudget,
      date: transaction?.date ? dayjs(transaction.date) : dayjs(),
      description: transaction?.description || "",
      photo: transaction?.attachment || undefined,
    }),
    [transaction, defaultCategory, defaultCard, defaultBudget]
  );

  const handleSubmit = useCallback(
    async (data: TUpdateTransactionFormValues) => {
      try {
        let attachmentUrl = transaction?.attachment;

        if (data.photo) {
          if (
            typeof data.photo === "string" &&
            (data.photo.startsWith("http://") ||
              data.photo.startsWith("https://"))
          ) {
            attachmentUrl = data.photo;
          } else {
            const thumbRes = await imageUpload({ file: data.photo }).unwrap();
            if (thumbRes?.data?.url) {
              attachmentUrl = thumbRes.data.url;
            } else {
              toast.error("Failed to upload attachment. Please try again.");
              return;
            }
          }
        } else if (data.photo === null) {
          attachmentUrl = "";
        }

        const payload: TTransactionUpdatePayload = {
          title: data.title,
          type: selectedTransactionType.toLowerCase() as TTransactionTypeValue,
          category: data.category,
          card: data.card || undefined,
          budget: isExpense ? data.budget || undefined : undefined,
          date: data.date ? dayjs(data.date).toDate() : undefined,
          description: data.description || "",
          attachment: attachmentUrl,
        };

        await updateTransaction({
          id: transaction._id,
          payload,
        }).unwrap();

        toast.success("Transaction updated successfully! 🎉");
        closeModal();
      } catch (err: any) {
        const errorMessage =
          err?.data?.message ||
          "An unexpected error occurred while updating the transaction.";
        toast.error(errorMessage);
      }
    },
    [
      transaction,
      selectedTransactionType,
      isExpense,
      imageUpload,
      updateTransaction,
      closeModal,
    ]
  );

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Edit Transaction"
      centered
      width={650}
    >
      <div className="py-2">
        <FormWrapper
          onSubmit={handleSubmit}
          resolver={zodResolver(updateTransactionSchema)}
          defaultValues={defaultValues}
        >
          <div className="max-h-[58vh] overflow-y-auto pr-2">
            <Text variant="p3" className="!font-semibold !mb-3">
              Transaction Type
            </Text>
            <div className="flex gap-4 mb-4">
              {transactionTypes.map((type) => (
                <Button
                  key={type}
                  htmlType="button"
                  onClick={() => setSelectedTransactionType(type)}
                  className="w-[50%] !h-[44px]"
                  customColor={
                    selectedTransactionType === type ? "primary" : "white"
                  }
                >
                  <Text
                    variant="p3"
                    color={
                      selectedTransactionType === type ? "white" : "primary"
                    }
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
              placeholder="Enter transaction title"
            />

            <FormSelect
              name="category"
              label="Category"
              options={categoryOptions}
              showSearch
              placeholder={`Select ${
                isExpense ? "expense" : "income"
              } category`}
              loading={isCategoryLoading}
            />

            <FormInput
              name="amount"
              type="text"
              label="Amount (Read-only)"
              disabled
              className="bg-gray-100 cursor-not-allowed text-gray-500"
            />

            {isExpense && (
              <FormSelect
                name="budget"
                label="Budget"
                options={budgetOptions}
                showSearch
                placeholder="Select budget"
                loading={isBudgetLoading}
              />
            )}

            <FormSelect
              name="card"
              label="Payment Card"
              options={cardOptions}
              showSearch
              placeholder="Select payment card"
              loading={isCardLoading}
            />

            <FormDatePicker
              name="date"
              label="Transaction Date"
              placeholder="Select transaction date"
            />

            <FormTextArea
              name="description"
              label="Description"
              autoSize={{ minRows: 2, maxRows: 3 }}
              placeholder="Add a brief description"
            />

            <FormUpload
              name="photo"
              label={isExpense ? "Receipt / Proof" : "Proof of Income"}
              defaultValue={
                transaction?.attachment ? [transaction.attachment] : undefined
              }
            />
          </div>

          <div className="flex gap-4 pt-4 mt-2 border-t bg-white">
            <Button
              htmlType="button"
              className="w-1/2 !h-[44px] !bg-gray-100 hover:!bg-gray-200"
              onClick={closeModal}
              disabled={imageLoading || isUpdating}
            >
              <Text variant="p3">Cancel</Text>
            </Button>

            <Button
              htmlType="submit"
              customColor="primary"
              className="w-1/2 !h-[44px]"
              loading={imageLoading || isUpdating}
            >
              <Text className="text-white" variant="p3">
                {imageLoading || isUpdating ? "Saving..." : "Save Changes"}
              </Text>
            </Button>
          </div>
        </FormWrapper>
      </div>
    </Modal>
  );
};
