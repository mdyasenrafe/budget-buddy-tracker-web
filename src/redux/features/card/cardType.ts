import { TCard } from "../cardOverview";

export type TCreateCardPayload = {
  accountHolderName: string;
  last4Digits: string;
  bankName: string;
  totalBalance: number;
  expireDate: string;
};

export type TEditCardPayload = {
  payload: TCreateCardPayload;
  cardId: string;
};

export type TCardState = {
  cards: TCard[] | null;
  isLoading: boolean;
};

export type TCardMetricsParams = {
  cardId: string;
  year: number;
  monthIndex: number;
  timezone: string;
};

export type TCardMetricsResponse = {
  totalTransactions: number;
  totalBalance: number;
  monthlySpending: number;
  monthlyIncome: number;
};

export type TWeeklyCardSummaryRes = {
  income: string[];
  expense: string[];
};
