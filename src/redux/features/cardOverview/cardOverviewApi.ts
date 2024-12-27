import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import { TCard, TCardOverviewPayload, setInitialCard } from ".";

export const cardOverviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCardOverview: builder.mutation<
      TResponse<TCard>,
      TCardOverviewPayload
    >({
      query: (cardOverviewData) => ({
        url: "/card-overview",
        method: "POST",
        body: cardOverviewData,
      }),
      invalidatesTags: ["CardOverview"],
    }),
    getCardOverview: builder.query<TResponse<TCard>, void>({
      query: () => ({
        url: "/card-overview",
        method: "GET",
      }),
      providesTags: ["CardOverview"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setInitialCard(data.data));
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreateCardOverviewMutation, useGetCardOverviewQuery } =
  cardOverviewApi;
