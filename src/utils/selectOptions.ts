import { TBudget } from "@/redux/features/budget";
import { TCard } from "@/redux/features/cardOverview";

export const formatCardSelectOptions = (data: TCard[]) => {
  return data?.map((item: TCard) => ({
    value: item?._id,
    label: item?.bankName,
  }));
};

export const formatBudgetSelectOptions = (data: TBudget[]) => {
  return data?.map((item: TBudget) => ({
    value: item?._id,
    label: item?.name,
  }));
};
