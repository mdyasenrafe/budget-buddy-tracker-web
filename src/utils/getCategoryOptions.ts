import { TCategory } from "@/redux/features/category";

export const getCategoryOptions = (
  selectedTransactionType: string,
  incomeCategories: TCategory[] | null,
  expenseCategories: TCategory[] | null
) => {
  const categories =
    selectedTransactionType === "Income" ? incomeCategories : expenseCategories;

  return (
    categories?.map((category) => ({
      value: category?.value,
      label: category?.label,
    })) ?? []
  );
};
