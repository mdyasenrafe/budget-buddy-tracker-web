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
  type: string;
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
export const TTransactionTypeValues = ["income", "expense"] as const;

export type TTransactionCreatePayload = {
  title: string;
  description: string;
  amount: number;
  date: Date;
  type: (typeof TTransactionTypeValues)[number];
  budget?: string;
  category: string;
  user: string;
  card?: string;
  status: (typeof TTransactionStatusValues)[number];
  attachment?: string;
};
