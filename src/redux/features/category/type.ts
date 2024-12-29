export interface TCategory {
  _id?: string;
  label: string;
  value: string;
  type: "income" | "expense";
}

export type TCategoryState = {
  incomeCategories: TCategory[] | null;
  expenseCategories: TCategory[] | null;
  loading: boolean;
};
