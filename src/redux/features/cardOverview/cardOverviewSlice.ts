import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCard, TCardState } from ".";
import { RootState } from "@/redux";

const initialState: TCardState = {
  card: null,
};

const cardSlice = createSlice({
  name: "cardOverview",
  initialState,
  reducers: {
    setInitialCard: (state, action: PayloadAction<TCard>) => {
      state.card = action.payload;
    },
    updateInitialCard: (state, action: PayloadAction<Partial<TCard>>) => {
      if (state.card) {
        state.card = { ...state.card, ...action.payload };
      }
    },
  },
});

export const { setInitialCard, updateInitialCard } = cardSlice.actions;
export const selectCard = (state: RootState) => state?.cardOverview?.card;

export default cardSlice.reducer;
