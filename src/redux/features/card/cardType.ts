import { TCard } from "../cardOverview";

export type TCreateCardPayload = {
  accountHolderName: string;
  last4Digits: string;
  bankName: string;
  totalBalance: number;
  expireDate: string;
};

export type TCardState = {
  cards: TCard[] | null;
  isLoading: boolean;
};
