import { TUser } from "../auth";
import { TCategory } from "../category";

export type TBudgetCreateRequest = {
  category: string;
  name: string;
  limit: number;
};

export type TBudget = {
  _id: string;
  userId: TUser;
  name: string;
  category: TCategory;
  spent: number;
  limit: number;
  status: (typeof TBudgetStatusValues)[number];
  month: (typeof TBudgetMonthValues)[number];
  createdAt?: Date;
  updatedAt?: Date;
};

export const TBudgetStatusValues = ["active", "deleted"] as const;
export const TBudgetMonthValues = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const;
