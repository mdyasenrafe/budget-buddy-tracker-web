import { TCategory } from "@/redux/features/category";

export const getCategoryOptions = (
  incomeCategories: TCategory[] | null,
  expenseCategories: TCategory[] | null,
  selectedTransactionType?: "Income" | "Expense"
) => {
  let categories: TCategory[] = [];

  if (selectedTransactionType === "Income") {
    categories = incomeCategories || [];
  } else if (selectedTransactionType === "Expense") {
    categories = expenseCategories || [];
  } else {
    categories = [...(incomeCategories || []), ...(expenseCategories || [])];
  }

  return categories.map((category) => ({
    value: category?.value,
    label: category?.label,
  }));
};
