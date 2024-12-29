import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import { TCategory } from "./type";
import {
  updateExpenseCategories,
  updateIncomeCategories,
} from "./categorySlice";

export const categoryService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query<TResponse<TCategory[]>, void | undefined>({
      query: () => {
        return "category";
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const incomeCategories: TCategory[] = [];
          const expenseCategories: TCategory[] = [];
          data?.data?.forEach((item: TCategory) => {
            if (item.type === "expense") {
              expenseCategories.push(item);
            } else if (item.type === "income") {
              incomeCategories.push(item);
            }
          });
          dispatch(updateIncomeCategories(incomeCategories));
          dispatch(updateExpenseCategories(expenseCategories));
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      },
    }),
  }),
});

export const { useFetchCategoriesQuery } = categoryService;