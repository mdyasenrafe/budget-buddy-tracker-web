import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux";
import { TCardState } from ".";
import { TCard } from "../cardOverview";

const initialState: TCardState = {
  cards: null,
  isLoading: false,
};

const categorySlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<TCard[] | null>) => {
      state.cards = action.payload;
    },
    setCardLoadingState: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCards, setCardLoadingState } = categorySlice.actions;

export const getCards = (state: RootState): TCard[] =>
  state?.card?.cards as TCard[];
export const getCardLoadingState = (state: RootState): boolean =>
  state?.category?.loading;

export default categorySlice.reducer;
