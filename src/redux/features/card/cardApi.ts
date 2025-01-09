import { baseApi } from "@/api/baseApi";
import { TCard } from "../cardOverview";
import { TResponse } from "../types";
import { TCreateCardPayload, setCardLoadingState, setCards } from ".";

const cardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCards: build.query<TResponse<TCard[]>, void>({
      query: () => `/card`,
      providesTags: ["Card"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setCardLoadingState(true));
          const { data } = await queryFulfilled;
          dispatch(setCards(data?.data));
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          dispatch(setCardLoadingState(true));
        }
      },
    }),

    createCard: build.mutation<TResponse<TCard>, TCreateCardPayload>({
      query: (payload) => ({
        url: "/card",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Card"],
    }),
  }),
});

export const { useGetCardsQuery, useCreateCardMutation } = cardApi;
