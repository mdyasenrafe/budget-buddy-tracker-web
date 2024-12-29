import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TCategory, TCategoryState } from "./type";
import { RootState } from "@/redux";

const initialState: TCategoryState = {
  incomeCategories: null,
  expenseCategories: null,
  loading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateIncomeCategories: (
      state,
      action: PayloadAction<TCategory[] | null>
    ) => {
      state.incomeCategories = action.payload;
    },
    updateExpenseCategories: (
      state,
      action: PayloadAction<TCategory[] | null>
    ) => {
      state.expenseCategories = action.payload;
    },
    setCategoryLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  updateIncomeCategories,
  updateExpenseCategories,
  setCategoryLoadingState,
} = categorySlice.actions;

export const getIncomeCategories = (state: RootState): TCategory[] =>
  state?.category?.incomeCategories as TCategory[];
export const getExpenseCategories = (state: RootState): TCategory[] =>
  state?.category?.expenseCategories as TCategory[];
export const getCateogryLoadingState = (state: RootState): boolean =>
  state?.category?.loading;

export default categorySlice.reducer;
