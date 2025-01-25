import { TUser } from "../auth";

export type TCardState = {
  card: TCard | null;
  loading: boolean;
};

export type TCard = {
  _id: string;
  userId: TUser;
  last4Digits: string;
  bankName: string;
  accountHolderName?: string;
  expireDate: string;
  totalBalance: number;
  totalDeposit: number;
  totalExpense: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TCardOverviewPayload = {
  totalBalance: number;
};
