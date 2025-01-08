import { baseApi } from "@/api/baseApi";
import { TCard } from "../cardOverview";
import { TResponse } from "../types";
import { TCreateCardPayload } from ".";

const cardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCards: build.query<TResponse<TCard[]>, void>({
      query: () => `/card`,
      providesTags: ["Card"],
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
