import { TUser } from "../auth";
import { TBudget } from "../budget";
import { TCard } from "../cardOverview";
import { TCategory } from "../category";

export type TTransaction = {
  _id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: TTransactionTypeValue;
  category: TCategory;
  user: TUser;
  card: TCard;
  budget: TBudget;
  status: string;
  createdAt: string;
  updatedAt: string;
  attachment: string;
  __v: number;
};

export const TTransactionStatusValues = ["active", "deleted"] as const;
export type TTransactionTypeValue = "income" | "expense";

export type TTransactionCreatePayload = {
  title: string;
  description: string;
  amount: number;
  date: Date;
  type: TTransactionTypeValue;
  budget?: string;
  category: string;
  card?: string;
  status: (typeof TTransactionStatusValues)[number];
  attachment?: string;
};

export type TWeeklyBudgetTransactionsParams = {
  budgetId: string;
  year: number;
  monthIndex: number;
  timezone: string;
};
