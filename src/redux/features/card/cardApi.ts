import { baseApi } from "@/api/baseApi";
import { TCard } from "../cardOverview";
import { TResponse } from "../types";
import { TCreateCardPayload } from ".";

const cardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCards: build.query<TResponse<TCard[]>, void>({
      query: () => `/card`,
    }),
    createCard: build.mutation<TResponse<TCard>, TCreateCardPayload>({
      query: (payload) => ({
        url: "/card",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetCardsQuery, useCreateCardMutation } = cardApi;
