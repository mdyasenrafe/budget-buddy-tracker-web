import { TCard } from "@/redux/features/cardOverview";

export const formatCardSelectOptions = (data: TCard[]) => {
  return data?.map((item: TCard) => ({
    value: item?._id,
    label: item?.bankName,
  }));
};
