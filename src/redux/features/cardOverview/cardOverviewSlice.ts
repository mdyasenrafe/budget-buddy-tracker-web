import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCard, TCardState } from ".";
import { RootState } from "@/redux";

const initialState: TCardState = {
  card: null,
  loading: false,
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
    setCardLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setInitialCard, updateInitialCard, setCardLoadingState } =
  cardSlice.actions;
export const selectCard = (state: RootState) => state?.cardOverview?.card;
export const getCardLoadingState = (state: RootState): boolean =>
  state?.cardOverview?.loading;

export default cardSlice.reducer;
