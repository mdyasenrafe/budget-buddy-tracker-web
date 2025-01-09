import { TOption } from "@/components/form";
import { TCategory } from "@/redux/features/category";

export const getCategoryOptions = (
  incomeCategories: TCategory[] | null,
  expenseCategories: TCategory[] | null,
  selectedTransactionType?: "Income" | "Expense"
): TOption[] => {
  let categories: TCategory[] = [];

  if (selectedTransactionType === "Income") {
    categories = incomeCategories || [];
  } else if (selectedTransactionType === "Expense") {
    categories = expenseCategories || [];
  } else {
    categories = [...(incomeCategories || []), ...(expenseCategories || [])];
  }

  return categories.map((category) => ({
    value: category?._id as string,
    label: category?.label as string,
  }));
};
